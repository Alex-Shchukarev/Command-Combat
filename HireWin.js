"use strict";

import { ModalWin2 } from './Modal2.js';
import { createElem, contentArray, listUnits, soundsMenu, musicHireWindow } from './lib.js';

export default class HireWindow {

    constructor() {

        // загружаем конфигурацию первого игрока
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );

        this.listUnits = listUnits;
        //вставляем верстку
        const elem = createElem( `${contentArray.hireWin}` );

    // загружаем подложки для первого игрока
    this.foneSlotUnits = elem.querySelector( '.slot_units' );
    this.foneSlotUnits.classList.add( `fone_slots_${this.configFirstPlayer.race}` );
    this.foneInfoUnits = elem.querySelector( '.info_units' );
    this.foneInfoUnits.classList.add( `fone_info_${this.configFirstPlayer.race}` );

    // находим стрелки и слайдеры
    this.iconsSlider = elem.querySelector( '.slides_icons' );
    this.arrowUp = elem.querySelector( '.up_arrow' );
    this.arrowDown = elem.querySelector( '.down_arrow' );
    this.infosInner = elem.querySelector( '.info_inner' );
    this.slotsForIcon = elem.querySelector( '.slots_for_icons' ).querySelectorAll( 'li' );
    this.footer = elem.querySelector( '.footer_slots' );
    this.command = [];
    this.counter = 0;

    // получаем расу первого игрока для загрузки массива юнитов и музыки
    this.getArrayUnits( this.configFirstPlayer.race );
    this.soundsHire = new Audio();
    this.soundsHire.autoplay = true;
    this.musicHire = new Audio();
    this.musicHire.autoplay = true;
    this.musicHire.src = `${musicHireWindow[this.raceUnits]}`;

