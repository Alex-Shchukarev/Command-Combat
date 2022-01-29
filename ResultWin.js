"use strict";

import { createElem, soundsMenu } from "./lib.js";
import StartWindow from "./StartWin.js";

export class ResultWindow {

    constructor() {

        // загружаем конфигурацию победившего игрока
        let jsonconfig = localStorage.getItem( 'configWinnerPlayer' );
        this.configWinner = JSON.parse( jsonconfig );
        let elem = createElem( `<div class="big_container">
        <div class="container">
          <div class="result_win">
            <div class="header_result">
              <div class="name_game">Command Combat</div><div class="emblem"></div>
            </div>
            <div class="winner_info">
              <div class="info_player"></div>
              <div class="info_nickname"></div>
              <div class="info_race"></div>
              <div class="info_congratulation"><p>Вы достойно сражались и ваша команда бойцов отлично подготовлена.<br>
                <br>Вы достойны победы, поздравляем!</p>
              </div>
            </div>
            <div class="footer_result">
              <ul class="menu_result">
                <li class="start_newgame"><a href="#" class="btn_op">НОВАЯ ИГРА</a></li>
                <li class="exit_game"><a href="#" class="btn_op">ВЫХОД</a></li></ul>
            </div>
          </div>
          </div>
        </div>` );
        elem.querySelector( '.info_player' ).innerHTML = `Player_${this.configWinner.id}`;
        elem.querySelector( '.info_nickname' ).innerHTML = `${this.configWinner.nickname}`;
        elem.querySelector( '.info_race' ).innerHTML = `${this.configWinner.race}`;

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