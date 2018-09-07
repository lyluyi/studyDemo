import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

const GameCard = ({ game }) => {
  return (
    <div className="ui card" >
      <div className="image" >
        <img src = { game.cover } alt="Game Cover" />
      </div>
      <div className="content">
        <div className="header">
          { game.title }
        </div>
      </div>
      <div className="extra content">
        <Link to={ `/game/${ game._id }` } className="ui two button green">Edit</Link>
        <div className="ui two button red">Delete</div>
      </div>
    </div>
  )
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired
}
// GameCard.propTypes = {
//   game: PropTypes.object.isRequired
// }

export default GameCard