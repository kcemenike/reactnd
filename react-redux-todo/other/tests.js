function List(props) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          <span
            onClick={() => props.toggle && props.toggle(item.id)}
            style={{ textDecoration: item.complete ? 'line-through' : 'none' }}
          >
            {item.name}
            <button onClick={() => props.remove(item)}>X</button>
          </span>
        </li>
      ))}
    </ul>
  )
}

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault()

    this.props.store.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ''
    ))
  }

  removeItem = (todo) => {
    this.props.store.dispatch(handleDeleteTodo(todo))
  }

  toggleItem = (id) => {
    this.props.store.dispatch(handleToggleTodo(id))
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder='Add todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          remove={this.removeItem}
          items={this.props.todos}
          toggle={this.toggleItem}
        />
      </div>
    )
  }
}

class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault()
    dispatch(handleAddGoal(
      this.input.value,
      () => this.input.value = ''
    ))
  }
  removeItem = (goal) => {
    dispatch(handleDeleteGoal(goal))
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <input
          type="text"
          placeholder="Add Goal"
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Goal</button>
        <List remove={this.removeItem} items={this.props.goals} />
      </div>
    )
  }
}

class ConnectedGoals extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {(store) => {
          const { goals } = store.getState()
          return <Goals goals={goals} dispatch={store.dispatch} />
        }}
      </Context.Consumer>
    )
  }
}

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props

    store.dispatch(handleInitialData())

    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  render() {
    const { store } = this.props
    const { todos, loading } = store.getState()

    if (loading === true) {
      return <h3>loading</h3>
    }

    return (
      <div>
        App
        <Todos todos={todos} store={this.props.store} />
        <ConnectedGoals />

      </div>
    )
  }
}

class ConnectedApp extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {(store) => (
          <App store={store} />
        )}
      </Context.Consumer>
    )
  }
}

const Context = React.createContext()

class Provider extends React.Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)