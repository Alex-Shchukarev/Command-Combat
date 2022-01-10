"use strict";

import { createElem, getConfigArray, unitsList, buildSlotPlayer, fortune, Unit, slotUnitsEmpty, queueUnits } from './lib.js';
import { setStartSettings, getNearOpponents, checkValidTarget, clearSlotAllUnits } from './lib.js';

export default class CombatWin {

    constructor() {

        this.unitsList = unitsList;
        this.slotUnitsPlayer1 = [];
        this.slotUnitsPlayer2 = [];
        this.listIdPlayer1 = [];
        this.listIdPlayer2 = [];

        // load information about the first and the second players
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );
        jsonconfig = localStorage.getItem( 'configSecondPlayer' );
        this.configSecondPlayer = JSON.parse( jsonconfig );

        const elem = createElem( `<div class="big_container">
        <div class="container"><div class="modal"></div>
            <div class="combat_content header">
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
            <div class="combat_content field">
                <div class="field_listPlayer1">
                    <ul class="listPlayer1"></ul>
                </div>
                <div class="field_main">
                    <div class="group_player1">
                        <ul class="player1_back"></ul>
                        <ul class="player1_front"></ul>
                    </div>
                    <div class="group_player2">
                        <ul class="player2_front"></ul>
                        <ul class="player2_back"></ul>
                    </div>
                </div>
                <div class="field_listPlayer2">
                    <ul class="listPlayer2"></ul>
                </div>
            </div>
            <div class="combat_content footer">
                <div class="btn_op button_defend">Defend</div>
                <div class="btn_op button_wait">Waiting</div>
                <div class="btn_op button_nobody">Nobody</div>
            </div>
        </div>
        </div>` );

        // install fone for field of combat
        this.fieldMain = elem.querySelector( '.field_main' );
        this.fieldMain.classList.add( `${this.getFone()}_field` );

        // fill information about commands of players
        this.listPlayer1 = elem.querySelector( '.listPlayer1' );
        this.listPlayer2 = elem.querySelector( '.listPlayer2' );

        this.configFirstPlayer.raceUnits = getConfigArray( this.configFirstPlayer.race );
        this.configSecondPlayer.raceUnits = getConfigArray( this.configSecondPlayer.race );

