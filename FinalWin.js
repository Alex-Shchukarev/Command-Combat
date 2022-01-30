"use strict";

import { contentArray, createElem, soundsMenu } from "./lib.js";
import StartWindow from "./StartWin.js";

export class FinalWindow {

    constructor() {

        let elem = createElem( `${contentArray.finalNobody}` );

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
            
            const startWin = new StartWindow();
            this.mainContainer.innerHTML = "";
            this.mainContainer.append( startWin.elem );

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