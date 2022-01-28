"use strict";

import { FinalWindow } from './FinalWin.js';
import { ResultWindow } from './ResultWin.js';
import { unitsList, combatModels, soundsMenu, soundsUnits } from './lib.js';
import { createElem, fortune, getConfigArray, getConfigs, styleImage, buildSlotPlayer, setStartSettings } from './lib.js';
import { queueUnits, slotUnitsEmpty, clearSlotAllUnits, getNearOpponents, checkValidTarget, styleImageAll } from './lib.js';

export default class CombatWin {

    constructor() {

      this.unitsList = unitsList;
      this.combatModels = combatModels;
      this.soundsUnits = soundsUnits;

      // загружаем конфигурации первого и второго игрока
      let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
      this.configFirstPlayer = JSON.parse( jsonconfig );
      jsonconfig = localStorage.getItem( 'configSecondPlayer' );
      this.configSecondPlayer = JSON.parse( jsonconfig );

      // создаем верстку на странице
      const elem = createElem( `<div class="big_container">
        <div class="container"><div class="modal"></div>
            <div class="combat_content header_combat">
                <div class="header_player1">
                    <div class="phrase">Игрок 1</div>
                </div>
                <div class="header_nameGame">
                    <div class="name_game">Command Combat</div>
                </div>
                <div class="header_player2">
                    <div class="phrase">Игрок 2</div>
                </div>
            </div>
            <div class="combat_content combat">
              <div class="combat_content fieldn">
                  <div class="field_icons_pl1">
                      <ul class="icons_pl1_back"><li><div><img src="./img/empty_icon.jpg" class="i_b11"></div><div class="ih_b11">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_b12"></div><div class="ih_b12">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_b13"></div><div class="ih_b13">-</div></li></ul>
                      <ul class="icons_pl1_front"><li><div><img src="./img/empty_icon.jpg" class="i_f11"></div><div class="ih_f11">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_f12"></div><div class="ih_f12">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_f13"></div><div class="ih_f13">-</div></li></ul>
                  </div>
                  <div class="fieldn_main">
                      <div class="group_units_pl1"><img src="" class="field_allAttack_pl1">
                          <ul class="units_pl1_back"><li><img src="" class="b11"></li>
                            <li><img src="" class="b12"></li>
                            <li><img src="" class="b13"></li></ul>
                          <ul class="units_pl1_front"><li><img src="" class="f11"></li>
                            <li><img src="" class="f12"></li>
                            <li><img src="" class="f13"></li></ul>
                      </div>
                      <div class="group_units_pl2"><img src="" class="field_allAttack_pl2">
                          <ul class="units_pl2_front"><li><img src="" class="f21"></li>
                            <li><img src="" class="f22"></li>
                            <li><img src="" class="f23"></li></ul>
                          <ul class="units_pl2_back"><li><img src="" class="b21"></li>
                            <li><img src="" class="b22"></li>
                            <li><img src="" class="b23"></li></ul>
                      </div>
                  </div>
                  <div class="field_icons_pl2">
                      <ul class="icons_pl2_front"><li><div><img src="./img/empty_icon.jpg" class="i_f21"></div><div class="ih_f21">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_f22"></div><div class="ih_f22">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_f23"></div><div class="ih_f23">-</div></li></ul>
                      <ul class="icons_pl2_back"><li><div><img src="./img/empty_icon.jpg" class="i_b21"></div><div class="ih_b21">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_b22"></div><div class="ih_b22">-</div></li>
                        <li><div><img src="./img/empty_icon.jpg" class="i_b23"></div><div class="ih_b23">-</div></li></ul>
                  </div>
              </div>
              <div class="combat_content footer_combat">
                  <div class="btn_op button_defend">ЗАЩИТА</div>
                  <div class="btn_op button_wait">ОЖИДАТЬ</div>
                  <div class="btn_op button_nobody">НИЧЬЯ</div>
              </div>
          </div>
        </div>
        </div>` );

      // устанавливаем фон для поля сражения
      this.fieldMain = elem.querySelector( '.fieldn' );
      this.fieldMain.classList.add( `${this.getFone()}_combat_field` );

      // находим элементы боковых панелей и карты расстановки юнитов на поле
      this.listPlayer1 = elem.querySelector( '.field_icons_pl1' );
      this.listPlayer2 = elem.querySelector( '.field_icons_pl2' );
      this.unitsOnFieldPlayer1 = elem.querySelector( '.group_units_pl1' );
      this.unitsOnFieldPlayer2 = elem.querySelector( '.group_units_pl2' );

      // получаем слоты юнитов для каждого игрока
      this.idRacePlayer1 = getConfigArray( this.configFirstPlayer.race );
      this.idRacePlayer2 = getConfigArray( this.configSecondPlayer.race );
      this.slotConfigsPlayer1 = getConfigs( this.idRacePlayer1, this.configFirstPlayer.command );
      this.slotConfigsPlayer2 = getConfigs( this.idRacePlayer2, this.configSecondPlayer.command );

      // наполняем боковую панель и расставляем юнитов на поле боя для первого игрока
      for( let item of this.slotConfigsPlayer1 ) {
        // вставляем аватарку и здоровье в боковую панель 
        this.listPlayer1.querySelector( `.i_${item[11]}`).setAttribute( 'src', `./img/${item[9]}` );
        this.listPlayer1.querySelector( `.ih_${item[11]}`).innerHTML = item[1];
        let elem = this.combatModels[this.configFirstPlayer.race]; // получаем массив моделей расы 1го игрока
        let soundsUnits = this.soundsUnits[this.idRacePlayer1]; // получаем массив звуков моделей юнитов 1го игрока
        let animationDate = elem[ Number( item[10] ) ].left; // выбираем вариант расположения слева так как игрок_1
        let soundUnit = [ soundsUnits[ Number( item[10] ) ][0], soundsUnits[ Number( item[10] ) ][1] ]; // получаем звук для конкретного юнита
        let url = animationDate[0].path; // получаем ссылку на анимацию юнита в состоянии покоя
        let leftCoord = animationDate[0].size[0]; // получаем ширину анимации
        let topCoord = animationDate[0].size[1]; // получаем высоту анимации
        let coords = styleImage( leftCoord, topCoord ); // рассчитываем координаты для центровки на поле битвы
        this.unitsOnFieldPlayer1.querySelector( `.${item[11]}` ).setAttribute( 'src', `${url}` ); // добавляем анимацию юнита на поле
        let image = this.unitsOnFieldPlayer1.querySelector( `.${item[11]}` ); // получаем элемент анимации с DOM
        image.closest( 'li' ).setAttribute( 'data-id', `${item[11]}` );
        // задаем отцентрованое позиционирование анимации
        image.style.position = 'absolute';
        image.style.left = coords[0] + 'px';
        image.style.top = coords[1] + 'px';
        // добавляем массив анимаций юнита с размерами в конфигурацию юнита
        animationDate.push( elem[0].left ); // анимация смерти юнита
        item.push( animationDate ); // добавляем весь массив анимаций юнита
        item.push( soundUnit ); // добавляем звуки юнита
          
      }

      // наполняем боковую панель и расставляем юнитов на поле боя для второго игрока
      for( let item of this.slotConfigsPlayer2 ) {

        this.listPlayer2.querySelector( `.i_${item[11]}`).setAttribute( 'src', `./img/${item[9]}` );
        this.listPlayer2.querySelector( `.ih_${item[11]}`).innerHTML = item[1];
        let elem = this.combatModels[this.configSecondPlayer.race];
        let soundsUnits = this.soundsUnits[this.idRacePlayer2];
        let animationDate = elem[ Number( item[10] ) ].right;
        let soundUnit = [ soundsUnits[ Number( item[10] ) ][0], soundsUnits[ Number( item[10] ) ][1] ];
        let url = animationDate[0].path;
        let leftCoord = animationDate[0].size[0];
        let topCoord = animationDate[0].size[1];
        let coords = styleImage( leftCoord, topCoord );
        this.unitsOnFieldPlayer2.querySelector( `.${item[11]}` ).setAttribute( 'src', `${url}` );
        let image = this.unitsOnFieldPlayer2.querySelector( `.${item[11]}` );
        image.closest( 'li' ).setAttribute( 'data-id', `${item[11]}` );
        image.style.position = 'absolute';
        image.style.left = coords[0] + 'px';
        image.style.top = coords[1] + 'px';
        animationDate.push( elem[0].right );
        item.push( animationDate );
        item.push( soundUnit );

      }

      // добавляем весь контент на страницу
      this.mainContainer = document.querySelector( '.main_container' );
      this.mainContainer.append( elem );
      this._elem = elem;

      // загружаем заставку перед началом боя
      this.modalWindow = this._elem.querySelector( '.modal' );
      this.modalWindow.classList.add( 'loading' );
      const preloaderFight = createElem( `<div class="loading">
      <div class="header_result">
        <div class="name_game">Command Combat</div><div class="emblem"></div>
      </div>
      <div class="winner_info">
        <div class="info_congratulation"><p>Да начнется битва и пусть победит сильнейший!</p></div>
      </div>
      <div class="footer_result">
        <ul class="menu_result">
          <li class="start_combat"><a href="#" class="btn_op">НАЧАТЬ БОЙ</a></li></ul>
      </div>
    </div>` );
      this.modalWindow.append( preloaderFight );
      const buttonFight = this.modalWindow.querySelector( '.start_combat' );
      buttonFight.addEventListener( 'click', this.startFight );

      // формируем слоты экземпляры объектов юнитов для каждого игрока и общий слот всех юнитов
      this.slotPlayer1 = [ ...buildSlotPlayer( this.slotConfigsPlayer1, this.idRacePlayer1 ) ];
      this.slotPlayer2 = [ ...buildSlotPlayer( this.slotConfigsPlayer2, this.idRacePlayer2 ) ];
      this.slotAllUnits = [...this.slotPlayer1, ...this.slotPlayer2];

      this.actionDone = false; // устанавливаем выполнение хода в положение невыполнен

      // вешаем обработчики на панель с кнопками и подсвечивание цели
      this.buttonPanel = this._elem.querySelector( '.footer_combat' );
      this.buttonPanel.addEventListener( 'click', this.clickButton );
      this.fieldMain.addEventListener( 'pointerover', this.overTarget );
      this.fieldMain.addEventListener( 'pointerout', this.leaveTarget );
      this.currentTarget = null;
      this.menuSound = new Audio();
      this.menuSound.autoplay = true;
      this.soundOneUnitAttack = new Audio();
      this.soundOneUnitAttack.autoplay = true;

    }

