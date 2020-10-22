export class Level {
    constructor(name) {
        this.name = name;
        this.boardSize = 12;
    }
}

export class Player {
    constructor() {
        this.level = new Level();
    }

}