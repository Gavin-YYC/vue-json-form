<template lang="html">
  <div class="form__wrap">
    <section class="form__section" v-for="(item, key) in myContent">
      <template v-if="isBasicObj( item )">
        <div class="form__control">
          <div class="form__input-wrap">
            <span class="form__input-label">{{key}}</span>
            <input placeholder="请输入内容"
              class="form__input-inner"
              type="text"
              name=""
              v-model="myContent[key]"
              @blur="handleBlur">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form__obj-wrap">
          <p class="form__title">{{key}}</p>
          <my-form :content="myContent[key]" :data-path="key"></my-form>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: 'my-form',
  props: {
    content: {
      type: [Object, Array],
      required: true
    }
  },

  computed: {
    myContent() {
      return this.content;
    }
  },

  methods: {
    isBasicObj( obj ) {
      return typeof obj !== 'object';
    },

    handleBlur( event ) {
      const val = event.target.value;
      let con = this;
      // 递归组件的时候，找不到最原始的数据
      // 这里通过事件路径向上查找原始数据
      // 暂时这么处理吧，还没想到解决方法
      event.path.reverse().forEach(item => {
        if ( item.classList && item.classList.contains('form__wrap') && item.dataset.path ) {
          con = con.$parent;
        }
      });
      con.$emit('blur', con.myContent);
    }
  }
}
</script>

<style lang="less">
.form__wrap {
  margin-left: 30px;
  &:nth-child(1) {
    margin-left: 0;
  }
  .form__control {
    margin-bottom: 10px;
  }
}
.form__obj-wrap {
  margin-bottom: 10px;
  border: 1px dashed #ccc;
  border-radius: 10px;
  padding: 10px;
}
.form__title {
  font-weight: 700;
  margin: 0;
  padding-bottom: 10px;
}
.form__input-wrap {
  position: relative;
  font-size: 14px;
  width: 100%;
  display: inline-table;
  border-collapse: separate;
  animation: formShow 0.3s ease;
}
.form__input-label {
  background-color: #fbfdff;
  color: #97a8be;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  padding: 0 10px;
  width: 50px;
  white-space: nowrap;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.form__input-inner {
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: block;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: none;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  }
}
@keyframes formShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
