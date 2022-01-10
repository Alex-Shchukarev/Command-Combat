"use strict";

export function createElem( html ) {

    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;

}

export const soundsMenu = {
    buttonClickStart: './sounds/audio_menu/button_click_start.mp3',
    buttonClickEnd: './sounds/audio_menu/button_click_exit.mp3',
};

export const races = [
    { name: 'E M P I R E',
    image: 'race_empire_img.png',
    description: `The empire of humans is one of the most numerous races and one of the most controversial. People are building cities 
    and erecting fortifications. Masters of blacksmithing create the best armor that has saved the lives of soldiers many times. 
    Royal blacksmiths are known far beyond the empire.`,
    id: 'Empire' },
    { name: 'D E M O N S',
    image: 'race_demons_img.png',
    description: `All vices and sins become a cradle for demons, who nourish and give them strength. In the fiery hell their bodies 
    are tempered. All those who stand on the dark side are able to draw energy from the fiery hyena and heal the deepest wounds on 
    themselves.`,
    id: 'Demons' },
    { name: 'E L F S',
    image: 'race_elfs_img.png',
    description: `Elves are one of the oldest races and one of the wisest. They live in magical forests. Their keepers control 
    the forces of nature. They are skilled in archery. They make thin and light armor that allows them to be fast in battle.`,
    id: 'Elfs' },
    { name: 'D E A D S',
    image: 'race_deads_img.png',
    description: `The damned will not be accepted either in heaven or hell, they remain to wander the earth. Graves and crypts 
    help them to recover. If the dead man was in charge of magic during his lifetime, then after death he will gain all the power of 
    curses.`,
    id: 'Deads' }
];


const empireListCaptain = [
    { name: 'Captain of the Royal Cavalry',
    portrait: 'ava_empire_cavalry.png',
    description: `The Royal Cavalry is the most powerful strike force of the Empire. The captain leads the Royal cavalry. 
    He has a lot of experience in battles, a strong grip and excellent possession of weapons.`,
    avatar: 'empire_cavalry.png',
    id: 0,
    characteristics: [ 'Empire', '200', '50', '40', '0', '20', '0' ] },

    { name: 'Archmage of the Empire',
    portrait: 'ava_empire_archimag.png',
    description: `The Royal School of Magic educates only those people who have the ability to work miracles. Having learned 
    all the secrets of magic, the magician becomes an archmage. Archmages stands to protect the human empire from the dark forces.`,
    avatar: 'empire_archimag.png',
    id: 1,
    characteristics: [ 'Empire', '140', '40', '0', '15', '20', '0' ] },

    { name: 'Commander of the Royal Rangers',
    portrait: 'ava_empire_ranger.png',
    description: `The Royal Rangers are the best shooters and hunters in the entire empire. The best of them become commanders 
    who lead squads and guilds. Fire arrows fired by the royal ranger's hand always hit the target.`,
    avatar: 'empire_ranger.png',
    id: 2,
    characteristics: [ 'Empire', '170', '60', '30', '0', '20', '0' ] }
];

let jsonconfig = JSON.stringify( empireListCaptain );
localStorage.setItem( 'Empire', jsonconfig );

const demonsListCaptain = [
    { name: 'Duke of the Legion of Hate',
    portrait: 'ava_demons_duke.png',
    description: `When people are filled with hatred, he comes to the surface from the hyena of fire. The Duke commands 
    a legion of demons and has been waiting for the right moment for centuries when he can deliver a fatal blow.`,
    avatar: 'demons_duke.png',
    id: 0,
    characteristics: [ 'Demons', '250', '50', '40', '0', '0', '0' ] },

    { name: 'Countess of the Infernal Cult',
    portrait: 'ava_demons_countess.png',
    description: `If a noblewoman begins to study dark magic, then demonology will definitely accept her into a hellish cult. 
    There she will be able to comprehend all the subtleties of demonic magic and draw strength from the fiery hyena.`,
    avatar: 'demons_countess.png',
    id: 1,
    characteristics: [ 'Demons', '190', '40', '0', '15', '0', '0' ] },

    { name: 'Lord of the Hordes of Wrath',
    portrait: 'ava_demons_lord.png',
    description: `A person in anger is easy to control. In a fit of anger, the most terrible deeds are committed. This is 
    effectively used by the lord of the hordes of wrath. He pushes everyone against each other and always gets what he needs.`,
    avatar: 'demons_lord.png',
    id: 2,
    characteristics: [ 'Demons', '220', '60', '0', '30', '0', '0' ] }
];

