import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATE } from '../constants';

export const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
};

export const fetchGames = () => {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)))
  }
}

  /*
  <Link to={ `/game/${ game._id }` } className="ui two button green">Edit</Link> // 从game的id匹配路由
  
  componentDidMount () { // 在钩子函数里面props里面的路由信息中匹配到当前的id
  console.log(this.props)
    {match: {…}, location: {…}, history: {…}, staticContext: undefined, saveGame: ƒ}
    const { match } = this.props
    if (match.params._id) {
      if (match.params._id) {
        console.log("_id:" + match.params._id)

        //  然后通过 mapDispatchToProps: { fetchGame } 将fetchGame映射到props中
        this.props.fetchGame(match.params._id)
      }
    }
  }

  // 依次 进行 dispatch 
  fetchGame  异步 请求服务端 返回的数据
  gameFetched 返回的数据 再进行dispatch 
  然后在reducer 中 case 处理

  */

export const gameFetched = (game) => {
  return {
    type: GAME_FETCHED,
    game
  }
}


export const fetchGame = (id) => {
  return dispatch => {
    fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)))
  }
};


const handleResponse = (response) => {
  /*
   请求的回调函数，因为服务端没有没有写入相关请求配置 因此请求是，一定报404 

   fetch 响应出 response 抛出 new Error
  
  
  */
  if (response.ok) {
    return response.json()
  } else {
    let error = new Error(response.statusText)
    console.log(response)
    error.response = response
    throw error;
  }
}

export const addGame = (game) => {
  return {
    type: ADD_GAME,
    game
  }
};


export const saveGame = (data) => {
  return dispatch => {  
    return fetch('/api/games', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
        }
      }
    ).then(handleResponse)
     .then(data => dispatch(addGame(data.game)))
  }
}

export const gameUpdate = (game) => {
  console.log(game)
  return {
    type: GAME_UPDATE,
    game
  }
}

export const updateGame = (data) => {
  console.log(data)
  return dispatch => {  
    return fetch(`/api/games/${data._id}`, {
      method: 'put', // 修改数据
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
        }
      }
    ).then(handleResponse)
     .then(data => dispatch(gameUpdate(data.game)))
  }
}

  /**
   * 1.GameForm 中 import { saveGame } from "../actions"
   * 
   * 2.GameForm 中 export default connect(null, { saveGame })(GameForm)  
   * // connect 接入react-redux  
   * // mapStateToProps: null  mapDispatchToProps: { saveGame } 将saveGame映射到props中
   * 
   * 3. actions 中 saveGame 传入data 执行 return 出 dispatch 
   * 
   * redux 执行dispatch 然后fetch执行（！！！ 方法一定要return） 最后then()执行
   * 
   **/

/*
  //   this.props.saveGame({ title, cover }).then(
  //   () => {}, // 成功时
  //   (err) => err.response.json().then(({ error }) => { this.setState({ error, loading: false })})
  //   // 失败时回调参数err err的response通过json序列化，成功取到返回error对象信息 error: { global }
  //  )

  app.use((req, res) => {
    // 状态404时，返回的json对象{ error：global }
    res.status(404).json({
      error: {
        global: 'Still working on it, Please try again later than when implement it'
      }
    })
  })
 */

