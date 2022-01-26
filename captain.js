"use strict";

import { createElem, contentArray, soundsMenu, soundsCaptains, getConfigArray } from './lib.js';
import { ModalWin } from './Modal.js';

export default class CaptainsWindow {

    constructor() {

        // загружаем данные о первом игроке из LocalStorage
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );

        //вставляем верстку
        const elem = createElem( `${contentArray.captainWin}` );

        // отображаем nickname и расу первого игрока
        this.listFirstPlayer = elem.querySelector( '.player1_list_content' );
        const ulFirstPlayer = this.listFirstPlayer.querySelectorAll( 'li' );
        ulFirstPlayer[1].innerHTML = this.configFirstPlayer.nickname;
        ulFirstPlayer[2].innerHTML = this.configFirstPlayer.race;
        this.currentRace = this.configFirstPlayer.race;

        // получаем из LocalStorage лист капитанов расы первого игрока
        jsonconfig = localStorage.getItem( `${this.configFirstPlayer.race}` );
        this.listCaptainsPlayer = JSON.parse( jsonconfig );
        
        // отображаем аватарки капитанов
        this.listCaptains = elem.querySelector( '.captain_list ul' );
        for( let item of this.listCaptainsPlayer ) {

            let ava = createElem( `<li data-id="${item.id}"><img src="./img/${item.avatar}"></li>` );
            this.listCaptains.append( ava );

        }

        // активируем подстветку
        this.setLightness( this.configFirstPlayer.race );

