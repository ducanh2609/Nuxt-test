<template>
  <div class="todoapp-box">
    <h1>Todo List</h1>
    <input v-model="newValue" class="todo-new-input" type="text" placeholder="New todo" @keypress.enter=" status === '' ? post() : update()" />
    <div class="todo-list-box">
      <div v-for="todo in filterTodos" :key="todo.id">
        <TodoItems :todo="todo"></TodoItems>
      </div>
    </div>
    <div class="todo-filter">
      <div><input v-model="filter" type="radio" value="all" checked /> All</div>
      <div>
        <input v-model="filter" type="radio" value="completed" /> Completed
      </div>
      <div>
        <input v-model="filter" type="radio" value="uncomplete" /> Not Complete
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      newValue: '',
      value: '',
      filter: 'all',
      status: ''
    }
  },
  computed: {
    filterTodos() {
      return this.$store.getters[`todo/${this.filter}`]
    }
  },
  created() {
    this.getTodoList()
  },
  methods: {
    ...mapActions('todo', ['getTodoList']),
    post() {
      let id
      if (this.filterTodos[this.filterTodos.length - 1]) {
        id = this.filterTodos[this.filterTodos.length - 1].id + 1
      } else {
        id = 1
      }
      const data = {
        id,
        todo: this.newValue,
        done: false
      }
      this.postTodolist(data)
      this.newValue = ''
    },
    update() {
      const data = {
        status: this.status,
        id: this.idEdit,
        todo: this.newValue,
      }
      this.updateTodolist(data)
      this.newValue = ''
      this.idEdit = -1
      this.status = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.todoapp-box {
  background-color: rgb(235, 205, 150);
  width: 35%;
  height: 85vh;
  margin: 30px auto;
  border-radius: 10px;
  box-shadow: 5px 5px 20px olive;
  padding: 10px 40px 30px;
  box-sizing: border-box;

  h1 {
    text-align: center;
    font-size: 40px;
  }

  .todo-new-input {
    height: 50px;
    width: 97%;
    border-radius: 3px;
    border: none;
    outline: none;
    font-size: 20px;
    padding: 0 10px;
    margin-bottom: 20px;

    &::placeholder {
      color: rgba(221, 99, 99, 0.479);
    }

    &:focus {
      scale: 1.05;
      box-shadow: 3px 3px 5px black;
    }
  }

  .todo-list-box {
    height: 70%;
    background-color: white;
    border-radius: 5px;
    box-shadow: inset 3px 3px 5px rgb(63, 55, 41);
    padding: 30px;
    box-sizing: border-box;
    font-size: 30px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 2px;
      background-color: rgb(235, 205, 150);
    }

    &::-webkit-scrollbar-thumb {
      background-color: orange;
    }
  }

  .todo-filter {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

}
</style>
