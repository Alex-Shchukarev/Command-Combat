"use strict";

import { Unit, Mag } from "./Units.js";

export function createElem( html ) {

    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;

}

// верстка для каждой страницы
export const contentArray = {
    startWin: `<div class="start_container"><div><div class="name_game">Command Combat</div><div class="emblem"></div></div>   
    <div class="prologue"><div class="pro_img"></div><p>На протяжении многих веков четыре Великие Расы боролись за власть и земли. 
    Большинство регионов населено вероотступниками, которые ждут прихода к власти сильнейшей расы.Захватывающая, пошаговая стратегия 
    "Командный бой" позволит вам окунуться в мир фентази. Каждая раса борется за право возглавить турнирную таблицу. Кому поможете вы?
    Это может быть доблестная Империя, благородные Эльфы, жестокие Демоны или восставшие Мертвецы, выбирайте и сражайтесь!</p></div>
    <ul class="menu"><li class="start"><a href="#" class="btn_op">НАЧАТЬ ИГРУ</a></li><li class="exit"><a href="#" class="btn_op">ВЫХОД</a>
    </li></ul><div class="useful_link"><div class="git"><a href="https://github.com/Alex-Shchukarev/JSlearn/tree/master/project"></a>
    </div><p>v. 1.2</p><p>Shukarev A.A.</p></div></div>`,
    raceWin: `<div class="race big_container"><div class="first_player"><div class="modal_pl1"></div><div class="name fpl">
    <div class="pl1 phrase">Игрок 1</div><input type="text" class="input_name plf" name="first_player" placeholder="Artur_1"></div>
    <div class="race_description plr1"><div class="map left"></div></div><div class="choose fplr"><a href="#" class="btn_op">ОК</a></div>
    </div><div class="race_menu"><div class="races"><div class="name_game">Command Combat</div><div class="emblem"></div></div>
    <div class="race_inner"></div><div class="race_arrows"><div class="race_arrow_left"><img src="./img/arrow_left.png" alt="icon_arrow_left">
    </div><div class="race_choose phrase">Выбрать расу</div><div class="race_arrow_right"><img src="./img/arrow_right.png" alt="icon_arrow_right">
    </div></div></div><div class="second_player"><div class="modal_pl2 disabled_pl2"></div><div class="name spl">
    <div class="pl2 phrase">Игрок 2</div><input type="text" class="input_name pls" name="second_player" placeholder="Lancelot_5"></div>
    <div class="race_description plr2"><div class="map right"></div></div><div class="choose splr"><a href="#" class="btn_op">ОК</a></div>
    </div></div>`,
    captainWin: `<div class="big_container"><div class="container"><div class="captain header"><div class="captain_header title">
    <div class="name_marker phrase">Меню Капитана</div></div><div class="captain_header logo"><div class="promo">
    <div class="name_game">Command Combat</div><div class="emblem"></div></div></div><div class="captain_header column"></div></div>
    <div class="captain content"><div class="captain_content players_list"><div class="captain_content_list firstplayer_list">
    <div class="modal_pl1"></div><div class="player1_list_content"><ul><li class="phrase">Игрок 1</li><li class="phrase"></li>
    <li class="phrase"></li></ul><div class="button_list_fp"><a href="#" class="btn_op">OK</a></div></div></div>
    <div class="captain_content_list secondplayer_list"><div class="modal_pl2 disabled_player2_list"></div>
    <div class="player2_list_content"><ul><li class="phrase">Игрок 2</li><li class="phrase"></li><li class="phrase"></li></ul>
    <div class="button_list_sp"><a href="#" class="btn_op">OK</a></div></div></div></div><div class="captain_content captain_inform">
    <div class="captain_info name_inform"><p></p></div><div class="captain_info avatar_inform"><div class="ava_captain"></div>
    <ul class="name_characteristics"><li>Здоровье</li><li>Инициатива</li><li>Урон</li><li>Магич. урон</li><li>Броня</li>
    <li>Магич. защита</li><li>Цели</li><li>Аттака</li></ul><ul class="value_characteristics"></ul></div>
    <div class="captain_info description_inform"><p></p></div></div><div class="captain_content captain_list"><ul></ul></div></div>
    <div class="captain footer"></div></div></div>`,
    modalHire: `<div class="big_container"><div class="container"><div class="modal_window"><div class="modal_header">
    <div class="header_modal">Модальное окно - Найм юнитов</div><p>1.Просмотрите всех юнитов с помощью переключения стрелок<br>
    2.Ознакомтесь с описанием характеристик каждого юнита перед выбором<br>3.Перетащите иконку понравившегося юнита в любой свободный слот, пока не заполните все слоты юнитами</p>
    <p>Подсказка - старайтесь выбрать юнитов с разными способностями, чтобы сделать команду более сбалансированной</p>
    <img src="./img/close.png" class="close_icon"></div><div class="modal_main"><div class="button_close"><a href="#" class="btn_op">ЗАКРЫТЬ</a>
    </div></div></div></div></div>`,
    hireWin: `<div class="big_container"><div class="container"><div class="hire_content header"><div class="hire_nameColumn">
    <div class="phrase">Найм юнитов</div></div><div class="hire_nameGame"><div class="name_game">Command Combat</div><div class="emblem">
    </div></div></div><div class="hire_content recruiting"><div class="slot_units"><div class="list_slots"><ul class="slots_for_icons">
    <li class="droppable"></li><li class="droppable"></li><li class="droppable"></li></ul></div><div class="footer_slots"></div></div>
    <div class="icon_units"><div class="up_arrow"><img src="./img/arrow_up.png" alt="icon_arrow_up"></div><div class="icons_inner">
    <ul class="slides_icons"></ul></div><div class="down_arrow"><img src="./img/arrow_down.png" alt="icon_arrow_down"></div></div>
    <div class="info_units"><ul class="info_inner"></ul></div></div></div></div>`,
    modalSetUnits: `<div class="big_container"><div class="container"><div class="modal_window"><div class="modal_head">
    <div class="header_modal">Модальное окно - расстановка юнитов</div><p>1.Перетащите юнитов ближнего боя в ячейки колонки 2. ФРОНТ<br>
    Для игрока 1 колонка ФРОНТ находится справа, для игрока 2 - слева<br>Когда расставите всех игроков на поле, автоматически появится 
    кнопка СОХРАНИТЬ расстановку</p><p>Подсказка - юниты ближнего боя могут атаковать цель стоящую напротив или по диагонали 3.<br> 
    Руководствуйтесь этим при расстановке.</p><img src="./img/close.png" class="close_icon"></div><div class="modal_main_set">
    <div class="first_hint_set"></div><div class="second_hint_set"></div><div class="but_close"><a href="#" class="btn_op">ЗАКРЫТЬ</a>
    </div></div></div></div></div>`,
}

