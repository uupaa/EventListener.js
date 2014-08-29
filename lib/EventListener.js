(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function EventListener() {
    this._on    = {}; // event database. { type: [callback, ...], ... }
    this._types = []; // registered types. ["type", ...]
}

//{@dev
EventListener["repository"] = "https://github.com/uupaa/EventListener.js";
//}@dev

EventListener["prototype"] = {
    "constructor":  EventListener,          // new EventListener()
    "register":     EventListener_register, // EventListener#register(types:EventTypeStringArray):this
    "list":         EventListener_list,     // EventListener#list(type):FunctionArray
    "has":          EventListener_has,      // EventListener#has(type):Boolean
    "on":           EventListener_on,       // EventListener#on(target:Any|null, type:EventTypeString, callback:Function):this
    "off":          EventListener_off,      // EventListener#off(target:Any|null, type:EventTypeString, callback:Function):this
    "fire":         EventListener_fire,     // EventListener#fire(target:Any|null, type:EventTypeString):this
    "clear":        EventListener_clear,    // EventListener#clear(target:Any|null):this
    // --- DEPRECATED ---
    "types":        EventListener_register, // EventListener#types(types:EventTypeStringArray):this
    "get":          EventListener_list,     // EventListener#get(type):FunctionArray
    "add":          EventListener_on,       // EventListener#add(target:Any|null, type:EventTypeString, callback:Function):this
    "remove":       EventListener_off,      // EventListener#remove(target:Any|null, type:EventTypeString, callback:Function):this
};

// --- implements ------------------------------------------
function EventListener_register(types) { // @arg EventTypeStringArray - ["type", ...]
                                         // @ret this
                                         // @desc register types
//{@dev
    $valid($type(types, "Array"), EventListener_register, "types");
//}@dev

//{@dev
    var that = this;

    // avoid duplicate
    types.forEach(function(type) {
        if (that._types.indexOf(type) < 0) {
            that._types.push(type);
        }
    });
//}@dev
    return this;
}

function EventListener_list(type) { // @arg EventTypeString
                                    // @ret FunctionArray - [callback, ...]
                                    // @desc get registered callback functions array
//{@dev
    $valid($type(type, "String"), EventListener_list, "type");
//}@dev

    if ( this["has"](type) ) {
        return this._on[type];
    }
    return [];
}

function EventListener_has(type) { // @arg EventTypeString
                                   // @ret Boolean
                                   // @desc has registered type
//{@dev
    $valid($type(type, "String"), EventListener_has, "type");
//}@dev

    return type in this._on;
}

function EventListener_on(target,     // @arg Any|null - event target object
                          type,       // @arg EventTypeString
                          callback) { // @arg Function - callback(event:EventObject):void
                                      // @ret this
                                      // @desc add event listener
//{@dev
    $valid($type(type,     "String"),   EventListener_on, "type");
    $valid($type(callback, "Function"), EventListener_on, "callback");

    if (this._types.indexOf(type) < 0) {
        throw new TypeError("EventListener#on(type) is not registered");
    }
//}@dev

    if ( this["has"](type) ) {
        this._on[type].push(callback);
    } else {
        this._on[type] = [callback];
    }
    if (target) {
        target["addEventListener"](type, callback, false);
    }
    return this;
}

function EventListener_off(target,     // @arg Any|null - event target object
                           type,       // @arg EventTypeString
                           callback) { // @arg Function - callback(event:EventObject):void
                                       // @ret this
                                       // @desc remove event listener
//{@dev
    $valid($type(type,     "String"),   EventListener_off, "type");
    $valid($type(callback, "Function"), EventListener_off, "callback");
//}@dev

    if ( this["has"](type) ) {
        var pos = this._on[type].indexOf(callback); // [fn1, fn2, fn3, ...]

        if (pos >= 0) {
            this._on[type].splice(pos, 1);

            if (!this._on[type].length) {
                delete this._on[type];
            }
        }
    }
    if (target) {
        target["removeEventListener"](type, callback, false);
    }
    return this;
}

function EventListener_fire(target, // @arg Any|null - event target object
                            type) { // @arg EventTypeString
                                    // @ret this
                                    // @desc fire event
//{@dev
    $valid($type(type, "String"), EventListener_fire, "type");
//}@dev

    target["dispatchEvent"]( new Event(type) );
}

function EventListener_clear(target) { // @arg Any|null
                                       // @ret this
    for (var type in this._on) {
        var callbacks = this._on[type];

        for (var i = 0, iz = callbacks.length; i < iz; ++i) {
            if (target) {
                target["removeEventListener"](type, callbacks[i], false);
            }
        }
    }
    this._on = {};
    return this;
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = EventListener;
}
global["EventListener" in global ? "EventListener_" : "EventListener"] = EventListener; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

