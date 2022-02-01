"use strict";

// расстановка юнитов ближнего боя на поле
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