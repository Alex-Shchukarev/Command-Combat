"use strict";

import Race from './Race.js';
import { createElem, soundsMenu } from './lib.js';

export default class StartWindow {

    constructor() {

        const elem = createElem( `<div class="start_container">
            <div><div class="name_game">Command Combat</div>
            <div class="emblem"></div></div>   
            <div class="prologue">
                <div class="pro_img"></div>
                    <p>For many centuries, the four Great Races have been fighting for power and land. Most of the 
                    regions are populated by apostates who are waiting for the strongest race to come to power. An 
                    exciting, turn-based strategy 'Command Combat' will allow you to plunge into the world of fantasy 
                    and adventure. Each race is fighting for the right to lead the standings. Who will you help?
                    May be a valiant Empire either noble Elves or violent Demons or risen Deads, choose and fight!</p>
            </div>
            <ul class="menu">
                <li class="start">
                    <a href="#" class="btn_op">Start Game</a>
                </li>
                <li class="exit">
                    <a href="#" class="btn_op">Exit</a>
                </li>
            </ul>
            <div class="useful_link">
                <div class="git">
                    <a href="https://github.com/Alex-Shchukarev/JSlearn/tree/master/project"></a>
                </div>
                <p>v. 1.0</p>
                <p>Shukarev A.A.</p>
            </div>
        </div>` );

        this._elem = elem;
        const startBtn = this._elem.querySelector( '.start' );
        const exitBtn = this._elem.querySelector( '.exit' );
        startBtn.addEventListener( 'click', this.start );
        exitBtn.addEventListener( 'click', this.close );

    }

    start = () => {

        const audio = new Audio(); // create new audio element
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true;

        const mainContainer = document.querySelector( '.main_container' );
        
        setTimeout( () => {
            mainContainer.innerHTML = '';
            const rasa = new Race();
        }, 600 ); 

    }

    close = () => {

        const audio = new Audio(); // create new audio element
        audio.src = `${soundsMenu.buttonClickEnd}`; 
        audio.autoplay = true;

        setTimeout( () => {
            document.body.innerHTML = '';
        }, 600 );
        

    }

    get elem() {

        return this._elem;

    }

}