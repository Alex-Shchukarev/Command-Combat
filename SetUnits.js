"use strict";

import { createElem, getConfigArray, unitsList, soundsMenu } from './lib.js';
import CombatWin from './CombatWin.js';

export default class SetUnitsWin {

    constructor() {

        this.unitsList = unitsList;

        // загружаем конфигурации первого и второго игрока из LocalStorage
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );
        jsonconfig = localStorage.getItem( 'configSecondPlayer' );
        this.configSecondPlayer = JSON.parse( jsonconfig );

        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="setunit_content header">
                <div class="header_player1">
                    <div class="phrase">Player 1<br><br>${this.configFirstPlayer.nickname}</div>
                </div>
                <div class="header_nameGame">
                    <div class="name_game">Command Combat</div>
                    <div class="emblem"></div>
                </div>
                <div class="header_player2">
                    <div class="phrase">Player 2<br><br>${this.configSecondPlayer.nickname}</div>
                </div>
            </div>
            <div class="setunit_content field">
                <div class="set_units1">
                    <div class="field_listPlayer1">
                        <ul class="listPlayer1"></ul>
                    </div>
                    <div class="group_player1">
                        <ul class="player1_back"></ul>
                        <ul class="player1_front"></ul>
                    </div>
                </div>
                <div class="set_units2 disabledwin2">
                    <div class="group_player2">
                        <ul class="player2_front"></ul>
                        <ul class="player2_back"></ul>
                    </div>
                    <div class="field_listPlayer2">
                        <ul class="listPlayer2"></ul>
                    </div>
                </div>
            </div>
            <div class="setunit_content footer">
                <div class="field_button_left"></div>
                <div class="field_button_right"></div>
            </div>
        </div>
        </div>` );

        // получаем элемент для вывода спика перого игрока
        this.listPlayer = elem.querySelector( '.listPlayer1' );
        this.configFirstPlayer.raceUnits = getConfigArray( this.configFirstPlayer.race );
        this.configSecondPlayer.raceUnits = getConfigArray( this.configSecondPlayer.race );

        // заполняем информацию об капитане первого игрока
        let item = createElem( `<li data-id=0 class="chooses">
            <div>${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][0]}<br><br>Здоровье<br>
            <span>${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][1]}</span></div>
            <div data-unit=${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][10]}>
            <img src="./img/${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][9]}"></div></li>` );
        this.listPlayer.append( item );

        // заполняем информацию о юнитах первого игрока
        let counter = 1;
        for( let unit of this.configFirstPlayer.command ) {

            let item = createElem( `<li data-id=${counter} class="chooses">
            <div>${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][0]}<br><br>Здоровье<br>
            <span>${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][1]}</span></div>
            <div data-unit=${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][10]}>
            <img src="./img/${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][9]}"></div></li>` );
            this.listPlayer.append( item );
            counter++;

        }

        // создаем поле для расстановки юнитов первому игроку
        this.playerFront = elem.querySelector( '.player1_front' );
        this.playerBack = elem.querySelector( '.player1_back' );
        this.groupPlayer1 = elem.querySelector( '.group_player1' );
        this.groupPlayer1.classList.add( `${this.configFirstPlayer.race}_field` );

        for( let i = 1; i < 4; i++ ) {
            let item = createElem( `<li data-id="b1${i}" class="droppable"></li>`);
            this.playerBack.append( item );
        }
        for( let i = 1; i < 4; i++ ) {
            let item = createElem( `<li data-id="f1${i}" class="droppable"></li>`);
            this.playerFront.append( item );
        }

        this.footer = elem.querySelector( '.field_button_left' );
        this.counter = 0;
        this.command = [];

        // добавляем верстку в главный контейнер
        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;

        // вешаем обработчик на список первого игрока
        this.listPlayer.ondragstart = function() { return false; }; // отключаем браузерный механизм drag and drop
        this.listPlayer.addEventListener( 'pointerdown', this.onPointerDown );

    }

    onPointerDown = (event) => {

        // отменяем действие браузера по умолчанию
        event.preventDefault();
        let target = event.target;
        if( !target.closest( '.chooses' ) ) return; // проверка на соответствие содержимого и нужных узлов
        this.iconUnit = target.cloneNode(); // клонируем узел
        this.idUnit = target.closest( '[data-unit]' ).dataset.unit;
        this.containerIcon = target.closest( '.chooses' );
        // устанавливаем позиционирование чтобы клон "парил" над документом
        this.iconUnit.style.position = 'absolute';
        this.iconUnit.style.zIndex = 500;
        // немного смещаем клон чтобы было видно что он захвачен
        this.iconUnit.style.left = event.pageX - this.iconUnit.offsetWidth / 10 + 'px';
        this.iconUnit.style.top = event.pageY - this.iconUnit.offsetHeight / 10 + 'px';
        document.body.append( this.iconUnit );
        this.currentDroppable = null; // устанавливаем потенциальную цель переноса над которой находимся сейчас 
        
        //вешаем обработчики - на документ, чтобы цель не логала и на клон 
        document.addEventListener( 'pointermove', this.onPointerMove );
        this.iconUnit.addEventListener( 'pointerup', this.onPointerUp );

    }

    onPointerMove = ( event ) => {

        event.preventDefault();
        let target = event.target;
        
        // получаем координаты курсора и устанавливаем их для цели(клона)
        function moveElement( pageX, pageY ) {
            target.style.left = pageX - target.offsetWidth / 2 + 'px';
            target.style.top = pageY - target.offsetHeight / 2 + 'px';
        }
        moveElement( event.pageX, event.pageY );
        
        // постоянно проверяем над каким элементом сейчас находится курсор
        target.hidden = true;
        let elemBelow = document.elementFromPoint( event.clientX, event.clientY );
        target.hidden = false;
        
        // если clientX/clientY за пределами окна, elementFromPoint return null
        if (!elemBelow) return;

        // проверяем потенциальная цель имеет класс "droppable"
        let droppableBelow = elemBelow.closest( '.droppable' );
        
        if ( this.currentDroppable != droppableBelow ) {

            // покидаем потенциальную цель
            if ( this.currentDroppable ) {
                this.leaveDroppable( this.currentDroppable );
            }

            this.currentDroppable = droppableBelow;
        
            // заходим на потенциальную цель
            if ( this.currentDroppable ) {
                this.enterDroppable( this.currentDroppable );
            }

        }

    }

    onPointerUp = ( event ) => {
        
        let target = event.target;

        // если клон покинул потенциальную цель, то удаляем все(клон, обработчики итд.)
        if( this.currentDroppable === null ) {
            target.remove();
            document.removeEventListener( 'pointermove', this.onPointerMove );
            this.iconUnit.removeEventListener( 'pointerup', this.onPointerUp );
            this.iconUnit.remove();
        }
        else if( this.currentDroppable.closest( '.droppable' ) ) {
            // вставляем звук установки иконки
            const audio = new Audio();
            audio.src = `${soundsMenu.hireSetUnit}`; 
            audio.autoplay = true;

            target.removeAttribute( 'style' ); // удаляем позиционирование у цели
            this.currentDroppable.insertAdjacentHTML( 'beforeend', `${target.outerHTML}` ); 
            this.currentDroppable.classList.remove( 'droppable' );
            this.currentDroppable.setAttribute( 'data-idunit', this.idUnit );
            this.containerIcon.classList.remove( 'chooses' );
            
            this.currentDroppable = null;
            document.removeEventListener( 'pointermove', this.onPointerMove );
            this.iconUnit.removeEventListener( 'pointerup', this.onPointerUp );
            this.iconUnit.remove();

            // проверяем все ли юниты расставлены
            if( this.checkSet() ) { // отображаем кнопку для сохранения расстановки
                this.footer.insertAdjacentHTML( 'beforeend', '<a href="#" class="btn_op center_plase">СОХРАНИТЬ</a>' );
                this.counter += 1;
                this.footer.querySelector( 'a' ).addEventListener( 'click', this.saveSetUnions );
            }
        } 
        
    }

    // запоминаем расстановку команды для каждого игрока
    saveSetUnions = () => {

        // добавляем звук нажатия кнопки сохранения
        const audio = new Audio();
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true;

        // проверяем какому игроку нужно сохранить расстановку
        if( this.counter == 1 ) {

            this.playerBack = this.playerBack.querySelectorAll( 'li' );
            this.playerFront = this.playerFront.querySelectorAll( 'li' );

            for( let element of this.playerBack ) {
                if( element.classList.contains( 'droppable_active' ) ) {
                    this.command.push( { position: element.dataset.id, unit: element.dataset.idunit } );
                }
            }

            for( let element of this.playerFront ) {
                if( element.classList.contains( 'droppable_active' ) ) {
                    this.command.push( { position: element.dataset.id, unit: element.dataset.idunit } );
                }
            }

            // сохраняем конфигурацию расстановки для первого игрока
            const firstPlayerConfig = {

                race: this.configFirstPlayer.race,
                nickname: this.configFirstPlayer.nickname,
                command: [...this.command]

            };

            // добавляем конфигурацию первого игрока в LocalStorage
            let jsonconfig = JSON.stringify( firstPlayerConfig );
            localStorage.setItem( 'configFirstPlayer', jsonconfig );

            // переходим ко второму игроку
            this.setPlayer1 = this._elem.querySelector( '.set_units1' );
            this.setPlayer1.innerHTML = '';
            this.setPlayer1.classList.add( 'disabledwin1' );

            this.setPlayer2 = this._elem.querySelector( '.set_units2' );
            this.setPlayer2.classList.remove( 'disabledwin2' );

            // находим элемент списка второго игрока
            this.listPlayer = this._elem.querySelector( '.listPlayer2' );

            // заполняем информацию о капитане второго игрока
            let item = createElem( `<li data-id=0 class="chooses">
            <div data-unit=${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][10]}>
            <img src="./img/${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][9]}"></div>
            <div>${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][0]}<br><br>Здоровье<br>
            <span>${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][1]}</span></div></li>` );
            this.listPlayer.append( item );

            // заполняем информацию о юнитах второго игрока
            let counter = 1;
            for( let unit of this.configSecondPlayer.command ) {

            let item = createElem( `<li data-id=${counter} class="chooses">
            <div data-unit=${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][10]}>
            <img src="./img/${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][9]}"></div>
            <div>${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][0]}<br><br>Здоровье<br>
            <span>${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][1]}</span></div></li>` );
            this.listPlayer.append( item );
            counter++;

            }

            // создаем поле для расстановки юнитов второму игроку
            this.playerFront = this._elem.querySelector( '.player2_front' );
            this.playerBack = this._elem.querySelector( '.player2_back' );
            this.groupPlayer2 = this._elem.querySelector( '.group_player2' );
            this.groupPlayer2.classList.add( `${this.configSecondPlayer.race}_field` );

            for( let i = 1; i < 4; i++ ) {
                let item = createElem( `<li data-id="b2${i}" class="droppable"></li>`);
                this.playerBack.append( item );
            }
            for( let i = 1; i < 4; i++ ) {
                let item = createElem( `<li data-id="f2${i}" class="droppable"></li>`);
                this.playerFront.append( item );
            }

            this.footer.innerHTML = '';
            this.footer = this._elem.querySelector( '.field_button_right' );
            this.command = [];

            // вешаем обработчик на элемент второму игроку
            this.listPlayer.ondragstart = function() { return false; }; // отключаем браузерный механизм drag and drop
            this.listPlayer.addEventListener( 'pointerdown', this.onPointerDown );

        } else if( this.counter == 2 ) { 

            this.playerBack = this.playerBack.querySelectorAll( 'li' );
            this.playerFront = this.playerFront.querySelectorAll( 'li' );

            for( let element of this.playerBack ) {
                if( element.classList.contains( 'droppable_active' ) ) {
                    this.command.push( { position: element.dataset.id, unit: element.dataset.idunit } );
                }
            }

            for( let element of this.playerFront ) {
                if( element.classList.contains( 'droppable_active' ) ) {
                    this.command.push( { position: element.dataset.id, unit: element.dataset.idunit } );
                }
            }

            // сохраняем конфигурацию расстановки юнитов второго игрока
            const secondPlayerConfig = {

                race: this.configSecondPlayer.race,
                nickname: this.configSecondPlayer.nickname,
                command: [...this.command]

            };

            let jsonconfig = JSON.stringify( secondPlayerConfig );
            localStorage.setItem( 'configSecondPlayer', jsonconfig );

            // очищаем главный контейнер и переходим к следующему окну
            this.mainContainer.innerHTML = '';
            const combat = new CombatWin();

        }

    }

    // при покидании слота для найма убираем подсветку
    leaveDroppable = ( elem ) => {

        elem.classList.remove( 'droppable_active' );

    }

    // при заходе на слот найма подсвечиваем его
    enterDroppable = ( elem ) => {

        elem.classList.add( 'droppable_active' );

    }

    // проверка запонения слотов для найма
    checkSet = () => {

        let marker = true;
        let slot = this.listPlayer.querySelectorAll( 'li' );
        for( let element of slot ) {

            if( !element.classList.contains( 'chooses' ) ) continue;
            else marker = false;

        }

        return marker;

    }


    get elem() {

        return this._elem;
        
    }

}


