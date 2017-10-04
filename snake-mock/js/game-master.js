class GameMaster {
    //Before initiating the game, all assets from classes should be loaded!!
    constructor() {
        /**
         * Game Entities
         * @type {Object.<string, Entity>}
         * @private
         */
        var _entities = {};

        // Width of entities, used to define the canvas max limits
        this.ENTITIES_WIDTH = 48;

        /**
         * Adds a new entity to the game
         * @param {string} id
         * @param {Entity} entity
         */
        this.setNewEntity = function (id, entity) {
            _entities[id] = entity;
        };

        /**
         * Returns a game entity
         *
         * @param {string} id
         * @returns {Entity}
         */
        this.entity = function (id) {
            return _entities[id];
        };

        /**
         * Returns all entities
         *
         * @returns {Object.<string, Entity>}
         */
        this.getAllEntities = function () {
            return _entities
        };

        this.entityRemove = function (id) {
            delete _entities[id];
        };

        this.readInput();
        this.canvas       = document.getElementById("game_canvas");
        this.menu         = null;
        this.gameState    = null;
        this.gameStarted  = null;
    }

    init() {
        // Set max X and Y for the game
        this.maxX = parseInt(this.canvas.width) - parseInt(this.ENTITIES_WIDTH);
        this.maxY = parseInt(this.canvas.height) - parseInt(this.ENTITIES_WIDTH);
    }

    initializeMenu() {
        this.createMenu();
        this.gameState = 'Menu';
    }

    initializeGame() {
        this.createPoints();
        this.addGendarme('player', 10, 10);
        this.addMaldonado('maldonado');
        this.addMaldonado('maldonadobis');

        this.gameState   = 'Game';
        this.gameStarted = false;
    }

    createPoints() {
        this.points = new Points();
    }

    createMenu() {
        this.menu = new Menu();
    }

    addMaldonado(id, x, y) {
        x = x || Utilities.getRandomIntInclusive(0, this.maxX);
        y = y || Utilities.getRandomIntInclusive(0, this.maxY);

        let maldonado = new Maldonado(x, y, id);
        this.setNewEntity(id, maldonado);
    }

    addGendarme(id, x, y) {
        x = x || Utilities.getRandomIntInclusive(0, this.maxX);
        y = y || Utilities.getRandomIntInclusive(0, this.maxY);

        let gendarme = new Gendarme(x, y, id);
        this.setNewEntity(id, gendarme);
    }

    readInput() {
        let self = this;
        document.addEventListener('keydown', function (evt) {
            self.input = evt.which;
        });

        document.addEventListener('keyup', function () {
            self.input = null;
        });
    }

    spawnMaldonado(id) {
        let self         = this;
        let new_x        = Utilities.getRandomIntInclusive(0, this.maxX);
        let new_y        = Utilities.getRandomIntInclusive(0, this.maxY);
        let playerBounds = this.getPlayer().bounds;

        let isColliding = Utilities.willColideWith(new_x, new_y, 48, 48, playerBounds);

        if (isColliding) {
            return this.spawnMaldonado(id);
        }

        setTimeout(function () {
            self.addMaldonado(id.toString(), new_x, new_y);
        }, 3000);
    }

    updateGame(ctx) {
        let player = this.getPlayer();
        let input  = this.input;

        //Update the player
        if (!(player instanceof Gendarme)) {
            throw new Error("Player entity doesn't exist!");
        }

        player.move();
        player.updateFrameCount();
        player.draw(ctx);

        let allEntities = this.getAllEntities();
        for (let key in allEntities) {
            if (!allEntities.hasOwnProperty(key) || !(allEntities[key] instanceof Maldonado)) {
                continue;
            }

            let entity = allEntities[key];

            if (Utilities.isColliding(entity.bounds, player.bounds)) {
                this.points.updatePoints(20);
                this.entityRemove(key);
                this.spawnMaldonado(key);
            }

            entity.updateFrameCount();
            entity.draw(ctx);
        }

        if (this.gameStarted) {
            //Update loss condition
            let cur_time  = new Date().getTime();
            let time_diff = cur_time - this.points.checkPoint;
            if (time_diff > 200) {
                this.points.updatePoints(-1);
                this.points.checkPoint = cur_time;
            }

            if (this.points.amount <= 0) {
                this.initializeMenu();
                this.gameState = "Menu";
                player.vel     = 0;
            }
        } else if (!this.gameStarted && input === 13) {
            this.gameStarted = true;
            player.vel       = 2;
        }
    }

    startGame() {
        this.initializeGame();
    }

    updateMenu(ctx) {
        let input = this.input;
        let menu  = this.menu;
        //Navigate through menu and actualize sprite
        menu.draw(ctx);
        if (!menu._fading) {
            menu.navigateOptions(input);
            if (input !== 13) {
                return;
            }

            switch (menu.options) {
                case 'StartGame':
                    menu._fading = true;
                    break;
                case 'Options':
                    console.log('Options yet not implemented...');
                    break;
                default:
                    console.log('Same that with options.');
                    break;
            }
        }

        if (menu._fading && menu._alpha - 0.1 < 0) {
            delete this.menu;
            this.startGame();
        }
    }

    /**
     *
     * @returns {Gendarme}
     */
    getPlayer() {
        return this.entity('player');
    }

}