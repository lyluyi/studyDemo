import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

// class Clock extends React.Component{
//   constructor (props) {
//     super(props)
//     this.state = {date: new Date()}
//   }
//   componentDidMount () {
//     this.TimerID = setInterval (() => this.tick(), 1000)
//   }
//   componentWillUnmount () {
//     clearInterval(this.TimerID)
//   }

//   tick () {
//     this.setState({
//       date : new Date()
//     })
//   }
//   render () {
//     return (
//       <div>
//       <h1>Hello, World!</h1>
//       <p>It is timer: {this.state.date.toLocaleTimeString()} </p>
//       </div>  
//     )
//   }
// }

// ReactDOM.render(
//   <Clock date = {new Date ()} />,
//   document.getElementById('root')
// )

/*
事件处理

当使用一个 ES6 类 定义一个组件时，通常的一个事件处理程序是类上的一个方法。
例如， Toggle 组件渲染一个按钮，让用户在 “ON” 和 “OFF” 状态之间切换：
*/

// class Toggle extends React.Component{
//   constructor (props) {
//     super(props);
//     this.state = {
//       isToggle : true
//     };
//     this.handleClick = this.handleClick.bind(this)
//   }
  
//   handleClick () {
//     this.setState(prevstate =>({
//       isToggle : !prevstate.isToggle
//     }))
//   }
//   render () {
//     return (
//       <button onClick = {this.handleClick} >{this.state.isToggle === true ?  'off' : 'on'}</button>
//     )
//   }
// }

// ReactDOM.render(
//   <Toggle />,
//   document.getElementById('root')
// )


/*
  React 中的条件渲染就和在 JavaScript 中的条件语句一样。
  使用 JavaScript 操作符如 if 或者条件操作符来创建渲染当前状态的元素，并且让 React 更新匹配的 UI 。
*/

  // function UserGreeting () {
  //   return <h1>welcome back!</h1>
  // }

  // function GuestGreeting () {
  //   return <h1>Please sign up.</h1>
  // }

  // function Greeting (props) {
  //   const isLoggedIn = props.isLoggedIn
  //   if (isLoggedIn) {
  //     return <UserGreeting/>
  //   } else {
  //     return <GuestGreeting/>
  //   }
  // }

  // ReactDOM.render(
  //   <Greeting isLoggedIn = {false} />,
  //   document.getElementById('root')
  // )

  // function LoginButton (props) {
  //   return (
  //     <button onClick = {props.onClick}>
  //     login
  //     </button>
  //   )
  // }

  // function LogoutButton (props) {
  //   return (
  //     <button onClick = {props.onClick}>
  //     logout
  //     </button>
  //   )
  // }


  // class LoginControl extends React.Component{
  //   constructor (props) {
  //     super(props)
  //     this.state = {isLoggedIn : false}
  //     this.handleLogoutClick = this.handleLogoutClick.bind(this)
  //     this.handleLoginClick = this.handleLoginClick.bind(this)
  //   }

  //   handleLoginClick () {
  //     this.setState({isLoggedIn: true})
  //   }

  //   handleLogoutClick () {
  //     this.setState({isLoggedIn :false})
  //   }

  //   render () {
  //     const isLoggedIn = this.state.isLoggedIn
  //     let button = null;
  //     if (isLoggedIn) {
  //       button = <LogoutButton onClick= {this.handleLogoutClick} ></LogoutButton>
  //     } else {
  //       button = <LoginButton onClick = {this.handleLoginClick} ></LoginButton>
  //     }
  //     return (
  //       <div>
  //       <Greeting isLoggedIn = {isLoggedIn}/>
  //       {button}
  //       </div>
  //     );
  //   }

  // }

  // ReactDOM.render(
  //   <LoginControl/>,
  //   document.getElementById('root')
  // )


  /*
    使用逻辑 && 操作符的内联 if 用法
  */ 

  // function MailBox (props) {
  //   const _msg = props.msgAll
  //   return(
  //     <div>
  //       <p>hello !</p>
  //       {_msg.length &&<p>you have {_msg.length} msg!</p>}
  //     </div>
  //   )
  // }

  // const msg = ['11','22','33']

  // ReactDOM.render(
  //   <MailBox msgAll = {msg}/>,
  //   document.getElementById('root')
  // )


  /*
    列表(Lists) 和 键(Keys)
  */
 
  // const num =  [1,2,3,4,5,6]
  
  // const arr= num.map((item) =>{
  //   return item*2
  // })

  // console.log(arr)

  // const num = [1,2,3,4] 

  // const Lists = num.map((item,index) => {
  //  return <li key = {index}>{item}</li>
  // })

  // ReactDOM.render(
  //   <ul>{Lists}</ul>,
  //   document.getElementById('root')
  // )

  // keys 只在数组的上下文中存在意义。一个好的经验准则是元素中调用 map() 需要 keys 。


  /*
    基本列表组件  表单(Forms)
  */ 

  // 受控组件 （controller components）

  // class NameForm extends React.Component{
  //   constructor (props) {
  //     super(props)
  //     this.state = {value:''} 
  //     this.handleChange =  this.handleChange.bind(this)
  //     this.handleSubmit = this.handleSubmit.bind(this)
  //   }
  //   componentDidMount () {
  //     this.setState({value:'aaa'})
  //   }
  //   handleChange (event) {
  //     this.setState({value:event.target.value})  // input / value
  //     console.log(this.state.value)
  //   }

  //   handleSubmit (e) {
  //     alert ('you have a submit :' + this.state.value )
  //   }

  //   render () {
  //     return (
  //       <form  onSubmit ={ this.handleSubmit} >
  //       <label>
  //         Name:
  //         <input type="text" value={this.state.value} onChange = {this.handleChange}/>
  //       </label>
  //       <input type="submit" value="Submit" />
  //       </form>
  //     )
  //   }
  // }

  // ReactDOM.render(
  //   <NameForm/>,
  //   document.getElementById('root')
  // )

  /*
    状态提升(Lifting State Up)
  */

  // 创建一个温度计算器，用来计算水在一个给定温度下是否会沸腾

  // function TemShow (props) {
  //   if (props.temNum > 100) {
  //     return <p>温度超过100</p>
  //   } else {
  //     return  <p>温度低于100</p>
  //   }
  // }

  // ******************************************** */
  // class TemShow extends React.Component{
  //   constructor (props) {
  //     super(props)
  //     this.state = {num :props.temNum}
  //     // const number  = props.temNum
  //   }

  //   componentWillReceiveProps (nextProps) {  
  //     this.setState({num: nextProps.temNum})  // 组件初始化时不调用，组件接受新的props时调用。
  //      // 利用 setState 来更新组件 
  //   }
  //   render () {
  //     if (this.state.num > 100) {
  //       return <p>温度超过100</p>
  //     } else {
  //       return  <p>温度低于100</p>
  //     }
  //   }
  // }

