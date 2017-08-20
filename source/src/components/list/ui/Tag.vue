<template>
  <label class="chip" :class="{'tag-selected': tag.selected}" @click="click(tag)">
    {{tag.name}}
  </label>
</template>


<script>
  export default {
    name: 'tag',
    props: {
      tag: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {};
    },
    methods: {
      click(tag) {
        this.$emit('click', tag);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .chip {
    margin-right: 8px;
    margin-bottom: 8px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
  }

  .tag-selected {
    color: #fff;
    background: #5764c6;
  }
</style>