    // получаем фон для поля битвы
    getFone = () => {

      const result = fortune();
      if( result === -1 ) return this.configSecondPlayer.race;
      else return this.configFirstPlayer.race;

    }

    // убираем заставку перед боем и запускаем функцию пошаговых ходов
    startFight = () => {
      // вставляем звук начала боя
      this.menuSound.src = `${soundsMenu.startBattle}`;
      this.modalWindow.innerHTML = '';
      this.modalWindow.remove();
      this.doAction();

    }

    clickButton = ( event ) => {

      const target = event.target;
      if( target.closest( '.button_defend' ) ) { // если нажата кнопка защита
        this.menuSound.src = `${soundsMenu.combatDefend}`;
        // находим объект активного юнита и уставливаем ему защиту     
        let unit = this._elem.querySelector( '.active_unit' );
        let flag = unit.closest( 'li' ).dataset.id;
        this.slotAllUnits.forEach( item => { if( item.position === flag ) item.defend(); } );
        this.actionDone = true;

      } else if( target.closest( '.button_wait' ) ) { // если нажата кнопка ожидания

        let indeks;
        const lengthSlot = this.slotAllUnits.length - 1;
        let unit = this._elem.querySelector( '.active_unit' ); 
        let flag = unit.closest( 'li' ).dataset.id;
        this.slotAllUnits.forEach( ( item, index ) => { if( item.position === flag ) indeks = index; } );
        if( indeks === lengthSlot ) { // если юнит последний в очереди на ход, то отменяем ожидание

          return;

        } else {
          // загружаем звук ожидания
          this.menuSound.src = `${soundsMenu.combatWait}`;
          // вставляем заглушку на место юнита в очереди и переносим его в конец очереди
          let removeElem = this.slotAllUnits.splice( indeks, 1, 'transfer' );
          this.slotAllUnits.push( ...removeElem );

        }
        
        this.actionDone = true;

      } else if( target.closest( '.button_nobody' ) ) { // если нажата кнопка ничья
        this.menuSound.src = `${soundsMenu.nobodyWin}`;
        // вставляем окно завершения сражения с кнопками конец и новая игра
        this.mainContainer.innerHTML = '';
        const finwin = new FinalWindow();

      } else return;

    }