export const soundsMenu = {
    buttonClickStart: './sounds/audio_menu/button_click_start.mp3',
    buttonClickEnd: './sounds/audio_menu/button_click_exit.mp3',
    arrowClick: './sounds/audio_menu/arrow_click.mp3',
    hireSetUnit: './sounds/audio_menu/hire_set_unit.mp3',
    errorAlarm: './sounds/audio_menu/error.mp3',
    captainChoose: './sounds/audio_menu/choose_captain.mp3',
    startBattle: './sounds/audio_menu/battle.mp3',
    combatDefend: './sounds/audio_menu/defend.mp3',
    combatWait: './sounds/audio_menu/wait.mp3',
    nobodyWin: './sounds/audio_menu/final.mp3'

};

export const soundsCaptains = [
    [ './sounds/audio_menu/empire_captain.mp3', './sounds/audio_menu/empire_mag.mp3', './sounds/audio_menu/empire_ranger.mp3'], 
    [ './sounds/audio_menu/demons_duke.mp3', './sounds/audio_menu/demons_mag.mp3', './sounds/audio_menu/demons_ranger.mp3'],
    [ './sounds/audio_menu/elfs_lord.mp3', './sounds/audio_menu/elfs_keeper.mp3', './sounds/audio_menu/elfs_ranger.mp3'],
    [ './sounds/audio_menu/deads_lord.mp3', './sounds/audio_menu/deads_lich.mp3', './sounds/audio_menu/deads_vampire.mp3']
];

export const musicHireWindow = [ './sounds/audio_menu/empire_music.mp3', './sounds/audio_menu/demons_music.mp3', 
'./sounds/audio_menu/elfs_music.mp3', './sounds/audio_menu/deads_music.mp3' ];

export const soundsUnits = [ [ '-', [ './sounds/audio_units/Empire/captain_attack.mp3', './sounds/audio_units/Empire/captain_death.mp3'],
[ './sounds/audio_units/Empire/arhimag_attack.mp3', './sounds/audio_units/Empire/arhimag_death.mp3'],
[ './sounds/audio_units/Empire/ranger_attack.mp3', './sounds/audio_units/Empire/ranger_death.mp3'],
[ './sounds/audio_units/Empire/knight_attack.mp3', './sounds/audio_units/Empire/knight_death.mp3'],
[ './sounds/audio_units/Empire/witchhunter_attack.mp3', './sounds/audio_units/Empire/witchhunter_death.mp3'],
[ './sounds/audio_units/Empire/archer_attack.mp3', './sounds/audio_units/Empire/archer_death.mp3'],
[ './sounds/audio_units/Empire/mag_attack.mp3', './sounds/audio_units/Empire/mag_death.mp3'],
[ './sounds/audio_units/Empire/priest_attack.mp3', './sounds/audio_units/Empire/priest_death.mp3'] ],
[ '-', [ './sounds/audio_units/Demons/duke_attack.mp3', './sounds/audio_units/Demons/duke_death.mp3'],
[ './sounds/audio_units/Demons/countles_attack.mp3', './sounds/audio_units/Demons/countles_death.mp3'],
[ './sounds/audio_units/Demons/lord_attack.mp3', './sounds/audio_units/Demons/lord_death.mp3'],
[ './sounds/audio_units/Demons/hallwarior_attack.mp3', './sounds/audio_units/Demons/hallwarior_death.mp3'],
[ './sounds/audio_units/Demons/darkknight_attack.mp3', './sounds/audio_units/Demons/darkknight_death.mp3'],
[ './sounds/audio_units/Demons/demonolog_attack.mp3', './sounds/audio_units/Demons/demonolog_death.mp3'],
[ './sounds/audio_units/Demons/gorgulia_attack.mp3', './sounds/audio_units/Demons/gorgulia_death.mp3'],
[ './sounds/audio_units/Demons/modeus_attack.mp3', './sounds/audio_units/Demons/modeus_death.mp3'] ], 
[ '-', [ './sounds/audio_units/Elfs/lord_attack.mp3', './sounds/audio_units/Elfs/lord_death.mp3'],
[ './sounds/audio_units/Elfs/keeper_attack.mp3', './sounds/audio_units/Elfs/keeper_death.mp3'],
[ './sounds/audio_units/Elfs/ranger_attack.mp3', './sounds/audio_units/Elfs/ranger_death.mp3'],
[ './sounds/audio_units/Elfs/centaur_attack.mp3', './sounds/audio_units/Elfs/centaur_death.mp3'],
[ './sounds/audio_units/Elfs/archer_attack.mp3', './sounds/audio_units/Elfs/archer_death.mp3'],
[ './sounds/audio_units/Elfs/overlord_attack.mp3', './sounds/audio_units/Elfs/overlord_death.mp3'],
[ './sounds/audio_units/Elfs/guard_attack.mp3', './sounds/audio_units/Elfs/guard_death.mp3'],
[ './sounds/audio_units/Elfs/mag_attack.mp3', './sounds/audio_units/Elfs/mag_death.mp3'] ],
[ '-', [ './sounds/audio_units/Deads/lord_attack.mp3', './sounds/audio_units/Deads/lord_death.mp3'],
[ './sounds/audio_units/Deads/lich_attack.mp3', './sounds/audio_units/Deads/lich_death.mp3'],
[ './sounds/audio_units/Deads/vampire_attack.mp3', './sounds/audio_units/Deads/vampire_death.mp3'],
[ './sounds/audio_units/Deads/skelet_attack.mp3', './sounds/audio_units/Deads/skelet_death.mp3'],
[ './sounds/audio_units/Deads/zombi_attack.mp3', './sounds/audio_units/Deads/zombi_death.mp3'],
[ './sounds/audio_units/Deads/necromant_attack.mp3', './sounds/audio_units/Deads/necromant_death.mp3'],
[ './sounds/audio_units/Deads/ghost_attack.mp3', './sounds/audio_units/Deads/ghost_death.mp3'],
[ './sounds/audio_units/Deads/lican_attack.mp3', './sounds/audio_units/Deads/lican_death.mp3'] ] ];

// описание и картинки для страницы - выбор расы
export const races = [
    { name: 'E M P I R E',
    image: 'race_empire_img.png',
    description: `Империя людей - одна из самых многочисленных рас и одна из самых противоречивых. Люди строят города
    и возводят укрепления. Мастера кузнечного дела создают лучшие доспехи, которые много раз спасали жизни солдат.
    Королевские кузницы известны далеко за пределами империи. Способность - стартовая броня.`,
    id: 'Empire' },
    { name: 'D E M O N S',
    image: 'race_demons_img.png',
    description: `Все пороки и грехи становятся колыбелью для демонов, которые питают и придают им силу. В геенне огненной их тела
    закалены. Все те, кто стоит на темной стороне, способны черпать энергию из огненной гиены и залечивать самые глубокие раны на
    себе. Способность - увеличенное здоровье.`,
    id: 'Demons' },
    { name: 'E L F S',
    image: 'race_elfs_img.png',
    description: `Эльфы - одна из древнейших рас и одна из самых мудрых. Они живут в волшебных лесах. Их хранители управляют
    силами природы. Многие эльфы искусны в стрельбе из лука. Они делают тонкую и легкую броню, которая позволяет им быть быстрыми в бою.
    Способность - повышенная инициатива.`,
    id: 'Elfs' },
    { name: 'D E A D S',
    image: 'race_deads_img.png',
    description: `Проклятых не примут ни на небесах, ни в аду, они останутся скитаться по земле. Могилы и склепы помогают им 
    восстанавливаться. Если покойник при жизни занимался магией, то после смерти он получит всю силу проклятий. Способность - стартовая 
    защита от магии.`,
    id: 'Deads' }
];

