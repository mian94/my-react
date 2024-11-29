function Square({ value, onSquareClick }) {
  return (
      <button className="square" onClick={onSquareClick}>
          {value}
      </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      //slice() 方法创建 squares 数组的副本（nextSquares）
      const nextSquares = squares.slice();
      if (xIsNext) {
          nextSquares[i] = 'X';
      } else {
          nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
      status = 'Winner: ' + winner;
  } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    //React 组件必须返回单个 JSX 元素，不能像两个按钮那样返回多个相邻的 JSX 元素。
    //可以用<React.Fragment></React.Fragment>包裹

    //() => handleClick(0) 是一个箭头函数，它是定义函数的一种较短的方式。单击方块时，=>“箭头”之后的代码将运行，调用 handleClick(0)
      <React.Fragment>
          <div className="status">{status}</div>
          <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
      </React.Fragment>
  );
}

function Game() {
  //history：一个数组，每个元素是一个长度为9的数组，表示棋盘的状态。初始状态下只有一个元素，即初始棋盘状态，所有格子都是null
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  //currentMove：一个数字，表示当前是第几步
  const [currentMove, setCurrentMove] = React.useState(0);
  //currentMove是偶数：当前玩家是X 奇数：当前玩家是O
  const xIsNext = currentMove % 2 === 0;
  //获取当前步数对应的棋盘状态
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //...将切片后的历史记录与新的棋盘状态nextSquares合并，形成新的历史记录数组
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
      setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
          description = 'Go to move #' + move;
      } else {
          description = 'Go to game start';
      }
      return (
          <li key={move} className="move-item">
              <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
      );
  });

  return (
      <div className="game">
          <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
              <ol>{moves}</ol>
          </div>
      </div>
  );
}

function calculateWinner(squares) {
    //定义胜利组合
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

ReactDOM.render(<Game />, document.getElementById('root2'));