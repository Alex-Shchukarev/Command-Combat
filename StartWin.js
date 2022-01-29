"use strict";

import Race from './Race.js';
import { HelperWin } from './Tutorial.js';
import { createElem, soundsMenu, contentArray } from './lib.js';

export default class StartWindow {

    constructor() {

        //вставляем верстку
        const elem = createElem( `${contentArray.startWin}` );
        this._elem = elem;

        // вешаем обработчики на кнопки
        const startBtn = this._elem.querySelector( '.start' );
        const exitBtn = this._elem.querySelector( '.exit' );
        const helpBtn = this._elem.querySelector( '.help' );
        startBtn.addEventListener( 'click', this.start );
        helpBtn.addEventListener( 'click', this.helper );
        exitBtn.addEventListener( 'click', this.close );

        this.soundMenu = new Audio();
        this.soundMenu.autoplay = true;
        this.mainContainer = document.querySelector( '.main_container' );

    }

    start = () => {

        // запускаем аудио элемента
        this.soundMenu.src = `${soundsMenu.buttonClickStart}`; 
        
        // При нажатии кнопки Start переходим к следующему окну - Выбор расы
        setTimeout( () => {
            this.mainContainer.innerHTML = '';
            const rasa = new Race();
        }, 500 ); 

    }

    helper = () => {

        // запускаем аудио элемента
        this.soundMenu.src = `${soundsMenu.buttonClickStart}`;
        
        // При нажатии кнопки Start переходим к следующему окну - Выбор расы
        setTimeout( () => {
            this.mainContainer.innerHTML = '';
            const tutor = new HelperWin();
        }, 500 ); 

    }

    close = () => {

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