// 利用函数式组件 对props 进行判断 直接渲染需要的组件
  //  function TemShow (props) {
  //   if (props.temNum > 100) {
  //     return <p>温度超过100</p>
  //   } else {
  //     return  <p>温度低于100</p>
  //   }
  //  }
    

  // ****************************************************

  // ReactDOM.render(
  //   <TemShow temNum = {101}/>,
  //   document.getElementById('root')
  // )

  // class TemPrint extends React.Component{
  //   constructor (props) {
  //     super(props)
  //     this.handleChange = this.handleChange.bind(this)
  //     this.state = {value : '111'}
  //   }

  //   handleChange (event) {
  //     this.setState({value:event.target.value})
  //       console.log(this.state.value)
  //   }

  //   render () {
  //     const temInput = this.state.value
  //     return (
  //       <div>
  //       <div>请输入温度:</div>
  //       <TemShow temNum = {temInput}/>
  //       <input type = 'text'  value = {temInput} onChange = {this.handleChange}></input>
  //       </div>
  //     )
  //   }
  // }

  // ReactDOM.render(
  //   <TemPrint/>,
  //   document.getElementById('root')
  // )

  // function BoilingVerdict(props) {
  //   if (props.celsius >= 100) {
  //     return <p>The water would boil.</p>;
  //   }
  //   return <p>The water would not boil.</p>;
  // }

  // const scaleNames = {
  //   c: 'Celsius',
  //   f: 'Fahrenheit'
  // };

  // function toCelsius(fahrenheit) {
  //   return (fahrenheit - 32) * 5 / 9;
  // }
  
  // function toFahrenheit(celsius) {
  //   return (celsius * 9 / 5) + 32;
  // }
  
  // function tryConvert(temperature, convert) {
  //   const input = parseFloat(temperature);
  //   if (Number.isNaN(input)) {
  //     return '';
  //   }
  //   const output = convert(input);
  //   const rounded = Math.round(output * 1000) / 1000;
  //   return rounded.toString();
  // }

  // class TemperatureInput extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.handleChange = this.handleChange.bind(this);
  //   }
  
  //   handleChange(e) {
  //     this.props.onTemperatureChange(e.target.value);
  //   }
  
  //   render() {
  //     console.log(this.props)
  //     const temperature = this.props.temperature;
  //     const scale = this.props.scale;
  //     return (
  //       <fieldset>
  //         <legend>Enter temperature in {scaleNames[scale]}:</legend>
  //         <input value={temperature}
  //                onChange={this.handleChange} />
  //       </fieldset>
  //     );
  //   }
  // }

  // class Calculator extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
  //     this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  //     this.state = {temperature: '', scale: 'c'};  // 状态提升到父组件上。
  //     console.dir(this.state + "constructor***********")
  //   }
  
  //   handleCelsiusChange(temperature) {
  //     this.setState({scale: 'c', temperature});
  //   }
  
  //   handleFahrenheitChange(temperature) {
  //     this.setState({scale: 'f', temperature});
  //   }
  
  //   render() {
  //     console.dir(this.state + "render***********")
  //     const scale = this.state.scale;
  //     const temperature = this.state.temperature;
  //     const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  //     const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
  //     return (
  //       <div>
  //         <TemperatureInput
  //           scale="c"
  //           temperature={celsius}
  //           onTemperatureChange={this.handleCelsiusChange} />
  
  //         <TemperatureInput
  //           scale="f"
  //           temperature={fahrenheit}
  //           onTemperatureChange={this.handleFahrenheitChange} />
  
  //         <BoilingVerdict
  //           celsius={parseFloat(celsius)} />
  
  //       </div>
  //     );
  //   }
  // }

  // ReactDOM.render(
  //   <Calculator/>,
  //   document.getElementById('root')
  // )


  /***********
    组合 VS 继承 React 拥有一个强大的组合模型，我们建议使用组合而不是继承以实现代码的重用。
   **********/

  /*
  一些组件在设计前无法获知自己要使用什么子组件，尤其在 Sidebar 和 Dialog 等通用 “容器” 中比较常见。

  建议这种组件使用特别的 children prop 来直接传递 子元素到他们的输出中：
  */
 
  // function FancyBorder(props) {
  //   console.log(props)  //  {color: "blue", children: Array(2)}
  //   console.log(props.children)
  //   /*
  //   (2) [{…}, {…}]
  //   */
  //   return (
  //     <div className = {"FancyBorder FancyBorder-" +  props.color}>
  //       {props.children}
  //     </div>
  //   )
  // }

  // function WelcomeDialog() {
  //   return (
  //     <FancyBorder color="blue">
  //       <h1 className="Dialog-title">
  //         Welcome
  //       </h1>
  //       <p className="Dialog-message">
  //         Thank you for visiting our spacecraft!
  //       </p>
  //     </FancyBorder>
  //   );
  // }

  // ReactDOM.render(
  //   <WelcomeDialog/>,
  //   document.getElementById('root')
  // )
  

  /*
  react 推荐demo
  */

  // function Square(props) {
  //   return (
  //     <button className="square" onClick={props.onClick}>
  //       {props.value}
  //     </button>
  //   );
  // }
  
  // class Board extends React.Component {
  //   renderSquare(i) {
  //     return (
  //       <Square
  //         value={this.props.squares[i]}
  //         onClick={() => this.props.onClick(i)}
  //       />
  //     );
  //   }
  
  //   render() {
  //     return (
  //       <div>
  //         <div className="board-row">
  //           {this.renderSquare(0)}
  //           {this.renderSquare(1)}
  //           {this.renderSquare(2)}
  //         </div>
  //         <div className="board-row">
  //           {this.renderSquare(3)}
  //           {this.renderSquare(4)}
  //           {this.renderSquare(5)}
  //         </div>
  //         <div className="board-row">
  //           {this.renderSquare(6)}
  //           {this.renderSquare(7)}
  //           {this.renderSquare(8)}
  //         </div>
  //       </div>
  //     );
  //   }
  // }
  
  // class Game extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       history: [
  //         {
  //           squares: Array(9).fill(null)
  //         }
  //       ],
  //       stepNumber: 0,
  //       xIsNext: true
  //     };
  //   }
  
  //   handleClick(i) {
  //     const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //     const current = history[history.length - 1];
  //     const squares = current.squares.slice();
  //     if (calculateWinner(squares) || squares[i]) {
  //       return;
  //     }
  //     squares[i] = this.state.xIsNext ? "X" : "O";
  //     this.setState({
  //       history: history.concat([
  //         {
  //           squares: squares
  //         }
  //       ]),
  //       stepNumber: history.length,
  //       xIsNext: !this.state.xIsNext
  //     });
  //   }
  
  //   jumpTo(step) {
  //     this.setState({
  //       stepNumber: step,
  //       xIsNext: (step % 2) === 0
  //     });
  //   }
  
  //   render() {
  //     const history = this.state.history;
  //     const current = history[this.state.stepNumber];
  //     const winner = calculateWinner(current.squares);
  
  //     const moves = history.map((step, move) => {
  //       const desc = move ?
  //         'Go to move #' + move :
  //         'Go to game start';
  //       return (
  //         <li key={move}>
  //           <button onClick={() => this.jumpTo(move)}>{desc}</button>
  //         </li>
  //       );
  //     });
  
  //     let status;
  //     if (winner) {
  //       status = "Winner: " + winner;
  //     } else {
  //       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
  //     }
  
  //     return (
  //       <div className="game">
  //         <div className="game-board">
  //           <Board
  //             squares={current.squares}
  //             onClick={i => this.handleClick(i)}
  //           />
  //         </div>
  //         <div className="game-info">
  //           <div>{status}</div>
  //           <ol>{moves}</ol>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
  
  // // ========================================
  
  // ReactDOM.render(<Game />, document.getElementById("root"));
  
  // function calculateWinner(squares) {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];
  //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // }
  

