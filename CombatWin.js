"use strict";

import { createElem, unitsEmpire, unitsDemons } from './lib.js';

let configafirstpl = [ 'Empire', 'Artorius', 'Knight', 'Archer', 'Mag', 'Swordsman' ];

export default class CombatWin {

    constructor() {
        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="combat_content header">
                <div class="header_player1">
                    <div class="phrase">Player 1<br><br>Artorius</div>
                </div>
                <div class="header_nameGame">
                    <div class="name_game">Command Combat</div>
                    <div class="emblem"></div>
                </div>
                <div class="header_player2">
                    <div class="phrase">Player 2<br><br>Lancelot</div>
                </div>
            </div>
            <div class="combat_content field">
                <div class="field_listPlayer1">
                    <ul class="listPlayer1">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="field_main">
                    <div class="group_player1">
                        <ul class="player1_back">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="player1_front">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="group_player2">
                        <ul class="player2_back">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="player2_front">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="field_listPlayer2">
                    <ul class="listPlayer2">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div class="combat_content footer">
                    <div class="btn_op button_attack">Attack</div>
                    <div class="btn_op button_defend">Defend</div>
                    <div class="btn_op button_wait">Waiting</div>
            </div>
        </div>
        </div>` );

        this.listPlayer1 = elem.querySelector( '.listPlayer1' );
        this.listPlayer2 = elem.querySelector( '.listPlayer2' );
        // for( let unit of unitsEmpire ) {

        // }

        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;

    }

    get elem() {

        return this._elem;
        
    }

}