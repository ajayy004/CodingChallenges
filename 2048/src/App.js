import React, { Component } from "react";
import './App.css';
import GameOver from './GameOver.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    let game = this.startGame(4);
    this.state = {
      size: 4,
      gamerVariations: [4,8,16],
      isGameOver: false,
      isWon: false,
      score: 0,
      grid: game
    };
  }

  componentDidMount() {
    this.addEventListener()
  }

  render() {
    const { grid, isGameOver, score, isWon, gamerVariations, size } = this.state;
    return (
      <div className="App">
        <div className="header">
          <div className="clearfix mgBtm-20">
            <div className="pull-left">
              <select onChange={(e) => this.changeGride(e)}>
                {gamerVariations.map((val, key) => {
                  return <option value={val} key={key}>{val} Grid</option>
                })}
              </select>
              {isWon ? <h2>You won Game</h2> : null}
              {isGameOver ? <h3>Game over</h3> : null}
            </div>
          </div>
          <div className="clearfix mgBtm-20">
            <div className="pull-left">
              Score: <div className="score">{score}</div>
            </div>
            <button className="pull-right" onClick={e => this.restartGame(size)}>Restart</button>
          </div>
          <p>Use 1, 2, 3, 4 key to move left,right,up and down</p>
        </div>
        <div className="game" style={{width: 90*size}}>
          {isGameOver ? <GameOver score={score}/> : null}
          {grid.map((row, rKey) => {
            return (
              <div className="row" key={rKey}>
                {row.map((cell, cKey) => {
                  return (
                    <div
                      className="cell"
                      key={cKey}
                      style={this.getFontStyle(cell)}
                    >
                      {cell === 0 ? null : cell}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  addEventListener = () => {
    window.addEventListener("keydown", this.checkKey, false);
  }

  removeEventListener = () => {
    window.removeEventListener("keydown", this.checkKey, false);
  }

  changeGride = e => {
    this.setState({
      size: e.target.value
    });

    this.restartGame(e.target.value);
  }

  getFontStyle = num => {
    const size = {
      2: {
        fontSize: 60,
        backgroundColor: "#eee4da"
      },
      4: {
        fontSize: 60,
        backgroundColor: "#eee1c9"
      },
      8: {
        fontSize: 60,
        color: "#f9f6f2",
        backgroundColor: "#f3b27a"
      },
      16: {
        fontSize: 60,
        color: "#f9f6f2",
        backgroundColor: "#f69664"
      },
      32: {
        fontSize: 60,
        color: "#f9f6f2",
        backgroundColor: "#f77c5f"
      },
      64: {
        fontSize: 60,
        color: "#f9f6f2",
        backgroundColor: "#f75f3b"
      },
      128: {
        fontSize: 40,
        color: "#f9f6f2",
        backgroundColor: "#edd073"
      },
      256: {
        fontSize: 40,
        color: "#f9f6f2",
        background: "#edcc62"
      },
      512: {
        fontSize: 40,
        color: "#f9f6f2",
        background: "#edc950"
      },
      1024: {
        fontSize: 30,
        color: "#f9f6f2",
        background: "#edc53f"
      },
      2048: {
        fontSize: 30,
        color: "#f9f6f2",
        background: "#edc22e"
      }
    };

    return size[num];
  };

  restartGame = val => {
    this.setState({
      score: 0,
      isGameOver: false,
      isWon: false,
      grid: this.startGame(val)
    });

    this.removeEventListener();
    this.addEventListener();
  };

  checkKey = e => {
    e = e || window.event;
    if (e.keyCode >= 49 && e.keyCode <= 52) {
      this.makeAMove(e.keyCode - 49);
    }
  };

  copyGrid = grid => {
    let newGrid = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push([]);
      for (let j = 0; j < grid.length; j++) {
        newGrid[i][j] = grid[i][j];
      }
    }
    return newGrid;
  };

  compareGrid = (newGrid, grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (newGrid[i][j] !== grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  makeAMove = direction => {
    // 0 > left, 1 > right , 2 > up, 3 > down
    const { grid, size } = this.state;
    let newGrid = this.copyGrid(grid);
    let isFliped = false;
    let isRotated = false;
    if (grid.length > 0) {
      switch (direction) {
        case 0:
          // console.log("left move");
          newGrid = this.flipGrid(newGrid);
          isFliped = true;
          break;
        case 1:
          // console.log("righ move");
          break;
        case 2:
          // console.log("up move");
          newGrid = this.rotateGrid(newGrid);
          newGrid = this.flipGrid(newGrid);
          isRotated = true;
          isFliped = true;
          break;
        default:
          // 3
          // console.log("down move");
          newGrid = this.rotateGrid(newGrid);
          isRotated = true;
          break;
      }

      for (let i = 0; i < size; i++) {
        newGrid[i] = this.operate(newGrid[i]);
      }
      if (isFliped) {
        newGrid = this.flipGrid(newGrid);
      }
      if (isRotated) {
        newGrid = this.rotateGrid(newGrid);
      }

      if (!this.compareGrid(newGrid, grid)) {
        newGrid = this.addNumber(newGrid);
        let isGameOver = this.isGameOver(newGrid);
        if (newGrid) {
          this.setState({ grid: newGrid, isGameOver });
        }
        if (isGameOver) {
          this.removeEventListener();
          console.log("Game over");
        }
      }
    }
  };

  isGameOver = grid => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === 0) {
          return false;
        }

        if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
          return false;
        }

        if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
          return false;
        }
      }
    }

    return true;
  };

  operate = row => {
    row = this.move(row);
    row = this.merge(row);
    row = this.move(row);
    return row;
  };

  flipGrid = grid => {
    for (let i = 0; i < grid.length; i++) {
      grid[i].reverse();
    }
    return grid;
  };

  rotateGrid = grid => {
    let newGrid = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push([]);
      for (let j = 0; j < grid.length; j++) {
        newGrid[i][j] = grid[j][i];
      }
    }
    return newGrid;
  };

  getGrid = size => {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  };

  addNumber = grid => {
    let options = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === 0) {
          options.push({
            x: i,
            y: j
          });
        }
      }
    }

    if (options.length > 0) {
      let random = options[Math.floor(Math.random() * options.length)];
      let r = Math.random();
      grid[random.x][random.y] = r > 0.3 ? 2 : 4;
      return grid;
    }

    return null;
  };

  startGame = size => {
    let grid = this.getGrid(size);
    grid = this.addNumber(grid);
    grid = this.addNumber(grid);
    return grid;
  };

  move = grid => {
    let newGrid = grid.filter(val => val);
    let zero = new Array(grid.length - newGrid.length).fill(0);
    return zero.concat(newGrid);
  };

  merge = grid => {
    let { score, isWon } = this.state;
    for (let i = grid.length; i > 0; --i) {
      let num1 = grid[i];
      let num2 = grid[i - 1];
      if (num1 === num2) {
        grid[i] = num1 + num2;
        score += grid[i];
        grid[i - 1] = 0;
      }

      if (grid[i] >= 2048) {
        isWon = true;
      }
    }
    this.setState({ score: score, isWon: isWon });
    return grid;
  };
}

export default App;