    // получаем слот игрока - опонента
    chooseSlot = ( identificator ) => {

      if( identificator[1] === '1' ) return this.slotPlayer1;
      else return this.slotPlayer2;

    }

    // делаем подсветку юниту и его иконке и вешаем обработчик
    getTarget = ( target, identificator ) => {

      target.classList.add( 'active_target' );
      this._elem.querySelector( `.i_${identificator}` ).classList.add( 'icon_target' );
      this.activeTarget = this._elem.querySelector( '.active_target' );
      this.activeTarget.addEventListener( 'click', this.catchTarget );

    }

    overTarget = ( event ) => {

      let target = event.target;
      let identificator = target.closest( '[data-id]' ).dataset.id;
      // если активный юнит священник, то должен лечить только юнитов своей команды
      if( this.activeUnit.kind === 'Священник' && this.activeUnit.position[1] === identificator[1] ) { 
        // добавляем подстветку юниту - потенциальной цели и его иконке
        this.getTarget( target, identificator ); // передаем управление дальше
        
      } else if( this.activeUnit.kind === 'Священник' && this.activeUnit.position[1] !== identificator[1] ) { // юниты не своей команды
            
        return; 
        
      } else if( this.activeUnit.position[1] === identificator[1] ) { // юниты своей команды
            
        return; 
        
      } else if( this.activeUnit.position[1] !== identificator[1] ) { // юниты не своей команды

        if( this.activeUnit.distanse === 'дальняя' ) { // если у юнита дистанционная атака
                
          this.getTarget( target, identificator );
            
        } else if( this.activeUnit.distanse === 'ближняя' ) {

          let slotOpponents = getNearOpponents( this.chooseSlot( identificator ) );
          let slotActiveUnit = getNearOpponents( this.chooseSlot( this.activeUnit.position ) );
          if( checkValidTarget( this.activeUnit.position, slotOpponents, identificator, slotActiveUnit ) ) {
            
            this.getTarget( target, identificator );
                
          } else { return; }
                
        }
    
      }

    }
    
