// @name: EventListener.js
// @require: Valid.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function EventListener() { // @help: EventListener
    this._events = {}; // event database. { type: [callback, ...], ... }
    this._types = [];  // available types. ["type", ...]
}

EventListener["name"] = "EventListener";
EventListener["repository"] = "https://github.com/uupaa/EventListener.js";

EventListener["prototype"] = {
    "constructor":  EventListener,
    "types":        EventListener_types,    // EventListener#types(types:StringArray):Boolean
    "get":          EventListener_get,      // EventListener#get(type):FunctionArray
    "has":          EventListener_has,      // EventListener#has(type):Boolean
    "add":          EventListener_add,      // EventListener#add(type:EventTypeString, callback:Function):this
    "remove":       EventListener_remove,   // EventListener#remove(type:EventTypeString, callback:Function):this
    "clear":        EventListener_clear     // EventListener#clear():this
};

// --- implement -------------------------------------------
function EventListener_types(types) { // @arg StringArray: ["type", ...]
                                      // @ret this:
                                      // @desc: register types
                                      // @help: EventListener#types
//{@assert
    _if(!Valid.type(types, "Array"), "EventListener#types(types)");
//}@assert

    var that = this;

    types.forEach(function(type) {
        if (that._types.indexOf(type) < 0) {
            that._types.push(type);
        }
    });
    return this;
}

function EventListener_get(type) { // @arg EventTypeString:
                                   // @ret FunctionArray: [callback, ...]
                                   // @help: EventListener#get
//{@assert
    _if(!Valid.type(type, "String"), "EventListener#get(type)");
//}@assert

    if ( this["has"](type) ) {
        return this._events[type];
    }
    return [];
}

function EventListener_has(type) { // @arg EventTypeString:
                                   // @ret Boolean:
                                   // @help: EventListener#has
//{@assert
    _if(!Valid.type(type, "String"), "EventListener#has(type)");
//}@assert

    return type in this._events;
}

function EventListener_add(type,       // @arg EventTypeString:
                           callback) { // @arg Function:
                                       // @ret this:
                                       // @help: EventListener#add
//{@assert
    _if(!Valid.type(type, "String"),       "EventListener#add(type)");
    _if(!Valid.type(callback, "Function"), "EventListener#add(,callback)");
//}@assert

    if (this._types.indexOf(type) < 0) {
        throw new TypeError("EventListener#add(type)");
    }

    if ( this["has"](type) ) {
        this._events[type].push(callback);
    } else {
        this._events[type] = [callback];
    }
    return this;
}

function EventListener_remove(type,       // @arg EventTypeString:
                              callback) { // @arg Function:
                                          // @ret this:
                                          // @help: EventListener#remove
//{@assert
    _if(!Valid.type(type, "String"),       "EventListener#remove(type)");
    _if(!Valid.type(callback, "Function"), "EventListener#remove(,callback)");
//}@assert

    if ( this["has"](type) ) {
        var pos = this._events[type].indexOf(callback);

        if (pos >= 0) {
            this._events[type].splice(pos, 1);
        }
    }
    return this;
}

function EventListener_clear() { // @ret this:
                                 // @help: EventListener#clear
    this._events = {};
    return this;
}

//{@assert
function _if(value, msg) {
    if (value) {
        console.error(Valid.stack(msg));
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = EventListener;
}
//}@node
if (global["EventListener"]) {
    global["EventListener_"] = EventListener; // already exsists
} else {
    global["EventListener"]  = EventListener;
}

})((this || 0).self || global);