// описание и картинки для страницы - выбор капитана
const empireListCaptain = [
    { name: 'Капитан Королевской Кавалерии',
    portrait: 'ava_empire_cavalry.png',
    description: `Королевская кавалерия - самая мощная ударная сила Империи. Капитан возглавляет королевскую кавалерию.
    У него большой опыт в боях, крепкая хватка и отличное владение оружием.`,
    avatar: 'empire_cavalry.png',
    id: 0,
    characteristics: [ '200', '50', '40', '0', '20', '0', '1', 'ближняя' ] },

    { name: 'Архимаг Империи',
    portrait: 'ava_empire_archimag.png',
    description: `Королевская школа Магии обучает только тех людей, которые обладают способностью творить чудеса. Познав
    все секреты магии, маг становится архимагом. Архимаги стоят на защите человеческой империи от темных сил.`,
    avatar: 'empire_archimag.png',
    id: 1,
    characteristics: [ '120', '40', '0', '20', '20', '0', '6', 'дальняя' ] },

    { name: 'Командир Королевских Рейнджеров',
    portrait: 'ava_empire_ranger.png',
    description: `Королевские рейнджеры - лучшие стрелки и охотники во всей империи. Лучшие из них становятся командирами
    которые возглавляют отряды и гильдии. Огненные стрелы, выпущенные рукой королевского рейнджера, всегда попадают в цель.`,
    avatar: 'empire_ranger.png',
    id: 2,
    characteristics: [ '150', '60', '30', '0', '20', '0', '1', 'дальняя' ] }
];

let jsonconfig = JSON.stringify( empireListCaptain );
localStorage.setItem( 'Empire', jsonconfig );

const demonsListCaptain = [
    { name: 'Герцог Легионов Ненависти',
    portrait: 'ava_demons_duke.png',
    description: `Когда люди переполнены ненавистью, он выходит на поверхность из огненной гиены. Герцог легиона ненависти командует
    легионом демонов и веками ждет подходящего момента, когда сможет нанести смертельный удар.`,
    avatar: 'demons_duke.png',
    id: 0,
    characteristics: [ '250', '50', '40', '0', '0', '0', '1', 'ближняя' ] },

    { name: 'Графиня Адского Культа',
    portrait: 'ava_demons_countess.png',
    description: `Если дворянка начнет изучать темную магию, то демонологи обязательно примет ее в адский культ.
    Там она сможет постичь все тонкости демонической магии и подчерпнуть силу у огненной гиены.`,
    avatar: 'demons_countess.png',
    id: 1,
    characteristics: [ '150', '40', '0', '20', '0', '0', '6', 'дальняя' ] },

    { name: 'Повелитель Орд Гнева',
    portrait: 'ava_demons_lord.png',
    description: `Человеком в гневе легко управлять. В порыве гнева совершаются самые ужасные поступки. Это
    эффективно используется повелителем орд гнева. Он сталкивает всех друг с другом и всегда получает то, что ему нужно.`,
    avatar: 'demons_lord.png',
    id: 2,
    characteristics: [ '180', '60', '0', '30', '0', '0', '1', 'дальняя' ] }
];

jsonconfig = JSON.stringify( demonsListCaptain );
localStorage.setItem( 'Demons', jsonconfig );

const elfsListCaptain = [
    { name: 'Эльфийский Владыка',
    portrait: 'ava_elfs_lord.png',
    description: `Лучшие эльфийские командиры становятся хозяевами целых регионов. В дар они получают лучшие эльфийские клинки
    в знак чести и уважения. В бою они используют самые искусные тактики и стратегии, которые оттачивали веками.`,
    avatar: 'elfs_lord.png',
    id: 0,
    characteristics: [ '200', '60', '40', '0', '0', '0', '1', 'ближняя' ] },

    { name: 'Хранительница Магических Рун',
    portrait: 'ava_elfs_keeper.png',
    description: `Руны сил природы передаются от одного хранителя к другому. Только самые опытные хранители научились управлять 
    всеми силами природы и использовать их для защиты своих людей.`,
    avatar: 'elfs_keeper.png',
    id: 1,
    characteristics: [ '120', '50', '0', '20', '0', '0', '6', 'дальняя' ] },

    { name: 'Командир Лесных Рейнджеров',
    portrait: 'ava_elfs_ranger.png',
    description: `Меткий глаз и острая стрела - лучшее оружие для эльфийского рейнджера. Кроны деревьев служат для них отличным 
    камуфляжем. Лучшие из рейнджеров становятся командирами целых гарнизонов, охраняющих границы.`,
    avatar: 'elfs_ranger.png',
    id: 2,
    characteristics: [ '150', '70', '30', '0', '0', '0', '1', 'дальняя' ] }
];

jsonconfig = JSON.stringify( elfsListCaptain );
localStorage.setItem( 'Elfs', jsonconfig );

const deadsListCaptain = [
    { name: 'Повелитель Скелетов',
    portrait: 'ava_deads_lord.png',
    description: `Когда плоть сгниет и обнажатся кости, скелет станет слугой Повелителя Скелетов. Если поблизости есть кладбище, то 
    построить новую армию для него не проблема. Его слуги не чувствуют боли и усталости.`,
    avatar: 'deads_lord.png',
    id: 0,
    characteristics: [ '200', '50', '40', '0', '0', '30', '1', 'ближняя' ] },

    { name: 'Королева Личей',
    portrait: 'ava_deads_queen.png',
    description: `При жизни они были хранителями рун эльфийского народа. После смерти, красота покинула их, обнажив кости, а 
    их магические способности приумножились благодаря темному оккультному мастерству.`,
    avatar: 'deads_queen.png',
    id: 1,
    characteristics: [ '120', '40', '0', '20', '0', '30', '6', 'дальняя' ] },

    { name: 'Верховный Вампир',
    portrait: 'ava_deads_vampire.png',
    description: `Те, кто отвергает слово Всевышнего, становятся живыми мертвецами, вынужденными пить кровь живых людей. Вампиры, 
    достигшие наивысшего успеха в порабощении живых, становятся верховными вампирами.`,
    avatar: 'deads_vampire.png',
    id: 2,
    characteristics: [ '120', '60', '0', '30', '0', '30', '1', 'дальняя' ] }
];

