(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function EventListener() {
    this._events = {}; // event database. { type: [callback, ...], ... }
    this._types = [];  // available types. ["type", ...]
}

//{@dev
EventListener["repository"] = "https://github.com/uupaa/EventListener.js";
//}@dev

EventListener["prototype"] = {
    "constructor":  EventListener,
    "types":        EventListener_types,    // EventListener#types(types:EventTypeStringArray):this
    "get":          EventListener_get,      // EventListener#get(type):FunctionArray
    "has":          EventListener_has,      // EventListener#has(type):Boolean
    "add":          EventListener_add,      // EventListener#add(target:Any/null, type:EventTypeString, callback:Function):this
    "remove":       EventListener_remove,   // EventListener#remove(target:Any/null, type:EventTypeString, callback:Function):this
    "clear":        EventListener_clear     // EventListener#clear(target:Any/null):this
};

// --- implements ------------------------------------------
function EventListener_types(types) { // @arg EventTypeStringArray - ["type", ...]
                                      // @ret this
                                      // @desc register types
//{@dev
    $valid($type(types, "Array"), EventListener_types, "types");
//}@dev

    var that = this;

    types.forEach(function(type) {
        if (that._types.indexOf(type) < 0) {
            that._types.push(type);
        }
    });
    return this;
}

function EventListener_get(type) { // @arg EventTypeString
                                   // @ret FunctionArray - [callback, ...]
//{@dev
    $valid($type(type, "String"), EventListener_get, "type");
//}@dev

    if ( this["has"](type) ) {
        return this._events[type];
    }
    return [];
}

function EventListener_has(type) { // @arg EventTypeString
                                   // @ret Boolean
//{@dev
    $valid($type(type, "String"), EventListener_has, "type");
//}@dev

    return type in this._events;
}

function EventListener_add(target,     // @arg Any|null
                           type,       // @arg EventTypeString
                           callback) { // @arg Function
                                       // @ret this
//{@dev
    $valid($type(type,     "String"),   EventListener_add, "type");
    $valid($type(callback, "Function"), EventListener_add, "callback");
//}@dev

    if (this._types.indexOf(type) < 0) {
        throw new TypeError("EventListener#add(type)");
    }

    if ( this["has"](type) ) {
        this._events[type].push(callback);
    } else {
        this._events[type] = [callback];
    }
    if (target) {
        target["addEventListener"](type, callback, false);
    }
    return this;
}

function EventListener_remove(target,     // @arg Any|null
                              type,       // @arg EventTypeString
                              callback) { // @arg Function
                                          // @ret this
//{@dev
    $valid($type(type,     "String"),   EventListener_remove, "type");
    $valid($type(callback, "Function"), EventListener_remove, "callback");
//}@dev

    if ( this["has"](type) ) {
        var pos = this._events[type].indexOf(callback);

        if (pos >= 0) {
            this._events[type].splice(pos, 1);

            if (!this._events[type].length) {
                delete this._events[type];
            }
        }
    }
    if (target) {
        target["removeEventListener"](type, callback, false);
    }
    return this;
}

function EventListener_clear(target) { // @arg Any|null
                                       // @ret this
    for (var type in this._events) {
        var callbacks = this._events[type];

        for (var i = 0, iz = callbacks.length; i < iz; ++i) {
            if (target) {
                target["removeEventListener"](type, callbacks[i], false);
            }
        }
    }
    this._events = {};
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

