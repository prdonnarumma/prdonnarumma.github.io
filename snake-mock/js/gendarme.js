class Gendarme extends Entity {

    constructor(x, y) {
        super(x, y);
        this._direction = "Right"; //Always right
        this._src                     = "images/gendarme.png";
        this._sprite_frame_count_max  = 2;
        this._sprite_change_per_frame = 10;
        super.initAssets();
        this._vel                     = 0;

        this.initEvents();
    }

    initProperties() {
        super.initProperties();

        this.gameRight  = parseInt(this._canvas.width) - parseInt(this._width);
        this.gameBottom = parseInt(this._canvas.height) - parseInt(this._height);
        this.gameLeft   = 0;
        this.gameTop    = 0;
    }

    initEvents() {
        document.addEventListener('keyup', (ev) => {
            this.updateDirection(ev.which);
        });
    }

    draw(ctx) {
        var cur_frame = this._sprite_frame_count / this._sprite_change_per_frame;
        var source_x, old_sprite_frame;

        if ((cur_frame % 1) == 0) { //if current frame is an integer
            source_x = cur_frame * this._width;
        } else {
            old_sprite_frame = parseInt(cur_frame);
            source_x         = old_sprite_frame * this._width;
        }

        //Add changes due to behaviour of character, for example mirroring when going to the left
        ctx.save();
        ctx.translate(this.X, this.Y);
        ctx.translate(this._width / 2, this._height / 2);

        ctx.drawImage(
            this.sprite,
            source_x,
            0,
            this._width,
            this._height,
            -this._width / 2,
            -this._height / 2,
            this._width,
            this._height
        );

        ctx.restore();
    }

    move() {
        var method = "move" + this.direction;
        this[method]();
    }

    moveRight() {
        if (this.X + this.vel > this.gameRight) {
            this.X = this.gameLeft;
        } else {
            this.X += this.vel;
        }
    }

    moveLeft() {
        if (this.X - this.vel < this.gameLeft) {
            this.X = this.gameRight;
        } else {
            this.X -= this.vel;
        }
    }

    moveUp() {
        if (this.Y - this.vel < this.gameTop) {
            this.Y = this.gameBottom;
        } else {
            this.Y -= this.vel;
        }
    }

    moveDown() {
        if (this.Y + this.vel > this.gameBottom) {
            this.Y = this.gameTop;
        } else {
            this.Y += this.vel;
        }
    }

    updateDirection(input) {
        switch (input) {
            case 38:
                this.direction = 'Up';
                break;
            case 39:
                this.direction = 'Right';
                break;
            case 40:
                this.direction = 'Down';
                break;
            case 37:
                this.direction = 'Left';
                break;
            default:
                break;
        }
    }

    set direction(dir) {
        this._direction = dir;
    }

    get direction() {
        return this._direction;
    }

    get vel() {
        return this._vel;
    }

    set vel(v) {
        this._vel = v;
    }
}