<template>
  <div class="chat_wrapper">
    <div class="chat_container"></div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import axios from 'axios';

  const TWITCH_EMOTE_URL_TEMPLATE = 'https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/3.0';

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'chat',
    props: {
      dccon_list_url: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dccons: {},
        dcconKeywords: [],
        twitchEmotes: {},
        twitchEmotesKeywords: [],
      };
    },
    mounted() {
      this.addCss('https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
      this.addCss('/jsassist-open-dccon/static/jsassist/css/styles.css');
      this.addJs('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', () => {
        this.addJs('https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', () => {
          this.addJs('/jsassist-open-dccon/static/jsassist/js/jsassist.viewer_build18_pretty.js', () => {
            this.init();
          });
        });
      });
    },
    methods: {
      addCss(url) {
        const link = document.createElement('link');
        link.href = url;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.media = 'screen,print';
        document.getElementsByTagName('head')[0].appendChild(link);
      },
      addJs(url, cb) {
        const script = document.createElement('script');
        script.onload = cb;
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
      },
      overrideFunctions(cb) {
        // jQuery의 text 함수 실행후 replaceDccon을 실행할 수 있도록 hackedJqueryText 정의
        // eslint-disable-next-line
        const originalJqueryText = jQuery.fn.text;
        const t = this;

        function hackedJqueryText(...parmas) {
          let msg = originalJqueryText.apply(this, parmas);
          msg = t.replaceDccon(msg);
          msg = t.replaceTwitchEmotes(msg);
          return msg;
        }

        // jsassist의 addChatMessage를 덮어씀
        // eslint-disable-next-line
        const originalAddChatMessage = addChatMessage;
        // eslint-disable-next-line
        addChatMessage = function (platform, username, message) {
          // eslint-disable-next-line
          jQuery.fn.text = hackedJqueryText;
          const result = originalAddChatMessage(platform, username, message);
          // eslint-disable-next-line
          jQuery.fn.text = originalJqueryText;
          return result;
        };

        // jsassist의 connect_jsassist을 덮어씀
        // json data의 message에서 줄바꿈을 \n 문자로 변경함
        // eslint-disable-next-line
        let connect_jsassist_str = connect_jsassist.toString();
        // eslint-disable-next-line
        connect_jsassist_str = connect_jsassist_str.replace(/JSON\.parse\((.*?)\);/g, 'JSON.parse($1.replace(/(?:\\r\\n|\\r|\\n)/g, "\\\\n"));');
        // eslint-disable-next-line
        connect_jsassist_str = connect_jsassist_str.substring(connect_jsassist_str.indexOf('{') + 1, connect_jsassist_str.lastIndexOf('}'));
        // eslint-disable-next-line
        connect_jsassist = new Function(connect_jsassist_str);

        cb();
      },
      loadResources() {
        const t = this;
        t.overrideFunctions(() => {
          t.loadDccons(() => {
            t.loadTwitchEmotes();
          });
        });
      },
      loadDccons(cb) {
        const t = this;
        setTimeout(() => {
          let url = t.dccon_list_url;
          if (url === '') {
            url = 'https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json';
          }

          // eslint-disable-next-line
          addChatMessage('system', 'SYSTEM', '디시콘 목록을 불러오는 중..');

          axios.get(url)
            .then((response) => {
              try {
                t.dccons = _(response.data.dccons)
                  .flatMap(v => _(v.keywords).map(o => [o, v]).value())
                  .fromPairs()
                  .value();
                t.dcconKeywords = _(t.dccons)
                  .keys()
                  .sortBy()
                  .reverse()
                  .value();
                // eslint-disable-next-line
                addChatMessage('system', 'SYSTEM', '디시콘 목록 불러오기 완료.');
              } catch (e) {
                // eslint-disable-next-line
                addChatMessage('system', 'SYSTEM', '디시콘 목록을 불러올 수 없습니다.');
                // eslint-disable-next-line no-console
                console.log(e);
                // eslint-disable-next-line no-console
                console.log(response);
              }
              cb();
            })
            .catch((error) => {
              // eslint-disable-next-line
              addChatMessage('system', 'SYSTEM', '디시콘 목록을 불러올 수 없습니다.');
              // eslint-disable-next-line no-console
              console.log(error);
              cb();
            });
        }, 100);
      },
      loadTwitchEmotes() {
        const t = this;
        setTimeout(() => {
          // eslint-disable-next-line
          addChatMessage('system', 'SYSTEM', '트위치 공통 이모티콘 목록을 불러오는 중..');
          t.$http.get('https://twitchemotes.com/api_cache/v3/global.json', {responseType: 'json'}).then((response) => {
            t.twitchEmotes = _(response.body)
              .mapValues(v => v.id)
              .value();
            // eslint-disable-next-line
            addChatMessage('system', 'SYSTEM', '트위치 공통 이모티콘 목록 불러오기 완료.');
            // eslint-disable-next-line
            addChatMessage('system', 'SYSTEM', '트위치 구독자 이모티콘 목록을 불러오는 중..');
            t.$http.get('https://twitchemotes.com/api_cache/v3/subscriber.json', {responseType: 'json'}).then((response2) => {
              t.twitchEmotes = _.merge(_(response2.body)
                  .flatMap(v => v.emotes)
                  .keyBy('code')
                  .mapValues(v => v.id)
                  .value(),
                t.twitchEmotes,
              );
              t.twitchEmotesKeywords = _(t.twitchEmotes)
                .keys()
                .sortBy()
                .reverse()
                .value();
              // eslint-disable-next-line
              addChatMessage('system', 'SYSTEM', '트위치 구독자 이모티콘 목록 불러오기 완료.');
            }, (response2) => {
              // eslint-disable-next-line
              addChatMessage('system', 'SYSTEM', '트위치 구독자 이모티콘 목록을 불러올 수 없습니다.');
              // eslint-disable-next-line no-console
              console.log(response2);
            });
          }, (response) => {
            // eslint-disable-next-line
            addChatMessage('system', 'SYSTEM', '트위치 공통 이모티콘 목록을 불러올 수 없습니다.');
            // eslint-disable-next-line no-console
            console.log(response);
          });
        }, 0);
      },
      init() {
        this.loadResources();
      },
      replaceMsg(msg, regex, keywords, replacer) {
        let newMsg = msg;

        const r = regex;
        let m = null;
        const ms = {};
        // eslint-disable-next-line
        while (true) {
          m = r.exec(newMsg);
          if (m === null) {
            break;
          }
          ms[m.index] = m[1];
        }

        const msKeys = _(ms)
          .keys()
          .map(k => Number(k))
          .value();
        let size = _.size(ms);

        if (size === 0) {
          return newMsg;
        }

        const replaceMap = {};

        for (let j = 0; j < keywords.length; j += 1) {
          const keyword = keywords[j];
          if (size === 0) {
            break;
          }
          let replaced = false;
          const p = [];
          // eslint-disable-next-line
          for (let i = 0; i < msKeys.length; i += 1) {
            const index = msKeys[i];
            const t = ms[index];
            if (_.startsWith(t, keyword)) {
              replaced = true;
              size -= 1;
              p.push(index);
              replaceMap[index] = keyword;
            }
          }
          if (replaced) {
            _.pullAll(msKeys, p);
          }
        }

        newMsg = _.reduce(
          _(replaceMap)
            .keys()
            .map(k => Number(k))
            .sortBy()
            .reverse()
            .value(),
          (mm, k) => replacer(mm, k, replaceMap[k]),
          newMsg,
        );

        return newMsg;
      },
      replaceDccon(msg) {
        return this.replaceMsg(
          msg,
          /~([^~\s]+)/g,
          this.dcconKeywords,
          (m, index, keyword) => `${m.slice(0, index)}<img class="dccon_chat" src="${
            this.dccons[keyword].path
            }" />${m.slice(index + keyword.length + 1)}`,
        );
      },
      replaceTwitchEmotes(msg) {
        return this.replaceMsg(
          msg,
          /\n(\S*?)\n/g,
          this.twitchEmotesKeywords,
          (m, index, keyword) => `${m.slice(0, index)}<img class="twitch_emote_chat" src="${
            TWITCH_EMOTE_URL_TEMPLATE.split('{image_id}').join(this.twitchEmotes[keyword])
            }" />${m.slice(index + keyword.length + 1)}`,
        );
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

<style lang="scss">
  @import url(https://fonts.googleapis.com/earlyaccess/jejugothic.css);
  @import url(https://fonts.googleapis.com/earlyaccess/hanna.css);
  @import url(https://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url(https://fonts.googleapis.com/earlyaccess/nanumbrushscript.css);
  @import url(https://fonts.googleapis.com/earlyaccess/nanumpenscript.css);
  @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);

  .chat_text_message {
    max-height: 200px !important;
  }

  .dccon_chat {
    height: 100px;
    max-width: 100%;
    max-height: 100%;
  }

  .twitch_emote_chat {
    height: 47px;
    max-width: 100%;
    max-height: 100%;
  }
</style>
