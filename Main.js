"use strict";

import StartWindow from "./StartWin.js";

export default class Main {
    constructor() {

        let elem = new StartWindow();
        this._elem = elem;

    }

    get elem() {

        return this._elem;
        
    }

}
