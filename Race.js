"use strict";

import CaptainsWindow from './captain.js';
import { createElem, races } from './lib.js';


export default class SecondWin {

    constructor() {

        this.races = races;
        const elem = createElem( `<div class="race big_container">
        <div class="first_player">
            <div class="modal_pl1"></div>
            <div class="name fpl">
                <div class="pl1 phrase">Player 1</div>
                <input type="text" class="input_name plf" name="first_player" placeholder="Artur_1">
            </div>
            <div class="race_description plr1">
                <div class="map left"></div>
            </div>
            <div class="choose fplr">
                <a href="#" class="btn_op">Confirm</a>
            </div>
        </div>
        <div class="race_menu">
            <div class="races">
                <div class="name_game">Command Combat</div>
                <div class="emblem"></div>
            </div>
            <div class="race_inner"></div>
            <div class="race_arrows">
                <div class="race_arrow_left">
                    <img src="./img/arrow_left.png" alt="icon_arrow_left">
                </div>
                <div class="race_choose phrase">choose race</div>
                <div class="race_arrow_right">
                    <img src="./img/arrow_right.png" alt="icon_arrow_right">
                </div>
            </div>
        </div>
        <div class="second_player">
            <div class="modal_pl2 disabled_pl2"></div>
            <div class="name spl">
                <div class="pl2 phrase">Player 2</div>
                <input type="text" class="input_name pls" name="second_player" placeholder="Lancelot_5">
            </div>
            <div class="race_description plr2">
                <div class="map right"></div>
            </div>
            <div class="choose splr">
                <a href="#" class="btn_op">Confirm</a>
            </div>
        </div>
    </div>` );
    
    this.inner = elem.querySelector( '.race_inner' );
    this.raceDescriptionLeft = elem.querySelector( '.left' );
    this.raceDescriptionRight = elem.querySelector( '.right' );
    
    // fill slider with slides 
    for( let race of this.races ) {
        let leftRaceDescription = createElem( `<div class="description_text">${race.description}</div>` );
        let rightRaceDescription = createElem( `<div class="description_text">${race.description}</div>` );
        let raceSlide = createElem( `<div class="race_slide" data-id="${race.id}">
        <img src="./img/${race.image}" class="race_img" alt="slide">
        <div class="race_name phrase">${race.name}</div>
        </div>` );
        this.raceDescriptionLeft.append( leftRaceDescription );
        this.raceDescriptionRight.append( rightRaceDescription );
        this.inner.append( raceSlide );
    }

    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    // start settings
    this.arrowLeft = this._elem.querySelector( '.race_arrow_left' );
    this.arrowRight = this._elem.querySelector( '.race_arrow_right' );
    this.arrowLeft.style.display = 'none';
    this.position = 1;
    this.raceSlides = this._elem.querySelectorAll( '.race_slide ');
    this.raceSlides[0].classList.add( 'active_race' );

    // hang handlers on elements
    const raceArrows = this._elem.querySelector( '.race_arrows' );
    const firstPlayerConfirm = this._elem.querySelector( '.fplr' );
    const secondPlayerConfirm = this._elem.querySelector( '.splr' );
    this.nickFirstPlayer = this._elem.querySelector( '[name="first_player"]' );
    this.nickSecondPlayer = this._elem.querySelector( '[name="second_player"]' );
    this.nickFirstPlayer.addEventListener( 'change', this.checkInputFirst );
    this.nickSecondPlayer.addEventListener( 'change', this.checkInputSecond );
    this.nickFirstPlayer.addEventListener( 'mouseover', this.giveHint );
    this.nickFirstPlayer.addEventListener( 'mouseout', this.hideHint );
    this.nickSecondPlayer.addEventListener( 'mouseover', this.giveHint );
    this.nickSecondPlayer.addEventListener( 'mouseout', this.hideHint );
    raceArrows.addEventListener( 'click', this.clicker );
    firstPlayerConfirm.addEventListener( 'click', this.player1confirm );
    secondPlayerConfirm.addEventListener( 'click', this.player2confirm ); 
    
    }

    giveHint = ( event ) => {

        let target = event.target;
        const tooltip = document.createElement( 'div' );
        tooltip.className = 'tooltip';
        tooltip.innerHTML = 'Enter nickname in format: -from 5 characters to 14, -latin, numbers and _';

        tooltip.style.left = target.getBoundingClientRect().left + 'px';
        tooltip.style.top = target.getBoundingClientRect().bottom + 5 + 'px';
        document.body.append( tooltip );

    }

