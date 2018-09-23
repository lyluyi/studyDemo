import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       value: null
//     }
//   }
//   render() {
//     return (
//       <button className="square" onClick ={ () => this.props.onClick() } >
//         { this.props.value }
//       </button>
//     );
//   }
// }

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  // constructor () {
  //   super()
  //   this.state = {
  //     squares: Array(9).fill(null), // Array.fill(value, start, end) 
  //     /*
  //       arr.fill(value, start, end)
  //       value：填充值
  //       start：填充起始位置，可以省略
  //       end：填充结束位置，可以省略，实际结束位置是end-1
  //     */ 
  //     xIsNext: true
  //   }
  // }

  /*
    将 Board 中的状态数据全都移动到 Game 组件当中。Board 现在通过 props 获取从 Game 传递下来的数据和事件处理函数。
    1.删除 Board 的构造方法 constructor 。
    2.把 Board 的 renderSquare 方法中的 this.state.squares[i] 替换为 this.props.squares[i] 。
    3.把 Board 的 renderSquare 方法中的 this.handleClick(i) 替换为 this.props.onClick(i) 。
  */ 

  // handleClick (i) {
  //   const squares = this.state.squares.slice() // 相当于copy了一份this.state.squares
  //   /*
  //     arrayObject.slice(start,end)
  //     返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
  //     返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
  //   */
  //   console.log(squares)
  //   if (calculateWinner(squares) || squares[i]) {
  //     // 当前方格内已经落子/有一方获胜就就无法继续落子的判断逻辑
  //     return
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O'
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext
  //   })
  // }

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={ () => this.props.onClick(i) }
      />
    )
  }

  render() {
    // const winner = calculateWinner(this.props.squares)
    // let status
    // if (winner) { // 
    //   status = 'Winner: ' + winner
    // } else {
    //   status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    // }
    return (
      <div>
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


/*
  顶层的 Game 组件中展示一个链接每一步历史记录的列表。
  所以就像我们之前将 state 从 Square 组件提升到 Board 中一样，
  现在我们把 Board 中的状态数据再提升到 Game 组件中来。
*/ 
class Game extends React.Component {
  constructor () {
    super()
    // 初始化我们需要的状态数据
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }
  
  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1) // 获取history中保存的squares 集合
    // 在撤回操作的情况下，再次点击落子时，就应该依据stepNumber的值，重新setState history的值render
    const current = history[history.length - 1] // 获取最后的squares 记录对象
    const squares = current.squares.slice() // copy出histopy集合中最后项中的squares Array
    console.log(squares)
    if (calculateWinner(squares) || squares[i]) {
      // 当前方格内已经落子/有一方获胜就就无法继续落子的判断逻辑
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O' // 落子 设定当前落子index的'X' or 'O'
    this.setState({ // 每一次改变squares 保存一次这个对象
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length, // 设置参数 记录当前步骤number
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo (step) {
    // 撤回步骤时，根据渲染传入的move （index）索引值，
    // render时，从history中依据索引取出该步骤对应的squares进行渲染
    this.setState({
      stepNumber: step, // 根据history的长度循环生成的move值
      xIsNext: (step % 2) ? false : true // 撤回时，必须要根据step的值 取true或false
    })
  }

  render() {
    const history = this.state.history // 获取history中保存的squares 集合
    console.log(history)
    const current = history[this.state.stepNumber] // 获取最后的squares 记录对象
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => { // move 为 index 索引
    const desc = move ?  // index = 0 即 move = 0 => 'Game Start'
      'Move' + move :
      'Game Start';
    console.log(step, move)
    return (
      <li key={ move } >
        <a href="#" onClick={ () => this.jumpTo(move) }>{ desc }</a>
      </li>
    )
    })

    let status
    if (winner) { 
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares } // 
            onClick={ (i) => { this.handleClick(i) } }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    )
  }
}

// 判断获胜方的算法函数
function calculateWinner (squares) { // 传入棋盘数组
  const lines = [ // 可能获胜的落子情形
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  console.log(lines.length)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    console.log([a, b, c] + '************' + i)
    console.log(lines[i])
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // a===b===c
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