    catchTarget = ( event ) => {

      event.preventDefault(); // отменяем действие браузера по умолчанию

      let target = event.target;
      let ident = target.closest( '[data-id]' ); // находим элемент у которого есть id
      let opponent = [];
      let identificator = ident.dataset.id; // получаем идентификатов юнита по которому кликнули

      let slotOpponents = this.chooseSlot( identificator ); // получаем слот всех юнитов опонента 
      let unitTarget = slotOpponents.find( item => item.position === identificator ); // получаем юнита по которому кликнули
      opponent.push( unitTarget );

      if( this.activeUnit.targets === 1 ) { // для атакующих юнитов у которых кол-во целей 1
        
        this.attack( opponent );
        
      } else if( this.activeUnit.targets === 6 ) { // для атакующих юнитов сразу по всем юнитам опонента
            
        this.attackAll( slotOpponents, identificator );
        
      }

    }

    // покидаем потенциальную цель
    leaveTarget = ( event ) => {

      this.activeTarget.removeEventListener( 'click', this.catchTarget );
      this._elem.querySelector( '.icon_target' ).classList.remove( 'icon_target' );
      this.activeTarget.classList.remove( 'active_target' );

    }

    // проверка уровня здоровья юнита
    checkUnitLive = ( unit, slotPlayer, slotCombat ) => {
      
      if( unit.currentHealth <= 0 ) { // если юнита убили
        
        slotPlayer.forEach( ( elem, index, array ) => {
                
          if( elem.position === unit.position) { 
                    
            array.splice( index, 1, 'transfer' ); // удаляем объект юнита из слота игрока и вставляем заглушку
          } 
        } );
            // загружаем звук умирающего юнита
            const audio = new Audio();
            audio.src = `${unit.unitDeathSound}`; 
            audio.autoplay = true;
            // заменяем иконку юнита заглушкой, удаляем цифру здоровье и загружаем анимации ухода с поля боя
            this._elem.querySelector( `.i_${unit.position}` ).setAttribute( 'src', './img/deadicon.png' );
            this._elem.querySelector( `.ih_${unit.position}` ).innerHTML = '-';
            let coords = styleImage( unit.unitDeath.size[0], unit.unitDeath.size[1] );
            let image = this._elem.querySelector( `.${unit.position}` );
            image.setAttribute( 'src', `${unit.unitDeath.path}` );
            image.style.position = 'absolute';
            image.style.left = coords[0] + 'px';
            image.style.top = coords[1] + 'px';
            let contentLi = image.closest( 'li' );
            setTimeout( () => contentLi.innerHTML = '', 1500 );
            contentLi.removeAttribute( 'data-id' );

        slotCombat.forEach( ( item, index, array ) => { // в общем слоте всех юнитов удаляем юнита и вставляем на его место заглушку
            
          if( item !== 'transfer' && item.position === unit.position ) array.splice( index, 1, 'transfer' );

        } );
            
      } else if( unit.currentHealth <= unit.health || unit.currentHealth >= unit.health ) { // если юнита ранили или полечили
            
        slotPlayer.forEach( ( item ) => {
                
          if( item.position === unit.position ) { 
            // устанавливаем в боковую панель новое значение здоровья
            this._elem.querySelector( `.ih_${unit.position}` ).innerHTML = `${unit.currentHealth}`;
    
          } 
        
        } );
            
      } else return;

    }

