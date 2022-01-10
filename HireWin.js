"use strict";

import CombatWin from './CombatWin.js';
import { createElem, listUnits, soundsMenu } from './lib.js';

export default class HireWindow {

    constructor() {

        // load information about the first player
        let jsonconfig = localStorage.getItem( 'configFirstPlayer' );
        this.configFirstPlayer = JSON.parse( jsonconfig );

        this.listUnits = listUnits;
        const elem = createElem( `<div class="big_container">
        <div class="container">
            <div class="hire_content header">
                <div class="hire_nameColumn">
                    <div class="phrase">Hire units</div>
                </div>
                <div class="hire_nameGame">
                    <div class="name_game">Command Combat</div>
                    <div class="emblem"></div>
                </div>
            </div>
            <div class="hire_content recruiting">
                <div class="slot_units">
                    <div class="list_slots">
                        <ul class="slots_for_icons">
                            <li class="droppable"></li>
                            <li class="droppable"></li>
                            <li class="droppable"></li>
                        </ul>
                    </div>
                    <div class="footer_slots"></div>
                </div>
                <div class="icon_units">
                    <div class="up_arrow">
                        <img src="./img/arrow_up.png" alt="icon_arrow_up">
                    </div>
                    <div class="icons_inner">
                        <ul class="slides_icons"></ul>
                    </div>
                    <div class="down_arrow">
                        <img src="./img/arrow_down.png" alt="icon_arrow_down">
                    </div>
                </div>
                <div class="info_units">
                    <ul class="info_inner"></ul>
                </div>
            </div>
        </div>
    </div>` );

    // fill information about units for the first player
    this.foneSlotUnits = elem.querySelector( '.slot_units' );
    this.foneSlotUnits.classList.add( `fone_slots_${this.configFirstPlayer.race}` );
    this.foneInfoUnits = elem.querySelector( '.info_units' );
    this.foneInfoUnits.classList.add( `fone_info_${this.configFirstPlayer.race}` );
    this.iconsSlider = elem.querySelector( '.slides_icons' );
    this.arrowUp = elem.querySelector( '.up_arrow' );
    this.arrowDown = elem.querySelector( '.down_arrow' );
    this.infosInner = elem.querySelector( '.info_inner' );
    this.slotsForIcon = elem.querySelector( '.slots_for_icons' ).querySelectorAll( 'li' );
    this.footer = elem.querySelector( '.footer_slots' );
    this.command = [];
    this.counter = 0;
    this.getArrayUnits( this.configFirstPlayer.race );
    

    // fill slider with slides 
    for( let unit of this.listUnits[this.raceUnits] ) {

        let item = createElem( `<li data-id="${unit.id}" class="choose"><img src="./img/${unit.portrait}"></li>` );
        item.classList.add( `active_ava_${this.configFirstPlayer.race}` )
        this.iconsSlider.append( item );
        item = createElem( `<li><div><p><img src="./img/${unit.portrait}"></p><p>${unit.name}</p></div>
            <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
        this.infosInner.append( item );

    }
    
    // start settings for slider
    this.position = 1;
    this.arrowUp.style.display = 'none';

    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    // hang handlers on elements
    this.hireContent = this._elem.querySelector( '.recruiting' );
    this.iconSlider = this.iconsSlider.querySelectorAll( 'li' );
    this.infoInner = this.infosInner.querySelectorAll( 'li' );
    this.hireContent.addEventListener( 'click', this.clicker );
    this.iconsSlider.ondragstart = function() {
        return false;
    };
    this.iconsSlider.addEventListener( 'pointerdown', this.onPointerDown );

    }

    // compare race of configPlayer and units
    getArrayUnits = ( race ) => {
        
        if( race == 'Empire' ) this.raceUnits = 0;
        else if( race == 'Demons' ) this.raceUnits = 1;
        else if( race == 'Elfs' ) this.raceUnits = 2;
        else this.raceUnits = 3;

    }

    // arrows switch method
    clicker = ( event ) => {

        let target = event.target;

        // get sizes of containers for description and icons
        const stepYicons = 135;
        const stepYinfo = 150;
            
        if( target.closest( '.down_arrow' ) ) {
            for( let item of this.infoInner ) {
                item.style.transform = `translateY(-${stepYinfo*this.position}px)`;
            }
            for( let item of this.iconSlider ) {
                item.style.transform = `translateY(-${stepYicons*this.position}px)`;
            }
            this.position += 1;
        }
            
        if( target.closest( '.up_arrow' ) ) {
            for( let item of this.infoInner ) {
                item.style.transform = `translateY(-${stepYinfo*(this.position-2)}px)`;
            }
            for( let item of this.iconSlider ) {
                item.style.transform = `translateY(-${stepYicons*(this.position-2)}px)`;
            }
            this.position -= 1;
        }
        
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

        event.preventDefault();
        let target = event.target;
        if( !target.closest( '.choose' ) ) return;
        this.iconUnit = target.cloneNode();
        this.idUnit = target.closest( '[data-id]' ).dataset.id;
        this.iconUnit.style.position = 'absolute';
        this.iconUnit.style.zIndex = 400;
        this.iconUnit.style.left = event.pageX - this.iconUnit.offsetWidth / 10 + 'px';
        this.iconUnit.style.top = event.pageY - this.iconUnit.offsetHeight / 10 + 'px';
        document.body.append( this.iconUnit );
        this.currentDroppable = null;
        
        //hang handlers on target 
        document.addEventListener( 'pointermove', this.onPointerMove );
        this.iconUnit.addEventListener( 'pointerup', this.onPointerUp );

    }

    onPointerMove = ( event ) => {

        event.preventDefault();
        let target = event.target;
        
        // get coords of cursor and set them for target(clone)
        function moveElement( pageX, pageY ) {
            target.style.left = pageX - target.offsetWidth / 2 + 'px';
            target.style.top = pageY - target.offsetHeight / 2 + 'px';
        }
        moveElement( event.pageX, event.pageY );
        
        // constantly check over which element cursor is located
        target.hidden = true;
        let elemBelow = document.elementFromPoint( event.clientX, event.clientY );
        target.hidden = false;
        
        // if clientX/clientY out from window, elementFromPoint return null
        if (!elemBelow) return;

        // check - potential targets markered (class "droppable")
        let droppableBelow = elemBelow.closest( '.droppable' );
        
        if ( this.currentDroppable != droppableBelow ) {

            // leave potential target
            if ( this.currentDroppable ) {
                this.leaveDroppable( this.currentDroppable );
            }

            this.currentDroppable = droppableBelow;
        
            // come over potential target
            if ( this.currentDroppable ) {
                this.enterDroppable( this.currentDroppable );
            }

        }

    }

    onPointerUp = ( event ) => {
        
        let target = event.target;

        // clone leave out of potential target
        if( this.currentDroppable === null ) {
            target.remove();
            document.removeEventListener( 'pointermove', this.onPointerMove );
            this.iconUnit.removeEventListener( 'pointerup', this.onPointerUp );
            this.iconUnit.remove();
        }
        else if( this.currentDroppable.closest( '.droppable' ) ) {
            target.removeAttribute( 'style' );
            this.currentDroppable.insertAdjacentHTML( 'beforeend', `${target.outerHTML}` );
            this.currentDroppable.classList.remove( 'droppable' );
            this.currentDroppable.setAttribute( 'data-id', this.idUnit );
            this.currentDroppable = null;
            document.removeEventListener( 'pointermove', this.onPointerMove );
            this.iconUnit.removeEventListener( 'pointerup', this.onPointerUp );
            this.iconUnit.remove();
            let rez = this.checkFill();
            if( rez == 3 ) {
                this.footer.insertAdjacentHTML( 'beforeend', '<a href="#" class="btn_op">Hire</a>' );
                this.counter += 1;
                this.footer.querySelector( 'a' ).addEventListener( 'click', this.collectCommand );
            }
        } 
        
    }

    leaveDroppable = ( elem ) => {

        elem.classList.remove( 'active_drop' );

    }

    enterDroppable = ( elem ) => {

        elem.classList.add( 'active_drop' );

    }

    checkFill = () => {

        let count = 0;

        for( let item of this.slotsForIcon ) {

            if( item.innerHTML == '' ) count--;
            else count++;

        }

        return count;

    }

    collectCommand = () => {

        // paste sound for button
        const audio = new Audio();
        audio.src = `${soundsMenu.buttonClickStart}`; 
        audio.autoplay = true;

        if( this.counter == 1 ) {

            for( let item of this.slotsForIcon ) this.command.push( Number( item.dataset.id ) );

            // save config the first player
            const firstPlayerConfig = {

                race: this.configFirstPlayer.race,
                nickname: this.configFirstPlayer.nickname,
                captain: this.configFirstPlayer.captain,
                command: [...this.command]

            };

            let jsonconfig = JSON.stringify( firstPlayerConfig );
            localStorage.setItem( 'configFirstPlayer', jsonconfig );

            // load information about the second player and fill information about units for the second player
            jsonconfig = localStorage.getItem( 'configSecondPlayer' );
            this.configSecondPlayer = JSON.parse( jsonconfig );
            this.foneSlotUnits.classList.remove( `fone_slots_${this.configFirstPlayer.race}` );
            this.foneSlotUnits.classList.add( `fone_slots_${this.configSecondPlayer.race}` );
            this.foneInfoUnits.classList.remove( `fone_info_${this.configFirstPlayer.race}` );
            this.foneInfoUnits.classList.add( `fone_info_${this.configSecondPlayer.race}` );
            this.command = [];
            this.getArrayUnits( this.configSecondPlayer.race );
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
                item = createElem( `<li><div><p><img src="./img/${unit.portrait}"></p><p>${unit.name}</p></div>
                    <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
                this.infosInner.append( item );
        
            }
            this.iconSlider = this.iconsSlider.querySelectorAll( 'li' );
            this.infoInner = this.infosInner.querySelectorAll( 'li' );
            
            // start settings for second player
            this.position = 1;
            this.arrowUp.style.display = 'none';

        } else if( this.counter == 2 ) { 

            for( let item of this.slotsForIcon ) this.command.push( Number( item.dataset.id ) );

            // save config the first player
            const secondPlayerConfig = {

                race: this.configSecondPlayer.race,
                nickname: this.configSecondPlayer.nickname,
                captain: this.configSecondPlayer.captain,
                command: [...this.command]

            };

            let jsonconfig = JSON.stringify( secondPlayerConfig );
            localStorage.setItem( 'configSecondPlayer', jsonconfig );

            this.mainContainer.innerHTML = '';
            const combatPlayers = new CombatWin();

        }

    }

    get elem() {

        return this._elem;
        
    }

}
