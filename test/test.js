new Test().add([
        testEventListener,
    ]).run(function(err, test) {
        if (1) {
            err || test.worker(function(err, test) {
                if (!err && typeof EventListener_ !== "undefined") {
                    var name = Test.swap(EventListener, EventListener_);

                    new Test(test).run(function(err, test) {
                        Test.undo(name);
                    });
                }
            });
        }
    });

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
        console.log("testEventListener ok");
        next && next.pass();
    } else {
        console.error("testEventListener ng");
        next && next.miss();
    }
}

