<template>
  <div class="todo-list-item" :class="todo.done ? 'complete' : ''">
    <input
      type="checkbox"
      class="todo-check"
      :checked="todo.done ? true : false"
      :disabled="checkDisable"
      @click="todoCheck()"
    />
    <input
      ref="inputFocus"
      :value="todo.todo"
      type="text"
      :disabled="disabled"
      class="todo-item-content"
      :class="edit == true ? 'accept' : ''"
      @keypress.enter="handleUpdate()"
    />
    <div>
      <i
        v-if="!todo.done"
        class="fa-solid fa-pen-to-square edit"
        @click="handleStatus()"
      ></i>
      <i class="fa-solid fa-trash delete" @click="handleDelete()"></i>
    </div>
    <PopUpConfirm v-model="popupStatus" :popup-data="popupData"></PopUpConfirm>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import PopUpConfirm from './PopUpConfirm.vue'

export default {
  components: { PopUpConfirm },
  props: {
    todo: { type: Object, default: null }
  },
  data() {
    return {
      disabled: true,
      edit: false,
      popupStatus: false,
      popupData: { title: '', content: '', data: {} },
      checkDisable: false
    }
  },
  methods: {
    ...mapActions('todo', ['updateTodolist']),
    handleUpdate() {
      const data = {
        id: this.todo.id,
        todo: this.$refs.inputFocus.value,
        done: this.todo.done,
        status: true
      }
      this.popupStatus = true
      this.popupData.content = 'Do you want to save this todo?'
      this.popupData.title = 'update'
      this.popupData.data = data
      this.disabled = true
      this.edit = false
      this.checkDisable = false
    },
    handleDelete() {
      this.popupStatus = true
      this.popupData.content = 'Do you want to delete this todo?'
      this.popupData.title = 'delete'
      this.popupData.data = this.todo
    },
    handleStatus() {
      this.checkDisable = true
      this.edit = true
      this.disabled = false
    },
    todoCheck() {
      this.updateTodolist(this.todo)
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-list-item {
  background-color: rgb(231, 206, 95);
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  .todo-check {
    width: 20px;
  }
  .todo-item-content {
    width: 70%;
    border: none;
    background-color: rgb(231, 206, 95);
    font-size: 30px;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
  .delete {
    color: rgba(255, 0, 0, 0.288);
    &:hover {
      cursor: pointer;
      color: rgb(255, 0, 0);
    }
  }
  .edit {
    color: rgba(0, 0, 255, 0.379);
    &:hover {
      cursor: pointer;
      color: blue;
    }
  }
  .accept {
    color: red;
  }
}

.complete {
  background-color: rgb(98, 214, 98);
  .todo-item-content {
    background-color: rgb(98, 214, 98);
    text-decoration: line-through;
  }
}
</style>
