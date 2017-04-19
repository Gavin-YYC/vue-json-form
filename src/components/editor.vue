<template lang="html">
  <div id="editor" :style="{height: height, width: width}"></div>
</template>

<script>

import ace from 'brace';
import jsonMode from 'brace/mode/json';
import monokaiTheme from 'brace/theme/monokai';

export default {
  props: {
    content: {
      type: Object,
      default: {}
    },
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },

  data() {
    return {
      editor: null,
      events: ['change', 'focus', 'blur', 'copy', 'paste']
    }
  },

  mounted() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setMode('ace/mode/json');
    this.editor.setTheme("ace/theme/monokai");
    this.editor.$blockScrolling = Infinity;
    this.editor.setValue(this.formatContent(this.content), 1);
    this.events.forEach(event => {
      this.editor.on(event , () => {
        this.$emit(event, this.editor.getValue());
      });
    });
  },

  watch: {
    content( val ) {
      this.editor.setValue(this.formatContent(val), 1);
    }
  },

  methods: {
    formatContent( content ) {
      return JSON.stringify(content, null, 4);
    }
  }
}
</script>

<style lang="less">
</style>
