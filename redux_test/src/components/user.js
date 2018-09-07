import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { get_user } from '../actions'

class User extends Component {
  render() {
    const { get_user, user } = this.props

    const { error, isFetching } = this.props.user

    let data;

    if (error) {
      data = error
    } else if (isFetching) {
      data = 'isLoading'
    } else {
      data = user['user'].email
    }
    console.log(this.props)
    return (
      <div>
        {/* { user.user.email }  { user.data } */}
        <h1 className="jumtotron-heading text-center">{ data }</h1>
          <p className="text-center">
          <button onClick={ () => get_user() } className="btn btn-success mr-2">GTE RANDOM USER</button>
          </p>        
      </div>
    )
  }
}

export default User

//  单独给User 一个connect

// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.user
//   }
// }

// export default connect(mapStateToProps, { get_user })(User)
