webpackJsonp([1],[,,,function(t,e,n){"use strict";var s=n(4),a=new s.a;e.a=a},,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var s=n(4),a=n(123),i=n(105),c=n.n(i),o=n(104),r=n.n(o);s.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"index",redirect:{name:"list"}},{path:"/list",name:"list",component:c.a,props:function(t){return{dccon_list_url:t.query.dccon_list}}},{path:"/chat",name:"chat",component:r.a,props:function(t){return{dccon_list_url:t.query.dccon_list}}}]})},,function(t,e,n){function s(t){n(88)}var a=n(1)(n(43),n(114),s,null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(4),a=n(23),i=n.n(a),c=n(24),o=n.n(c),r=n(22);s.a.use(i.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:r.a,template:"<App/>",components:{App:o.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n.n(s),i=n(10),c=n.n(i);e.default={name:"chat",props:{dccon_list_url:{type:String,default:""}},data:function(){return{dccons:{},dcconKeywords:[],twitchEmotes:{},twitchEmotesKeywords:[]}},mounted:function(){var t=this;this.addCss("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"),this.addCss("/jsassist-open-dccon/static/jsassist/css/styles.css"),this.addJs("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js",function(){t.addJs("https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",function(){t.addJs("/jsassist-open-dccon/static/jsassist/js/jsassist.viewer_build18_pretty.js",function(){t.init()})})})},methods:{addCss:function(t){var e=document.createElement("link");e.href=t,e.type="text/css",e.rel="stylesheet",e.media="screen,print",document.getElementsByTagName("head")[0].appendChild(e)},addJs:function(t,e){var n=document.createElement("script");n.onload=e,n.src=t,document.getElementsByTagName("head")[0].appendChild(n)},overrideFunctions:function(t){function e(){for(var t=arguments.length,e=Array(t),a=0;a<t;a++)e[a]=arguments[a];var i=n.apply(this,e);return i=s.replaceDccon(i),i=s.replaceTwitchEmotes(i)}var n=jQuery.fn.text,s=this,a=addChatMessage;addChatMessage=function(t,s,i){jQuery.fn.text=e;var c=a(t,s,i);return jQuery.fn.text=n,c};var i=connect_jsassist.toString();i=i.replace(/JSON\.parse\((.*?)\);/g,'JSON.parse($1.replace(/(?:\\r\\n|\\r|\\n)/g, "\\\\n"));'),i=i.substring(i.indexOf("{")+1,i.lastIndexOf("}")),connect_jsassist=new Function(i),t()},loadResources:function(){var t=this;t.overrideFunctions(function(){t.loadDccons(function(){t.loadTwitchEmotes()})})},loadDccons:function(t){var e=this;setTimeout(function(){var n=e.dccon_list_url;""===n&&(n="https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json"),addChatMessage("system","SYSTEM","디시콘 목록을 불러오는 중.."),c.a.get(n).then(function(n){try{e.dccons=a()(n.data.dccons).flatMap(function(t){return a()(t.keywords).map(function(e){return[e,t]}).value()}).fromPairs().value(),e.dcconKeywords=a()(e.dccons).keys().sortBy().reverse().value(),addChatMessage("system","SYSTEM","디시콘 목록 불러오기 완료.")}catch(t){addChatMessage("system","SYSTEM","디시콘 목록을 불러올 수 없습니다."),console.log(t),console.log(n)}t()}).catch(function(e){addChatMessage("system","SYSTEM","디시콘 목록을 불러올 수 없습니다."),console.log(e),t()})},100)},loadTwitchEmotes:function(){var t=this;setTimeout(function(){addChatMessage("system","SYSTEM","트위치 공통 이모티콘 목록을 불러오는 중.."),t.$http.get("https://twitchemotes.com/api_cache/v3/global.json",{responseType:"json"}).then(function(e){t.twitchEmotes=a()(e.body).mapValues(function(t){return t.id}).value(),addChatMessage("system","SYSTEM","트위치 공통 이모티콘 목록 불러오기 완료."),addChatMessage("system","SYSTEM","트위치 구독자 이모티콘 목록을 불러오는 중.."),t.$http.get("https://twitchemotes.com/api_cache/v3/subscriber.json",{responseType:"json"}).then(function(e){t.twitchEmotes=a.a.merge(a()(e.body).flatMap(function(t){return t.emotes}).keyBy("code").mapValues(function(t){return t.id}).value(),t.twitchEmotes),t.twitchEmotesKeywords=a()(t.twitchEmotes).keys().sortBy().reverse().value(),addChatMessage("system","SYSTEM","트위치 구독자 이모티콘 목록 불러오기 완료.")},function(t){addChatMessage("system","SYSTEM","트위치 구독자 이모티콘 목록을 불러올 수 없습니다."),console.log(t)})},function(t){addChatMessage("system","SYSTEM","트위치 공통 이모티콘 목록을 불러올 수 없습니다."),console.log(t)})},0)},init:function(){this.loadResources()},replaceMsg:function(t,e,n,s){for(var i=t,c=e,o=null,r={};null!==(o=c.exec(i));)r[o.index]=o[1];var u=a()(r).keys().map(function(t){return Number(t)}).value(),l=a.a.size(r);if(0===l)return i;for(var d={},f=0;f<n.length;f+=1){var p=n[f];if(0===l)break;for(var m=!1,h=[],v=0;v<u.length;v+=1){var y=u[v],g=r[y];a.a.startsWith(g,p)&&(m=!0,l-=1,h.push(y),d[y]=p)}m&&a.a.pullAll(u,h)}return i=a.a.reduce(a()(d).keys().map(function(t){return Number(t)}).sortBy().reverse().value(),function(t,e){return s(t,e,d[e])},i)},replaceDccon:function(t){var e=this;return this.replaceMsg(t,/~([^~\s]+)/g,this.dcconKeywords,function(t,n,s){return t.slice(0,n)+'<img class="dccon_chat" src="'+e.dccons[s].path+'" />'+t.slice(n+s.length+1)})},replaceTwitchEmotes:function(t){var e=this;return this.replaceMsg(t,/\n(\S*?)\n/g,this.twitchEmotesKeywords,function(t,n,s){return t.slice(0,n)+'<img class="twitch_emote_chat" src="'+"https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/3.0".split("{image_id}").join(e.twitchEmotes[s])+'" />'+t.slice(n+s.length+1)})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n.n(s),i=n(10),c=n.n(i),o=n(56),r=n.n(o),u=n(3),l=n(108),d=n.n(l),f=n(110),p=n.n(f),m=n(107),h=n.n(m),v=n(112),y=n.n(v);e.default={name:"list",props:{dccon_list_url:{type:String,default:""}},components:{Search:d.a,TagList:p.a,DcconList:h.a,ToastContainer:y.a},data:function(){return{dcconList:[],filtered:[],filteredTags:[],textForCopy:""}},created:function(){u.a.$on("COPY_DCCON",this.copy)},mounted:function(){var t=this,e=this.dccon_list_url;""===e&&(e="https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json"),c.a.get(e).then(function(e){try{t.dcconList=e.data.dccons}catch(t){u.a.$emit("TOAST_MSG","디시콘 목록을 불러올 수 없습니다."),console.log(t),console.log(e)}}).catch(function(t){u.a.$emit("TOAST_MSG","디시콘 목록을 불러올 수 없습니다."),console.log(t)});new r.a(".clipboard")},computed:{tags:function(){return a()(this.dcconList).flatMap(function(t){return t.tags}).uniq().sort().value()}},methods:{updateFiltered:function(t){this.filtered=t},updateFilteredTags:function(t){this.filteredTags=t},copy:function(t){this.textForCopy="~"+t,u.a.$emit("TOAST_MSG","디씨콘 "+t+"을(를) 복사했습니다. 이제 채팅창에 입력하세요!"),this.$nextTick(function(){this.$refs.clipboard.click()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n.n(s),i=n(3);e.default={name:"dccon",props:{dccon:{type:Object,default:{}}},data:function(){return{}},methods:{keywordString:function(t){return a.a.join(t.keywords,", ")},click:function(){i.a.$emit("COPY_DCCON",this.dccon.keywords[0])}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(106),a=n.n(s);e.default={name:"dcconList",props:{dcconList:{type:Array,default:[]}},components:{Dccon:a.a},data:function(){return{}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(54),a=n.n(s),i=n(2),c=n.n(i),o=n(99),r=n.n(o),u=n(3);e.default={name:"search",props:{dcconList:{type:Array,default:Array},tags:{type:Array,default:Array}},data:function(){return{query:"",filtered:[],isVisibleAutocomplete:!1,focusIndex:-1}},watch:{autocompletes:function(t){var e=c()(t).filter(function(t){return t.isVisible}).map(function(t){return t.path}).uniq().value();this.$emit("updateFiltered",c()(this.dcconList).map(function(t){return a()({},t,{isVisible:c.a.includes(e,t.path)})}).value())}},computed:{keywords:function(){return c()(this.dcconList).flatMap(function(t){return c()(t.keywords).map(function(e){return[e,t]}).value()}).fromPairs().value()},selectedTagNames:function(){return c()(this.tags).map(function(t){return t.name}).value()},autocompletes:function(){var t=this,e=c()(this.keywords).keys().filter(function(e){return c.a.intersection(t.keywords[e].tags,t.selectedTagNames).length>0}).filter(function(e){return-1!==r.a.search(e,t.query)}).value();return c()(this.keywords).keys().map(function(n){return[n,a()({},t.keywords[n],{isVisible:c.a.includes(e,n)})]}).fromPairs().value()}},methods:{searchClear:function(){this.query=""},inputUpdate:c.a.debounce(function(t){this.query=t.target.value},200),autocompleteClick:function(t){this.query=t,this.isVisibleAutocomplete=!1,u.a.$emit("COPY_DCCON",t)},inputFocusIn:function(){this.isVisibleAutocomplete=!0},inputFocusOut:function(t){null!==t.relatedTarget&&c.a.includes(t.relatedTarget.classList,"autocomplete-item")||(this.isVisibleAutocomplete=!1),this.focusIndex=-1},keyUp:function(t){this.isVisibleAutocomplete&&(t.preventDefault(),0!==this.focusIndex&&(this.focusIndex=this.focusIndex-1,this.$refs.autocomplete.children[this.focusIndex].firstChild.focus()))},keyDown:function(t){this.isVisibleAutocomplete&&(t.preventDefault(),this.focusIndex!==c.a.size(this.autocompletes)-1&&(this.focusIndex=this.focusIndex+1,this.$refs.autocomplete.children[this.focusIndex].firstChild.focus()))},keyEsc:function(t){t.preventDefault(),this.isVisibleAutocomplete=!1,this.focusIndex=-1}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"tag",props:{tag:{type:Object,default:{}}},data:function(){return{}},methods:{click:function(t){this.$emit("click",t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n.n(s),i=n(109),c=n.n(i);e.default={name:"tagList",props:{tags:{type:Array,default:[]}},components:{Tag:c.a},data:function(){return{selects:[],newMapTags:[]}},computed:{mapTags:function(){var t=this;return a()(this.tags).map(function(e){return{name:e,selected:a.a.includes(a()(t.selects).map(function(t){return t.name}).value(),e)}}).value()}},watch:{tags:function(t){this.newMapTags=a()(t).map(function(t){return{name:t,selected:!1}}).value(),this.$emit("updateFilteredTags",this.newMapTags)},selects:function(t){t.length>0?this.$emit("updateFilteredTags",t):this.$emit("updateFilteredTags",this.newMapTags)}},methods:{click:function(t){t.selected?this.selects=a()(this.selects).filter(function(e){return e.name!==t.name}).value():this.selects.push(t)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"toast",props:{text:{type:String,default:""}},data:function(){return{}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n.n(s),i=n(3),c=n(111),o=n.n(c);e.default={name:"toastContainer",components:{Toast:o.a},data:function(){return{toasts:[]}},created:function(){i.a.$on("TOAST_MSG",this.toast)},methods:{toast:function(t){var e=a.a.now();this.toasts.push({timestamp:e,text:t});var n=this;a.a.delay(function(){n.toasts=a()(n.toasts).filter(function(t){return t.timestamp!==e}).value()},3e3)}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,,function(t,e,n){function s(t){n(87),n(86)}var a=n(1)(n(44),n(113),s,"data-v-0609a992",null);t.exports=a.exports},function(t,e,n){function s(t){n(92)}var a=n(1)(n(45),n(118),s,"data-v-4c36b212",null);t.exports=a.exports},function(t,e,n){function s(t){n(95)}var a=n(1)(n(46),n(121),s,"data-v-e2916bfe",null);t.exports=a.exports},function(t,e,n){function s(t){n(90)}var a=n(1)(n(47),n(116),s,"data-v-2f79f982",null);t.exports=a.exports},function(t,e,n){function s(t){n(96)}var a=n(1)(n(48),n(122),s,"data-v-ff77c68c",null);t.exports=a.exports},function(t,e,n){function s(t){n(91)}var a=n(1)(n(49),n(117),s,"data-v-34965ef8",null);t.exports=a.exports},function(t,e,n){function s(t){n(94)}var a=n(1)(n(50),n(120),s,"data-v-a3de7694",null);t.exports=a.exports},function(t,e,n){function s(t){n(93)}var a=n(1)(n(51),n(119),s,"data-v-4ee7cd85",null);t.exports=a.exports},function(t,e,n){function s(t){n(89)}var a=n(1)(n(52),n(115),s,"data-v-0e94e62c",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chat_wrapper"},[n("div",{staticClass:"chat_container"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition-group",{staticClass:"toast-container",attrs:{name:"fadeUp",tag:"div"}},t._l(t.toasts,function(t){return n("toast",{key:t.timestamp,attrs:{text:t.text}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"column col-xs-12 col-lg-10 col-10 columns dccon-list"},t._l(t.dcconList,function(t){return n("dccon",{key:t.keywords[0],class:{hide:!t.isVisible},attrs:{dccon:t}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("label",{staticClass:"chip",class:{"tag-selected":t.tag.selected},on:{click:function(e){t.click(t.tag)}}},[t._v("\n  "+t._s(t.tag.name)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"background"},[n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column hide-xs show col-md-1 col-2"}),t._v(" "),n("div",{staticClass:"column col-xs-12 col-md-10 col-8"},[n("search",{attrs:{dcconList:t.dcconList,tags:t.filteredTags},on:{updateFiltered:t.updateFiltered}})],1)]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column hide-xs show col-md-1 col-2"}),t._v(" "),n("div",{staticClass:"column col-xs-12 col-md-10 col-8"},[n("tag-list",{attrs:{tags:t.tags},on:{updateFilteredTags:t.updateFilteredTags}})],1)]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column hide-xs show col-lg-1 col-1"}),t._v(" "),n("dccon-list",{attrs:{dcconList:t.filtered}})],1),t._v(" "),n("toast-container"),t._v(" "),n("div",{ref:"clipboard",staticClass:"clipboard",attrs:{"data-clipboard-text":t.textForCopy}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"toast toast-primary"},[t._v(t._s(t.text))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tags"},t._l(t.mapTags,function(e){return n("tag",{key:e.name,attrs:{tag:e},on:{click:t.click}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dccon column col-xs-6 col-md-4 col-lg-3 col-xl-2 col-2 tooltip tooltip-bottom",attrs:{"data-tooltip":t.keywordString(t.dccon)},on:{click:function(e){e.preventDefault(),t.click(e)}}},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-image"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.dccon.path,expression:"dccon.path"}],staticClass:"img-responsive width100 lazy"})]),t._v(" "),n("div",{staticClass:"card-body"},[t._v(t._s(t.dccon.keywords[0]))])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group input-inline width100",on:{keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40))return null;t.keyDown(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38))return null;t.keyUp(e)},function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27))return null;t.keyEsc(e)}]}},[n("span",{staticClass:"input-group-addon"},[t._v("~")]),t._v(" "),n("div",{staticClass:"form-autocomplete width100"},[n("div",{staticClass:"form-autocomplete-input form-input has-icon-right"},[n("input",{staticClass:"form-input",attrs:{id:"search",placeholder:"디시콘 검색"},domProps:{value:t.query},on:{input:t.inputUpdate,focusin:t.inputFocusIn,focusout:t.inputFocusOut}}),t._v(" "),n("i",{staticClass:"form-icon icon icon-cross",attrs:{id:"searchClear"},on:{click:function(e){e.preventDefault(),t.searchClear(e)}}})]),t._v(" "),n("ul",{ref:"autocomplete",staticClass:"menu",class:{hide:!t.isVisibleAutocomplete},attrs:{id:"autocomplete"}},t._l(t.autocompletes,function(e,s){return n("li",{key:s,staticClass:"menu-item",class:{hide:!e.isVisible}},[n("a",{staticClass:"autocomplete-item",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.autocompleteClick(s)}}},[n("div",{staticClass:"tile tile-centered"},[n("div",{staticClass:"tile-icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.path,expression:"dccon.path"}],staticClass:"avatar avatar-sm lazy"})]),t._v(" "),n("div",{staticClass:"tile-content"},[t._v(t._s(s))])])])])}))])])},staticRenderFns:[]}}],[42]);
//# sourceMappingURL=app.590e6cd15a9fd63b0e75.js.map