        // fill information about captains of players
        let item = createElem( `<li data-id=0><div>
            <img src="./img/${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][9]}"></div>
            <div>${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][0]}<br><br>Health<br>
            <span>${this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][1]}</span></div></li>` );
        this.slotUnitsPlayer1.push( this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain] );
        this.listIdPlayer1.push( { id: 0, name: this.unitsList[this.configFirstPlayer.raceUnits][0][this.configFirstPlayer.captain][0] } );
        this.listPlayer1.append( item );
        
        item = createElem( `<li data-id=0><div>
            <img src="./img/${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][9]}"></div>
            <div>${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][0]}<br><br>Health<br>
            <span>${this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][1]}</span></div></li>` );
        this.slotUnitsPlayer2.push( this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain] );
        this.listIdPlayer2.push( { id: 0, name: this.unitsList[this.configSecondPlayer.raceUnits][0][this.configSecondPlayer.captain][0] } );
        this.listPlayer2.append( item );

        // fill information about units of players
        let counter = 1;
        for( let unit of this.configFirstPlayer.command ) {

            let item = createElem( `<li data-id=${counter}><div><img src="./img/${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][9]}"></div>
            <div>${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][0]}<br><br>Health<br><span>
            ${this.unitsList[this.configFirstPlayer.raceUnits][1][unit][1]}</span></div></li>` );
            this.slotUnitsPlayer1.push( this.unitsList[this.configFirstPlayer.raceUnits][1][unit] );
            this.listIdPlayer1.push( { id: counter, name: this.unitsList[this.configFirstPlayer.raceUnits][1][unit][0] } );
            this.listPlayer1.append( item );
            counter++;

        }

        counter = 1;
        for( let unit of this.configSecondPlayer.command ) {

            let item = createElem( `<li data-id=${counter}><div><img src="./img/${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][9]}"></div>
            <div>${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][0]}<br><br>Health<br><span>
            ${this.unitsList[this.configSecondPlayer.raceUnits][1][unit][1]}</span></div></li>` );
            this.slotUnitsPlayer2.push( this.unitsList[this.configSecondPlayer.raceUnits][1][unit] );
            this.listIdPlayer2.push( { id: counter, name: this.unitsList[this.configSecondPlayer.raceUnits][1][unit][0] } );
            this.listPlayer2.append( item );
            counter++;

        }

        this.separateUnitsKindAttack( this.slotUnitsPlayer1 );

        this.player1Front = elem.querySelector( '.player1_front' );
        this.player1Back = elem.querySelector( '.player1_back' );
        
        this.flag = 'f1';
        this.setUnitsOnField( this.player1Front, this.nearArrayUnits, this.configFirstPlayer.race, this.flag, this.slotUnitsPlayer1 );

        this.flag = 'b1';
        this.setUnitsOnField( this.player1Back, this.anyArrayUnits, this.configFirstPlayer.race, this.flag, this.slotUnitsPlayer1 );

        this.separateUnitsKindAttack( this.slotUnitsPlayer2 );

        this.player2Front = elem.querySelector( '.player2_front' );
        this.player2Back = elem.querySelector( '.player2_back' );

        this.flag = 'f2';
        this.setUnitsOnField( this.player2Front, this.nearArrayUnits, this.configSecondPlayer.race, this.flag, this.slotUnitsPlayer2 );

        this.flag = 'b2';
        this.setUnitsOnField( this.player2Back, this.anyArrayUnits, this.configSecondPlayer.race, this.flag, this.slotUnitsPlayer2 );

        this.player1Back = this.player1Back.querySelectorAll( 'li' );
        this.player1Front = this.player1Front.querySelectorAll( 'li' );
        this.player2Back = this.player2Back.querySelectorAll( 'li' );
        this.player2Front = this.player2Front.querySelectorAll( 'li' );

        this.mainContainer = document.querySelector( '.main_container' );
        this.mainContainer.append( elem );
        this._elem = elem;

        this.modalWindow = this._elem.querySelector( '.modal' );
        this.modalWindow.classList.add( 'loading' );
        const buttonFight = createElem( `<a href="#" class="btn_op">Confirm</a>` );
        this.modalWindow.append( buttonFight );
        buttonFight.addEventListener( 'click', this.startFight );

        this.slotPlayer1 = [...buildSlotPlayer( this.slotUnitsPlayer1 )];
        this.slotPlayer2 = [...buildSlotPlayer( this.slotUnitsPlayer2 )];
        this.slotAllUnits = [...this.slotPlayer1, ...this.slotPlayer2];

        this.actionDone = false;

        this.buttonPanel = this._elem.querySelector( '.footer' );
        this.buttonPanel.addEventListener( 'click', this.clickButton );
        this.fieldMain.addEventListener( 'pointerover', this.overTarget );
        this.fieldMain.addEventListener( 'pointerout', this.leaveTarget );

        console.log(this.listIdPlayer1);
        console.log(this.listIdPlayer2);

    }

    getFone = () => {

        const result = fortune();
        if( result === -1 ) return this.configSecondPlayer.race;
        else return this.configFirstPlayer.race;

    }

    separateUnitsKindAttack = ( slotUnits ) => {

        this.nearArrayUnits = slotUnits.filter( item => item[8] == 'near' );
        this.nearArrayUnits.sort( ( a, b ) => b[1] - a[1] );
        this.anyArrayUnits = slotUnits.filter( item => item[8] == 'any' );
        this.anyArrayUnits.sort( ( a, b ) => b[1] - a[1] );
    
    }

    setUnitsOnField = ( slot, arrayUnits, race, flag, slotUnitPlayer ) => {

        switch ( arrayUnits.length ) {

            case 1:
                for( let i = 1; i < 4; i++ ) {

                    if( i === 2 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[0][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[0][0] ) elem.push( flag+i ); } );
                        continue;

                    }
                    let item = createElem( `<li data-id=${flag+i}></li>`);
                    slot.append( item );

                }
                break;

            case 2:
                for( let i = 1; i < 4; i++ ) {

                    if( i === 1 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[0][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[0][0] ) elem.push( flag+i ); } );
                        continue;

                    }

                    if( i === 3 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[1][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[1][0] ) elem.push( flag+i ); } );
                        continue;

                    }

                    let item = createElem( `<li data-id=${flag+i}></li>`);
                    slot.append( item );

                }
                break;
        
            case 3:
                for( let i = 1; i < 4; i++ ) {

                    if( i === 1 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[1][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[1][0] ) elem.push( flag+i ); } );
                        continue;

                    }

                    if( i === 2 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[0][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[0][0] ) elem.push( flag+i ); } );
                        continue;

                    }

                    if( i === 3 ) {

                        let item = createElem( `<li data-id=${flag+i}><img src="./animation/${race}/${arrayUnits[2][10][0]}"></li>`);
                        slot.append( item );
                        slotUnitPlayer.forEach( elem => { if( elem[0] === arrayUnits[2][0] ) elem.push( flag+i ); } );
                        continue;

                    }

                }
                break;

        }

    }

    startFight = () => {

        this.modalWindow.classList.remove( 'loading' );
        this.modalWindow.remove();
        setTimeout( this.doAction(), 3000 );

    }

    clickButton = ( event ) => {

        const target = event.target;
        if( target.closest( '.button_defend' ) ) {

            const unit = this._elem.querySelector( '.active_unit' );
            this.slotAllUnits.forEach( item => { if( item.position === unit.dataset.id ) item.defend(); } );
            this.actionDone = true;

        } else if( target.closest( '.button_wait' ) ) {

            let indeks;
            const lengthSlot = this.slotAllUnits.length - 1;
            const unit = this._elem.querySelector( '.active_unit' );
            this.slotAllUnits.forEach( ( item, index ) => { if( item.position === unit.dataset.id ) indeks = index; } );
        
            if( indeks === lengthSlot ) {

                return;

            } else {

                const removeElem = this.slotAllUnits.splice( indeks, 1, 'transfer' );
                this.slotAllUnits.push( ...removeElem );

            }
            this.actionDone = true;

        } else if( target.closest( '.button_nobody' ) ) {
            
            const container = this._elem.querySelector( '.container' );
            container.insertAdjacentHTML( 'afterbegin', '<div class="finish_window"></div>' );
            const finishWindow = this._elem.querySelector( '.finish_window' );
            const buttonFinish = createElem( `<a href="#" class="btn_op">Finish</a>` );
            finishWindow.append( buttonFinish );
            buttonFinish.addEventListener( 'click', this.endFight );

        } else return;

    }

    chooseSlot = ( identificator ) => {

        if( identificator[1] === '1' ) return this.slotPlayer1;
        else return this.slotPlayer2;

    }

    overTarget = ( event ) => {

        let slotOpponents;
        const target = event.target;
        const identificator = target.closest( '[data-id]' ).dataset.id;

        if( this.activeUnit.kind === 'Priest' && this.activeUnit.position[1] === identificator[1] ) {
            
            target.classList.add( 'active_target' );
            this.getTarget();
        
        } else if( this.activeUnit.kind === 'Priest' && this.activeUnit.position[1] !== identificator[1] ) { 
            
            return; 
        
        } else if( this.activeUnit.position[1] === identificator[1] || identificator == null ) { 
            
            return; 
        
        } else {

            if( this.activeUnit.distanse === 'any' ) {
                
                target.classList.add( 'active_target' );
                this.getTarget();
            
            } else {

                slotOpponents = getNearOpponents( this.chooseSlot( identificator ) );
                
                if( checkValidTarget( this.activeUnit.position[2], slotOpponents, identificator ) ) {
                    
                    target.classList.add( 'active_target' );
                    this.getTarget();
                
                } else return;
                
            }
    
        }

    }

    getTarget = () => {

        this.activeTarget = this._elem.querySelector( '.active_target' );
        this.activeTarget.addEventListener( 'click', this.catchTarget );

    }
    
    catchTarget = ( event ) => {

        event.preventDefault();

        const target = event.target;
        const identificator = target.closest( '[data-id]' ).dataset.id;
        const slotOpponents = this.chooseSlot( identificator );
        const opponent = [ slotOpponents.find( item => item.position === identificator ) ];
        
        // let listOpponent, listId;
        // if( identificator[1] === '1' ) { listOpponent = this.listPlayer1; listId = this.listIdPlayer1; }
        // else { listOpponent = this.listPlayer2; listId = this.listIdPlayer2; }

        if( this.activeUnit.targets === 1 ) {
            this.activeUnit.attack( opponent );
            // this.checkUnitLive( opponent, slotOpponents, this.slotAllUnits );
        }
        else if( this.activeUnit.targets === 6 ) {
            this.activeUnit.attack( slotOpponents );
            //for( let unit of slotOpponents ) this.checkUnitLive( unit, slotOpponents, this.slotAllUnits );
        }

        this.actionDone = true;

    }

    leaveTarget = () => {

        this.activeTarget.removeEventListener( 'click', this.catchTarget );
        this.activeTarget.classList.remove( 'active_target' );

    }

    checkUnitLive = ( unit, slotPlayer, slotCombat ) => {

        if( unit.currentHealth <= 0 ) {

            slotPlayer.forEach( ( elem, index, array ) => {
                
                if( elem.position === unit.position) {
                    
                    array.splice( index, 1, 'transfer' );
                    
                    if( unit.position[1] === '1' ) {

                        this.listIdPlayer1.forEach( obj => { if( obj.name === unit.kind ) {
                        this.listPlayer1.querySelector( `[data-id="${obj.id}"]` ).innerHTML = '';
                        this.listPlayer1.querySelector( `[data-id="${obj.id}"]` ).append( createElem( `<div><img src="./img/deadicon.png"></div>` ) );
                        } } );

                        this._elem.querySelector( `[data-id="${unit.position}"]` ).innerHTML = '';
                        this._elem.querySelector( `[data-id="${unit.position}"]` ).removeAttribute( `${unit.position}` );
                    
                    } else if( unit.position[1] === '2' ) {

                        this.listIdPlayer2.forEach( obj => { if( obj.name === unit.kind ) {
                        this.listPlayer2.querySelector( `[data-id="${obj.id}"]` ).innerHTML = '';
                        this.listPlayer2.querySelector( `[data-id="${obj.id}"]` ).append( createElem( `<div><img src="./img/deadicon.png"></div>` ) );
                        } } );
                        
                        this._elem.querySelector( `[data-id="${unit.position}"]` ).innerHTML = '';
                        this._elem.querySelector( `[data-id="${unit.position}"]` ).removeAttribute( `${unit.position}` );
                    
                    } 

                }
                
            } );

        slotCombat.forEach( ( item, index, array ) => { 
            if( item !== 'transfer' && item.position === unit.position ) array.splice( index, 1, 'transfer' );
        } );
            
        } else if( unit.currentHealth < unit.health ) {
            
            slotPlayer.forEach( ( item, index ) => {
                
                if( item.position === unit.position && unit.position[1] === '1' ) {

                    this.listIdPlayer1.forEach( obj => { if( obj.name === unit.kind ) {
                        
                        let elemHealth = this.listPlayer1.querySelector( `[data-id="${obj.id}"]` );
                        elemHealth.querySelector( 'span' ).innerHTML = `${unit.currentHealth}`;
                    } } );

                } else if( item.position === unit.position && unit.position[1] === '2' ) {
    
                    this.listIdPlayer2.forEach( obj => { if( obj.name === unit.kind ) {
                        
                        let elemHealth = this.listPlayer2.querySelector( `[data-id="${obj.id}"]` );
                        elemHealth.querySelector( 'span' ).innerHTML = `${unit.currentHealth}`;
                    } } ); 
    
                } 
            } );
            
        } else return;

    }

    async doAction() {

        leaveFight: while( !slotUnitsEmpty( this.slotPlayer1 ) && !slotUnitsEmpty( this.slotPlayer2 ) ) {
            
            setStartSettings( this.slotAllUnits );
            queueUnits( this.slotAllUnits );
            for( let unit of this.slotAllUnits ) {

                if( !unit.kind ) continue;
                let elemLiUnit = this._elem.querySelector( `[data-id="${unit.position}"]` );
                elemLiUnit.classList.add( 'active_unit' );
                this.activeUnit = unit;

                while( !this.actionDone ) {

                    await new Promise( (resolve) => setTimeout( resolve, 1500 ) );

                }

                elemLiUnit.classList.remove( 'active_unit' );
                this.actionDone = false;
                console.log(this.slotAllUnits);
                console.log(this.slotPlayer1);
                console.log( this.slotPlayer2);
                for( let soldier of this.slotPlayer1 ) { 
                    if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer1, this.slotAllUnits );
                }
                for( let soldier of this.slotPlayer2 ) {
                    if( soldier !== 'transfer' ) this.checkUnitLive( soldier, this.slotPlayer2, this.slotAllUnits );
                }
                if( slotUnitsEmpty( this.slotPlayer1 ) ) { console.log( 'Player2 is winner!' ); break leaveFight; }
                if( slotUnitsEmpty( this.slotPlayer2 ) ) { console.log( 'Player1 is winner!' ); break leaveFight; }

            }
            
            clearSlotAllUnits( this.slotAllUnits );
            clearSlotAllUnits( this.slotPlayer1 );
            clearSlotAllUnits( this.slotPlayer2 );

        }

    }

    endFight = () => {

        this.mainContainer.innerHTML = '';
        console.log( 'Nobody win' );

    }

    get elem() {

        return this._elem;
        
    }

}


