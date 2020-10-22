import React from 'react';
import { Link, withRouter } from "react-router-dom";
import './Game.css';
import back from './assets/images/back.png';
import forward from './assets/images/forward.png';
import { shuffle } from './utils';
import { Level, Player } from './model';

import selectSound from './assets/audio/select.wav';
import doneSound from './assets/audio/done.wav';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDone: false,
        };

        this.currentLevel = new Level();
        this.onDone = this.onDone.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
    }

    onDone() {
        let player = new Audio();
        player.src = doneSound;
        player.play();

        this.setState({showDone: true});
    }

    nextLevel() {
        this.child.resetBoard();
        this.setState({showDone: false});
    }

    render() {
        return (
            <div className="game-view">
                <Link className="back-button show" to="/"><img src={back} alt="Back"/></Link>
                <button 
                    className={`done-button ${this.state.showDone ? 'show' : ''}`} 
                    onClick={this.nextLevel}>
                    <img src={forward} alt="Done"/>
                </button>

                <GameBoard 
                    worldId={this.props.match.params.worldId}
                    level={this.currentLevel}
                    onDone={this.onDone} 
                    ref={instance => { this.child = instance; }}/>
            </div>
        );
    }
}

class GameBoard extends React.Component {

    constructor(props) {
        super(props);

        this.boardSize = props.level.boardSize;
        this.players = [ new Player() ];
        this.currentPlayer = 0;

        this.state = {
            board: this.buildBoard()
        };
    }

    resetBoard() {
        // CLose the cards before rebuild so it is no possible to see the location
        const board = this.state.board.slice();
        board.map((i) => { 
            i.active = false;
            i.matched = false;
            return i;
        });
        this.setState({ board: board }, () => {
            // Be sure that the state is updated and wait for the flip animation to finish
            setTimeout(() => this.setState({ board: this.buildBoard() }), 1000);
        });
    }

    buildBoard() {
        let board = Array.from({ length: this.boardSize }, () => ({ active: false, matched: false }));
        const indices = [];
        for (let i = 0; i < this.boardSize; i++) {
            indices.push(i);
        }
        shuffle(indices);

        for (let j = 0; j < this.boardSize / 2; j++) {
            var i1 = indices.shift();
            var i2 = indices.shift();
            board[i1].value = j;
            board[i2].value = j;
        }
        return board;
    }

    isDone(board) {
        return board.filter((i) => !i.matched).length === 0;
    }

    endTurn(board) {
        if (this.isDone(board)) {
            this.props.onDone();
            return;
        }
        this.autoHide = setTimeout(() => this.hideActiveCards(board), 1500);

        this.nextPlayer();
    }

    nextPlayer () {
        let nextPlayer = this.currentPlayer + 1;
        if (nextPlayer >= this.players.length) {
            nextPlayer = 0;
        }
        this.currentPlayer = nextPlayer;
    }

    hideActiveCards(board, callback) {
        clearTimeout(this.autoHide);
        board.map((i) => i.active = false);
        this.setState({ board: board }, callback);
    }

    isMatch(board) {
        var selected = board.filter((i) => i.active);
        if (selected.length < 2) {
            return false;
        }
        let value = selected[0].value;
        return selected.filter((i) => i.value === value).length === selected.length;
    }

    registerMatch(board) {
        board.map((i) => {
            if (i.active) {
                i.matched = true;
            }
            return i;
        });
        this.setState({ board: board });
    
        this.players[this.currentPlayer].score++;
    }

    isTurnOver(board) {
        return board.filter((i) => i.active).length >= 2;
    }

    handleClick(i) {
        const board = this.state.board.slice();

        if (board[i].active || board[i].matched) {
            return;
        }

        let audioPlayer = new Audio();
        audioPlayer.src = selectSound;
        audioPlayer.play();

        if (this.isTurnOver(board)) {
            this.hideActiveCards(board, () => this.handleTurn(board, i));
        }
        else {
            this.handleTurn(board, i);
        }
    }

    handleTurn(board, i) {
        board[i].active = !board[i].active;
        this.setState({ board: board });

        if (this.isTurnOver(board)) {
            if (this.isMatch(board)) {
                this.registerMatch(board);
            }

            this.endTurn(board);
        }
    }

    renderCard(i) {
        return <Card key={i}
            worldId={this.props.worldId}
            value={this.state.board[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const cards = [];
        for (let i = 0; i < this.boardSize; i++) {
            cards.push(this.renderCard(i));
        }

        return (
            <div className="game-board">
                {cards}
            </div>
        );
    }
}

function Card(props) {
    const activeClass = props.value.active || props.value.matched ? "active" : "";
    const highlightClass = props.value.matched ? "highlight" : "";

    return (
        <div
            className={`card ${activeClass} ${highlightClass}`}
            onClick={props.onClick}
        >
            <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back"><img src={require(`./assets/themes/${props.worldId}/${props.value.value}.jpg`)} alt=""/></div>
            </div>
        </div>
    );
}


export default withRouter(GameView);
