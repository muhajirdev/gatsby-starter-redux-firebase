import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const TodoItem = ({ todo }) => {
  const { text, done } = todo
  return (
    <li style={{ listStyle: 'none' }}>
      {done ? '✓' : '-'} {text}
    </li>
  )
}

class Todos extends Component {
  state = {
    text: '',
  }

  pushText = () => {
    this.setState({ text: '' })
    this.props.firebase.push('todos', {
      text: this.state.text,
      done: false,
    })
  }

  changeText = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    const todosList = !isLoaded(this.props.todos)
      ? 'Loading'
      : isEmpty(this.props.todos)
        ? 'Todo list is empty'
        : Object.keys(this.props.todos).map((key, id) => (
            <TodoItem key={key} id={id} todo={this.props.todos[key]} />
          ))
    return (
      <div>
        <h1>Todos</h1>
        <ul>{todosList}</ul>
        <input type="text" onChange={this.changeText} value={this.state.text} />
        <button onClick={this.pushText}>Add</button>
      </div>
    )
  }
}
export default compose(
  firebaseConnect([
    'todos', // { path: '/todos' } // object notation
  ]),
  connect(state => ({
    todos: state.firebase.data.todos,
    // profile: state.firebase.profile // load profile
  }))
)(Todos)
