"use strict";

import { soundsMenu } from './lib.js';

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
        this.id = config[10];
        this.position = config[11];
        this.unitStatic = config[12][0];
        this.unitAttack = config[12][1];
        this.unitGetDam = config[12][2];
        this.unitDeath = config[12][3];
        this.unitAttackSound = config[13][0];
        this.unitDeathSound = config[13][1];
        this.currentHealth = config[1];
        this.currentArmor = config[5];
        this.currentMagicalDefense = config[6];

    }

    defend = () => {
        // загружаем звук защиты
        const audio = new Audio();
        audio.src = `${soundsMenu.combatDefend}`; 
        audio.autoplay = true;
        // повышаем броню  и магическую защиту на 50
        if( this.currentArmor <= 50 ) this.currentArmor = this.armor + 50;
        else this.currentArmor = this.currentArmor;
        
        if( this.currentMagicalDefense <= 50 ) this.currentMagicalDefense = this.magicalDefense + 50;
        else this.currentMagicalDefense = this.currentMagicalDefense;

    }

    damageOpponent = ( opponents ) => {

        for( let opponent of opponents ) {

            if( opponent !== 'transfer') {

            let damage = this.damage - Math.floor( ( this.damage * opponent.currentArmor / 100 ) );
            let magicalDamage = this.magicalDamage - Math.floor( (this.magicalDamage * opponent.currentMagicalDefense / 100 ) );
            opponent.currentHealth -= ( damage + magicalDamage );
            
            }
        
        }
    }

}


export class Mag extends Unit {

    constructor( config ) {

        super( config );
        this.unitAllAttack = config[12][3];
        this.unitDeath = config[12][4];

    }

}

export class Priest extends Unit {

    constructor( config ) {

        super( config );

    }

    damageOpponent = ( opponents ) => {

        for( let opponent of opponents ) {

            if( opponent !== 'transfer') {

            let healthing = this.damage + this.magicalDamage;
            if( ( healthing + opponent.currentHealth ) > opponent.health ) opponent.currentHealth = opponent.health;
            else opponent.currentHealth += healthing;
            
            }
        
        }
    }

}

export class Vampire extends Unit {

    constructor( config ) {

        super( config );

    }

    damageOpponent = ( opponents ) => {

        for( let opponent of opponents ) {

            if( opponent !== 'transfer') {

                let damage = this.damage - Math.floor( ( this.damage * opponent.currentArmor / 100 ) );
                let magicalDamage = this.magicalDamage - Math.floor( (this.magicalDamage * opponent.currentMagicalDefense / 100 ) );
                let healthing = damage + magicalDamage;
                opponent.currentHealth -= healthing;
                if( ( healthing / 2 + this.currentHealth ) > this.health ) this.currentHealth = this.health;
                else this.currentHealth += healthing / 2;
                
            
            }
        
        }
    }

}