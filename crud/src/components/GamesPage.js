import React, { Component } from 'react'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import GamesList from './GamesList'
import { fetchGames } from '../actions'

class GamesPage extends Component {
  componentDidMount () {
    this.props.fetchGames();
  }
  render() {
    console.log(this.props.games)
    return (
      <div>
        <GamesList games = { this.props.games } />
      </div>
    )
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames })(GamesPage) // dispatch 中的方法  映射到props中


