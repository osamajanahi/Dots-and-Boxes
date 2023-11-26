// Array for the selected lines
const testObj = [
[1,2,3],
[4,5,6]
]
testObj[1].splice(0,1);
let lineSelected = [];
let player1Points = 0;
let player2Points = 0;
// To check if the game is between player and player or player and computer
let compAvailable = 0;
// Nested arrays insted of objects
let square = [
    [0,1,20,24],
    [1,2,21,25],
    [2,3,22,26],
    [3,4,23,27],
    [5,6,24,28],
    [6,7,25,29],
    [7,8,26,30],
    [8,9,27,31],
    [10,11,28,32],
    [11,12,29,33],
    [12,13,30,34],
    [13,14,31,35],
    [15,16,32,36],
    [16,17,33,37],
    [17,18,34,38],
    [18,19,35,39]
];
let currentPlayer = 0;


// Function for starting game it will work after clicking on start
const startGame = (e) => {
    e.preventDefault();
    // Remove the form and display the game
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.turn').style.display = 'block';
    document.querySelector('.players').style.display = 'flex';
    document.querySelector('.bottomLeft').style.display = 'block';
    document.querySelector('.right').style.display = 'flex';
    let playerType = document.querySelector('#list').value;
    // Display the left part
    if(playerType == 2){
        compAvailable = 1;
        document.querySelector('.player2Inner').innerHTML = 'Computer <br> <span class="score2">0</span>';
    }
    else{
        document.querySelector('.player2Inner').innerHTML = 'Player2 <br> <span class="score2">0</span>';
        compAvailable = 0;
    }
}

// Comuter choice function
const computerChoice = () => {
    document.querySelector('.line').disable = true;
    let enterArray = 0;
    let randomArray = [];
    // Check if there is any square needed one line to be completed choose it
    for(let i=0; i<square.length; i++){
        if(square[i].length == 1){
            let value = square[i][0];
            let computerLIne = document.querySelector(".line[value='"+ value +"']");
            enterArray++;
            lineSelected.push(value.toString());
            console.log(value)
            console.log(lineSelected)
            computerLIne.style.backgroundColor = 'black';
            makeSquare(value);
            break;
        }
    }
    // Making a random array that has all the lines 
    if(enterArray == 0){
        for(let i=0; i<square.length; i++){
            for(let j=0;j<square[i].length;j++){
                if(randomArray.indexOf(square[i][j]) == -1)
                randomArray.push(square[i][j]);
            }
        }
        // Choose a random value from the random array
        let random = Math.floor((Math.random() * randomArray.length-1) + 1);
        let randomLine = document.querySelector(".line[value='" + randomArray[random] + "']");;
        randomLine.style.backgroundColor = 'black';
        lineSelected.push(randomArray[random].toString());
        makeSquare(randomArray[random]);
    }
}

// The function that will work on the selected line
const selectedLine = (e) =>{
    e.preventDefault();
    let lineValue = e.target.getAttribute('value');
    // Check if the line is already selected or if the player trying to play at the computer turn exit from the function

    if(lineSelected.indexOf(lineValue) != -1 || (currentPlayer == 1 && compAvailable == 1)){
        return
    }

    // Change the line color if it is not selected

    e.target.style.backgroundColor = 'black';

    // Add to the array the selected line 

    lineSelected.push(lineValue);

    // Check if the selected line make a square
    makeSquare(lineValue);
}

// Function to check if the selected line make square
const makeSquare = (value) => {
    let count = 0;
    // For loop to go through all squares and remove the line selected from the array
    for(let i=0;i<square.length;i++){
        for(let j=0;j<square[i].length;j++){
            if(value == square[i][j]){
                square[i].splice(j,1);

                // If the inner array is empty (square index) a background color will be inserted on the square index depending on the player's turn
                    // Change the results if a player made square
                if(square[i] == ""){
                    let currentSquare = document.querySelectorAll('.square');

                    if(currentPlayer == 0){
                        currentSquare[i].style.backgroundColor = '#FFCC70';
                        player1Points++;
                        count++;
                        document.querySelector('.score1').innerHTML = player1Points;
                    }
                    else{
                        currentSquare[i].style.backgroundColor = '#ff6af4';
                        player2Points++;
                        count++;
                        document.querySelector('.score2').innerHTML = player2Points;
                    }
                    // Display the winner if the game finished
                    if((player1Points+player2Points) == 16){
                        if(player1Points > player2Points){
                            document.querySelector('.winner').innerHTML =  'The winner is Player1';
                        }
                        else if(player2Points > player1Points){
                            let playerType = document.querySelector('#list').value;
                            if(playerType == 2){
                                document.querySelector('.winner').innerHTML =  'The winner is Computer';
                            }
                            else{
                            document.querySelector('.winner').innerHTML =  'The winner is Player2';
                            }
                        }
                        else{
                            document.querySelector('.winner').innerHTML =  'The game is Tie!';
                        }
                    }
                }
            }
        }
    }
    // If the player made a square continue and if not the other player's turn
    if(count == 0){
        currentPlayer = ++currentPlayer%2;
    }
// Change the player's turn color and text
    let turn = document.querySelector('.playerTurn');
    if(currentPlayer == 0){
        turn.innerHTML = "Player1";
        turn.style.color = '#FFCC70';
    }else{
        let playerType = document.querySelector('#list').value;
        if(playerType == 2){
            turn.innerHTML = "Computer";
        }
        else{
            turn.innerHTML = "Player2";
        }
        turn.style.color = '#ff6af4';
        // Remove this to just play with two players
        if(playerType == 2){
            setTimeout(computerChoice, 500);
        }
    }
    
}

// This function will work after clicking on reset and will display the starting form to choose a player type
const resetGame = () => {
    square = [
        [0,1,20,24],
        [1,2,21,25],
        [2,3,22,26],
        [3,4,23,27],
        [5,6,24,28],
        [6,7,25,29],
        [7,8,26,30],
        [8,9,27,31],
        [10,11,28,32],
        [11,12,29,33],
        [12,13,30,34],
        [13,14,31,35],
        [15,16,32,36],
        [16,17,33,37],
        [17,18,34,38],
        [18,19,35,39]
    ];

    currentPlayer = 0;
    player1Points = 0;
    player2Points = 0;
    lineSelected = [];
    document.querySelectorAll('.line').forEach(line =>{
        line.style.backgroundColor = '#9bd9f255';
    })
    document.querySelectorAll('.square').forEach(square =>{
        square.style.backgroundColor = '#C2D9FF';
    })
    document.querySelector('.score1').innerHTML = player1Points;
    document.querySelector('.score2').innerHTML = player2Points;
    document.querySelector('.playerTurn').innerHTML = 'Player1';
    document.querySelector('.playerTurn').style.color = ' #FFCC70';
    document.querySelector('.winner').innerHTML =  '';
    document.querySelector('.form-container').style.display = 'flex';
    document.querySelector('.bottomLeft').style.display = 'none';
    document.querySelector('.right').style.display = 'none';
    document.querySelector('.turn').style.display = 'none';
    document.querySelector('.players').style.display = 'none';
}


// Taget the click line and apply on it selectedLine function
document.querySelectorAll('.line').forEach(line => {
    line.addEventListener('click', selectedLine);
});


document.querySelector('.resetBtn').addEventListener('click', resetGame);
document.querySelector('.btn-start').addEventListener('click', startGame)


// function result()