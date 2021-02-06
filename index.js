console.log("Loading...")

const Kahoot = require("kahoot.js-updated");
const readline = require("readline-sync");
var random = require('random-name')
var words = require('an-array-of-english-words')

console.clear();

console.log("=============")
console.log("Kahoot flooder tutorial!!!")
console.log("this looks cool ngl")
console.log("=============")

var pin = readline.question("What is the game pin? ")

var randomname = readline.question("Do you want the bots to have a random name (y/n)? ")

if(randomname=="y"){
}else{
    var name = readline.question("What do you want the bot's name to be? ")
}

var namebypass = readline.question("Do you want to use the name bypass (y/n)? ")

var botstojoin = readline.question("How many bots? ")

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function nameback(name){
    return name.replace(/a/g, 'ᗩ').replace(/b/g, 'ᗷ').replace(/c/g, 'ᑕ').replace(/d/g, 'ᗪ').replace(/e/g, 'E').replace(/f/g, 'ᖴ').replace(/g/g, 'G').replace(/h/g, 'ᕼ').replace(/i/g, 'I').replace(/j/g, 'ᒍ').replace(/k/g, 'K').replace(/l/g, 'ᒪ').replace(/m/g, 'ᗰ').replace(/n/g, 'ᑎ').replace(/o/g, 'O').replace(/p/g, 'ᑭ').replace(/q/g, 'ᑫ').replace(/r/g, 'ᖇ').replace(/s/g, 'ᔕ').replace(/t/g, 'T').replace(/u/g, 'ᑌ').replace(/v/g, 'ᐯ').replace(/w/g, 'ᗯ').replace(/x/g, '᙭').replace(/y/g, 'Y').replace(/z/g, 'ᘔ').replace(/A/g, 'ᗩ').replace(/B/g, 'ᗷ').replace(/C/g, 'ᑕ').replace(/D/g, 'ᗪ').replace(/E/g, 'E').replace(/F/g, 'ᖴ').replace(/G/g, 'G').replace(/H/g, 'ᕼ').replace(/I/g, 'I').replace(/J/g, 'ᒍ').replace(/K/g, 'K').replace(/L/g, 'ᒪ').replace(/M/g, 'ᗰ').replace(/N/g, 'ᑎ').replace(/O/g, 'O').replace(/P/g, 'ᑭ').replace(/Q/g, 'ᑫ').replace(/R/g, 'ᖇ').replace(/S/g, 'ᔕ').replace(/T/g, 'T').replace(/U/g, 'ᑌ').replace(/V/g, 'ᐯ').replace(/W/g, 'ᗯ').replace(/X/g, '᙭').replace(/Y/g, 'Y').replace(/Z/g, 'ᘔ')}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getName(){
    ran=getRandomInt(4)
    if(ran==4){
        return words[getRandomInt(words.length)]
    }
    if(ran==3){
        return(random.first())
    }
    if(ran==2){
        return (random.first()+random.middle()+random.last())
    }
    if(ran==1){
        return (random.first()+random.last())
    }
}

function flood() {
    if(botstojoin>0){
        botstojoin--
        setTimeout(() => {

            if(randomname=="y"){
                bot(pin,getName())
            }else{
                bot(pin,name+botstojoin)
            }

            flood()
        }, 30);
    }
}

function bot(id,name) {

    while(name==undefined){
        name=getName()
    }

    if(namebypass="y"){
        name=nameback(name)
    }

    const client = new Kahoot();
    client.join(id, name);

    var toshuffle=[0,1,2,3]

    client.on("Joined", info => {
        if(info.twoFactorAuth){
            shuffle(toshuffle)
            client.answerTwoFactorAuth(toshuffle)
            setInterval(() => {
                shuffle(toshuffle)
                client.answerTwoFactorAuth(toshuffle)
            }, 500);
        }

        console.log("Bot "+name+" joined the game!");
    });

    client.on("QuizStart", () => {
        console.log("The quiz has started!");
    });
    client.on("QuestionReady", question => {
        setTimeout(() => {
            client.answer(getRandomInt(question.quizQuestionAnswers[question.questionIndex]));
        }, getRandomInt(20000));
    });
    client.on("QuizEnd", () => {
        console.log("The quiz has ended.");
    });
}
flood()