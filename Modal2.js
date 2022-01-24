"use strict";

import { createElem, soundsMenu, contentArray } from "./lib.js";
import SetUnitsWin from "./SetUnits.js";

export class ModalWin2 {

    constructor() {

        //вставляем верстку
        const modalWin = createElem( `${contentArray.modalSetUnits}` );

        // вставляем контент в главный контейнер
        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( modalWin );
        this._elem = modalWin;
        
        // вешаем обработчики на элементы
        const closeButton = this._elem.querySelector( '.but_close' );
        const closeIcon = this._elem.querySelector( '.close_icon' );
        closeButton.addEventListener( 'click', this.close );
        closeIcon.addEventListener( 'click', this.close );

    }

    close = () => {

        const audio = new Audio(); // создаем новый аудио элемент
        audio.src = `${soundsMenu.buttonClickEnd}`; 
        audio.autoplay = true;
        
        // При нажатии кнопки Закрыть или иконки крестик модальное окно закрывается и переходим к другому окну
        setTimeout( () => {
            this.mainContainer.innerHTML = '';
            const setWin = new SetUnitsWin();
        }, 100 ); 

    }
    
}