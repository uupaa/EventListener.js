(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
//  This code block will be removed in `$ npm run build-release`. http://git.io/Minify
var Valid = global["Valid"] || require("uupaa.valid.js"); // http://git.io/Valid
//}@dev

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function EventListener() {
    this._events = {}; // event database. { type: [callback, ...], ... }
    this._types = [];  // available types. ["type", ...]
}

EventListener["repository"] = "https://github.com/uupaa/EventListener.js";

EventListener["prototype"] = {
    "constructor":  EventListener,
    "types":        EventListener_types,    // EventListener#types(types:EventTypeStringArray):this
    "get":          EventListener_get,      // EventListener#get(type):FunctionArray
    "has":          EventListener_has,      // EventListener#has(type):Boolean
    "add":          EventListener_add,      // EventListener#add(target:Any/null, type:EventTypeString, callback:Function):this
    "remove":       EventListener_remove,   // EventListener#remove(target:Any/null, type:EventTypeString, callback:Function):this
    "clear":        EventListener_clear     // EventListener#clear(target:Any/null):this
};

// --- implement -------------------------------------------
function EventListener_types(types) { // @arg EventTypeStringArray - ["type", ...]
                                      // @ret this
                                      // @desc register types
//{@dev
    Valid(Valid.type(types, "Array"), EventListener_types, "types");
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
    Valid(Valid.type(type, "String"), EventListener_get, "type");
//}@dev

    if ( this["has"](type) ) {
        return this._events[type];
    }
    return [];
}

function EventListener_has(type) { // @arg EventTypeString
                                   // @ret Boolean
//{@dev
    Valid(Valid.type(type, "String"), EventListener_has, "type");
//}@dev

    return type in this._events;
}

function EventListener_add(target,     // @arg Any|null
                           type,       // @arg EventTypeString
                           callback) { // @arg Function
                                       // @ret this
//{@dev
    Valid(Valid.type(type,     "String"),   EventListener_add, "type");
    Valid(Valid.type(callback, "Function"), EventListener_add, "callback");
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
    Valid(Valid.type(type,     "String"),   EventListener_remove, "type");
    Valid(Valid.type(callback, "Function"), EventListener_remove, "callback");
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

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = EventListener;
}
global["EventListener" in global ? "EventListener_" : "EventListener"] = EventListener; // switch module. http://git.io/Minify

})((this || 0).self || global);

