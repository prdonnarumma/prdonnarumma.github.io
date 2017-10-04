class Maldonado extends Entity {
    //Maldonado should now be an array of maldonados
    constructor(x, y, id) {
        super(x, y);
        this._src                     = "images/santiago.png";
        this._sprite_frame_count_max  = 2;
        this._sprite_change_per_frame = 14;
        this._sprite_row_max          = 3;
        super.initAssets();
        this._sprite_row              = Utilities.getRandomIntInclusive(0, 2);
    }

    draw(ctx) {
        var cur_frame = this._sprite_frame_count / this._sprite_change_per_frame;
        var source_x, source_y, old_sprite_frame;

        if ((cur_frame % 1) == 0) { //if current frame is an integer
            source_x = cur_frame * this._width;
        } else {
            old_sprite_frame = parseInt(cur_frame);
            source_x         = old_sprite_frame * this._width;
        }

        source_y = this._sprite_row * this._height;

        ctx.save();

        ctx.translate(this.X, this.Y);
        ctx.translate(this._width / 2, this._height / 2);
        ctx.drawImage(
            this.sprite,
            source_x,
            source_y,
            this._width,
            this._height,
            -this._width / 2,
            -this._height / 2,
            this._width,
            this._height
        );

        ctx.restore();
    }
}