    // заполняем слайдеры слайдами 
    for( let unit of this.listUnits[this.raceUnits] ) {

        let item = createElem( `<li data-id="${unit.id}" class="choose"><img src="./img/${unit.portrait}"></li>` );
        item.classList.add( `active_ava_${this.configFirstPlayer.race}` )
        this.iconsSlider.append( item );
        item = createElem( `<li><div><br><br><br><p>${unit.name}</p></div>
            <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
        this.infosInner.append( item );

    }
    
    // устанавливаем стартовые настройки для слайдеров
    this.position = 1;
    this.arrowUp.style.display = 'none';

    // добавляем весь контент в главный контейнер
    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    this.modalHint = this._elem.querySelector( '.modal_hint' );

    // вешаем обработчики на элементы
    this.hireContent = this._elem.querySelector( '.recruiting' );
    this.iconSlider = this.iconsSlider.querySelectorAll( 'li' );
    this.infoInner = this.infosInner.querySelectorAll( 'li' );
    this.hireContent.addEventListener( 'click', this.clicker );
    this.iconsSlider.ondragstart = function() { return false; }; // отключаем браузерный механизм drag and drop
    this.iconsSlider.addEventListener( 'pointerdown', this.onPointerDown );

    }

    // сопоставляем расу игрока и юнитов
    getArrayUnits = ( race ) => {
        
        if( race == 'Empire' ) this.raceUnits = 0;
        else if( race == 'Demons' ) this.raceUnits = 1;
        else if( race == 'Elfs' ) this.raceUnits = 2;
        else this.raceUnits = 3;

    }

    // стрелочный переключатель слайдов в слайдере
    clicker = ( event ) => {

        let target = event.target;

        // получаем размеры контейнеров для описаний и иконок
        const stepYicons = 135;
        const stepYinfo = 135;
            
        if( target.closest( '.down_arrow' ) ) {
            // вставляем звук для стрелки
            this.soundsHire.src = `${soundsMenu.arrowClick}`;
            for( let item of this.infoInner ) {
                item.style.transform = `translateY(-${stepYinfo*this.position}px)`;
            }
            for( let item of this.iconSlider ) {
                item.style.transform = `translateY(-${stepYicons*this.position}px)`;
            }
            this.position += 1;
        }
            
        if( target.closest( '.up_arrow' ) ) {
            // вставляем звук для стрелки
            this.soundsHire.src = `${soundsMenu.arrowClick}`;
            for( let item of this.infoInner ) {
                item.style.transform = `translateY(-${stepYinfo*(this.position-2)}px)`;
            }
            for( let item of this.iconSlider ) {
                item.style.transform = `translateY(-${stepYicons*(this.position-2)}px)`;
            }
            this.position -= 1;
        }
        
        // уставливаем отображение стрелок в зависимости от слайда
        switch ( this.position ) {
            case 1:
            this.arrowUp.style.display = 'none';
            this.arrowDown.style.display = '';
            break;
            
            case 3:
            this.arrowUp.style.display = '';
            this.arrowDown.style.display = 'none';
            break;

            default:
            this.arrowUp.style.display = '';
            this.arrowDown.style.display = '';
        }
        
    }

    onPointerDown = (event) => {

        // отменяем действие браузера по умолчанию
        event.preventDefault();
        let target = event.target;
        if( !target.closest( '.choose' ) ) return; // проверка на соответствие содержимого и нужных узлов
        this.iconUnit = target.cloneNode(); // клонируем узел
        this.idUnit = target.closest( '[data-id]' ).dataset.id;
        // устанавливаем позиционирование чтобы клон "парил" над документом
        this.iconUnit.style.position = 'absolute';
        this.iconUnit.style.zIndex = 400;
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
            this.soundsHire.src = `${soundsMenu.hireSetUnit}`;

            target.removeAttribute( 'style' ); // удаляем позиционирование у цели
            this.currentDroppable.insertAdjacentHTML( 'beforeend', `${target.outerHTML}` ); 
            this.currentDroppable.classList.remove( 'droppable' );
            this.currentDroppable.setAttribute( 'data-id', this.idUnit );
            
            this.currentDroppable = null;
            document.removeEventListener( 'pointermove', this.onPointerMove );
            this.iconUnit.removeEventListener( 'pointerup', this.onPointerUp );
            this.iconUnit.remove();

            // проверяем все ли окна для найма заполнены
            let rez = this.checkFill();

            if( rez == 3 ) { // отображаем кнопку найма
                this.footer.insertAdjacentHTML( 'beforeend', '<a href="#" class="btn_op">НАНЯТЬ</a>' );
                this.counter += 1;
                this.footer.querySelector( 'a' ).addEventListener( 'click', this.collectCommand );
            }
        } 
        
    }

    // при покидании слота для найма убираем подсветку
    leaveDroppable = ( elem ) => {

        elem.classList.remove( 'active_drop' );

    }

    // при заходе на слот найма подсвечиваем его
    enterDroppable = ( elem ) => {

        elem.classList.add( 'active_drop' );

    }

    // проверка запонения слотов для найма
    checkFill = () => {

        let count = 0;

        for( let item of this.slotsForIcon ) {

            if( item.innerHTML == '' ) count--;
            else count++;

        }

        return count;

    }

    // собираем конфигурацию команды для каждого игрока
    collectCommand = () => {

        // добавляем звук нажатия кнопки найма
        this.soundsHire.src = `${soundsMenu.buttonClickStart}`;

        // проверяем кокому игроку нужно собрать конфигурацию
        if( this.counter == 1 ) {

            for( let item of this.slotsForIcon ) this.command.push( Number( item.dataset.id ) );

            // сохраняем конфигурацию для первого игрока
            const firstPlayerConfig = {

                race: this.configFirstPlayer.race,
                nickname: this.configFirstPlayer.nickname,
                captain: this.configFirstPlayer.captain,
                command: [...this.command]

            };

            // добавляем конфигурацию первого игрока в LocalStorage
            let jsonconfig = JSON.stringify( firstPlayerConfig );
            localStorage.setItem( 'configFirstPlayer', jsonconfig );

            // загружаем данные о втором игроке
            jsonconfig = localStorage.getItem( 'configSecondPlayer' );
            this.configSecondPlayer = JSON.parse( jsonconfig );

            // загружаем подложки для второго игрока
            this.foneSlotUnits.classList.remove( `fone_slots_${this.configFirstPlayer.race}` );
            this.foneSlotUnits.classList.add( `fone_slots_${this.configSecondPlayer.race}` );
            this.foneInfoUnits.classList.remove( `fone_info_${this.configFirstPlayer.race}` );
            this.foneInfoUnits.classList.add( `fone_info_${this.configSecondPlayer.race}` );
            this.command = [];

            // получаем расу второго игрока для загрузки массива юнитов и музыки
            this.getArrayUnits( this.configSecondPlayer.race );
            this.musicHire.src = `${musicHireWindow[this.raceUnits]}`;

            // очистка компонент после первого игрока и потом заполняем их данными о юнитах второго игрока
            this.iconsSlider.innerHTML = '';
            this.infosInner.innerHTML = '';
            this.footer.innerHTML = '';
            this.slotsForIcon = this._elem.querySelector( '.slots_for_icons' );
            this.slotsForIcon.innerHTML = '';
            for( let i = 0; i < 3; i++ ) {

                let item = createElem( `<li class="droppable"></li>` );
                this.slotsForIcon.append( item );

            }
            this.slotsForIcon = this.slotsForIcon.querySelectorAll( 'li' );

            for( let unit of this.listUnits[this.raceUnits] ) {

                let item = createElem( `<li data-id="${unit.id}" class="choose"><img src="./img/${unit.portrait}"></li>` );
                item.classList.add( `active_ava_${this.configSecondPlayer.race}` )
                this.iconsSlider.append( item );
                item = createElem( `<li><div><br><br><br><p>${unit.name}</p></div>
                    <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
                this.infosInner.append( item );
        
            }
            this.iconSlider = this.iconsSlider.querySelectorAll( 'li' );
            this.infoInner = this.infosInner.querySelectorAll( 'li' );
            
            // устанавливаем стартовые настроки слайдеров
            this.position = 1;
            this.arrowUp.style.display = 'none';

        } else if( this.counter == 2 ) { 

            for( let item of this.slotsForIcon ) this.command.push( Number( item.dataset.id ) );

            // сохраняем конфигурацию для второго игрока
            const secondPlayerConfig = {

                race: this.configSecondPlayer.race,
                nickname: this.configSecondPlayer.nickname,
                captain: this.configSecondPlayer.captain,
                command: [...this.command]

            };

            let jsonconfig = JSON.stringify( secondPlayerConfig );
            localStorage.setItem( 'configSecondPlayer', jsonconfig );

            // очищаем главный контейнер и переходим к следующему окну
            this.musicHire.autoplay = false;
            this.mainContainer.innerHTML = '';
            const combatPlayers = new ModalWin2();

        }

    }

    get elem() {

        return this._elem;
        
    }

}
