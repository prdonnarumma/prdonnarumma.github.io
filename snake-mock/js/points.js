class Points {

    constructor() {
        this._element_loader = $("#score_loader");
        this._amount         = 100;
        this._checkPoint     = new Date().getTime();
    }

    updatePoints(points) {
        this.amount += points;

        if (this.amount > 100) {
            this.amount = 100;
        }
        if (this.amount < 0) {
            this.amount = 0;
        }
        this._element_loader.css('width', this.amount + '%');
    }

    get amount() {
        return this._amount;
    }

    set amount(q) {
        this._amount = q;
    }

    get checkPoint() {
        return this._checkPoint;
    }

    set checkPoint(cp) {
        this._checkPoint = cp;
    }
}