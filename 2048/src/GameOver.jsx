import React from "react";

const GameOver = (props) => {
    return <div className="game-over">
        <p>Game Over</p>
        <p>Score: {props.score}</p>
    </div>
}

export default GameOver;