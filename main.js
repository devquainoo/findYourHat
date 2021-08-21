const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
constructor(field = [[]]){
    field[0][0] = pathCharacter;
    this.field = field;
    this.lastRow = this.field.length - 1; 
    this.lastCol = this.field[0].length - 1;
    this.previousX = 0;
    this.previousY = 0;
    this.xLocation = 0;
    this.yLocation = 0;
}
print(){
    let str = '';
    for (let i = 0; i < this.field.length; i++){
    for(let j = 0; j < this.field[i].length; j++){
        str += this.field[i][j];
    }
    str += '\n';
    }
    console.log(str);
    return str;
}

move(){
    this.field[this.xLocation][this.yLocation] = pathCharacter;
    this.field[this.previousX][this.previousY] = fieldCharacter;
    this.previousX = this.xLocation;
    this.previousY = this.yLocation;
}
isHole(){
    // check if value is 'o' hole
    return this.field[this.xLocation][this.yLocation]=== hole ? true : false;
}

isHat(){
    // check if value is 'o' hole
    return this.field[this.xLocation][this.yLocation]=== hat ? true : false;
}

static generateField(height, width, percentage) {
    let field = [];
    // 2 indicates the characters hat and pathCharacter
    let totalFieldCharacters = (height * width) -2;
    let numberOfHoles = (percentage/100) * totalFieldCharacters;

    // set the field characters
    for (let i=0; i < height; i++){
        let arr = [];
        for(let j = 0; j < width; j++){
            arr.push(fieldCharacter);
        }
        field.push(arr);
    }
    
    // set the Holes
    let holeCount = 0;
    let occupiedHolePositions = [[0,0]];
    while(holeCount < numberOfHoles){
        // generate random position, except upper left
        let randomRow;
        let randomCol;
        do {
            randomRow = Math.floor(Math.random()*height);
            randomCol = Math.floor(Math.random()*width);
        } while(Field.hasPos(occupiedHolePositions,[randomRow,randomCol]));
        field[randomRow][randomCol] = hole;
        occupiedHolePositions.push([randomRow,randomCol]);
        holeCount++;
    }

    // set hat in the field
    let randomRow;
    let randomCol;
    do {
        randomRow = Math.floor(Math.random()*height);
        randomCol = Math.floor(Math.random()*width);
    } while (Field.hasPos(occupiedHolePositions,[randomRow,randomCol]));
    field[randomRow][randomCol] = hat;

    // return generated field
    return field;
}
// helper to check if array has another arr of length 2 as value
static hasPos(arr, pos){
// get arr elements which are arrays
for (let el of arr){
    if (el[0]===pos[0] && el[1]===pos[1]){
    return true;
    }  
}
return false;
}

}

function getInput(){
let input = prompt('enter direction: "u", "d", "l", "r": ');
input = input.toLowerCase();
return input;
}

function rungame(field){
field.print();
while(true){
    let input = getInput();
    // user moves outside terminate the game
    if(!['d','u','r','l'].includes(input)){
    console.log('Moved outside, GAME ends.');
    return;
    }
switch(input){
    case 'd':
        if (field.xLocation < field.lastRow) {
        field.xLocation++;
        if (field.isHole()){
            console.log('Lost fell in a hole');
            return ;
        }
        if (field.isHat()){
            console.log('You found Your Hat: CONGRATULATIONS!!!');
            return;
        }
        field.move();
        }
        field.print();
        break;
        
    case 'u':
        if (field.xLocation > 0){
        field.xLocation--;
        if (field.isHole()){
            console.log('Lost fell in a hole');
            return ;
        }
        if (field.isHat()){
            console.log('You found Your Hat: CONGRATULATIONS!!!');
            return;
        }
        field.move();
        }
        field.print();
        break;

    case 'l':
        if(field.yLocation > 0){
        field.yLocation--;
        if (field.isHole()){
            console.log('Lost fell in a hole');
            return ;
        }
        if (field.isHat()){
            console.log('You found Your Hat: CONGRATULATIONS!!!');
            return;
        }
        field.move();
        }
        field.print();
        break;

    case 'r':
        if(field.yLocation < field.lastCol){
        field.yLocation++;
        if (field.isHole()){
            console.log('Lost fell in a hole');
            return ;
        }
        if (field.isHat()){
            console.log('You found Your Hat: CONGRATULATIONS!!!');
            return;
        }
        field.move();
        }
        field.print();
    default:
        break;
}
}

}


// test
const f = Field.generateField(5,5,20);
const myField = new Field(f);
rungame(myField);


// console.log(f);