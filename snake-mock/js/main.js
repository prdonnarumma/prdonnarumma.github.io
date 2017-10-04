// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors  = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime   = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id         = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime       = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

(function ($) {
    "use strict";

    // FPS for updating the game
    var FPS = 60;

    // initialize variables
    var width, height, fpsInterval, startTime, now, then, elapsed;

    /*
     * Canvas Initiation
     */
    var canvas = document.getElementById('game_canvas');
    var ctx    = canvas.getContext('2d');

    // Initialize the game master
    var gameMaster = new GameMaster();

    function resizeCanvas() {
        var $body = $('body');

        width = canvas.width = $body.width();
        height = canvas.height = $body.height();

        // Width x Height capped to 1000 x 500
        if (canvas.width > 1000) {
            width = canvas.width = 1000;
        }
        if (canvas.height > 500) {
            height = canvas.height = 500;
        }

        // Resizing Width/Height
        if (canvas.height < 500) {
            canvas.width = canvas.height * 1000 / 500;
        }

        if (canvas.width < 1000) {
            canvas.height = canvas.width * 500 / 1000;
        }
    }

    /**
     * Starts animating the game
     */
    function startAnimating() {
        fpsInterval = Math.floor(1000 / FPS);
        then        = Date.now();
        startTime   = then;
        animate();
    }

    /**
     * Main function running the game animation
     */
    function animate() {
        //console.log('animate');
        // request another frame
        requestAnimationFrame(animate);

        // calc elapsed time since last loop
        now     = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            ctx.clearRect(0, 0, width, height);

            if (gameMaster.gameState === 'Menu') {
                gameMaster.updateMenu(ctx);
            } else {
                gameMaster.updateGame(ctx);
            }
        }
    }

    // Start it all!
    resizeCanvas();
    gameMaster.initializeMenu();
    gameMaster.init();
    startAnimating();

})(window.jQuery);