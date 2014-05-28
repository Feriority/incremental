var gainedLoot = 0;
var questSelected = null;
var level = new Array;
var monster2;
var i = 0;

//makes the level, takes in the level length to determine length and the monster
//to determine what monster to fill with, randomly spawns monsters
function makeLevel(levelInp, monster, monsterCount, specialMonster, specialCount) {
	for (var i = 0; i < levelInp; i++) {
		level[i] = '_';
	}
	for (var j = 0; j < monsterCount; j++) {
		var random = Math.floor(Math.random()*levelInp);
		level[random] = monster;
	}
	for (var j = 0; j < specialCount; j++) {
			var randomSpecial = Math.floor(Math.random()*levelInp);
			level[randomSpecial] = specialMonster;
			console.log(j);
	}
};


//function for the player to move, moves player and monster forward if '_'
//otherwise battles the enemy
//stops when player reaches end and gives them their loot 
function moveInLevel(monstertest) {
	var player = 'Y';
	if (level[i] == '_'); {
		level[i] = 'Y';
		level[i - 1] = '_';
		i++;
		if (monstertest.monster.move) {
			monsterMove(monstertest.monster.value);
		}
		if (monstertest.specialMonster) {
			monsterMove(monstertest.specialMonster.value);
			if (level[i] == monstertest.specialMonster.value) {
				battleTime(monstertest.specialMonster);
			}
		}
	}
	//why dont i have a master random num function yet jesus
	var random = Math.round(Math.random()*100);
	console.log(random + ' random num');

	if (random > 90) {
		addMoreMonsters(monstertest.monster);
		$('#quest_text').html('A ' + monstertest.monster.name + ' has appeared!');
	}
	else if (random == 1) {
		addMoreMonsters(monstertest.specialMonster);
		$('#quest_text').html('A ' + monstertest.specialMonster.name + ' has appeared! How unlucky..');

	}
	console.log(addMonstersValue);
	console.log(addMonstersValue % 5);

	if (i == level.length && levelActive) {
		levelActive = false;
		ectoplasm = ectoplasm + gainedLoot;
		gainedLoot = 0;
		$('#error').html('Level complete, you may leave and keep anything you found');
	}
	else if (level[i] == monstertest.monster.value) {
		battleTime(monstertest.monster);
	}
	$('.level').html(level);
}

function battleTime(monster) {
	$('#player_stats').html('Player Dmg: ' + player.damage);
	monster.monsterInfo();
	player.health = player.health - monster.damage;
	monster.health = monster.health - player.damage;
	i--;
	if (player.health <= 0) {
		levelActive = false;
		$('#error').html('You have been slain');
	}
	else if (monster.health <= 0) {

		level[i - 1] = monster.replace;
		level[i] = 'Y';
		
		monsterDeathSpace = '';
		i++;
		monster.monsterInfo();
		monster.loot();
		monster.specialDrop(monster.specialLoot, monster.dropChance);
		monster.health = monster.maxHealth;
	}
	monster.monsterInfo();	
}

function leaveQuest() {
	if (levelActive) {
		$('#error').html('You abandon your quest, leaving anything found behind')
	}
	$('#quest').hide();
	levelActive = false;
	resetSpellUsed = false;
	$('#main').show();
	level = [0];
	i = 0;
	questToHide = '#' + questSelected + '_quest';
	console.log(questToHide);
	console.log(questSelected);
	$(questToHide).hide();
	bearCave = false;
}

function getQuestSelect(quest) {
	questSelected = $(quest).val();
	console.log(questSelected);
	monster2 = levelObject[questSelected];
	console.log(monster2);
	loadLevelTest(monster2)
	if (quest == '#church_quest') {
		loadLevelChurch(questSelected, monster2);
	}
	else if (quest == '#mountain_quest') {
		loadLevel(questSelected, monster2);
	}
	else if (quest == '#tower_quest') {
		loadTowerLevel(questSelected, monster2);
	}
	else if (quest == '#bearcave_quest') {
		loadBearLevel(questSelected, monster2);
	}
	questLoop(monster2);
}



function dropBearFall() {
	var random = Math.round(Math.random()*100);
	var questText = $('#quest_text');
	if (random > 90) {
		level[i+4] = dropBear.value;
		$(questText).html('A Drop Bear falls from above!');
 	}	
}

var bearCave = false;

function loadBearLevel(questSelected, monster2) {
	var questText = $('#quest_text');
	levelActive = true;
	$('#quest').show();
	$('#cavern').hide();
	console.log(questSelected);
	
	if (questSelected == 'den') {
		$(questText).html('The heart of the bears den!');
		makeLevel(36, monster2.monster.value, 2, monster2.specialMonster.value, 1);
		$('#den_quest').show();
	}
}

//future function to load all levels
function loadLevelTest(levelInfo) {
 	levelActive = true;
 	var questAscii = '#' + levelInfo.name + '_quest';
 	$(questAscii).show();
 	$('#quest_text').html(levelInfo.text);
 	if (levelInfo.name) == 'cave') {
		bearCave = true;
	}

 	makeLevel(levelInfo.levelLength, levelInfo.monster.value, levelInfo.monsterNum, levelInfo.specialMonster.value, level.specialMonsterNum);

}

function loadTowerLevel(questSelected, monster2) {
	var questText = $('#quest_text');
	levelActive = true;
	$('#quest').show();
	$('#tower').hide();
	console.log(questSelected);
	if (questSelected == 'base') {
		console.log('hello');
		makeLevel(55, monster2.monster.value, 5, monster2.specialMonster.value, 1);
		$('#base_quest').show();
		questText.html('The base of the tower');
	}
	else if (questSelected == 'upper') {
		makeLevel(53, monster2.monster.value, 5, monster2.specialMonster.value, 1);
		$('#upper_quest').show();
		questText.html('The upper level of the tower, the top is near!');

	}
	else if (questSelected == 'top') {
		makeLevel(55, monster2.monster.value, 5, monster2.specialMonster.value, 1);
		$('#top_quest').show();
		questText.html('The sun is rising in the distance');
	}
	else if (questSelected == 'monk') {
		$('#monk_prequest').show();

	}
}

function loadLevel(questSelected, monster2) {
	var questText = $('#quest_text');
	levelActive = true;
	$('#quest').show();

	//need to make all the select holding divs universally named
	$('#mountain').hide();

	//need to write something to show the correct quest	
	if (questSelected == 'depths') {
		makeLevel(60, monster2.monster.value, 5, monster2.specialMonster.value, 1);
		$('#depths_quest').show();
		questText.html('The bottom of the mine');
	}
	else if (questSelected == 'mines') {
		makeLevel(50, monster2.monster.value, 5, monster2.specialMonster.value, 5); 
		$('#mine_quest').show();
		questText.html('There are goblin miners everywhere!');
	}
	else if (questSelected == 'cavern') {
		makeLevel(50, monster2.monster.value, 5);
		$('#cavern_quest').show();
		questText.html('Wow it is a mess in here, rocks laying in the path');
	}
 }



 function loadLevelChurch(questSelected, monster2) {
 	var questText = $('#quest_text');
 	levelActive = true;
 	$('#quest').show();
 	$('#churchInside').hide();
 	if (questSelected == 'approach') {
 		makeLevel(60, monster2.monster.value, 5, monster2.specialMonster.value, 3);
 		questText.html('There are demons everywhere');
 		$('#approach_quest').show();
 	}
 }
