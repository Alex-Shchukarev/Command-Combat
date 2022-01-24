"use strict";

import CaptainsWindow from './captain.js';
import { createElem, races, soundsMenu, contentArray } from './lib.js';


export default class SecondWin {

    constructor() {

    this.races = races;
    //вставляем верстку
    const elem = createElem( `${contentArray.raceWin}` );
    
    this.inner = elem.querySelector( '.race_inner' );
    this.raceDescriptionLeft = elem.querySelector( '.left' );
    this.raceDescriptionRight = elem.querySelector( '.right' );
    
    // Наполняем слайдер слайдами для каждой рассы 
    for( let race of this.races ) {
        let leftRaceDescription = createElem( `<div class="description_text">${race.description}</div>` );
        let rightRaceDescription = createElem( `<div class="description_text">${race.description}</div>` );
        let raceSlide = createElem( `<div class="race_slide" data-id="${race.id}">
        <img src="./img/${race.image}" class="race_img" alt="slide">
        <div class="race_name phrase">${race.name}</div>
        </div>` );
        this.raceDescriptionLeft.append( leftRaceDescription );
        this.raceDescriptionRight.append( rightRaceDescription );
        this.inner.append( raceSlide );
    }

    // добавляем контент в документ
    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    // задаем первоначальные настройки отображения слайдера
    this.arrowLeft = this._elem.querySelector( '.race_arrow_left' );
    this.arrowRight = this._elem.querySelector( '.race_arrow_right' );
    this.arrowLeft.style.display = 'none';
    this.position = 1;
    this.raceSlides = this._elem.querySelectorAll( '.race_slide ');
    this.raceSlides[0].classList.add( 'active_race' );

    // вешаем обработчики на стрелки, кнопки и поля для ввода имени
    const raceArrows = this._elem.querySelector( '.race_arrows' );
    const firstPlayerConfirm = this._elem.querySelector( '.fplr' );
    const secondPlayerConfirm = this._elem.querySelector( '.splr' );
    this.nickFirstPlayer = this._elem.querySelector( '[name="first_player"]' );
    this.nickSecondPlayer = this._elem.querySelector( '[name="second_player"]' );
    this.nickFirstPlayer.addEventListener( 'change', this.checkInputFirst );
    this.nickSecondPlayer.addEventListener( 'change', this.checkInputSecond );
    this.nickFirstPlayer.addEventListener( 'pointerover', this.giveHint );
    this.nickFirstPlayer.addEventListener( 'pointerout', this.hideHint );
    this.nickSecondPlayer.addEventListener( 'pointerover', this.giveHint );
    this.nickSecondPlayer.addEventListener( 'pointerout', this.hideHint );
    raceArrows.addEventListener( 'click', this.clicker );
    firstPlayerConfirm.addEventListener( 'click', this.player1confirm );
    secondPlayerConfirm.addEventListener( 'click', this.player2confirm ); 
    
    }

    // при наведении на поле ввода имени получаем подсказку по формату ввода
    giveHint = ( event ) => {

        let target = event.target;
        const tooltip = document.createElement( 'div' );
        tooltip.className = 'tooltip';
        tooltip.innerHTML = 'Введите никнейм в формате: -от 5 до 14 символов, -латиница, числа и _';                     

        tooltip.style.left = target.getBoundingClientRect().left + 'px';
        tooltip.style.top = target.getBoundingClientRect().bottom + 5 + 'px';
        document.body.append( tooltip );

    }

    // скрываем подсказку при покидании поля ввода
    hideHint = () => {

        let tooltip = document.querySelector( '.tooltip' );    
        tooltip.remove();

    }

    // проверяем введенный nickname на соответсвие формату для первого игрока
    checkInputFirst = ( event ) => {
        
        const target = event.target;
        const res = /[a-zA-Z0-9_]{5,14}/.test( this.nickFirstPlayer.value );
        if( !res ) {
            // вставляем звук ошибки
            const audio = new Audio();
            audio.src = `${soundsMenu.errorAlarm}`; 
            audio.autoplay = true;
            // если не соответсвует формату, очищаем поле и выводим сообщение о некорректном вводе
            const mistake = document.createElement( 'div' );
            mistake.className = 'tooltip_mistake';
            mistake.innerHTML = 'формат некорректен';
            mistake.style.left = target.getBoundingClientRect().right + 5 + 'px';
            mistake.style.top = target.getBoundingClientRect().top + 'px';
            document.body.append( mistake );
            setTimeout( () => { 
                this.nickFirstPlayer.value = ''; 
                mistake.remove(); }, 1000 
                );
            
        }
    
    }

    // проверяем введенный nickname на соответсвие формату для второго игрока
    checkInputSecond = ( event ) => {
        
        const target = event.target;
        const res = /[a-zA-Z0-9_]{5,14}/.test( this.nickSecondPlayer.value );
        if( !res ) {
            // вставляем звук ошибки
            const audio = new Audio();
            audio.src = `${soundsMenu.errorAlarm}`; 
            audio.autoplay = true;
            // если не соответсвует формату, очищаем поле и выводим сообщение о некорректном вводе
            const mistake = document.createElement( 'div' );
            mistake.className = 'tooltip_mistake';
            mistake.innerHTML = 'формат некорректен';
            mistake.style.left = target.getBoundingClientRect().left - 170 + 'px';
            mistake.style.top = target.getBoundingClientRect().top + 'px';
            document.body.append( mistake );
            setTimeout( () => { 
                this.nickSecondPlayer.value = ''; 
                mistake.remove(); }, 1000 
                );
            
        }
    
    }