jsonconfig = JSON.stringify( demonsListCaptain );
localStorage.setItem( 'Demons', jsonconfig );

const elfsListCaptain = [
    { name: 'The Elven Lord',
    portrait: 'ava_elfs_lord.png',
    description: `The best elven commanders become masters of entire regions. They are given the best elven blades as a sign 
    of honor and respect. In battle, they use the most skillful tactics and strategies that they have honed for centuries`,
    avatar: 'elfs_lord.png',
    id: 0,
    characteristics: [ 'Elfs', '200', '60', '40', '0', '0', '0' ] },

    { name: 'Keeper of Magical Runes',
    portrait: 'ava_elfs_keeper.png',
    description: `The runes of the forces of nature are passed from one guardian to another. Only the most experienced keepers 
    have learned to control all the forces of nature and use them to protect their people.`,
    avatar: 'elfs_keeper.png',
    id: 1,
    characteristics: [ 'Elfs', '140', '50', '0', '15', '0', '0' ] },

    { name: 'Forest Ranger Commander',
    portrait: 'ava_elfs_ranger.png',
    description: `A well-aimed eye and a sharp arrow are the best weapons for an elf ranger. The crowns of the trees serve as 
    an excellent camouflage for them. The best of the rangers become the commanders of entire garrisons that guard the borders.`,
    avatar: 'elfs_ranger.png',
    id: 2,
    characteristics: [ 'Elfs', '170', '70', '30', '0', '0', '0' ] }
];

jsonconfig = JSON.stringify( elfsListCaptain );
localStorage.setItem( 'Elfs', jsonconfig );

const deadsListCaptain = [
    { name: 'Lord of the Skeletons',
    portrait: 'ava_deads_lord.png',
    description: `When the flesh rots and the bones are exposed, the skeleton will become a servant of the Skeleton Lord. If there 
    is a cemetery nearby, then building a new army is not a problem for him. His servants do not feel pain and fatigue.`,
    avatar: 'deads_lord.png',
    id: 0,
    characteristics: [ 'Deads', '200', '50', '40', '0', '0', '30' ] },

    { name: 'Queen of the Liches',
    portrait: 'ava_deads_queen.png',
    description: `During their lifetime, they were the keepers of the runes of the Elven people. After their death, their beauty 
    left their bones exposed, and their magical abilities multiplied thanks to dark occult skill.`,
    avatar: 'deads_queen.png',
    id: 1,
    characteristics: [ 'Deads', '140', '40', '0', '15', '0', '30' ] },

    { name: 'The Supreme Vampire',
    portrait: 'ava_deads_vampire.png',
    description: `Those who reject the word of the Almighty become the living dead, forced to drink the blood of living people. 
    Vampires who have achieved the highest success in enslaving the living become supreme Vampires.`,
    avatar: 'deads_vampire.png',
    id: 2,
    characteristics: [ 'Deads', '140', '60', '30', '0', '0', '30' ] }
];

jsonconfig = JSON.stringify( deadsListCaptain );
localStorage.setItem( 'Deads', jsonconfig );

