(async function(){
const chalk = require('chalk');
const startingMessage = chalk.green('[AKINATOR] Pense à  quelqu\'un et je vais essayer de trouver qui ça peut être');
console.log(startingMessage);
const {Aki} = require('aki-api');
const aki = new Aki('fr');
const { Select } = require('enquirer');




//1 - Akinator se lance
    await aki.start();
//2 - Tant qu'Akinator n'a pas trouvé
    while(aki.progress<90){
    // 3- Akinator pose une question

        const prompt = new Select({
            name: 'devine',
            message: aki.question,
            choices: aki.answers
        });

        let choice = [...aki.answers];

        let myAnswer = await prompt.run();

        let answer = choice.indexOf(myAnswer);

        await aki.step(answer);
    }

    await aki.win();

// 4- On prend le meilleur résultat d'Akinator
    let result = aki.answers[0].name;
//5- On affiche le résultat
    const resultMessage = chalk.green('[AKINATOR] je pense à :' + result);
    console.log(resultMessage);
})();