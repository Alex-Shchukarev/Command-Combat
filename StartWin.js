"use strict";

import Race from './Race.js';
import { createElem, soundsMenu, contentArray } from './lib.js';

export default class StartWindow {

    constructor() {

        //вставляем верстку
        const elem = createElem( `${contentArray.startWin}` );
        this._elem = elem;

        // вешаем обработчики на кнопки
        const startBtn = this._elem.querySelector( '.start' );
        const exitBtn = this._elem.querySelector( '.exit' );
        startBtn.addEventListener( 'click', this.start );
        exitBtn.addEventListener( 'click', this.close );

        this.soundMenu = new Audio();
        this.soundMenu.autoplay = true;

    }

    start = () => {

        // запускаем аудио элемента
        this.soundMenu.src = `${soundsMenu.buttonClickStart}`; 

        const mainContainer = document.querySelector( '.main_container' );
        
        // При нажатии кнопки Start переходим к следующему окну - Выбор расы
        setTimeout( () => {
            mainContainer.innerHTML = '';
            const rasa = new Race();
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