export const unitsList = [
[ [ [ 'Captain of the Royal Cavalry', 200, 50, 40, 0, 20, 0, 1, 'near', 'empire_captain.png', ['ImageM.gif', 1, 2 ], [ 1, 2 ] ],
    [ 'Archmage of the Empire', 140, 40, 0, 15, 20, 0, 6, 'any', 'empire_sorcerer.png', ['sorcerer_getdamage.gif', 1, 2 ], [ 1, 2 ] ],
    [ 'Commander of the Royal Rangers', 170, 60, 30, 0, 20, 0, 1, 'any', 'empire_rangers.png', ['ImageM.gif', 1, 2 ], [ 1, 2 ] ] 
    ],

    [ [ 'Knight', 170, 50, 25, 0, 20, 0, 1, 'near', 'empire_knight.png', ['ImageM.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Witchunter', 140, 50, 25, 0, 0, 100, 1, 'near', 'empire_witchunter.png', ['ImageM.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Archer', 140, 60, 0, 20, 20, 0, 1, 'any', 'empire_archer.png', ['ImageM.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Mag', 110, 40, 0, 100, 20, 0, 6, 'any', 'empire_mag.png', ['sorcerer_getdamage.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Priest', 110, 20, 0, 20, 20, 0, 1, 'any', 'empire_priest.png', ['sorcerer_getdamage.gif', 1, 2 ], [ 1, 2 ] ] 
    ]
],

[ [ [ 'Duke of the Legion of Hate', 250, 50, 40, 0, 0, 0, 1, 'near', 'demons_dukes.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Countess of the Infernal Cult', 190, 40, 0, 15, 0, 0, 6, 'any', 'demons_countes.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Lord of the Hordes of Wrath', 220, 60, 0, 30, 0, 0, 1, 'any', 'demons_ranger.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ] 
    ],

    [ [ 'Hall warrior', 200, 50, 25, 0, 0, 0, 1, 'near', 'demons_hall_warrior.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Dark knight', 170, 50, 25, 0, 0, 50, 1, 'near', 'demons_dark_knight.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Demonolog', 110, 40, 10, 0, 20, 0, 6, 'any', 'demons_demonolog.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Gargoyle', 170, 60, 20, 0, 0, 0, 1, 'any', 'demons_gargoyle.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ],
        [ 'Modeus', 140, 40, 0, 100, 0, 0, 6, 'any', 'demons_modeus.png', ['gorg.gif', 1, 2 ], [ 1, 2 ] ] 
    ]
],

[
    [],
    []
],

[
    [],
    []
]

];

export const listUnits = [

    [ { name: 'Knight',
    portrait: 'empire_knight.png',
    startlist: '<p><br>health - 170<br>iniciative - 50<br>damage - 25<br>armor - 20<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - near<br>capability - none</p>',
    id: 0 },
    { name: 'Witchunter',
    portrait: 'empire_witchunter.png',
    startlist: '<p><br>health - 140<br>iniciative - 50<br>damage - 25<br>armor - 0<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - near<br>capability - immunity to magic</p>',
    id: 1 },
    { name: 'Archer',
    portrait: 'empire_archer.png',
    startlist: '<p><br>health - 140<br>iniciative - 60<br>damage - 0<br>armor - 20<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 20<br>mag.defense - 0<br>attack - any<br>capability - none</p>',
    id: 2 },
    { name: 'Mag',
    portrait: 'empire_mag.png',
    startlist: '<p><br>health - 110<br>iniciative - 40<br>damage - 0<br>armor - 20<br>targets - 6</p>',
    endlist: '<p><br>mag.damage - 10<br>mag.defense - 0<br>attack - all<br>capability - none</p>',
    id: 3 },
    { name: 'Priest',
    portrait: 'empire_priest.png',
    startlist: '<p><br>health - 110<br>iniciative - 20<br>damage - 0<br>armor - 20<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - neither<br>capability - healing</p>',
    id: 4 } ],

    [ { name: 'Hall warrior',
    portrait: 'demons_hall_warrior.png',
    startlist: '<p><br>health - 200<br>iniciative - 50<br>damage - 25<br>armor - 0<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - near<br>capability - none</p>',
    id: 0 },
    { name: 'Dark knight',
    portrait: 'demons_dark_knight.png',
    startlist: '<p><br>health - 170<br>iniciative - 50<br>damage - 25<br>armor - 0<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 50<br>attack - near<br>capability - none</p>',
    id: 1 },
    { name: 'Demonolog',
    portrait: 'demons_demonolog.png',
    startlist: '<p><br>health - 110<br>iniciative - 40<br>damage - 10<br>armor - 20<br>targets - 6</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - all<br>capability - none</p>',
    id: 2 },
    { name: 'Gargoyle',
    portrait: 'demons_gargoyle.png',
    startlist: '<p><br>health - 170<br>iniciative - 60<br>damage - 20<br>armor - 0<br>targets - 1</p>',
    endlist: '<p><br>mag.damage - 0<br>mag.defense - 0<br>attack - any<br>capability - none</p>',
    id: 3 },
    { name: 'Modeus',
    portrait: 'demons_modeus.png',
    startlist: '<p><br>health - 140<br>iniciative - 40<br>damage - 0<br>armor - 0<br>targets - 6</p>',
    endlist: '<p><br>mag.damage - 10<br>mag.defense - 0<br>attack - all<br>capability - none</p>',
    id: 4 } ]

];

export function fortune() {

    let fortune = Math.round( Math.random() );
    if( fortune === 1 ) return -1;
    else return 1;

}

export class Unit {

    constructor( config ) {

        this.kind = config[0];
        this.health = config[1];
        this.iniciative = config[2];
        this.damage = config[3];
        this.magicalDamage = config[4];
        this.armor = config[5];
        this.magicalDefense = config[6];
        this.targets = config[7];
        this.distanse = config[8];
        this.unitStatic = config[10][0];
        this.unitAttack = config[10][1];
        this.unitGetDam = config[10][2];
        this.unitAttackSound = config[11][0];
        this.unitGetDamSound = config[11][1];
        this.position = config[12];
        this.currentHealth = config[1];
        this.currentArmor = config[5];
        

    }

    defend = () => {

        if( this.currentArmor < 50 ) this.currentArmor = this.armor + 50;
        else this.currentArmor = this.currentArmor;

    }

    attack( opponents ) {

        // загружаем анимашку удара и звук удара
        for( let opponent of opponents ) {

            if( opponent.kind ) {
                let damage = this.damage - Math.floor( ( this.damage * opponent.currentArmor / 100 ) );
                let magicalDamage = this.magicalDamage - Math.floor( (this.magicalDamage * opponent.magicalDefense / 100 ) );
                opponent.getDamage( damage, magicalDamage );
            } else { continue; }

        }

    }

    getDamage( damage, magicalDamage ) {

        
        // загружаем анимашку с получением урона и звук боли
        this.currentHealth -= (damage + magicalDamage);
        // уменьшаем полоску жизней на экране
    
    }

}

// compare race of configPlayer and units
export function getConfigArray( race ) {
    
    if( race == 'Empire' ) return 0;
    else if( race == 'Demons' ) return 1;
    else if( race == 'Elfs' ) return 2;
    else return 3;

}

export function slotUnitsEmpty( slot ) {

    let counter = 0;
    slot.forEach( item => { if( item !== 'transfer' ) counter++; } );
    if( counter === 0 ) return true;
    else return false;

}

export function queueUnits( unitsSlot ) {
    
    unitsSlot.sort( function compareNumeric( a, b ) {
        if ( a.iniciative > b.iniciative ) return -1;
        if ( a.iniciative == b.iniciative ) return fortune();
        if ( a.iniciative < b.iniciative ) return 1;    
} );

}

export function clearSlotAllUnits( slot ) {

    let flag = false;
    while( !flag ) {
                
        if( slot.includes( 'transfer' ) ) slot.splice( slot.indexOf( 'transfer' ), 1 );
        else flag = true;

    }

    return;
    
}

export function setStartSettings( unitsSlot ) {

    unitsSlot.forEach( element => element.currentArmor = element.armor );
    
}

export function buildSlotPlayer( slotPlayer ) {

    const arrayUnit = [];

    for( let config of slotPlayer ) arrayUnit.push( new Unit( config ) );

    return arrayUnit;

}

export function getNearOpponents( slotPlayer ) {

    let arrayNearTargets = slotPlayer.filter( item => item.distanse === 'near' );
    if( arrayNearTargets.length !== 0 ) return arrayNearTargets;
    else arrayNearTargets = slotPlayer.filter( item => item.distanse === 'any' );
    return arrayNearTargets;

}

export function checkValidTarget( flag, slotOpponents, idTarget ) {

    let isValid = false;

    switch ( flag ) {
        case '1':   
            slotOpponents.forEach( item => { if( ( item.position[2] === '1' && item.position === idTarget ) 
            || ( item.position[2] === '2' && item.position === idTarget ) ) isValid = true; } );
            break;

        case '2':   
            slotOpponents.forEach( item => { if( item.position === idTarget ) isValid = true; } );
            break;

        case '3':   
            slotOpponents.forEach( item => { if( ( item.position[2] === '3' && item.position === idTarget ) 
            || ( item.position[2] === '2' && item.position === idTarget ) ) isValid = true; } );
            break;

    }

    return isValid;

}