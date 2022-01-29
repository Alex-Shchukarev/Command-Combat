"use strict";

import { createElem, soundsMenu, contentArray } from "./lib.js";
import StartWindow from "./StartWin.js";

export class HelperWin {

    constructor() {

        //вставляем верстку
        const helpWin = createElem( `${contentArray.helper[0]}` );

        // вставляем контент в главный контейнер
        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( helpWin );
        this._elem = helpWin;

        // добавляем музыкальное сопровождение
        this.soundMenu = new Audio();
        this.soundMenu.autoplay = true;
        
        this.contentStep = this._elem.querySelector( '.stepper_content' ); // получаем блок для вставки контента шагов
        let defaultStep = createElem( `${contentArray.helper[1]}` );
        this.contentStep.append( defaultStep );
        // вешаем обработчики на элементы
        const stepsButtons = this._elem.querySelector( '.steps_inner' );
        const returnButton = this._elem.querySelector( '.footer_inner' );
        stepsButtons.addEventListener( 'click', this.chooseStep );
        returnButton.addEventListener( 'click', this.close );

    }

    close = () => {

        // создаем новый аудио элемент
        this.soundMenu.src = `${soundsMenu.buttonClickEnd}`;
        
        // При нажатии кнопки Назад возвращаемся к стартовому окну
        setTimeout( () => {

            const startWin = new StartWindow();
            this.mainContainer.innerHTML = "";
            this.mainContainer.append( startWin.elem );
            
        }, 500 ); 

    }

    chooseStep = ( event ) => {

        let target = event.target;
        if( !target.matches( 'li[data-id]' ) ) return; //

        // создаем новый аудио элемент
        this.soundMenu.src = `${soundsMenu.arrowClick}`;
        let contentofStep; // наполняем соответствующим контентом слайдер при клике по ячейкам меню 
        if( target.dataset.id === '1' ) {

            this.contentStep.innerHTML = '';
            contentofStep = createElem( `${contentArray.helper[1]}` );
            this.contentStep.append( contentofStep );

        } else if( target.dataset.id === '2' ) {

            this.contentStep.innerHTML = '';
            contentofStep = createElem( `${contentArray.helper[2]}` );
            this.contentStep.append( contentofStep );

        } else if( target.dataset.id === '3' ) {

            this.contentStep.innerHTML = '';
            contentofStep = createElem( `${contentArray.helper[3]}` );
            this.contentStep.append( contentofStep );

        } else if( target.dataset.id === '4' ) {

            this.contentStep.innerHTML = '';
            contentofStep = createElem( `${contentArray.helper[4]}` );
            this.contentStep.append( contentofStep );

        } else if( target.dataset.id === '5' ) {

            this.contentStep.innerHTML = '';
            contentofStep = createElem( `${contentArray.helper[5]}` );
            this.contentStep.append( contentofStep );

        } else { return; }

    }

    get elem() {

        return this._elem;

    }
    
}