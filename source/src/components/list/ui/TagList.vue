<template>
  <div class="tags">
    <tag v-for="tag in mapTags" :key="tag.name" :tag="tag" @click="click"></tag>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Tag from './Tag';

  export default {
    name: 'tagList',
    props: {
      tags: {
        type: Array,
        default: [],
      },
    },
    components: {
      Tag,
    },
    data() {
      return {
        selects: [],
        newMapTags: [],
      };
    },
    computed: {
      mapTags() {
        return _(this.tags)
          .map(v => ({name: v, selected: _.includes(_(this.selects).map(o => o.name).value(), v)}))
          .value();
      },
    },
    watch: {
      tags(newTags) {
        this.newMapTags = _(newTags)
          .map(v => ({name: v, selected: false}))
          .value();
        this.$emit('updateFilteredTags', this.newMapTags);
      },
      selects(newSelects) {
        if (newSelects.length > 0) {
          this.$emit('updateFilteredTags', newSelects);
        } else {
          this.$emit('updateFilteredTags', this.newMapTags);
        }
      },
    },
    methods: {
      click(tag) {
        if (tag.selected) {
          this.selects = _(this.selects).filter(v => v.name !== tag.name).value();
        } else {
          this.selects.push(tag);
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
