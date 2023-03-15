export const state = () => ({
  todoList: []
})

export const getters = {
  all(state) {
    return state.todoList
  },
  uncomplete(state) {
    return state.todoList.filter((item) => !item.done)
  },
  completed(state) {
    return state.todoList.filter((item) => item.done)
  }
}

export const mutations = {
  store(state, data) {
    state.todoList = data
  },
  add(state, content) {
    state.todoList.push(content)
  },
  update(state, todo) {
    const index = state.todoList.findIndex((item) => item.id === todo.id)
    state.todoList[index].todo = todo.todo
    state.todoList[index].done = todo.done
  },
  del(state, todo) {
    const index = state.todoList.findIndex((item) => item.id === todo.id)
    state.todoList.splice(index, 1)
  }
}

export const actions = {
  getTodoList(vuexContext) {
    return this.$axios
      .$get('https://640fee7ee1212d9cc9250d67.mockapi.io/api/v1/todo')
      .then((res) => {
        vuexContext.commit('store', res)
      })
  },
  postTodolist(vuexContext, data) {
    return this.$axios
      .$post('https://640fee7ee1212d9cc9250d67.mockapi.io/api/v1/todo', data)
      .then((res) => {
        vuexContext.commit('add', res)
      })
      .catch((err) => {
        alert(err)
      })
  },
  updateTodolist(vuexContext, data) {
    if (!data.status)
      return this.$axios
        .$put(
          `https://640fee7ee1212d9cc9250d67.mockapi.io/api/v1/todo/${data.id}`,
          {
            done: !data.done
          }
        )
        .then((res) => {
          vuexContext.commit('update', res)
        })
        .catch((err) => {
          alert(err)
        })
    else
      return this.$axios
        .$put(
          `https://640fee7ee1212d9cc9250d67.mockapi.io/api/v1/todo/${data.id}`,
          { todo: data.todo }
        )
        .then((res) => {
          vuexContext.commit('update', res)
        })
        .catch((err) => {
          alert(err)
        })
  },
  delTodolist(vuexContext, id) {
    return this.$axios
      .$delete(`https://640fee7ee1212d9cc9250d67.mockapi.io/api/v1/todo/${id}`)
      .then((res) => {
        vuexContext.commit('del', res)
      })
      .catch((err) => {
        alert(err)
      })
  }
}
