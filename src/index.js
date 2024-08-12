import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value>0?props.value:null}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
          {this.renderSquare(80)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginning: [[0,9,8,0,0,0,0,0,0,0,7,0,0,5,8,0,9,2,0,0,2,4,0,0,8,0,1,0,1,0,0,2,0,6,0,0,0,4,0,9,0,3,0,2,0,0,0,3,0,6,0,0,1,0,6,0,7,0,0,2,1,0,0,8,2,0,3,9,0,
        0,4,0,0,0,0,0,0,0,2,3,0],[0,0,0,6,0,0,0,0,0,0,8,0,0,0,3,0,0,1,0,2,9,8,0,0,0,5,0,3,0,0,0,9,0,6,0,0,0,9,0,4,7,6,0,0,0,8,0,0,0,1,0,4,0,0,0,4,1,5,0,0,0,2,
          0,0,6,0,0,0,4,0,0,5,0,0,0,7,0,0,0,0,0],[0,0,3,4,0,0,0,6,0,8,0,1,0,6,9,0,0,0,0,0,0,0,0,3,0,2,1,0,2,8,0,0,0,0,0,6,0,4,0,0,5,0,0,3,0,6,0,0,0,0,0,4,8,
            0,7,8,0,3,0,0,0,0,0,0,0,0,7,4,0,2,0,3,0,3,0,0,0,1,7,0,0]],
      squares: Array(9).fill(null),
      counter: 0
    };
  }
  componentDidMount(){
    this.setState({squares: this.state.beginning[this.state.counter]});
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
        return true;
      }
    }
    return false;
  }
  isOfek(index, value){
    let begin_state = 9*(index/9);
    for (let i = begin_state; i < begin_state+9; i++) {
      if(this.state.squares[i] === value){
        return true;
      }
    }
    return false;
  }
  isAnah(index, value){
    let begin_state = index;
    while(begin_state>8){
      begin_state-=9;
    }
    for (let i = begin_state; i < 81; i+=9) {
      if(this.state.squares[i] === value){
        return true;
      }
    }
    return false;
  }
  insertValueToSquares(index, value){
    const squares = this.state.squares;
    squares[index] = value;
    this.setState({squares: squares})
  }
  isValid(index, value){
    return !(this.isAnah(index, value) || this.isCube(index, value) || this.isOfek(index, value));
  }
  isFull(squares){
    for (let i = 0; i < this.state.squares.length; i++) {
      if(this.state.squares[i] === 0){
        return false;
      }
    }
    return true;
  }
  handleClick(i) {
    const squares = this.state.squares;
    const val = prompt("insert number to add");
    let value = parseInt(val, 10);

    if (this.isFull(squares)) {
      this.setState({counter: this.state.counter+1});
      this.setState({squares: this.state.beginning[this.state.counter]});
    }
    if(value>0 && value<=9 && this.isValid(i, value)){
      this.insertValueToSquares(i, value);
    }
    else{
      alert("not valid");
    }
  }

  render() {
    return (
      <div className="game">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
