<template>
  <div v-if="visible">
    <div class="popup-model"></div>
    <div class="popup-box">
      <p class="popup-content">{{ popupData.content }}</p>
      <div class="popup-button">
        <button class="button button-confirm" @click="handleConfirm()">
          Yes
        </button>
        <button class="button button-cancel" @click="handleCancel()">No</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    popupData: { type: Object, default: null },
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      visible: false,
    }
  },
  watch: {
    value() {
      this.visible = this.value
    }
  },
  methods: {
    ...mapActions('todo', ['delTodolist', 'updateTodolist']),
    handleCancel() {
      this.$emit('input', false)
    },
    handleConfirm() {
      if (this.popupData.title === 'delete') {
        this.delTodolist(this.popupData.data.id)
        this.handleCancel()
      } else if (this.popupData.title === 'update') {
        this.updateTodolist(this.popupData.data)
        this.handleCancel()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-model {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(190, 189, 189, 0.575);
  z-index: 1000;
}
.popup-box {
  position: absolute;
  top: 30%;
  left: 31%;
  padding: 20px;
  width: 36%;
  border-radius: 5px;
  background-color: rgb(218, 214, 214);
  box-shadow: 10px 10px 20px black;
  z-index: 1000;
  p {
    font-size: 30px;
  }
  .popup-button {
    display: flex;
    justify-content: space-around;
    .button {
      padding: 10px;
      min-width: 100px;
      color: white;
      border: none;
      border-radius: 3px;
      opacity: 0.5;
      margin-top: 30px;
      font-size: 20px;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
    .button-confirm {
      background-color: rgb(49, 238, 49);
    }
    .button-cancel {
      background-color: red;
    }
  }
}
</style>
