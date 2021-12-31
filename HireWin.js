"use strict";

import { createElem, listUnits } from './lib.js';

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
                    <div class="footer_slots">
                        <a href="#" class="btn_op">Hire</a>
                    </div>
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
                    <ul class="info_inner">
                    </ul>
                </div>
            </div>
        </div>
    </div>` );

    this.foneSlotUnits = elem.querySelector( '.slot_units' );
    this.foneSlotUnits.classList.add( `fone_slots_${this.configFirstPlayer.race}` );
    this.foneInfoUnits = elem.querySelector( '.info_units' );
    this.foneInfoUnits.classList.add( `fone_info_${this.configFirstPlayer.race}` );
    this.iconsSlider = elem.querySelector( '.slides_icons' );
    this.arrowUp = elem.querySelector( '.up_arrow' );
    this.arrowDown = elem.querySelector( '.down_arrow' );
    this.infosInner = elem.querySelector( '.info_inner' );
    this.getArrayUnits( this.configFirstPlayer.race );
    

    // fill slider with slides 
    for( let unit of this.listUnits[this.raceUnits] ) {

        let item = createElem( `<li data-id="${unit.id}"><img src="./img/${unit.portrait}"></li>` );
        item.classList.add( `active_ava_${this.configFirstPlayer.race}` )
        this.iconsSlider.append( item );
        item = createElem( `<li><div><p><img src="./img/${unit.portrait}"></p><p>${unit.name}</p></div>
            <div>${unit.startlist}</div><div>${unit.endlist}</div></li>` );
        this.infosInner.append( item );

    }
    
    // start settings
    this.position = 1;
    this.arrowUp.style.display = 'none';

    this.mainContainer = document.querySelector( '.main_container' );
    this.mainContainer.append( elem );
    this._elem = elem;

    // hang handlers on elements
    this.hireContent = this._elem.querySelector( '.recruiting' );
    this.iconSlider = this.iconsSlider.querySelectorAll( 'li' );
    this.infoInner = this.infosInner.querySelectorAll( 'li' );
    console.log(this.iconSlider);
    this.hireContent.addEventListener( 'click', this.clicker );
    this.iconsSlider.ondragstart = function() {
        return false;
    };
    this.iconsSlider.addEventListener( 'pointerdown', this.transference );

    }

    getArrayUnits( race ) {
        
        //this.raceUnits;
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

    transference = (event) => {

        event.preventDefault();
        let target = event.target;
        console.log(target)
        //if( !this.iconSlider.contains( target ) ) return; разобраться с проверкой target=img, а сравниваем с массивом Li-шек
        
        //hang handlers on target 
        target.addEventListener( 'pointermove', this.onPointerMove );
        target.addEventListener( 'pointerup', this.onPointerUp );

    }

    onPointerMove = ( event ) => {

        event.preventDefault();
        let target = event.target;
        const iconUnit = target.cloneNode();
        moveAt(event.pageX, event.pageY);
        // переносит мяч на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
            iconUnit.style.left = pageX - iconUnit.offsetWidth / 2 + 'px';
            iconUnit.style.top = pageY - iconUnit.offsetHeight / 2 + 'px';
        }
        //
        iconUnit.style.position = 'absolute';
        iconUnit.style.zIndex = 300;
        document.body.append( target );
        //let newPositionX = ( event.clientX - iconUnit.getBoundingClientRect().left ) / this.hireContent.offsetWidth;
        // курсор вышел из слайдера => оставить бегунок в его границах.
        //newLeft = (newLeft < 0) ? 0 : newLeft;
        //newLeft = (newLeft > 1) ? 1 : newLeft;
        //moveAt(event.pageX, event.pageY);
        iconUnit.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        iconUnit.hidden = false;
        // событие mousemove может произойти и когда указатель за пределами окна
        // (мяч перетащили за пределы экрана)
        // если clientX/clientY за пределами окна, elementFromPoint вернёт null
        if (!elemBelow) return;
        // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
        let droppableBelow = elemBelow.closest( '.droppable' );
        if (currentDroppable != droppableBelow) {
    // мы либо залетаем на цель, либо улетаем из неё
    // внимание: оба значения могут быть null
    //   currentDroppable=null,
    //     если мы были не над droppable до этого события (например, над пустым пространством)
    //   droppableBelow=null,
    //     если мы не над droppable именно сейчас, во время этого события

        if (currentDroppable) {
      // логика обработки процесса "вылета" из droppable (удаляем подсветку)
            leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
      // логика обработки процесса, когда мы "влетаем" в элемент droppable
            enterDroppable(currentDroppable);
        }
        }

    }

    get elem() {

        return this._elem;
        
    }

}