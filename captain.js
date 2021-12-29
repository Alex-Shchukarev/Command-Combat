"use strict";

import { createElem } from './lib.js';
import HireWindow from './HireWin.js';

export default class CaptainsWindow {

    constructor() {

        // load information about the first player
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );

        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="captain header">
                <div class="captain_header title">
                    <div class="name_marker phrase">Captain Menu</div>
                </div>
                <div class="captain_header logo">
                    <div class="promo">
                        <div class="name_game">Command Combat</div>
                        <div class="emblem"></div>
                    </div>
                </div>
                <div class="captain_header column"></div>
            </div>
            <div class="captain content">
                <div class="captain_content players_list">
                    <div class="captain_content_list firstplayer_list">
                        <div class="modal_pl1"></div>
                        <div class="player1_list_content">
                            <ul>
                                <li class="phrase">Player 1</li>
                                <li class="phrase"></li>
                                <li class="phrase"></li>
                            </ul>
                            <div class="button_list_fp">
                                <a href="#" class="btn_op">OK</a>
                            </div>
                        </div>
                    </div>
                    <div class="captain_content_list secondplayer_list">
                        <div class="modal_pl2 disabled_player2_list"></div>
                        <div class="player2_list_content">
                            <ul>
                                <li class="phrase">Player 2</li>
                                <li class="phrase"></li>
                                <li class="phrase"></li>
                            </ul>
                            <div class="button_list_sp">
                                <a href="#" class="btn_op">OK</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="captain_content captain_inform">
                    <div class="captain_info name_inform">
                        <p></p>
                    </div>
                    <div class="captain_info avatar_inform">
                        <div class="ava_captain"></div>
                        <ul class="name_characteristics">
                            <li>Race</li>
                            <li>Health</li>
                            <li>Initiative</li>
                            <li>Damage</li>
                            <li>Magical damage</li>
                            <li>Armor</li>
                            <li>Magical defense</li>
                        </ul>
                        <ul class="value_characteristics"></ul>
                    </div>
                    <div class="captain_info description_inform">
                        <p></p>
                    </div>
                </div>
                <div class="captain_content captain_list">
                    <ul></ul>
                </div>
            </div>
            <div class="captain footer"></div>
        </div>
        </div>` );

        // fill information about first player
        this.listFirstPlayer = elem.querySelector( '.player1_list_content' );
        const ulFirstPlayer = this.listFirstPlayer.querySelectorAll( 'li' );
        ulFirstPlayer[1].innerHTML = this.configFirstPlayer.nickname;
        ulFirstPlayer[2].innerHTML = this.configFirstPlayer.race;

        // fill information about captains of first player race
        jsonconfig = localStorage.getItem( `${this.configFirstPlayer.race}` );
        this.listCaptainsPlayer = JSON.parse( jsonconfig );
        
        this.listCaptains = elem.querySelector( '.captain_list ul' );
        for( let item of this.listCaptainsPlayer ) {

            let ava = createElem( `<li data-id="${item.id}"><img src="./img/${item.avatar}"></li>` );
            this.listCaptains.append( ava );

        }

        // activate lightness
        this.setLightness( this.configFirstPlayer.race );

        this.listCaptain = this.listCaptains.querySelectorAll( 'li' );
        this.nameCaptain = elem.querySelector( '.name_inform p' );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[0].name;
        this.portraitCaptain = elem.querySelector( '.ava_captain' );
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[0].portrait}">`;
        this.listCharacteristics = elem.querySelector( '.value_characteristics' );
        for( let item of this.listCaptainsPlayer[0].characteristics ) {

            let charact = createElem( `<li>${item}</li>` );
            this.listCharacteristics.append( charact );

        }
        this.listCharacteristics = this.listCharacteristics.querySelectorAll( 'li' );
        this.captainDescription = elem.querySelector( '.description_inform p' );
        this.captainDescription.innerHTML = this.listCaptainsPlayer[0].description;

        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;
        