    // переключатель слайдов по нажатию на стрелки
    clicker = ( event ) => {

        let target = event.target;

        // получаем размер контейнеров для описания расы и слайда для картинки
        const stepX = this.inner.offsetWidth;
        const stepY = this.raceDescriptionLeft.offsetHeight;

        // проверяем какая стрелка нажата и двигаем слайды и описание
        if( target.closest( '.race_arrow_right' ) ) {
            // вставляем звук для стрелки
            const audio = new Audio();
            audio.src = `${soundsMenu.arrowClick}`; 
            audio.autoplay = true;
            this.inner.style.transform = `translateX(-${stepX*this.position}px)`;
            this.raceDescriptionLeft.style.transform = `translateY(-${stepY*this.position}px)`;
            this.raceDescriptionRight.style.transform = `translateY(-${stepY*this.position}px)`;
            this.position += 1;
        }
            
        if( target.closest( '.race_arrow_left' ) ) {
            // вставляем звук для стрелки
            const audio = new Audio();
            audio.src = `${soundsMenu.arrowClick}`; 
            audio.autoplay = true;
            this.inner.style.transform = `translateX(-${stepX*(this.position-2)}px)`;
            this.raceDescriptionLeft.style.transform = `translateY(-${stepY*(this.position-2)}px)`;
            this.raceDescriptionRight.style.transform = `translateY(-${stepY*(this.position-2)}px)`;
            this.position -= 1;
        }
        
        // отображаем/скрываем стрелки в зависимости от позиции и ставим маркер отображаемой рассе
        switch ( this.position ) {
            case 1:
            this.arrowLeft.style.display = 'none';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[0].classList.add( 'active_race' );
            break;
                
            case 2:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[1].classList.add( 'active_race' );
            break;

            case 3:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = '';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[2].classList.add( 'active_race' );
            break;
            
            case 4:
            this.arrowLeft.style.display = '';
            this.arrowRight.style.display = 'none';
            for( let slide of this.raceSlides ) slide.classList.remove( 'active_race' );
            this.raceSlides[3].classList.add( 'active_race' );
            break;
        }
        
    }

    // первый игрок подтверждает выбор расы
    player1confirm = () => {

        // вставляем звук для кнопки
        const audio = new Audio();
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true;
        
        // скрываем информацию для первого игрока и разблокируем для второго
        const modalPl1 = this._elem.querySelector( '.modal_pl1' );
        const modalPl2 = this._elem.querySelector( '.modal_pl2' );
        modalPl2.classList.remove( 'disabled_pl2' );
        modalPl1.classList.add( 'disabled_pl1' );
        this.activeRace = this._elem.querySelector( '.active_race' );
        if( this.nickFirstPlayer.value == '' ) this.nickFirstPlayer.value = 'Artur_1';

        const configFirstPlayer = {
            nickname: this.nickFirstPlayer.value,
            race: this.activeRace.dataset.id
        };
        // сохраняем конфигурацию первого игрока в LocalStorage
        let jsonconfig = JSON.stringify( configFirstPlayer );
        localStorage.setItem( 'configFirstPlayer', jsonconfig );

    }

    // второй игрок подтверждает выбор расы
    player2confirm = ( event ) => {

        const target = event.target;
        const activeRace = this._elem.querySelector( '.active_race' );
        
        // проверяем незанята ли выбранная раса, если занята предлагаем выбрать другую
        if( activeRace.dataset.id === this.activeRace.dataset.id ) {

            // вставляем звук ошибки
            const audio = new Audio();
            audio.src = `${soundsMenu.errorAlarm}`; 
            audio.autoplay = true;
            const mistake = document.createElement( 'div' );
            mistake.className = 'tooltip';
            mistake.innerHTML = 'Эта раса уже занята, выберите другую расу!';
            mistake.style.left = target.getBoundingClientRect().left + 'px';
            mistake.style.top = target.getBoundingClientRect().top - 100 + 'px';
            document.body.append( mistake );
            setTimeout( () => mistake.remove(), 1500 );
            return;

        }

        // вставляем звук для кнопки
        const audio = new Audio();
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true; 

        // если игрок забыл ввести nickname вставляем имя по умолчанию
        if( this.nickSecondPlayer.value == '' ) this.nickSecondPlayer.value = 'Lancelot_5';
        const configSecondPlayer = {
            nickname: this.nickSecondPlayer.value,
            race: activeRace.dataset.id
        };
        // сохраняем конфигурацию второго игрока в LocalStorage
        const jsonconfig = JSON.stringify( configSecondPlayer );
        localStorage.setItem( 'configSecondPlayer', jsonconfig );

        // переходим к окну выбора капитана
        this.mainContainer.innerHTML = '';
        const captainsPlayers = new CaptainsWindow();

    }

    get elem() {

        return this._elem;
        
    }

}