    // реализация очереди пошаговых раундов 
    async doAction() {

      leaveFight: while( !slotUnitsEmpty( this.slotPlayer1 ) && !slotUnitsEmpty( this.slotPlayer2 ) ) { // проверка не пусты ли слоты
            
        setStartSettings( this.slotAllUnits ); // устанавливаем броню в стартовые значения
        queueUnits( this.slotAllUnits ); // очередь приоритета ходов юнитов
        for( let unit of this.slotAllUnits ) {
          if( unit === 'transfer' ) continue; // проверка юнит это или нет
          // добавляем юниту и его иконке подсветку
          let elemUnit = this._elem.querySelector( `.${unit.position}` ); 
          let iconUnit = this._elem.querySelector( `.i_${unit.position}` );
          elemUnit.classList.add( 'active_unit' );
          iconUnit.classList.add( 'icon_active' );
          this.activeUnit = unit;

          while( !this.actionDone ) { // ожидаем действие пользователя
            
            await new Promise( ( resolve ) => setTimeout( resolve, 100 ) );

          }
          // удаляем подсветку уюнита и его иконки
          elemUnit.classList.remove( 'active_unit' );
          iconUnit.classList.remove( 'icon_active' );
          await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
          // удаляем подсветку уюнита и его иконки
          //elemUnit.classList.remove( 'active_unit' );
          //iconUnit.classList.remove( 'icon_active' );
                
          // проверяем слоты юнитов, если какой-то пуст завершаем битву и выводим окно с победителем
          if( slotUnitsEmpty( this.slotPlayer1 ) ) { const id = 2; this.createConfigWinner( id ); break leaveFight; }
          if( slotUnitsEmpty( this.slotPlayer2 ) ) { const id = 1; this.createConfigWinner( id ); break leaveFight; }
                
          this.actionDone = false; // устанавливаем флаг, что действие невыполнено для следующего юнита

        }  
        // очищаем слоты от заглушек
        clearSlotAllUnits( this.slotAllUnits );
        clearSlotAllUnits( this.slotPlayer1 );
        clearSlotAllUnits( this.slotPlayer2 );

      }

      // очищаем главный контейнер и переходим к следующему окну
      this.mainContainer.innerHTML = '';
      const resultWin = new ResultWindow();

    }

