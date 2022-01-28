"use strict";

import { createElem, soundsMenu } from "./lib.js";
import SecondWin from "./Race.js";

export class FinalWindow {

    constructor() {

        let elem = createElem( `<div class="big_container">
        <div class="container">
          <div class="finish_window">
            <div class="name_game">Command Combat</div><div class="emblem"></div>
            <ul class="menu_final">
              <li class="start_newgame"><a href="#" class="btn_op">НОВАЯ ИГРА</a></li>
              <li class="exit_game"><a href="#" class="btn_op">ВЫХОД</a></li></ul>
          </div>
          
          </div>
        </div>` );

        // добавляем верстку в главный контейнер
        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;
        const buttonFinish = this._elem.querySelector( '.exit_game' );
        const buttonRenew = this._elem.querySelector( '.start_newgame' );
        buttonFinish.addEventListener( 'click', this.endGame );
        buttonRenew.addEventListener( 'click', this.newGame );

        this.soundMenu = new Audio();
        this.soundMenu.autoplay = true;

    }

    newGame = () => {

        // запускаем аудио элемента
        this.soundMenu.src = `${soundsMenu.buttonClickStart}`;
        
        // При нажатии кнопки переходим к следующему окну - Стартовое окно
        setTimeout( () => {
            this.mainContainer.innerHTML = '';
            const newGame = new SecondWin();
        }, 500 ); 

    }

    endGame = () => {

        // запускаем аудио элемента
        this.soundMenu.src = `${soundsMenu.buttonClickEnd}`;

        // При нажатии кнопки Exit очищаем страницу
        setTimeout( () => {
            document.body.innerHTML = '';
        }, 500 );
        

    }

    get elem() {

        return this._elem;

    }

}