    hideHint = () => {

        let tooltip = document.querySelector( '.tooltip' );    
        tooltip.remove();

    }

    checkInputFirst = ( event ) => {
        
        const target = event.target;
        const res = /[a-zA-Z0-9_]{5,14}/.test( this.nickFirstPlayer.value );
        if( !res ) {

            const mistake = document.createElement( 'div' );
            mistake.className = 'tooltip_mistake';
            mistake.innerHTML = 'incorrect format';
            mistake.style.left = target.getBoundingClientRect().right + 5 + 'px';
            mistake.style.top = target.getBoundingClientRect().top + 'px';
            document.body.append( mistake );
            setTimeout( () => { 
                this.nickFirstPlayer.value = ''; 
                mistake.remove(); }, 1000 
                );
            
        }
    
    }

    checkInputSecond = ( event ) => {
        
        const target = event.target;
        const res = /[a-zA-Z0-9_]{5,14}/.test( this.nickSecondPlayer.value );
        if( !res ) {

            const mistake = document.createElement( 'div' );
            mistake.className = 'tooltip_mistake';
            mistake.innerHTML = 'incorrect format';
            mistake.style.left = target.getBoundingClientRect().left - 170 + 'px';
            mistake.style.top = target.getBoundingClientRect().top + 'px';
            document.body.append( mistake );
            setTimeout( () => { 
                this.nickSecondPlayer.value = ''; 
                mistake.remove(); }, 1000 
                );
            
        }
    
    }

    // arrows switch method
    clicker = ( event ) => {

        let target = event.target;

        // get sizes of containers for description and slide
        const stepX = this.inner.offsetWidth;
        const stepY = this.raceDescriptionLeft.offsetHeight;
            
        if( target.closest( '.race_arrow_right' ) ) {
            this.inner.style.transform = `translateX(-${stepX*this.position}px)`;
            this.raceDescriptionLeft.style.transform = `translateY(-${stepY*this.position}px)`;
            this.raceDescriptionRight.style.transform = `translateY(-${stepY*this.position}px)`;
            this.position += 1;
        }
            
        if( target.closest( '.race_arrow_left' ) ) {
            this.inner.style.transform = `translateX(-${stepX*(this.position-2)}px)`;
            this.raceDescriptionLeft.style.transform = `translateY(-${stepY*(this.position-2)}px)`;
            this.raceDescriptionRight.style.transform = `translateY(-${stepY*(this.position-2)}px)`;
            this.position -= 1;
        }
        
        switch ( this.position ) {
            case 1:
            this.arrowLeft.style.display = 'none';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[0].classList.add( 'active_race' );
            break;
                
            case 2:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[1].classList.add( 'active_race' );
            break;

            case 3:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[2].classList.add( 'active_race' );
            break;
            
            case 4:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = 'none';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[3].classList.add( 'active_race' );
            break;
        }
        
    }

    player1confirm = () => {

        // switcher of modal window between players 
        const modalPl1 = this._elem.querySelector( '.modal_pl1' );
        const modalPl2 = this._elem.querySelector( '.modal_pl2' );
        modalPl2.classList.remove( 'disabled_pl2' );
        modalPl1.classList.add( 'disabled_pl1' );
        const activeRace = this._elem.querySelector( '.active_race' );
        
        const configFirstPlayer = {
            nickname: this.nickFirstPlayer.value,
            race: activeRace.dataset.id
        };
        let jsonconfig = JSON.stringify( configFirstPlayer );
        localStorage.setItem( 'configFirstPlayer', jsonconfig );

    }

    player2confirm = () => {

        const activeRace = this._elem.querySelector( '.active_race' );
        const configSecondPlayer = {
            nickname: this.nickSecondPlayer.value,
            race: activeRace.dataset.id
        };
        const jsonconfig = JSON.stringify( configSecondPlayer );
        localStorage.setItem( 'configSecondPlayer', jsonconfig );

        this.mainContainer.innerHTML = '';
        const captainsPlayers = new CaptainsWindow();

    }

    get elem() {

        return this._elem;
        
    }

}