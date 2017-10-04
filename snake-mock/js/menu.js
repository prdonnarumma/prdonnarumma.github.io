class Menu {

    constructor() {
        this._options                = ['StartGame', 'Options', 'Credits'];
        this._sprite_counter         = 0;
        this._src                    = "images/menu.png";
        this._sprite_frame_count_max = 3;
        this._fading                 = false;
        this._alpha                  = 1;
        this.initAssets();
        this._canvas                 = document.getElementById("game_canvas") || null; //Requires a canvas to work fine
    }

    initAssets() {
        var self = this;
        //this.sound = this._sound_src;
        this._sprite        = new Image();
        this._sprite.onload = function () {
            self.initProperties();
        };

        this._sprite.src = this._src;
    }

    initProperties() {
        var sprite    = this._sprite;
        var max_frame = this._sprite_frame_count_max;

        this._width  = sprite.width / max_frame;
        this._height = sprite.height;
        this._sprite_frame_count_max--;
    }

    navigateOptions(input) {
        if (input === 40) {
            this.currentOption += 1;
            if (this.currentOption > this._sprite_frame_count_max) {
                this.currentOption = 0;
            }
        } else if (input === 38) {
            this.currentOption -= 1;
            if (this.currentOption < 0) {
                this.currentOption = 2;
            }
        }
    }

    draw(ctx) {
        var cur_frame = this.currentOption;

        var source_x = cur_frame * this._width;

        ctx.save();

        if (this._fading) {
            ctx.globalAlpha = this._alpha -= 0.1;
            if (ctx.globalAlpha < 0) {
                ctx.globalAlpha = 0
            }
        }

        ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
        ctx.drawImage(
            this._sprite,
            source_x,
            0,
            this._width,
            this._height,
            0,
            0,
            this._width,
            this._height
        );

        ctx.restore();
    }

    get options() {
        return this._options[this.currentOption];
    }

    get currentOption() {
        return this._sprite_counter;
    }

    set currentOption(opt) {
        this._sprite_counter = opt;
    }

}