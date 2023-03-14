<template>
  <div class="todoapp-box">
    <h1>Todo List</h1>
    <input
      v-model="newValue"
      class="todo-new-input"
      type="text"
      placeholder="New todo"
      @keypress.enter="post()"
    />
    <div class="todo-list-box">
      <div
        v-for="(todo, index) in filterTodos"
        :key="todo.id"
        class="todo-list-item"
        :class="todo.done ? 'complete' : ''"
      >
        <span @click="updateTodolist(todo)"
          >{{ index + 1 }} . {{ todo.todo }}</span
        >
        <i class="fa-solid fa-trash" @click="delTodolist(todo.id)"></i>
      </div>
    </div>
    <div class="todo-button">
      <div class="todo-filter">
        <input v-model="filter" type="radio" value="all" checked /> All <br />
        <input v-model="filter" type="radio" value="completed" /> Complete
        <br />
        <input v-model="filter" type="radio" value="uncomplete" /> Not Complete
      </div>
      <div class="todo-delete-all">
        <button class="todo-delete-button">Delete All</button>
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
      todoList: []
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
    ...mapActions('todo', [
      'getTodoList',
      'postTodolist',
      'delTodolist',
      'updateTodolist'
    ]),
    post() {
      const data = {
        id: this.filterTodos[this.filterTodos.length - 1].id + 1,
        todo: this.newValue,
        done: false
      }
      this.postTodolist(data)
      this.newValue = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.todoapp-box {
  background-color: rgb(235, 205, 150);
  width: 35%;
  height: 90vh;
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
    .todo-list-item {
      background-color: rgb(231, 206, 95);
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      span {
        width: 90%;
      }
      i {
        color: rgba(255, 0, 0, 0.288);
        position: relative;
        top: 10px;
        &:hover {
          cursor: pointer;
          color: rgb(255, 0, 0);
        }
      }
    }
    .complete {
      background-color: rgb(98, 214, 98);
      span {
        text-decoration: line-through;
      }
    }
  }
  .todo-button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .todo-filter {
      font-size: 20px;
    }
    .todo-delete-all {
      .todo-delete-button {
        height: 40px;
        color: white;
        background-color: rgba(207, 69, 69, 0.767);
        border: none;
        border-radius: 3px;
        padding: 10px;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          background-color: red;
        }
      }
    }
  }
}
</style>