    async attack( opponents ) {
      
      let elemActiveUnit = this._elem.querySelector( `.${this.activeUnit.position}` ); // элемент для дальнейшей замены на анимацию атаки
      let coordsActiveUnit = styleImage( this.activeUnit.unitAttack.size[0], this.activeUnit.unitAttack.size[1] );
      let elemActiveTarget = this._elem.querySelector( `.${opponents[0].position}` ); // элемент для дальнейшей замены на анимацию получения урона
      let coordsActiveTarget = styleImage( opponents[0].unitGetDam.size[0], opponents[0].unitGetDam.size[1] );
      // загружаем отцентрованную анимацию атаки юнита
      elemActiveUnit.setAttribute( 'src', `${this.activeUnit.unitAttack.path}` );
      elemActiveUnit.style.position = 'absolute';
      elemActiveUnit.style.left = coordsActiveUnit[0] + 'px';
      elemActiveUnit.style.top = coordsActiveUnit[1] + 'px';
      // загружаем звук атаки юнита
      this.soundOneUnitAttack.src = `${this.activeUnit.unitAttackSound}`;
      await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) ); // ждем 2/3 удара, чтобы цель поменяла анимашку в середине атаки
      
      elemActiveTarget.setAttribute( 'src', `${opponents[0].unitGetDam.path}` );
      elemActiveTarget.style.position = 'absolute';
      elemActiveTarget.style.left = coordsActiveTarget[0] + 'px';
      elemActiveTarget.style.top = coordsActiveTarget[1] + 'px';
      this.activeUnit.damageOpponent( opponents );

      await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) ); // ждем оставшуюся часть анимации атаки

      // загружаем отцентрованную анимацию статики юнита который атаковал и получал урон
      let elementActiveUnit = this._elem.querySelector( `.${this.activeUnit.position}` );
      let elementActiveTarget = this._elem.querySelector( `.${opponents[0].position}` );
      let coordsAttackUnit = styleImage( this.activeUnit.unitStatic.size[0], this.activeUnit.unitStatic.size[1] );
      let coordsGetDamUnit = styleImage( opponents[0].unitStatic.size[0], opponents[0].unitStatic.size[1] );
      elemActiveUnit.style = '';
      elementActiveUnit.setAttribute( 'src', `${this.activeUnit.unitStatic.path}` );
      elementActiveUnit.style.position = 'absolute';
      elementActiveUnit.style.left = coordsAttackUnit[0] + 'px';
      elemActiveUnit.style.top = coordsAttackUnit[1] + 'px';
      this._elem.querySelector( `.ih_${this.activeUnit.position}` ).innerHTML = `${this.activeUnit.currentHealth}`;
      elementActiveTarget.style = '';
      elementActiveTarget.setAttribute( 'src', `${opponents[0].unitStatic.path}` );
      elementActiveTarget.style.position = 'absolute';
      elementActiveTarget.style.left = coordsGetDamUnit[0] + 'px';
      elementActiveTarget.style.top = coordsGetDamUnit[1] + 'px';

      for( let soldier of this.slotPlayer1 ) { // проверяем слот игрока есть ли мертвые юниты
                  
        if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer1, this.slotAllUnits );
      
      }
            
      for( let soldier of this.slotPlayer2 ) {
                
        if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer2, this.slotAllUnits );
            
      }
  
      await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );
      this.actionDone = true;
    }

    async attackAll( opponents, identificator ) {
      
      let elemActiveUnit = this._elem.querySelector( `.${this.activeUnit.position}` ); // элемент для дальнейшей замены на анимацию атаки
      let coordsActiveUnit = styleImage( this.activeUnit.unitAttack.size[0], this.activeUnit.unitAttack.size[1] );
      let elemField = this._elem.querySelector( `.field_allAttack_pl${identificator[1]}` ); // элемент для поля опонента для урона по всем
      let coordsField = styleImageAll( this.activeUnit.unitAllAttack.size[0], this.activeUnit.unitAllAttack.size[1] );
      // загружаем звук атаки юнита
      this.soundOneUnitAttack.src = `${this.activeUnit.unitAttackSound}`;
      // загружаем отцентрованную анимацию атаки юнита
      elemActiveUnit.setAttribute( 'src', `${this.activeUnit.unitAttack.path}` );
      elemActiveUnit.style.position = 'absolute';
      elemActiveUnit.style.left = coordsActiveUnit[0] + 'px';
      elemActiveUnit.style.top = coordsActiveUnit[1] + 'px';
      await new Promise( ( resolve ) => setTimeout( resolve, 1500 ) ); // ждем 1/4 удара, чтобы вставить анимашку в середине атаки
      
      this.activeUnit.damageOpponent( opponents );
      elemField.setAttribute( 'src', `${this.activeUnit.unitAllAttack.path}` );
      elemField.style.position = 'absolute';
      elemField.style.left = coordsField[0] + 'px';
      elemField.style.top = coordsField[1] + 'px';

      await new Promise( ( resolve ) => setTimeout( resolve, 1500 ) ); // ждем оставшуюся часть анимации атаки

      // загружаем отцентрованную анимацию статики юнита который атаковал и убираем анимацию атаки по полю
      let elementActiveUnit = this._elem.querySelector( `.${this.activeUnit.position}` );
      let coordsAttackUnit = styleImage( this.activeUnit.unitStatic.size[0], this.activeUnit.unitStatic.size[1] );
      elemActiveUnit.style = '';
      elemField.setAttribute( 'src', '' );
      elementActiveUnit.setAttribute( 'src', `${this.activeUnit.unitStatic.path}` );
      elementActiveUnit.style.position = 'absolute';
      elementActiveUnit.style.left = coordsAttackUnit[0] + 'px';
      elemActiveUnit.style.top = coordsAttackUnit[1] + 'px';
      elemField.style = '';

      for( let soldier of this.slotPlayer1 ) { // проверяем слот игрока есть ли мертвые юниты
                  
        if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer1, this.slotAllUnits );
      
      }
            
      for( let soldier of this.slotPlayer2 ) {
                
        if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer2, this.slotAllUnits );
            
      }
  
      await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
      this.actionDone = true;
    }

    createConfigWinner = ( id ) => {

      let jsonconfig;
      if( id === 1 ) {
        // сохраняем конфигурацию первого игрока
        const firstPlayerConfig = {

          race: this.configFirstPlayer.race,
          nickname: this.configFirstPlayer.nickname,
          id: 1 

      };

      jsonconfig = JSON.stringify( firstPlayerConfig );
      localStorage.setItem( 'configWinnerPlayer', jsonconfig );

      } else {
        // сохраняем конфигурацию второго игрока
        const secondPlayerConfig = {

          race: this.configSecondPlayer.race,
          nickname: this.configSecondPlayer.nickname,
          id: 2

      };

      jsonconfig = JSON.stringify( secondPlayerConfig );
      localStorage.setItem( 'configWinnerPlayer', jsonconfig );

      }

    }

    get elem() {

        return this._elem;
        
    }

}