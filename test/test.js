var ModuleTestEventListener = (function(global) {

return new Test("EventListener", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testEventBasic,
        testEventOff,
        testEventHas,
        testEventList,
        testEventDOM,
    ]).run().clone();

function testEventBasic(test, pass, miss) {

    function a1() { console.log("a"); }
    function a2() { console.log("a"); }
    function b1() { console.log("b"); }
    var event = new EventListener();

    event.register(["a", "b", "c"]);
    event.on(null, "a", a1);
    event.on(null, "a", a2);
    event.on(null, "b", b1);

    var result1 = event.get("a").length === 2;
    var result2 = event.get("b").length === 1;

    event.clear(null);

    var result3 = event.get("a").length === 0;
    var result4 = event.get("b").length === 0;

    if (result1 && result2 && result3 && result4) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testEventOff(test, pass, miss) {

    function a1() { console.log("a"); }
    function a2() { console.log("a"); }
    function b1() { console.log("b"); }
    var event = new EventListener();

    event.register(["a", "b", "c"]);
    event.on(null, "a", a1);
    event.on(null, "a", a2);
    event.on(null, "b", b1);

    var result1 = event.get("a").length === 2;
    var result2 = event.get("b").length === 1;

    event.off(null, "a", a1);
    event.off(null, "a", a2);
    event.off(null, "b", b1);

    var result3 = event.get("a").length === 0;
    var result4 = event.get("b").length === 0;

    if (result1 && result2 && result3 && result4) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testEventHas(test, pass, miss) {

    function a1() { console.log("a"); }
    function a2() { console.log("a"); }
    function b1() { console.log("b"); }
    var event = new EventListener();

    event.register(["a", "b", "c"]);
    event.on(null, "a", a1);
    event.on(null, "a", a2);
    event.on(null, "b", b1);

    var result1 =  event.has("a");
    var result2 =  event.has("b");
    var result3 = !event.has("c");

    if (result1 && result2 && result3) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testEventList(test, pass, miss) {

    function a1() { console.log("a"); }
    function a2() { console.log("a"); }
    function b1() { console.log("b"); }
    var event = new EventListener();

    event.register(["a", "b", "c"]);
    event.on(null, "a", a1);
    event.on(null, "a", a2);
    event.on(null, "b", b1);

    var result1 = event.list("a"); // [a1, a2]
    var result2 = event.list("b"); // [b1]
    var result3 = event.list("c"); // []

    if (result1[0] === a1 &&
        result1[1] === a2 &&
        result2[0] === b1 &&
        result3.length === 0) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testEventDOM(test, pass, miss) {

    var button = document.body.appendChild( document.createElement("button") );

    var event = new EventListener();
    event.register(["click"]);

    event.on(button, "click", function(event) {
        document.body.removeChild(button);
        test.done(pass());
    });

    event.fire(button, "click");
}


})((this || 0).self || global);

