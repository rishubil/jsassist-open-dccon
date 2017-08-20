<template>
  <div class="input-group input-inline width100"
       @keydown.down="keyDown"
       @keydown.up="keyUp"
       @keydown.esc="keyEsc">
    <span class="input-group-addon">~</span>
    <div class="form-autocomplete width100">
      <div class="form-autocomplete-input form-input has-icon-right">
        <input class="form-input" id="search" placeholder="디시콘 검색"
               @input="inputUpdate"
               @focusin="inputFocusIn"
               @focusout="inputFocusOut"
               :value="query"/>
        <i class="form-icon icon icon-cross" id="searchClear" @click.prevent="searchClear"></i>
      </div>
      <ul class="menu" id="autocomplete" :class="{hide: !isVisibleAutocomplete}" ref="autocomplete">
        <li class="menu-item" v-for="(dccon, keyword) in autocompletes" :key="keyword"
            :class="{hide: !dccon.isVisible}">
          <a href="#" class="autocomplete-item" @click.prevent="autocompleteClick(keyword)">
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img v-lazy="dccon.path" class="avatar avatar-sm lazy"/>
              </div>
              <div class="tile-content">{{keyword}}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import _ from 'lodash';
  import Hangul from 'hangul-js';
  import Bus from '@/bus';

  export default {
    name: 'search',
    props: {
      dcconList: {
        type: Array,
        default: Array,
      },
      tags: {
        type: Array,
        default: Array,
      },
    },
    data() {
      return {
        query: '',
        filtered: [],
        isVisibleAutocomplete: false,
        focusIndex: -1,
      };
    },
    watch: {
      autocompletes(newAutocompletes) {
        const paths = _(newAutocompletes)
          .filter(v => v.isVisible)
          .map(v => v.path)
          .uniq()
          .value();
        this.$emit('updateFiltered', _(this.dcconList).map(v => ({
          ...v,
          isVisible: _.includes(paths, v.path),
        })).value());
      },
    },
    computed: {
      keywords() {
        return _(this.dcconList)
          .flatMap(v => _(v.keywords).map(o => [o, v]).value())
          .fromPairs()
          .value();
      },
      selectedTagNames() {
        return _(this.tags)
          .map(v => v.name)
          .value();
      },
      autocompletes() {
        const filteredKeywords = _(this.keywords)
          .keys()
          .filter(k => _.intersection(this.keywords[k].tags, this.selectedTagNames).length > 0)
          .filter(k => Hangul.search(k, this.query) !== -1)
          .value();
        return _(this.keywords)
          .keys()
          .map(k => [k, {...this.keywords[k], isVisible: _.includes(filteredKeywords, k)}])
          .fromPairs()
          .value();
      },
    },
    methods: {
      searchClear() {
        this.query = '';
      },
      inputUpdate: _.debounce(function f(e) {
        this.query = e.target.value;
      }, 200),
      autocompleteClick(keyword) {
        this.query = keyword;
        this.isVisibleAutocomplete = false;
        Bus.$emit('COPY_DCCON', keyword);
      },
      inputFocusIn() {
        this.isVisibleAutocomplete = true;
      },
      inputFocusOut(e) {
        if (e.relatedTarget === null || !_.includes(e.relatedTarget.classList, 'autocomplete-item')) {
          this.isVisibleAutocomplete = false;
        }
        this.focusIndex = -1;
      },
      keyUp(e) {
        if (this.isVisibleAutocomplete) {
          e.preventDefault();
          if (this.focusIndex !== 0) {
            this.focusIndex = this.focusIndex - 1;
            this.$refs.autocomplete.children[this.focusIndex].firstChild.focus();
          }
        }
      },
      keyDown(e) {
        if (this.isVisibleAutocomplete) {
          e.preventDefault();
          if (this.focusIndex !== (_.size(this.autocompletes) - 1)) {
            this.focusIndex = this.focusIndex + 1;
            this.$refs.autocomplete.children[this.focusIndex].firstChild.focus();
          }
        }
      },
      keyEsc(e) {
        e.preventDefault();
        this.isVisibleAutocomplete = false;
        this.focusIndex = -1;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .width100 {
    width: 100%;
  }

  #search:focus {
    z-index: auto;
  }

  #search_clear {
    cursor: pointer;
  }

  .menu {
    max-height: 360px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
