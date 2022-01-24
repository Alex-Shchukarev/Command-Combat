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

    }

    start = () => {

        const audio = new Audio(); // создаем новый аудио элемент
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true;

        const mainContainer = document.querySelector( '.main_container' );
        
        // При нажатии кнопки Start переходим к следующему окну - Выбор расы
        setTimeout( () => {
            mainContainer.innerHTML = '';
            const rasa = new Race();
        }, 500 ); 

    }

    close = () => {

        const audio = new Audio(); // создаем новый аудиоэлемент
        audio.src = `${soundsMenu.buttonClickEnd}`; 
        audio.autoplay = true;

        // При нажатии кнопки Exit очищаем страницу
        setTimeout( () => {
            document.body.innerHTML = '';
        }, 500 );
        

    }

    get elem() {

        return this._elem;

    }

}