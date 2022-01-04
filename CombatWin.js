"use strict";

import { createElem, unitsList } from './lib.js';

//let configafirstpl = [ 'Empire', 'Artorius', 'Knight', 'Archer', 'Mag', 'Swordsman' ];

export default class CombatWin {

    constructor() {

        this.unitsList = unitsList;

        // load information about the first and the second players
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );
        jsonconfig = localStorage.getItem( 'configSecondPlayer' );
        this.configSecondPlayer = JSON.parse( jsonconfig );

        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="combat_content header">
                <div class="header_player1">
                    <div class="phrase">Player 1<br><br>${this.configFirstPlayer.nickname}</div>
                </div>
                <div class="header_nameGame">
                    <div class="name_game">Command Combat</div>
                    <div class="emblem"></div>
                </div>
                <div class="header_player2">
                    <div class="phrase">Player 2<br><br>${this.configSecondPlayer.nickname}</div>
                </div>
            </div>
            <div class="combat_content field">
                <div class="field_listPlayer1">
                    <ul class="listPlayer1"></ul>
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
                        <ul class="player2_front">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="player2_back">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="field_listPlayer2">
                    <ul class="listPlayer2"></ul>
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
        this.configFirstPlayer.raceUnits = this.getConfigArray( this.configFirstPlayer.race );
        this.configSecondPlayer.raceUnits = this.getConfigArray( this.configSecondPlayer.race );
        let item = createElem( `<li><div><img src="./img/${this.unitsList[this.configFirstPlayer.raceUnits][0][1][9]}"></div>
        <div>${this.unitsList[this.configFirstPlayer.raceUnits][0][1][0]}<br><br>Health<br><span>
        ${this.unitsList[this.configFirstPlayer.raceUnits][0][1][1]}</span></div></li>` );
        this.listPlayer1.append( item );
        item = createElem( `<li><div><img src="./img/${this.unitsList[this.configSecondPlayer.raceUnits][0][2][9]}"></div>
        <div>${this.unitsList[this.configSecondPlayer.raceUnits][0][2][0]}<br><br>Health<br><span>
        ${this.unitsList[this.configSecondPlayer.raceUnits][0][2][1]}</span></div></li>` );
        this.listPlayer2.append( item );

        // for( let unit of this.configFirstPlayer.command ) {

        // }
        // for( let unit of unitsEmpire ) {

        // }

        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;

    }

    // compare race of configPlayer and units
    getConfigArray( race ) {
        
        if( race == 'Empire' ) return 0;
        else if( race == 'Demons' ) return 1;
        else if( race == 'Elfs' ) return 2;
        else return 3;

    }

    get elem() {

        return this._elem;
        
    }

}