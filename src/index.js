import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// from shim
import moment from 'moment';

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const calculateWinner = ( squares ) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const square9 = () => {
	return Array( 9 ).fill( null );
}

const niceTime = () => {
	return moment.unix(new Date().getTime()/1000).format('MMM DD YYYY, HH:mm');
}

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

/*
class Square extends React.Component {
	constructor(props) {
		super(props);
		console.log('rofl');
		this.state = {
			value:null
		};
	}
	render() {
		return (
			<button 
				className = "square" 
				onClick   = { () => this.props.onClick() }
			>
				{this.props.value}
			</button>
		);
	}
}
*/

const Square = ( props ) => {
	return (
		<button 
			className = "square" 
			onClick   = { () => props.onClick() }
		>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { squares: square9(), nextX: true }
	}

	renderSquare = (i) => {
		return (
			<Square 
				value   = { this.state.squares[ i ] } 
				onClick = { () => this.handleClick(i) }
			/>
		);
	}

	upNext = () => {
		return this.state.nextX ? '☃' : '💃';
	}

	handleClick = ( i ) => { 
		if ( this.state.squares[ i ] || calculateWinner( this.state.squares ) ) {
			console.log( 'yeah right...' );
			return;
		}
		const feh = this.state.squares.slice();
		feh[ i ] = this.upNext();
		this.setState({squares:feh});
		this.setState({nextX:!this.state.nextX});
	}

	render = () => {
		const winner = calculateWinner( this.state.squares );

		const status = (
			winner
			? 'Winner is ' + winner
			: 'Next player: ' + this.upNext()
		);

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { 
			history: [ { squares: square9() } ],
			nextX: true,
			startTime:niceTime()
		}
	}
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
				<div>Loaded: {this.state.startTime}</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

