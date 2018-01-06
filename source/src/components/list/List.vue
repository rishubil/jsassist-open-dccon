<template>
  <div id="app">
    <div class="background">
      <div class="container">
        <div class="columns">
          <div class="column hide-xs show col-md-1 col-2"></div>
          <div class="column col-xs-12 col-md-10 col-8">
            <search :dcconList="dcconList" :tags="filteredTags" @updateFiltered="updateFiltered" :isEmptyTags="tags.length === 0"></search>
          </div>
        </div>
        <div class="columns">
          <div class="column hide-xs show col-md-1 col-2"></div>
          <div class="column col-xs-12 col-md-10 col-8">
            <tag-list :tags="tags" @updateFilteredTags="updateFilteredTags"></tag-list>
          </div>
        </div>
        <div class="columns">
          <div class="column hide-xs show col-lg-1 col-1"></div>
          <dccon-list :dcconList="filtered"></dccon-list>
        </div>
        <toast-container></toast-container>
        <div ref="clipboard" class="clipboard" :data-clipboard-text="textForCopy"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Clipboard from 'clipboard';
  import Bus from '@/bus';
  import Search from './ui/Search';
  import TagList from './ui/TagList';
  import DcconList from './ui/DcconList';
  import ToastContainer from './ui/ToastContainer';

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'list',
    props: {
      dccon_list_url: {
        type: String,
        default: '',
      },
    },
    components: {
      Search,
      TagList,
      DcconList,
      ToastContainer,
    },
    data() {
      return {
        dcconList: [],
        filtered: [],
        filteredTags: [],
        textForCopy: '',
      };
    },
    created() {
      Bus.$on('COPY_DCCON', this.copy);
    },
    mounted() {
      let url = this.dccon_list_url;
      if (url === '') {
        url = 'https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json';
      }
      this.$http.get(url, {responseType: 'json'}).then((response) => {
        this.dcconList = response.body.dccons;
      }, (response) => {
        Bus.$emit('TOAST_MSG', '디시콘 목록을 불러올 수 없습니다.');
        // eslint-disable-next-line no-console
        console.log(response);
      });
      // eslint-disable-next-line no-unused-vars
      const clipboard = new Clipboard('.clipboard');
    },
    computed: {
      tags() {
        return _(this.dcconList)
          .flatMap(v => v.tags)
          .uniq()
          .sort()
          .value();
      },
    },
    methods: {
      updateFiltered(dccons) {
        this.filtered = dccons;
      },
      updateFilteredTags(tags) {
        this.filteredTags = tags;
      },
      copy(keyword) {
        this.textForCopy = `~${keyword}`;
        Bus.$emit('TOAST_MSG', `디씨콘 ${keyword}을(를) 복사했습니다. 이제 채팅창에 입력하세요!`);
        this.$nextTick(function f() {
          this.$refs.clipboard.click();
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~spectre.css/dist/spectre.css";
  @import "~spectre.css/dist/spectre-exp.css";
  @import "~spectre.css/dist/spectre-icons.css";
  @import "~vue2-animate/dist/vue2-animate.css";

  .background {
    width: 100%;
    min-height: 100%;
    padding-top: 32px;
    padding-bottom: 48px;
    background: #454d5d;
  }

  @media only screen and (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }

  .column {
    padding-bottom: 1rem;
  }

  .clipboard {
    display: none;
  }
</style>
