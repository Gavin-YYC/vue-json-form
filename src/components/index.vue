<template lang="html">
  <div class="json-form__wrap">
    <!--按钮操作组-->
    <div class="json-form__header">
      <div class="json-form__button-group">
        <button class="json-form__button" :class="{'json-form__button--active': isFormShow}" @click="toggleJSONFormView('form')">
          Form
        </button>
        <button class="json-form__button" :class="{'json-form__button--active': isJSONShow}" @click="toggleJSONFormView('json')">
          JSON
          <i class="icon-caret-right"></i>
        </button>
      </div>
    </div>
    <!--工作区-->
    <div class="json-form__content">
      <!--表单工作区-->
      <div class="json-form__form" v-show="isFormShow" :class="{'json-form__form--single': !isJSONShow}" ref="my-form">
        <my-form :content="myContent" @blur="handleFormBlur"></my-form>
      </div>
      <!--json工作区-->
      <div class="json-form__json" v-show="isJSONShow" :class="{'json-form__json--single': !isFormShow}">
        <my-editor :content="myContent" :height="autoSetEditorHeight" @blur="handleEditorBlur"></my-editor>
      </div>
    </div>
  </div>
</template>

<script>

import myForm from './form.vue';
import editor from './editor.vue';

export default {

    props: {
      content: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        // 编辑器显示与隐藏
        isFormShow: true,
        isJSONShow: true,
        myContent: this.content,
        autoSetEditorHeight: '800px'
      }
    },

    components: {
      'my-form': myForm,
      'my-editor': editor
    },

    methods: {
      // 切换json与from视图
      toggleJSONFormView( view ) {
        view = view === 'form' ? 'isFormShow' : 'isJSONShow';
        this[ view ] = !this[ view ];
      },

      // 编辑器失焦时更新数据
      handleEditorBlur( val ) {
        try {
          this.myContent = JSON.parse( val );
          this.$emit('change', this.myContent);
        } catch (e) {
          console.log('编辑内容存在错误，请检查！')
        }
      },

      // 表单失焦时更新数据
      handleFormBlur( val ) {
        this.myContent = JSON.parse(JSON.stringify(val));
        this.$emit('change', this.myContent);
      }
    }
}
</script>

<style lang="less">
.json-form__button-group {
  display: inline-block;
  vertical-align: middle;
}
.json-form__button {
  display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-user-select: none;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.json-form__button--active {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}
.json-form__wrap {
  margin: 30px;
  border-radius: 10px;
  border: 1px dashed #ddd;
  padding: 15px;
  transition: all 0.3s ease;
  .json-form__header {
    display: flex;
    justify-content: flex-end;
    height: 50px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
  }
  .json-form__content {
    display: flex;
    justify-content: space-between;
  }
  .json-form__form {
    padding-right: 20px;
    .el-input__inner {
      width: 100%;
    }
  }
  .json-form__form,
  .json-form__json {
    width: 50%;
  }
  .json-form__form--single {
    border-right: none;
    padding-right: 0;
  }
  .json-form__form--single,
  .json-form__json--single {
    width: 100%;
  }
}
</style>
