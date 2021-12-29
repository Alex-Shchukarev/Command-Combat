"use strict";

import { createElem, listUnits } from './lib.js';

export default class HireWindow {

    constructor() {

        // load information about the first player
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );

        this.listUnits = listUnits;
        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="hire_content header">
                <div class="hire_nameColumn">
                    <div class="phrase">Hire units</div>
                </div>
                <div class="hire_nameGame">
                    <div class="name_game">Command Combat</div>
                    <div class="emblem"></div>
                </div>
            </div>
            <div class="hire_content recruiting">
                <div class="slot_units">
                    <div class="list_slots">
                        <ul class="slots_for_icons">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="footer_slots">
                        <a href="#" class="btn_op">Hire</a>
                    </div>
                </div>
                <div class="icon_units">
                    <div class="up_arrow">
                        <img src="./img/arrow_up.png" alt="icon_arrow_up">
                    </div>
                    <div class="icons_inner">
                        <ul class="slides_icons"></ul>
                    </div>
                    <div class="down_arrow">
                        <img src="./img/arrow_down.png" alt="icon_arrow_down">
                    </div>
                </div>
                <div class="info_units">
                    <ul class="info_inner">
                    </ul>
                </div>
            </div>
        </div>
    </div>` );

    this.foneSlotUnits = elem.querySelector( '.slot_units' );
    this.foneSlotUnits.classList.add( `fone_slots_${this.configFirstPlayer.race}` );
    this.foneInfoUnits = elem.querySelector( '.info_units' );
    this.foneInfoUnits.classList.add( `fone_info_${this.configFirstPlayer.race}` );
    this.iconsSlider = elem.querySelector( '.slides_icons' );
    this.arrowUp = elem.querySelector( '.up_arrow' );
    this.arrowDown = elem.querySelector( '.down_arrow' );
    this.infoInner = elem.querySelector( '.info_inner' );
    // this.descriptionAva = elem.querySelector( '.info_ava' );
    // this.descriptionStart = elem.querySelector( '.info_start' );
    // this.descriptionEnd = elem.querySelector( '.info_end' );
    this.getArrayUnits( this.configFirstPlayer.race );
    

    // fill slider with slides 
    for( let unit of this.listUnits[this.raceUnits] ) {

        let item = createElem( `<li><img src="./img/${unit.portrait}"></li>` );
        item.classList.add( `active_ava_${this.configFirstPlayer.race}` )
        this.iconsSlider.append( item );
        item = createElem( `<li><div><p><img src="./img/${unit.portrait}"></p><p>${unit.name}</p></div>
            <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
        this.infoInner.append( item );

    }
    
    // start settings
    this.position = 1;
    this.arrowUp.style.display = 'none';

    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    // hang handlers on elements
    // const raceArrows = this._elem.querySelector( '.race_arrows' );
    // const firstPlayerConfirm = this._elem.querySelector( '.fplr' );
    // const secondPlayerConfirm = this._elem.querySelector( '.splr' );
    // this.nickFirstPlayer = this._elem.querySelector( '[name="first_player"]' );
    // this.nickSecondPlayer = this._elem.querySelector( '[name="second_player"]' );
    // this.nickFirstPlayer.addEventListener( 'change', this.checkInputFirst );
    // this.nickSecondPlayer.addEventListener( 'change', this.checkInputSecond );
    // this.nickFirstPlayer.addEventListener( 'mouseover', this.giveHint );
    // this.nickFirstPlayer.addEventListener( 'mouseout', this.hideHint );
    // this.nickSecondPlayer.addEventListener( 'mouseover', this.giveHint );
    // this.nickSecondPlayer.addEventListener( 'mouseout', this.hideHint );
    // raceArrows.addEventListener( 'click', this.clicker );
    // firstPlayerConfirm.addEventListener( 'click', this.player1confirm );
    // secondPlayerConfirm.addEventListener( 'click', this.player2confirm ); 

    }

    getArrayUnits( race ) {
        
        this.raceUnits;
        if( race == 'Empire' ) this.raceUnits = 0;
        else if( race == 'Demons' ) this.raceUnits = 1;
        else if( race == 'Elfs' ) this.raceUnits = 2;
        else this.raceUnits = 3;

    }

    get elem() {

        return this._elem;
        
    }

}