import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../constants";
// import { bake_cookie, read_cookie } from 'sfcookies'
import { bake_cookie, read_cookie } from 'sfcookies'

const reminder = (action) => {
  const { text, dueDate } = action
  return {
    text,
    dueDate,
    id: Math.random()
  }
};

const deleteId = (state, action) => {
  return state.filter( item => item.id !== action.id )
};

const reminders = (state = read_cookie('reminders') || [], action = {}) => {
  let reminders = null
  switch (action.type) {
    case ADD_REMINDER:
      reminders = [
        ...state,
        reminder(action)
      ]
      bake_cookie('reminders', reminders)
      return reminders 
    case DELETE_REMINDER:
      reminders = deleteId(state, action)
      bake_cookie('reminders', reminders)
      return reminders
    case CLEAR_REMINDER: 
      reminders = []
      bake_cookie('reminders', reminders)
      return reminders
    default:
      return state;
  }
};

export default reminders;