jsonconfig = JSON.stringify( deadsListCaptain );
localStorage.setItem( 'Deads', jsonconfig );

// аватарки и характеристики для страниц - расстановка юнитов и сражение юнитов
export const unitsList = [
[ [ [ 'Капитан Королевской Кавалерии', 200, 50, 50, 0, 20, 0, 1, 'ближняя', 'empire_captain.png', '1' ],
    [ 'Архимаг Империи', 120, 40, 0, 20, 20, 0, 6, 'дальняя', 'empire_sorcerer.png', '2' ],
    [ 'Командир Королевских Рейнджеров', 150, 60, 30, 0, 20, 0, 1, 'дальняя', 'empire_rangers.png', '3' ] 
    ],

    [ [ 'Рыцарь', 170, 50, 50, 0, 20, 0, 1, 'ближняя', 'empire_knight.png', '4' ],
        [ 'Охотник на ведьм', 140, 50, 30, 0, 0, 100, 1, 'ближняя', 'empire_witchunter.png', '5' ],
        [ 'Лучник', 120, 60, 0, 25, 20, 0, 1, 'дальняя', 'empire_archer.png', '6' ],
        [ 'Маг', 90, 40, 0, 15, 20, 0, 6, 'дальняя', 'empire_mag.png', '7' ],
        [ 'Священник', 100, 30, 0, 20, 20, 0, 1, 'дальняя', 'empire_priest.png', '8' ] 
    ]
],

[ [ [ 'Герцог Легионов Ненависти', 250, 50, 50, 0, 0, 0, 1, 'ближняя', 'demons_dukes.png', '1' ],
        [ 'Графиня Адского Культа', 150, 40, 0, 20, 0, 0, 6, 'дальняя', 'demons_countes.png', '2' ],
        [ 'Повелитель Орд Гнева', 180, 60, 0, 30, 0, 0, 1, 'дальняя', 'demons_ranger.png', '3' ] 
    ],

    [ [ 'Адский воин', 220, 50, 50, 0, 0, 0, 1, 'ближняя', 'demons_hall_warrior.png', '4' ],
        [ 'Рыцарь тьмы', 190, 50, 30, 0, 0, 50, 1, 'ближняя', 'demons_dark_knight.png', '5' ],
        [ 'Демонолог', 90, 40, 15, 0, 0, 30, 6, 'дальняя', 'demons_demonolog.png', '6' ],
        [ 'Горгулья', 170, 60, 25, 0, 0, 0, 1, 'дальняя', 'demons_gargoyle.png', '7' ],
        [ 'Модеус', 90, 40, 0, 15, 0, 100, 6, 'дальняя', 'demons_modeus.png', '8' ] 
    ]
],

[ [ [ 'Эльфийский Владыка', 200, 60, 40, 0, 0, 0, 1, 'ближняя', 'elfs_captain.png', '1' ],
    [ 'Хранительница Магических Рун', 120, 50, 0, 20, 0, 0, 6, 'дальняя', 'elfs_keper.png', '2' ],
    [ 'Командир Лесных Рейнджеров', 150, 70, 30, 0, 0, 0, 1, 'дальняя', 'elfs_stinger.png', '3' ] 
    ],

    [ [ 'Кентавр', 170, 50, 30, 0, 20, 0, 1, 'ближняя', 'elfs_centaur.png', '4' ],
    [ 'Рейнджер', 100, 65, 15, 0, 0, 0, 1, 'дальняя', 'elfs_archer.png', '5' ],
    [ 'Лорд Лесов', 90, 50, 15, 0, 0, 0, 6, 'дальняя', 'elfs_overlord.png', '6' ],
    [ 'Часовой', 120, 65, 0, 25, 0, 0, 1, 'дальняя', 'elfs_guard.png', '7' ],
    [ 'Маг', 90, 45, 0, 15, 0, 100, 6, 'дальняя', 'elfs_mag.png', '8' ] 
    ]
],

[ [ [ 'Повелитель Скелетов', 200, 60, 40, 0, 0, 0, 1, 'ближняя', 'deads_overlord.png', '1' ],
    [ 'Королева Личей', 120, 50, 0, 20, 0, 0, 6, 'дальняя', 'deads_lich.png', '2' ],
    [ 'Верховный Вампир', 150, 70, 30, 0, 0, 0, 1, 'дальняя', 'deads_vampir.png', '3' ] ],

    [ [ 'Воин Скелет', 170, 50, 30, 0, 0, 30, 1, 'ближняя', 'deads_skelet.png', '4' ],
    [ 'Зомби', 140, 50, 30, 0, 0, 100, 1, 'ближння', 'deads_zombi.png', '5' ],
    [ 'Некромант', 90, 40, 0, 15, 0, 30, 6, 'дальняя', 'deads_necromant.png', '6' ],
    [ 'Призрак', 120, 60, 0, 25, 0, 30, 1, 'дальняя', 'deads_archer.png', '7' ],
    [ 'Оборотень', 90, 50, 30, 0, 100, 0, 1, ',ближняя', 'deads_lican.png', '8' ] 
    ]
]

];

