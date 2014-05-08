var ModuleTestEventListener = (function(global) {

return new Test("EventListener", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testEventListener,
    ]).run().clone();

function testEventListener(next) {

    var event = new EventListener();

    event.types(["a", "b", "c"]);
    event.add(null, "a", function() { console.log("a"); });
    event.add(null, "a", function() { console.log("a"); });
    event.add(null, "b", function() { console.log("b"); });

    var aEvents = event.get("a").length === 2;
    var bEvents = event.get("b").length === 1;

    event.clear(null);

    var aEvents2 = event.get("a").length === 0;
    var bEvents2 = event.get("b").length === 0;

    if (aEvents && bEvents && aEvents2 && bEvents2) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