        // заполняем информацию по первому капитану из списка
        this.listCaptain = this.listCaptains.querySelectorAll( 'li' );
        this.nameCaptain = elem.querySelector( '.name_inform p' );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[0].name;
        this.portraitCaptain = elem.querySelector( '.ava_captain' );
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[0].portrait}">`;
        this.listCharacteristics = elem.querySelector( '.value_characteristics' );
        for( let item of this.listCaptainsPlayer[0].characteristics ) {

            let charact = createElem( `<li>${item}</li>` );
            this.listCharacteristics.append( charact );

        }
        this.listCharacteristics = this.listCharacteristics.querySelectorAll( 'li' );
        // выводим описание для первого капитана
        this.captainDescription = elem.querySelector( '.description_inform p' );
        this.captainDescription.innerHTML = this.listCaptainsPlayer[0].description;
        this.captainId = 0;

        // вставляем контент в главный контейнер
        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;
        
        // вешаем обработчики на элементы
        this.listCaptains.addEventListener( 'click', this.chooseCaptain );
        this.firstPlayerButton = this._elem.querySelector( '.button_list_fp' );
        this.secondPlayerButton = this._elem.querySelector( '.button_list_sp' );
        this.firstPlayerButton.addEventListener( 'click', this.player1Captain );
        this.secondPlayerButton.addEventListener( 'click', this.player2Captain );

        this.soundCap = new Audio();
        this.soundCap.autoplay = true;

    }

    // переключатель для отображения информации капитана
    chooseCaptain = ( event ) => {
        
        const target = event.target;
        let race = getConfigArray( this.currentRace );
        // вставляем звук для клика по иконке
        this.soundCap.src = `${soundsMenu.captainChoose}`;
        const voiceCaptain = new Audio();
        voiceCaptain.autoplay = true;
        
        if( target.closest( '[data-id="0"] img' ) ) { 
            this.captainId = 0;
            voiceCaptain.src = `${soundsCaptains[race][0]}`;
        } else if( target.closest( '[data-id="1"] img' ) ) {
            this.captainId = 1;
            voiceCaptain.src = `${soundsCaptains[race][1]}`;
        } else if( target.closest( '[data-id="2"] img' ) ) {
            this.captainId = 2;
            voiceCaptain.src = `${soundsCaptains[race][2]}`;
        } else return;

        for( let ava of this.listCaptain ) ava.classList.remove( this.thumb );
        this.listCaptain[this.captainId].classList.add( this.thumb );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[this.captainId].name;
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[this.captainId].portrait}">`;
        for( let i = 0; i < this.listCharacteristics.length; i++ ) {

            this.listCharacteristics[i].innerHTML = this.listCaptainsPlayer[this.captainId].characteristics[i];
            
        }
        
        this.captainDescription.innerHTML = this.listCaptainsPlayer[this.captainId].description;

    }

    // первый игрок подтверждает выбор капитана
    player1Captain = () => {

        // вставляем звук для кнопки
        this.soundCap.src = `${soundsMenu.buttonClickStart}`;

        // сохраняем конфигурацию для первого игрока
        const firstPlayerConfig = {

            race: this.configFirstPlayer.race,
            nickname: this.configFirstPlayer.nickname,
            captain: this.captainId

        };
        let jsonconfig = JSON.stringify( firstPlayerConfig );
        localStorage.setItem( 'configFirstPlayer', jsonconfig );

        // загружаем данные о втором игроке из LocalStorage
        jsonconfig = localStorage.getItem( 'configSecondPlayer' );
        this.configSecondPlayer = JSON.parse( jsonconfig );

        // скрываем информацию о первом игроке и выводим о втором
        const modalPl1 = this._elem.querySelector( '.modal_pl1' );
        modalPl1.classList.add( 'disabled_player1_list' );
        this.listFirstPlayer.style.display = 'none';
        this.listSecondPlayer = this._elem.querySelector( '.player2_list_content' );
        this.listSecondPlayer.classList.remove( 'player2_list_content' );
        const player2list = this._elem.querySelector( '.modal_pl2' );
        player2list.classList.remove( 'disabled_player2_list' );

        // отображаем nickname и расу второго игрока
        const ulSecondPlayer = this.listSecondPlayer.querySelectorAll( 'li' );
        ulSecondPlayer[1].innerHTML = this.configSecondPlayer.nickname;
        ulSecondPlayer[2].innerHTML = this.configSecondPlayer.race;
        this.currentRace = this.configSecondPlayer.race;
        
        // получаем из LocalStorage лист капитанов расы второго игрока
        jsonconfig = localStorage.getItem( `${this.configSecondPlayer.race}` );
        this.listCaptainsPlayer = JSON.parse( jsonconfig );
        this.listCaptains = this._elem.querySelector( '.captain_list ul' );
        this.listCaptains.innerHTML = '';
        for( let item of this.listCaptainsPlayer ) {

            let ava = createElem( `<li data-id="${item.id}"><img src="./img/${item.avatar}"></li>` );
            this.listCaptains.append( ava );

        }
        
        // активируем подсветку первому капитану
        this.setLightness( this.configSecondPlayer.race );

        // заполняем информацию по первому капитану из списка
        this.listCaptain = this.listCaptains.querySelectorAll( 'li' );
        this.nameCaptain.innerHTML = this.listCaptainsPlayer[0].name;
        this.portraitCaptain.innerHTML = `<img src="./img/${this.listCaptainsPlayer[0].portrait}">`;
        this.listCharacteristics = this._elem.querySelector( '.value_characteristics' );
        this.listCharacteristics.innerHTML = '';
        for( let item of this.listCaptainsPlayer[0].characteristics ) {

            let charact = createElem( `<li>${item}</li>` );
            this.listCharacteristics.append( charact );

        }

        // выводим описание для первого капитана
        this.listCharacteristics = this.listCharacteristics.querySelectorAll( 'li' );
        this.captainDescription.innerHTML = this.listCaptainsPlayer[0].description;
        this.captainId = 0;

    }

    player2Captain = () => {

        // вставляем звук для кнопки
        this.soundCap.src = `${soundsMenu.buttonClickStart}`;

        // сохраняем конфигурацию для второго игрока
        const secondPlayerConfig = {

            race: this.configSecondPlayer.race,
            nickname: this.configSecondPlayer.nickname,
            captain: this.captainId

        };

        let jsonconfig = JSON.stringify( secondPlayerConfig );
        localStorage.setItem( 'configSecondPlayer', jsonconfig );

        // переходим к следующему окну - найм юнитов
        this.mainContainer.innerHTML = '';
        const modalHireUnits = new ModalWin();

    }

    // выбор цвета подсветки согласно расе игрока
    setLightness( race ) {
        
        this.listCaptains.firstChild.classList.add( `active_ava_${race}` );
        this.thumb = `active_ava_${race}`;

    }

    get elem() {

        return this._elem;
        
    }
    
}