class Entity {

    constructor(x, y) {
        this._x                       = x;
        this._y                       = y;
        this._width                   = null;
        this._height                  = null;
        this._sprite                  = null;
        this._sprite_frame_count_max  = null;
        this._sprite_frame_count      = 0;
        this._sprite_change_per_frame = null;
        this._sprite_row_max          = 1;
        this._canvas                  = document.getElementById("game_canvas") || null; //Requires a canvas to work fine
    }

    initAssets() {
        var self = this;

        this.sprite        = new Image();
        this.sprite.onload = function () {
            self.initProperties();
        };

        this.sprite.src = this._src;
    }

    initProperties() {
        var sprite    = this._sprite;
        var max_frame = this._sprite_frame_count_max;
        var sheet     = this._sprite_row_max;
        this._width   = sprite.width / max_frame;
        this._height  = sprite.height / sheet;

        this._sprite_frame_count_max--;
        this._sprite_row_max--;
    }

    updateFrameCount(count) {
        if (typeof count !== 'number') {
            this._sprite_frame_count++;

            if (parseInt(this._sprite_frame_count / this._sprite_change_per_frame) > this._sprite_frame_count_max) {
                this._sprite_frame_count = 0;
            }
            return
        }
        this._sprite_frame_count = count;
    }

    //setters and getters
    set X(x) {
        this._x = x
    }

    get X() {
        return this._x
    }

    set Y(y) {
        this._y = y
    }

    get Y() {
        return this._y
    }

    set sprite(image) {
        this._sprite = image;
    }

    get sprite() {
        return this._sprite;
    }

    get bounds() {
        var b     = {};
        b.start_x = this.X;
        b.start_y = this.Y;
        b.end_x   = this.X + this._width;
        b.end_y   = this.Y + this._height;

        return b;
    }
}