// анимационные модели для страницы - сражение юнитов
export const combatModels = {
    Empire: [ { left: { path: './animation/Empire/death_unit_left.gif', size: [ 100, 169 ] }, 
    right: { path: './animation/Empire/death_unit_right.gif', size: [ 100, 169 ] } }, 
{ left: [ { path: './animation/Empire/captain/captain_state_left.gif', size: [ 203, 153 ] }, 
{ path: './animation/Empire/captain/captain_attack_left.gif', size: [ 278, 346 ] }, 
{ path: './animation/Empire/captain/captain_getdam_left.gif', size: [ 223, 161 ] } ], 
right: [ { path: './animation/Empire/captain/captain_state_right.gif', size: [ 203, 153 ] },
{ path: './animation/Empire/captain/captain_attack_right.gif', size: [ 278, 346 ] }, 
{path: './animation/Empire/captain/captain_getdam_right.gif', size: [ 223, 161 ] } ] }, 
{ left: [ { path: './animation/Empire/arhimag/arhimag_state_left.gif', size: [ 65, 148 ] },
{ path: './animation/Empire/arhimag/arhimag_attack_left.gif', size: [ 178, 319 ] }, 
{ path: './animation/Empire/arhimag/arhimag_getdam_left.gif', size: [ 82, 160 ] }, 
{ path: './animation/Empire/arhimag/arhimag_damage.gif', size: [ 221, 292 ] } ], 
right: [ { path: './animation/Empire/arhimag/arhimag_state_right.gif', size: [ 65, 148 ] }, 
{ path: './animation/Empire/arhimag/arhimag_attack_right.gif', size: [ 178, 319 ] }, 
{ path: './animation/Empire/arhimag/arhimag_getdam_right.gif', size: [ 82, 160 ] }, 
{ path: './animation/Empire/arhimag/arhimag_damage.gif', size: [ 221, 292 ] } ] },
{ left: [ { path: './animation/Empire/ranger/ranger_state_left.gif', size: [ 98, 114 ] }, 
{ path: './animation/Empire/ranger/ranger_attack_left.gif', size: [ 194, 162 ] }, 
{ path: './animation/Empire/ranger/ranger_getdam_left.gif', size: [ 142, 116 ] } ], 
right: [ { path: './animation/Empire/ranger/ranger_state_right.gif', size: [98, 114 ] },
{ path: './animation/Empire/ranger/ranger_attack_right.gif', size: [ 194, 162 ] }, 
{ path: './animation/Empire/ranger/ranger_getdam_right.gif', size: [ 142, 116 ] } ] },
{ left: [ { path: './animation/Empire/knight/knight_state_left.gif', size: [ 95, 158 ] }, 
{ path: './animation/Empire/knight/knight_attack_left.gif', size: [ 158, 282 ] }, 
{ path: './animation/Empire/knight/knight_getdam_left.gif', size: [ 129, 158 ] } ], 
right: [ { path: './animation/Empire/knight/knight_state_right.gif', size: [ 95, 158 ] },
{ path: './animation/Empire/knight/knight_attack_right.gif', size: [ 158, 282 ] }, 
{ path: './animation/Empire/knight/knight_getdam_right.gif', size: [ 129, 158 ] } ] },
{ left: [ { path: './animation/Empire/witchhunter/witchhunter_state_left.gif', size: [ 61, 133 ] }, 
{ path: './animation/Empire/witchhunter/witchhunter_attack_left.gif', size: [ 192, 145 ] }, 
{ path: './animation/Empire/witchhunter/witchhunter_getdam_left.gif', size: [ 112, 134 ] } ], 
right: [ { path: './animation/Empire/witchhunter/witchhunter_state_right.gif', size: [ 61, 133 ] },
{ path: './animation/Empire/witchhunter/witchhunter_attack_right.gif', size: [ 192, 145 ] }, 
{ path: './animation/Empire/witchhunter/witchhunter_getdam_right.gif', size: [ 112, 134 ] } ] },
{ left: [ { path: './animation/Empire/archer/archer_state_left.gif', size: [ 119, 111 ] }, 
{ path: './animation/Empire/archer/archer_attack_left.gif', size: [ 136, 138 ] }, 
{ path: './animation/Empire/archer/archer_getdam_left.gif', size: [ 138, 122 ] } ], 
right: [ { path: './animation/Empire/archer/archer_state_right.gif', size: [ 119, 111 ] },
{ path: './animation/Empire/archer/archer_attack_right.gif', size: [ 136, 138 ] }, 
{ path: './animation/Empire/archer/archer_getdam_right.gif', size: [ 138, 122 ] } ] },
{ left: [ { path: './animation/Empire/mag/mag_state_left.gif', size: [ 58, 111 ] }, 
{ path: './animation/Empire/mag/mag_attack_left.gif', size: [ 70, 132 ] }, 
{ path: './animation/Empire/mag/mag_getdam_left.gif', size: [ 60, 111 ] }, 
{ path: './animation/Empire/mag/mag_damage.gif', size: [ 326, 552 ] } ], 
right: [ { path: './animation/Empire/mag/mag_state_right.gif', size: [ 58, 111 ] }, 
{ path: './animation/Empire/mag/mag_attack_right.gif', size: [ 70, 132 ] }, 
{ path: './animation/Empire/mag/mag_getdam_right.gif', size: [ 60, 111 ] }, 
{ path: './animation/Empire/mag/mag_damage.gif', size: [ 326, 552 ] } ] },
{ left: [ { path: './animation/Empire/priest/priest_state_left.gif', size: [ 107, 114 ] }, 
{ path: './animation/Empire/priest/priest_attack_left.gif', size: [ 312, 278 ] }, 
{ path: './animation/Empire/priest/priest_getdam_left.gif', size: [ 115, 114 ] } ], 
right: [ { path: './animation/Empire/priest/priest_state_right.gif', size: [ 107, 114 ] },
{ path: './animation/Empire/priest/priest_attack_right.gif', size: [ 312, 278 ] }, 
{ path: './animation/Empire/priest/priest_getdam_right.gif', size: [ 115, 114 ] } ] }, 
],
    Demons: [ { left: { path: './animation/Demons/death_unit_left.gif', size: [ 150, 160 ] }, 
    right: { path: './animation/Demons/death_unit_right.gif', size: [ 150, 160 ] } }, 
{ left: [ { path: './animation/Demons/duke/duke_state_left.gif', size: [ 200, 169 ] }, 
{ path: './animation/Demons/duke/duke_attack_left.gif', size: [ 375, 217 ] }, 
{ path: './animation/Demons/duke/duke_getdam_left.gif', size: [ 200, 178 ] } ], 
right: [ { path: './animation/Demons/duke/duke_state_right.gif', size: [ 200, 169 ] },
{ path: './animation/Demons/duke/duke_attack_right.gif', size: [ 375, 217 ] }, 
{ path: './animation/Demons/duke/duke_getdam_right.gif', size: [ 200, 178 ] } ] },
{ left: [ { path: './animation/Demons/countles/countles_state_left.gif', size: [ 203, 124 ] }, 
{ path: './animation/Demons/countles/countles_attack_left.gif', size: [ 211, 263 ] }, 
{ path: './animation/Demons/countles/countles_getdam_left.gif', size: [ 204, 143 ] }, 
{ path: './animation/Demons/countles/countles_damage.gif', size: [ 314, 314 ] } ], 
right: [ { path: './animation/Demons/countles/countles_state_right.gif', size: [ 203, 124 ] }, 
{ path: './animation/Demons/countles/countles_attack_right.gif', size: [ 211, 263 ] }, 
{ path: './animation/Demons/countles/countles_getdam_right.gif', size: [ 204, 143 ] }, 
{ path: './animation/Demons/countles/countles_damage.gif', size: [ 314, 314 ] } ] },
{ left: [ { path: './animation/Demons/lord/lord_state_left.gif', size: [ 185, 108 ] }, 
{ path: './animation/Demons/lord/lord_attack_left.gif', size: [ 252, 151 ] }, 
{ path: './animation/Demons/lord/lord_getdam_left.gif', size: [ 195, 107 ] } ], 
right: [ { path: './animation/Demons/lord/lord_state_right.gif', size: [ 185, 108 ] },
{ path: './animation/Demons/lord/lord_attack_right.gif', size: [ 252, 151 ] }, 
{ path: './animation/Demons/lord/lord_getdam_right.gif', size: [ 195, 107 ] } ] },
{ left: [ { path: './animation/Demons/hallwarior/hallwarior_state_left.gif', size: [ 205, 121 ] }, 
{ path: './animation/Demons/hallwarior/hallwarior_attack_left.gif', size: [ 229, 202 ] }, 
{ path: './animation/Demons/hallwarior/hallwarior_getdam_left.gif', size: [ 195, 120 ] } ], 
right: [ { path: './animation/Demons/hallwarior/hallwarior_state_right.gif', size: [ 205, 121 ] },
{ path: './animation/Demons/hallwarior/hallwarior_attack_right.gif', size: [ 229, 202 ] }, 
{ path: './animation/Demons/hallwarior/hallwarior_getdam_right.gif', size: [ 195, 120 ] } ] },
{ left: [ { path: './animation/Demons/darkknight/darkknight_state_left.gif', size: [ 96, 137 ] }, 
{ path: './animation/Demons/darkknight/darkknight_attack_left.gif' , size: [ 253, 170 ] }, 
{ path: './animation/Demons/darkknight/darkknight_getdam_left.gif', size: [ 117, 137 ] } ], 
right: [ { path: './animation/Demons/darkknight/darkknight_state_right.gif', size: [ 96, 137 ] },
{ path: './animation/Demons/darkknight/darkknight_attack_right.gif', size: [ 253, 170 ] }, 
{ path: './animation/Demons/darkknight/darkknight_getdam_right.gif', size: [ 117, 137 ] } ] },
{ left: [ { path: './animation/Demons/demonolog/demonolog_state_left.gif', size: [ 80, 119 ] }, 
{ path: './animation/Demons/demonolog/demonolog_attack_left.gif', size: [ 231, 208 ] }, 
{ path: './animation/Demons/demonolog/demonolog_getdam_left.gif', size: [ 90, 119 ] }, 
{ path: './animation/Demons/demonolog/demonolog_damage.gif', size: [ 298, 256 ] } ], 
right: [ { path: './animation/Demons/demonolog/demonolog_state_right.gif', size: [ 80, 119 ] }, 
{ path: './animation/Demons/demonolog/demonolog_attack_right.gif', size: [ 231, 208 ] }, 
{ path: './animation/Demons/demonolog/demonolog_getdam_right.gif', size: [ 90, 119 ] }, 
{ path: './animation/Demons/demonolog/demonolog_damage.gif', size: [ 298, 256 ] } ] },
{ left: [ { path: './animation/Demons/gorgulia/gorgulia_state_left.gif', size: [ 140, 137 ] }, 
{ path: './animation/Demons/gorgulia/gorgulia_attack_left.gif', size: [ 274, 224 ] }, 
{ path: './animation/Demons/gorgulia/gorgulia_getdam_left.gif', size: [ 166, 190 ] } ], 
right: [ { path: './animation/Demons/gorgulia/gorgulia_state_right.gif', size: [ 140, 137 ] },
{ path: './animation/Demons/gorgulia/gorgulia_attack_right.gif', size: [ 274, 224 ] }, 
{ path: './animation/Demons/gorgulia/gorgulia_getdam_right.gif', size: [ 166, 190 ] } ] },
{ left: [ { path: './animation/Demons/modeus/modeus_state_left.gif', size: [ 130, 125 ] }, 
{ path: './animation/Demons/modeus/modeus_attack_left.gif', size: [ 270, 180 ] }, 
{ path: './animation/Demons/modeus/modeus_getdam_left.gif', size: [ 187, 130 ] }, 
{ path: './animation/Demons/modeus/modeus_damage.gif', size: [ 350, 340 ] } ], 
right: [ { path: './animation/Demons/modeus/modeus_state_right.gif', size: [ 130, 125 ] }, 
{ path: './animation/Demons/modeus/modeus_attack_right.gif', size: [ 270, 180 ] }, 
{ path: './animation/Demons/modeus/modeus_getdam_right.gif', size: [ 187, 130 ] }, 
{ path: './animation/Demons/modeus/modeus_damage.gif', size: [ 350, 340 ] } ] } 
],
    Elfs: [ { left: { path: './animation/Elfs/death_unit_left.gif', size: [ 100, 163 ] }, 
    right: { path: './animation/Elfs/death_unit_right.gif', size: [ 100, 163 ] } }, 
{ left: [ { path: './animation/Elfs/lord/lord_state_left.gif', size: [ 104, 89 ] }, 
{ path: './animation/Elfs/lord/lord_attack_left.gif', size: [ 356, 194 ] }, 
{ path: './animation/Elfs/lord/lord_getdam_left.gif', size: [ 138, 88 ] } ], 
right: [ { path: './animation/Elfs/lord/lord_state_right.gif', size: [ 104, 89 ] },
{ path: './animation/Elfs/lord/lord_attack_right.gif', size: [ 356, 194 ] }, 
{ path: './animation/Elfs/lord/lord_getdam_right.gif', size: [ 138, 88 ] } ] },
{ left: [ { path: './animation/Elfs/keeper/keeper_state_left.gif', size: [ 54, 111 ] }, 
{ path: './animation/Elfs/keeper/keeper_attack_left.gif', size: [ 141, 140 ] }, 
{ path: './animation/Elfs/keeper/keeper_getdam_left.gif', size: [ 72, 111 ] }, 
{ path: './animation/Elfs/keeper/keeper_damage.gif', size: [ 217, 333 ] } ], 
right: [ { path: './animation/Elfs/keeper/keeper_state_right.gif', size: [ 54, 111 ] }, 
{ path: './animation/Elfs/keeper/keeper_attack_right.gif', size: [ 141, 140 ] }, 
{ path: './animation/Elfs/keeper/keeper_getdam_right.gif', size: [ 72, 111 ] }, 
{ path: './animation/Elfs/keeper/keeper_damage.gif', size: [ 217, 333 ] } ] },
{ left: [ { path: './animation/Elfs/ranger/ranger_state_left.gif', size: [ 87, 87 ] }, 
{ path: './animation/Elfs/ranger/ranger_attack_left.gif', size: [ 102, 106 ] }, 
{ path: './animation/Elfs/ranger/ranger_getdam_left.gif', size: [ 105, 92 ] } ], 
right: [ { path: './animation/Elfs/ranger/ranger_state_right.gif', size: [ 87, 87 ] },
{ path: './animation/Elfs/ranger/ranger_attack_right.gif', size: [ 102, 106 ] }, 
{ path: './animation/Elfs/ranger/ranger_getdam_right.gif', size: [ 105, 92 ] } ] },
{ left: [ { path: './animation/Elfs/centaur/centaur_state_left.gif', size: [ 127, 158 ] }, 
{ path: './animation/Elfs/centaur/centaur_attack_left.gif', size: [ 313, 194 ] }, 
{ path: './animation/Elfs/centaur/centaur_getdam_left.gif', size: [ 185, 166 ] } ], 
right: [ { path: './animation/Elfs/centaur/centaur_state_right.gif', size: [ 127, 158 ] },
{ path: './animation/Elfs/centaur/centaur_attack_right.gif', size: [ 313, 194 ] }, 
{ path: './animation/Elfs/centaur/centaur_getdam_right.gif', size: [ 185, 166 ] } ] },
{ left: [ { path: './animation/Elfs/archer/archer_state_left.gif', size: [ 53, 102 ] }, 
{ path: './animation/Elfs/archer/archer_attack_left.gif' , size: [ 74, 127 ] }, 
{ path: './animation/Elfs/archer/archer_getdam_left.gif', size: [ 63, 105 ] } ], 
right: [ { path: './animation/Elfs/archer/archer_state_right.gif', size: [ 53, 102 ] },
{ path: './animation/Elfs/archer/archer_attack_right.gif', size: [ 74, 127 ] }, 
{ path: './animation/Elfs/archer/archer_getdam_right.gif', size: [ 63, 105 ] } ] },
{ left: [ { path: './animation/Elfs/overlord/overlord_state_left.gif', size: [ 82, 95 ] }, 
{ path: './animation/Elfs/overlord/overlord_attack_left.gif', size: [ 157, 171 ] }, 
{ path: './animation/Elfs/overlord/overlord_getdam_left.gif', size: [ 84, 95 ] }, 
{ path: './animation/Elfs/overlord/overlord_damage.gif', size: [ 263, 431 ] } ], 
right: [ { path: './animation/Elfs/overlord/overlord_state_right.gif', size: [ 82, 95 ] }, 
{ path: './animation/Elfs/overlord/overlord_attack_right.gif', size: [ 157, 171 ] }, 
{ path: './animation/Elfs/overlord/overlord_getdam_right.gif', size: [ 84, 95 ] }, 
{ path: './animation/Elfs/overlord/overlord_damage.gif', size: [ 263, 431 ] } ] },
{ left: [ { path: './animation/Elfs/guard/guard_state_left.gif', size: [ 65, 95 ] }, 
{ path: './animation/Elfs/guard/guard_attack_left.gif', size: [ 265, 193 ] }, 
{ path: './animation/Elfs/guard/guard_getdam_left.gif', size: [ 83, 101 ] } ], 
right: [ { path: './animation/Elfs/guard/guard_state_right.gif', size: [ 65, 95 ] },
{ path: './animation/Elfs/guard/guard_attack_right.gif', size: [ 265, 193 ] }, 
{ path: './animation/Elfs/guard/guard_getdam_right.gif', size: [ 83, 101 ] } ] },
{ left: [ { path: './animation/Elfs/mag/mag_state_left.gif', size: [ 61, 88 ] }, 
{ path: './animation/Elfs/mag/mag_attack_left.gif', size: [ 258, 251 ] }, 
{ path: './animation/Elfs/mag/mag_getdam_left.gif', size: [ 62, 88 ] }, 
{ path: './animation/Elfs/mag/mag_damage.gif', size: [ 367, 288 ] } ], 
right: [ { path: './animation/Elfs/mag/mag_state_right.gif', size: [ 61, 88 ] }, 
{ path: './animation/Elfs/mag/mag_attack_right.gif', size: [ 258, 251 ] }, 
{ path: './animation/Elfs/mag/mag_getdam_right.gif', size: [ 62, 88 ] }, 
{ path: './animation/Elfs/mag/mag_damage.gif', size: [ 367, 288 ] } ] }],
    Deads: []
};

