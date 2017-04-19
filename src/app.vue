<template lang="html">
  <div class="">
    <json-form :content="content" @change="handleChange"></json-form>
  </div>
</template>

<script>

import JSONForm from './components/index.vue';

export default {
  data() {
    return {
      content: {
        "test": "测试数据，填写时请删除！"
      }
    }
  },

  components: {
    'json-form': JSONForm
  },

  methods: {
    handleChange() {
      // console.log( this.content );
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
