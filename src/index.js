import React , {useEffect , Component} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
  return (
    <button
      className={`square ${props.highlighted ? 'red-text' : ''} ${props.selectedSquare ?'red-bg' :''} ${props.selectedValue ?'light-bg' :''}`}  // Apply red-text if highlighted
      onClick={props.onClick}
    >
      {props.value > 0 ? props.value : null}
    </button>
  );
}

class Numbers extends React.Component {
  render(){
    const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <button key={i} onClick={() => this.props.handleNumberSelection(i)}>
        {i}
      </button>
    );
  }
  return (
    <div className="number-buttons-container">
      {buttons}
    <button onClick={() => this.props.handleNumberSelection(0)}>Clr</button>
    </div>
  );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    const isHighlighted = this.props.highlighted.includes(i);  // Check if the square is highlighted
    return (
      <Square
        value={this.props.squares[i]}
        highlighted={isHighlighted}  // Pass the highlighted flag
        onClick={() => this.props.onClick(i)}
        selectedSquare={this.props.selectedSquare===i}
        selectedValue={this.props.selectedValue===this.props.squares[i]}
      />
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 81; i++) {
      squares.push(this.renderSquare(i));  // Render each square
    }
    return <div className="board">{squares}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginning: this.boardGenerator(),
      squares: Array(81).fill(null),
      highlighted: [],  // Array to store highlighted squares' indices
      selectedSquare: null,  
      selectedValue: null,
      buttonPosition: { top: 100, left: 500 }, // Store position of number buttons
      showLevelSelect: false,
      showNote: false
    };
  }

  componentDidMount() {
    this.setState({ squares: this.state.beginning });
  }

  generateValidSudokuBoard() {
  // Function to shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    }

    // Helper function to check if the board satisfies Sudoku rules
    function isValid(board, row, col, num) {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row * 9 + i] === num) return false;
      }

      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i * 9 + col] === num) return false;
      }

      // Check 3x3 sub-grid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[(startRow + i) * 9 + (startCol + j)] === num) return false;
        }
      }

      return true;
    }

    // Backtracking function to generate a complete Sudoku board
    function solveSudoku(board) {
      for (let i = 0; i < 81; i++) {
        if (board[i] === 0) {
          const row = Math.floor(i / 9);
          const col = i % 9;

          // Try placing each number from 1 to 9
          let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          shuffle(numbers); // Randomize number order to introduce randomness
          for (let num of numbers) {
            if (isValid(board, row, col, num)) {
              board[i] = num;
              if (solveSudoku(board)) {
                return true;
              }
              board[i] = 0; // Backtrack if no solution found
            }
          }
          return false; // No valid number found, need to backtrack
        }
      }
      return true; // Board is filled
    }

    // Function to check if the extra rule is satisfied
    function isValidExtraRule(board) {
      const positions = new Array(9).fill(null).map(() => new Set());
    
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const num = board[row * 9 + col];
          if (num === 0) continue; // Skip empty cells
    
          // חישוב המיקום היחסי בתוך הבלוק
          const relativePos = `${col % 3}-${row % 3}`;
          // בדוק אם המספר כבר נמצא במיקום הזה בתוך הבלוק
          // אם הסט עבור הבלוק לא מאותחל נכון (למקרה קיצוני), אתחיל אותו מחדש
          if (!positions[num]) {
            positions[num] = new Set();
          }

          if (positions[num].has(relativePos)) {
            return false; // אם המספר נמצא, הכלל לא מתקיים
          }
    
          // הוסף את המיקום היחסי של המספר לתוך הבלוק
          positions[num].add(relativePos);
        }
      }
    
      return true; // אם לא נמצאה חזרה של מספרים, הכלל מתקיים
    }
    

    // Function to generate a random Sudoku board with the extra rule
    let board = new Array(81).fill(0); // Empty board

    // Solve the board using backtracking (with randomization)
    solveSudoku(board);

    // Ensure the extra rule is satisfied (no same number in same relative position across blocks)
    while (!isValidExtraRule(board)) {
      board = new Array(81).fill(0); // Reset and try again
      solveSudoku(board);
    }
    return board;
  }
  
  clearBoardPositions(board, shapes) {
    // Create a Set from shapes array for faster lookup
    const shapeSet = new Set(shapes);
  
    // Loop through the board and set values to 0 for indices not in the shapes array
    for (let i = 0; i < board.length; i++) {
      if (!shapeSet.has(i)) {
        board[i] = 0;  // Set the value to 0 if the index is not in the shapes
      }
    }
  
    return board;  // Return the modified board
  }
  generateRandomArray(level) {
    // Set the min and max values for array length based on the level
    let minLength, maxLength;
    
    if (level === 2) {
        // Easy: 40-50 numbers
        minLength = 40;
        maxLength = 50;
    } else if (level === 1) {
        // Medium: 35-40 numbers
        minLength = 35;
        maxLength = 40;
    } else if (level === 0) {
        // Hard: 30-35 numbers
        minLength = 30;
        maxLength = 35;
    } else {
        // Invalid level, return an empty array
        return [];
    }

    // Calculate a random array length between minLength and maxLength
    const arrayLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    // Generate the array with random numbers between 0 and 80
    const randomArray = [];
    for (let i = 0; i < arrayLength; i++) {
        randomArray.push(Math.floor(Math.random() * 81)); // Random number between 0 and 80
    }

    return randomArray;
}

  boardGenerator(level = 3){
    //const basic_board = [1,2,3,4,5,6,7,8,9,4,5,6,7,8,9,1,2,3,7,8,9,1,2,3,4,5,6,3,1,2,6,4,5,9,7,8,6,4,5,9,7,8,3,1,2,9,7,8,3,
    //  1,2,6,4,5,2,3,1,5,6,4,8,9,7,5,6,4,8,9,7,2,3,1,8,9,7,2,3,1,5,6,4];
    const shapes=[[2,3,13,5,6,10,16,18,26,27,30,32,35,37,43,44,48,50,53,54,62,64,70,74,75,67,77,78],//hard
    [80,40,20,30,70,24,38,26,13,7,52,54,33,1,11,23,14,43,37,27,4,3,57,47,56,62,74,79,77,4,8,18,72,10,67],//med
    [10,76,54,70,1,3,5,7,9,15,18,19,54,6,57,46,48,57,32,31,26,24,37,39,42,49,51,52,63,65,68,25,21,19,36,27,61,62,64,78,75,74,44],//easy
    [0,3,5,7,10,11,12,14,17,19,21,23,24,26,27,30,32,35,36,38,40,41,43,44,46,48,51,52,53,54,57,59,61,62,64,66,68,69,72,74,75,77,79,61],//the start game
    [3,4,6,7,12,13,15,16,27,28,30,31,33,34,36,37,39,40,42,43,54,55,57,58,60,61,63,64,66,67,69,70],//the instruction game
    [0,3,5,7,10,11,12,14,17,19,21,23,24,26,27,30,32,35,36,38,40,41,43,44,46,48,51,52,53,54,57,59,61,62,64,66,68,69,72,74,75,77,79,1,2,4,6,8,9,13,15,16,18,20,22,25,28,29,31,34,37,42,45,47,49,50,55,56,58,60,63,65,67,70,71,73,76,78],//for me board
  ];
    const board = this.generateValidSudokuBoard();
    if (level>=0 & level<3){
      return this.clearBoardPositions(board, this.generateRandomArray(level));
    }
    else if(level >= 3){
      return this.clearBoardPositions(board, shapes[level]);
    }
  }
  instructions(){
    const instr = document.getElementById('instruct');
    instr.style.display = (instr.style.display === 'none' || instr.style.display === '') ? 'block' : 'none';

  }
  instructionsg(){
    const instr = document.getElementById('instruct');
    instr.style.display ='block';
    this.setState({showNote: true});
    this.setLevel(4);
  }
  isCube(index, value){
    const cubes = [[0,1,2,9,10,11,18,19,20],[3,4,5,12,13,14,21,22,23],[6,7,8,15,16,17,24,25,26],
    [0+27,1+27,2+27,9+27,10+27,11+27,18+27,19+27,20+27],[3+27,4+27,5+27,12+27,13+27,14+27,21+27,22+27,23+27],[6+27,7+27,8+27,15+27,16+27,17+27,24+27,25+27,26+27],
    [0+54,1+54,2+54,9+54,10+54,11+54,18+54,19+54,20+54],[3+54,4+54,5+54,12+54,13+54,14+54,21+54,22+54,23+54],[6+54,7+54,8+54,15+54,16+54,17+54,24+54,25+54,26+54]]
    let ind;
    for (let i = 0; i < cubes.length; i++) {
      if (cubes[i].includes(index)){
        ind = i;
      }
    }
    for (let i = 0; i < cubes[ind].length; i++) {
      if (this.state.squares[cubes[ind][i]]===value){
        if (cubes[ind][i]!==index)
          return cubes[ind][i];
      }
    }
    return -1;
  }
  isOfek(index, value){
    let begin_state = 9*Math.floor(index/9);
    for (let i = begin_state; i < begin_state+9; i++) {
      if(this.state.squares[i] === value){
        if (i!==index)
          return i;
      }
    }
    return -1;
  }
  isAnah(index, value){
    let begin_state = index;
    while(begin_state>8){
      begin_state-=9;
    }
    for (let i = begin_state; i < 81; i+=9) {
      if(this.state.squares[i] === value){
        if (i!==index)
          return i;
      }
    }
    return -1;
  }
  isExtra(index, value){
    const cubes = [[0,1,2,9,10,11,18,19,20],[3,4,5,12,13,14,21,22,23],[6,7,8,15,16,17,24,25,26],
    [0+27,1+27,2+27,9+27,10+27,11+27,18+27,19+27,20+27],[3+27,4+27,5+27,12+27,13+27,14+27,21+27,22+27,23+27],[6+27,7+27,8+27,15+27,16+27,17+27,24+27,25+27,26+27],
    [0+54,1+54,2+54,9+54,10+54,11+54,18+54,19+54,20+54],[3+54,4+54,5+54,12+54,13+54,14+54,21+54,22+54,23+54],[6+54,7+54,8+54,15+54,16+54,17+54,24+54,25+54,26+54]]
    let index_place_in_the_cube;
    for (let i = 0; i < cubes.length; i++) {
      if (cubes[i].includes(index)){
        index_place_in_the_cube = cubes[i].indexOf(index);
      }
    }
    for (let i = 0; i < cubes.length; i++) {
      if (this.state.squares[cubes[i][index_place_in_the_cube]]===value){
        if (index !== cubes[i][index_place_in_the_cube])
          return cubes[i][index_place_in_the_cube];
      }
    }
    return -1;
  }
  //not in use rn:
  insertValueToSquares(index, value){
    const squares = this.state.squares;
    squares[index] = value;
    this.setState({squares: squares})
  }

  // Updated changeColor function
  changeColor(list_of_indexes_to_change_color) {
    this.setState(prevState => ({
      highlighted: prevState.highlighted.concat(list_of_indexes_to_change_color.flat())  // Add the arr to highlighted state
    }));
    //console.log(this.state.highlighted);
  }
  removeHighlighted(list_of_indexes_to_change_color){
    const highkight = this.state.highlighted.filter((i) => !list_of_indexes_to_change_color.includes(i));
    this.setState({highlighted: highkight});
  }
  isValid(index, value){
    let anah = this.isAnah(index, value);
    let cube = this.isCube(index, value);
    let ofek = this.isOfek(index, value);
    let extra = this.isExtra(index, value);
    let all = !(anah >= 0 || cube >= 0 || ofek >= 0 || extra >= 0);
    return [anah, cube, ofek, extra, all];
  }
  removingNoNecc(){
    const list_to_remove = [];
    for(let i = 0;i < this.state.highlighted.length;i++){
      let ind = this.state.highlighted[i];
      let val = this.state.squares[ind];
      let det = this.isValid(ind, val);
  
      if (det[4]){
        list_to_remove.push(ind);
      }
    }
    return list_to_remove;
  }
  // Check validity and call changeColor
  colorNecc(index, value, prev) {
    const det = this.isValid(index, value);
    if (value === 0){
      let det0 = this.isValid(index, prev);
      this.removeHighlighted([index, det0[0], det0[1], det0[2], det0[3]]);
      return true;
    }
    if (!det[4]) {
      const list_of_indexes_to_change_color = [];
      list_of_indexes_to_change_color.push(index);
      if (det[0] !== -1) list_of_indexes_to_change_color.push(det[0]);
      if (det[1] !== -1) list_of_indexes_to_change_color.push(det[1]);
      if (det[2] !== -1) list_of_indexes_to_change_color.push(det[2]);
      if (det[3] !== -1) list_of_indexes_to_change_color.push(det[3]);
      this.changeColor(list_of_indexes_to_change_color);
    }
    else{
      let det0 = this.isValid(index, prev);
      this.removeHighlighted([index, det0[0], det0[1], det0[2], det0[3]]);
      //list_to_remove.push(index);
      //list_to_remove.push(anah0);
      //list_to_remove.push(cube0);
      //list_to_remove.push(ofek0);
      //list_to_remove.push(extra0);
    }
    //list_to_remove = this.removingNoNecc();
    //this.removeHighlighted(list_to_remove);
    return det[4];
  }

  isFull(squares){
    for (let i = 0; i < this.state.squares.length; i++) {
      if(this.state.squares[i] === 0){
        return false;
      }
    }
    return true;
  }
  setLevel(level){
    var bg=this.boardGenerator(level);
    this.setState({
      beginning: bg,
      squares: bg,
      highlighted: [],  // Array to store highlighted squares' indices
      selectedSquare: null,  
      buttonPosition: { top: 0, left: 0 }, // Store position of number buttons
      showLevelSelect: false
    });
  }
  startNewGame(){
    // Function to show the level selector when the button is clicked
    this.setState({showLevelSelect:true, showNote:false});
    const instr = document.getElementById('instruct');
    instr.style.display ='none';
  }

  handleNumberSelection(value) {
    const { selectedSquare, squares } = this.state;
    let prev = 0;
    if (value !== 0){
      this.setState({selectedValue:value});
    }
    if (selectedSquare !== null) {
      prev = this.state.squares[selectedSquare];
      this.colorNecc(selectedSquare, value, prev);
      const newSquares = [...squares];  // Copy the squares array to avoid direct mutation
      newSquares[selectedSquare] = value;  // Set the number at the selected square
      this.setState({ squares: newSquares, selectedSquare: null });  // Update state and reset selected square
      setTimeout(() => {
        if (this.isFull(this.state.squares)) {
          alert("Congrats! You finished!");
          this.setLevel(1); // Update the level to 1 when finished
        }
      }, 0); // Delay alert just after the current event loop
    }
  }  

  handleClick(i) {
    // Set the position where the number buttons will appear
    this.setState({
      selectedSquare: i,
    }); 
    this.setState({selectedValue:null});
  }

  render() {
    return (
      <div className="game"><header>
        <div className='h1'>SUDOKA</div>
          <nav>
            <ul>
            <button id="instructions" className="header_buttons" onClick={()=>this.instructions()}>instructions</button>
            <button id="instructionsgame" className="header_buttons" onClick={()=>this.instructionsg()}>play instructions game</button>
            <button id="openSelectorButton" className="header_buttons" onClick={()=>this.startNewGame()}>play another game</button>              
            <div id="levelSelector" className={`${this.state.showLevelSelect ? 'blockDiv' : 'hiddenDiv'}`}  >
              <button class="level-button" className="header_buttons" onClick={()=>this.setLevel(2)}>Easy</button>
              <button class="level-button" className="header_buttons" onClick={()=>this.setLevel(1)}>Medium</button>
              <button class="level-button" className="header_buttons" onClick={()=>this.setLevel(0)}>Hard</button>
            </div>
            <div id='instruct'>
                  This game is quite similar to the sudoku game, you need to find the numbers 1-9 in every square, row and column. <br/>
                  There is an additional new rule: every number should be placed only once in each relative place. <br/>
                  F.e. if you placed 4 in the left up corner, you cant put the number 4 again in a left up corner of another square<br/>
                  enjoy!
              </div>
              <div className={`${this.state.showNote ? '' : 'hiddenDiv'}`}>
                in this game try to put numbers in the empty cube with the extra rule.
              </div>
            </ul>
        </nav>  
        </header>
        <div className='coverboard'>
        <Numbers handleNumberSelection={i => this.handleNumberSelection(i)} />
        <Board squares={this.state.squares}
          highlighted={this.state.highlighted}  // Pass highlighted state to Board
          onClick={i => this.handleClick(i)}
          selectedSquare={this.state.selectedSquare}
          selectedValue={this.state.selectedValue}
        />
        </div>
        
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