// аватарки и описание юнитов для страницы - найм юнитов
export const listUnits = [

    [ { name: 'Рыцарь',
    portrait: 'empire_knight.png',
    startlist: '<p><br>Здоровье - 170<br>Инициатива - 50<br>Урон - 30<br>Броня - 20<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - нет</p>',
    id: 0 },
    { name: 'Охотник на ведьм',
    portrait: 'empire_witchunter.png',
    startlist: '<p><br>Здоровье - 140<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - иммунитет к магии</p>',
    id: 1 },
    { name: 'Лучник',
    portrait: 'empire_archer.png',
    startlist: '<p><br>Здоровье - 120<br>Инициатива - 60<br>Урон - 0<br>Броня - 20<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 25<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 2 },
    { name: 'Маг',
    portrait: 'empire_mag.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 40<br>Урон - 0<br>Броня - 20<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 15<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 3 },
    { name: 'Священник',
    portrait: 'empire_priest.png',
    startlist: '<p><br>Здоровье - 100<br>Инициатива - 30<br>Урон - 0<br>Броня - 20<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - лечение</p>',
    id: 4 } ],

    [ { name: 'Адский воин',
    portrait: 'demons_hall_warrior.png',
    startlist: '<p><br>Здоровье - 220<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - нет</p>',
    id: 0 },
    { name: 'Рыцарь тьмы',
    portrait: 'demons_dark_knight.png',
    startlist: '<p><br>Здоровье - 190<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 50<br>Аттака - ближняя<br>Способности - нет</p>',
    id: 1 },
    { name: 'Демонолог',
    portrait: 'demons_demonolog.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 40<br>Урон - 15<br>Броня - 0<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 30<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 2 },
    { name: 'Горгулья',
    portrait: 'demons_gargoyle.png',
    startlist: '<p><br>Здоровье - 170<br>Инициатива - 60<br>Урон - 25<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 3 },
    { name: 'Модеус',
    portrait: 'demons_modeus.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 40<br>Урон - 0<br>Броня - 0<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 15<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - иммунитет к магии</p>',
    id: 4 } ],

    [ { name: 'Кентавр',
    portrait: 'elfs_centaur.png',
    startlist: '<p><br>Здоровье - 170<br>Инициатива - 50<br>Урон - 30<br>Броня - 20<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - нет</p>',
    id: 0 },
    { name: 'Рейнджер',
    portrait: 'elfs_archer.png',
    startlist: '<p><br>Здоровье - 100<br>Инициатива - 65<br>Урон - 15<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - двойная атака</p>',
    id: 1 },
    { name: 'Лорд лесов',
    portrait: 'elfs_overlord.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 50<br>Урон - 15<br>Броня - 0<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 2 },
    { name: 'Часовой',
    portrait: 'elfs_guard.png',
    startlist: '<p><br>Здоровье - 120<br>Инициатива - 65<br>Урон - 0<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 25<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 3 },
    { name: 'Маг',
    portrait: 'elfs_mag.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 45<br>Урон - 0<br>Броня - 0<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 15<br>Маг.защита - 0<br>Аттака - дальняя<br>Способности - иммунитет к магии</p>',
    id: 4 } ],

    [ { name: 'Воин Скелет',
    portrait: 'deads_skelet.png',
    startlist: '<p><br>Здоровье - 170<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 30<br>Аттака - ближняя<br>Способности - нет</p>',
    id: 0 },
    { name: 'Зомби',
    portrait: 'deads_zombi.png',
    startlist: '<p><br>Здоровье - 140<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - иммунитет к магии</p>',
    id: 1 },
    { name: 'Некромант',
    portrait: 'deads_necromant.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 40<br>Урон - 0<br>Броня - 0<br>Цели - 6</p>',
    endlist: '<p><br>Маг.урон - 15<br>Маг.защита - 30<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 2 },
    { name: 'Призрак',
    portrait: 'deads_archer.png',
    startlist: '<p><br>Здоровье - 120<br>Инициатива - 60<br>Урон - 0<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 25<br>Маг.защита - 30<br>Аттака - дальняя<br>Способности - нет</p>',
    id: 3 },
    { name: 'Оборотень',
    portrait: 'deads_lican.png',
    startlist: '<p><br>Здоровье - 90<br>Инициатива - 50<br>Урон - 30<br>Броня - 0<br>Цели - 1</p>',
    endlist: '<p><br>Маг.урон - 0<br>Маг.защита - 0<br>Аттака - ближняя<br>Способности - иммунитет к оружию</p>',
    id: 4 } ]

];

// Различные функции помощники

// случайная выдача числа 1 или -1 - генератор воли случая
export function fortune() {

    let fortune = Math.round( Math.random() );
    if( fortune === 1 ) return -1;
    else return 1;

}

// получение id расы игрока
export function getConfigArray( race ) {
    
    if( race == 'Empire' ) return 0;
    else if( race == 'Demons' ) return 1;
    else if( race == 'Elfs' ) return 2;
    else return 3;

}

// формирование слота конфигураций юнитов для игрока
export function getConfigs( flag, array ) {

    const slotConfigs = [];
    for( let item of array ) {
        unitsList[flag][0].forEach( elem => { if( elem[10] === item.unit ) {
            let newArr = [...elem];
            newArr[11] = item.position;
            slotConfigs.push( newArr ); 
        } } );
        unitsList[flag][1].forEach( elem => { if( elem[10] === item.unit ) {
            let newArr = [...elem];
            newArr[11] = item.position;
            slotConfigs.push( newArr ); 
        } } );
    }

    return slotConfigs;

}

// центрирование анимаций в ячейке на поле боя
export function styleImage( x, y ) {
    
    let left = Math.floor( - ( ( x - 100 ) / 2 ) );
    let top = Math.floor( - ( ( y - 120 ) / 2 ) );
    return [ left, top ];

}

// собираем слот экземпляров-объектов класса юнит для игрока
export function buildSlotPlayer( slotPlayer, flag ) {

    const arrayUnit = [];

    for( let config of slotPlayer ) {
        if( flag === 0 && config[10] === '8' ) { }
        else if( flag === 3 && config[10] === '3' ) { }
        else if( config[7] === 6 ) { arrayUnit.push( new Mag( config ) ); }
        else { arrayUnit.push( new Unit( config ) ); } }

    return arrayUnit;

}

// сбрасываем броню до начального значения( для юнитов которые нажали кнопку защита, чтобы вернуть прежнее состояние )
export function setStartSettings( unitsSlot ) {

    unitsSlot.forEach( element => element.currentArmor = element.armor );
    
}

// сортируем юнитов по инициативе - очередь хода
export function queueUnits( unitsSlot ) {
    
    unitsSlot.sort( function compareNumeric( a, b ) {
        if ( a.iniciative > b.iniciative ) return -1;
        if ( a.iniciative == b.iniciative ) return fortune();
        if ( a.iniciative < b.iniciative ) return 1;    
} );

}

// проверка слотов каждого игрока - остались ли там еще юниты
export function slotUnitsEmpty( slot ) {

    let counter = 0;
    slot.forEach( item => { if( item !== 'transfer' ) counter++; } );
    if( counter === 0 ) return true;
    else return false;

}

// очищаем слот юнитов от заглушек
export function clearSlotAllUnits( slot ) {

    let flag = false;
    while( !flag ) {
                
        if( slot.includes( 'transfer' ) ) slot.splice( slot.indexOf( 'transfer' ), 1 );
        else flag = true;

    }

    return;
    
}

// создаем массив ближайших целей для атаки юнитом с ближнем видом атаки
export function getNearOpponents( slotPlayer ) {

    let arrayNearTargets = slotPlayer.filter( item => ( item !== 'transfer' && item.position[0] === 'f' ) );
    if( arrayNearTargets.length !== 0 ) return arrayNearTargets;
    else arrayNearTargets = slotPlayer.filter( item => ( item !== 'transfer' && item.position[0] === 'b' ) );
    return arrayNearTargets;

}

// проверяем валидность цели
export function checkValidTarget( flag, slotOpponents, idTarget, slotAttackUnit ) {

    let isValid = false;
    let attSlot = slotAttackUnit.filter( soldier => soldier !== 'transfer' );
    let lengthSlotAt = attSlot.length;
    let oppSlot = slotOpponents.filter( soldier => soldier !== 'transfer' );
    let lengthSlotOp = oppSlot.length;
    let isFrontAtt = slotAttackUnit.filter( soldier => ( soldier !== 'transfer' && soldier.position[0] === 'f' ) );
    let isFrontOpp = slotOpponents.filter( soldier => ( soldier !== 'transfer' && soldier.position[0] === 'f' ) );

    //if( flag[0] !== idTarget[0] && isFrontAtt.length !== 0 ) { 
        //return isValid; 
    if( flag[0] === idTarget[0] && isFrontAtt.length !== 0 && isFrontOpp.length === 0 ) { 
        return isValid; 
    } else if( flag[0] === idTarget[0] && isFrontAtt.length === 0 && isFrontOpp.length !== 0 ) { 
        return isValid; 
    } else if( isFrontAtt.length !== 0 && isFrontOpp.length !== 0 && flag[0] === 'b' ) { 
        return isValid; 
    } else {
    switch ( flag[2] ) {
        case '1':   
            slotOpponents.forEach( item => { 
                if( ( item.position[2] === '1' && item.position === idTarget ) 
                || ( item.position[2] === '2' && item.position === idTarget ) 
                || ( lengthSlotAt === 1 && lengthSlotOp === 1) ) isValid = true; } );
            break;

        case '2':   
            slotOpponents.forEach( item => { if( item.position === idTarget ) isValid = true; } );
            break;

        case '3':   
            slotOpponents.forEach( item => { 
                if( ( item.position[2] === '3' && item.position === idTarget ) 
                || ( item.position[2] === '2' && item.position === idTarget )
                || ( lengthSlotAt === 1 && lengthSlotOp === 1) ) isValid = true; } );
            break;

    } }

    return isValid;

}

// центрирование анимаций урона по всему полю юнитов
export function styleImageAll( x, y ) {
    
    let left = Math.floor( - ( ( x - 322 ) / 2 ) );
    let top = Math.floor( - ( ( y - 550 ) / 2 ) );
    return [ left, top ];

}