        // hang handlers on the elements
        this.listCaptains.addEventListener( 'click', this.chooseCaptain );
        this.firstPlayerButton = this._elem.querySelector( '.button_list_fp' );
        this.secondPlayerButton = this._elem.querySelector( '.button_list_sp' );
        this.firstPlayerButton.addEventListener( 'click', this.player1Captain );
        this.secondPlayerButton.addEventListener( 'click', this.player2Captain );

    }

    chooseCaptain = ( event ) => {
        
        const target = event.target;
        let indeks;
        
        if( target.closest( '[data-id="1"]' ) ) indeks = 0;
        else if( target.closest( '[data-id="2"]' ) ) indeks = 1;
        else if( target.closest( '[data-id="3"]' ) ) indeks = 2;

        for( let ava of this.listCaptain ) ava.classList.remove( this.thumb );
        this.listCaptain[indeks].classList.add( this.thumb );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[indeks].name;
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[indeks].portrait}">`;
        for( let i = 0; i < this.listCharacteristics.length; i++ ) {

            this.listCharacteristics[i].innerHTML = this.listCaptainsPlayer[indeks].characteristics[i];
            
        }
        
        this.captainDescription.innerHTML = this.listCaptainsPlayer[indeks].description;

    }

    player1Captain = () => {

        // save config the first player
        const firstPlayerConfig = {

            race: this.configFirstPlayer.race,
            nickname: this.configFirstPlayer.nickname,
            captain: this.nameCaptain.innerHTML

        };

        let jsonconfig = JSON.stringify( firstPlayerConfig );
        localStorage.setItem( 'configFirstPlayer', jsonconfig );

        // load information about the second player
        jsonconfig = localStorage.getItem( 'configSecondPlayer' );
        this.configSecondPlayer = JSON.parse( jsonconfig );

        // change window players
        const modalPl1 = this._elem.querySelector( '.modal_pl1' );
        modalPl1.classList.add( 'disabled_player1_list' );
        this.listFirstPlayer.style.display = 'none';
        this.listSecondPlayer = this._elem.querySelector( '.player2_list_content' );
        this.listSecondPlayer.classList.remove( 'player2_list_content' );
        const player2list = this._elem.querySelector( '.modal_pl2' );
        player2list.classList.remove( 'disabled_player2_list' );

        // fill information about second player
        const ulSecondPlayer = this.listSecondPlayer.querySelectorAll( 'li' );
        ulSecondPlayer[1].innerHTML = this.configSecondPlayer.nickname;
        ulSecondPlayer[2].innerHTML = this.configSecondPlayer.race;
        
        // fill information about captains of second player race
        jsonconfig = localStorage.getItem( `${this.configSecondPlayer.race}` );
        this.listCaptainsPlayer = JSON.parse( jsonconfig );
        this.listCaptains = this._elem.querySelector( '.captain_list ul' );
        this.listCaptains.innerHTML = '';
        for( let item of this.listCaptainsPlayer ) {

            let ava = createElem( `<li data-id="${item.id}"><img src="./img/${item.avatar}"></li>` );
            this.listCaptains.append( ava );

        }
        
        // activate lightness
        this.setLightness( this.configSecondPlayer.race );

        this.listCaptain = this.listCaptains.querySelectorAll( 'li' );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[0].name;
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[0].portrait}">`;
        this.listCharacteristics = this._elem.querySelector( '.value_characteristics' );
        this.listCharacteristics.innerHTML = '';
        for( let item of this.listCaptainsPlayer[0].characteristics ) {

            let charact = createElem( `<li>${item}</li>` );
            this.listCharacteristics.append( charact );

        }

        this.listCharacteristics = this.listCharacteristics.querySelectorAll( 'li' );
        this.captainDescription.innerHTML = this.listCaptainsPlayer[0].description;

    }

    player2Captain = () => {

        // save config the second player
        const secondPlayerConfig = {

            race: this.configSecondPlayer.race,
            nickname: this.configSecondPlayer.nickname,
            captain: this.nameCaptain.innerHTML

        };

        let jsonconfig = JSON.stringify( secondPlayerConfig );
        localStorage.setItem( 'configSecondPlayer', jsonconfig );

        this.mainContainer.innerHTML = '';
        const hireUnits = new HireWindow();

    }

    setLightness( race ) {
        
        this.listCaptains.firstChild.classList.add( `active_ava_${race}` );
        this.thumb = `active_ava_${race}`;

    }

    get elem() {

        return this._elem;
        
    }
    
}