/*
FilterableProductTable

    SearchBar

    ProductTable
      ProductCategoryRow
      ProductRow
*/

class ProductCategoryRow extends React.Component{
  render () {
    console.log(this.props)
    return  <tr><th colSpan='2' >{this.props.category}</th></tr>
  }
}

class ProductRow extends React.Component{
  render () {
    console.log(this.props)
    var name = this.props.product.stocked ? this.props.product.name : 
    <span style={{color:'red'}}>{this.props.product.name}</span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component{   
  // constructor (props) {  
  //   super(props)
  //   console.log(props)
  // }   
  /*
  3.super(props)------super()-----以及不写super的区别
   如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;

   如果你在constructor中要使用this.props,就必须给super加参数：super(props)；

   （无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）

   如果没用到constructor,是可以不写的；React会默认添加一个空的constructor。


  */
  render () {
    var rows = []
    var lastCategory = null
    this.props.products.forEach(product => {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
      }
      rows.push(<ProductRow product={product} name={product.name} key={product.name} />)
      //  所有挂载在组件上的props 会以对象key value的集合形式生成 
      /*
        {product: {…}, name: "Nexus 7"}
      */ 
      lastCategory = product.category
    })
    return  (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component{
  constructor (props) {
    super(props)
    console.log(this.constructor)

    // this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this)
    // this.handleInStockInputChange = this.handleInStockInputChange.bind(this)
  }
  handleFilterTextInputChange (e) {
    console.log(this) // undefined
    // this.props.onFilterTextInput (e.target.value)
  }
  handleInStockInputChange(e) {
    // this.props.onInStockInput(e.target.checked);
  }
  render () {
    console.log(this.props + '**********SearchBar')
    /*
    filterText:"ball"
    inStockOnly:false
    */
    return  (
      <form>
        <input type="text" placeholder="Search..." value = {this.props.filterText}
        onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input type="checkbox" checked = {this.props.inStockOnly}
           onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

class FilterableProductTable extends React.Component{
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      filterText: 'ball',
      inStockOnly: false
    }
  }
  render () {
    return (
      <div>
        <SearchBar
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        onFilterTextInput = {this.handleFilterTextInputChange}
        />
        <ProductTable 
        products = {this.props.products}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        onInStockInput = {this.handleInStockInputChange}
        />
      </div>
    )
  }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS}/>,
  document.getElementById('root')
)