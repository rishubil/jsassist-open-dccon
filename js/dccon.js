var dcconList = [];

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function init() {
  var dcconSearchMap = {}; // keyword로 dccon을 찾을 수 있도록 하는 맵
  var dcconKeywordList = []; // 전체 keyword 리스트
  var twitchEmotesUrlTemplate = "";
  var twitchEmotesMap = {};

  // dcconSearchMap, dcconKeywordList 초기화
  for (var i = 0; i < dcconList.length; i++) {
    var dccon = dcconList[i];
    for (var j = 0; j < dccon.keywords.length; j++) {
      var keyword = '~' + dccon.keywords[j]; // keyword에 dccon prefix 문자 추가
      dcconSearchMap[keyword] = dccon;
      dcconKeywordList.push(keyword);
    }
  }

  // dcconKeywordList keyword 길이 기준 내림차순 정렬
  // message에서 keyword 탐색 시 가장 긴 keyword부터 탐색해야 정확하게 매칭됨
  dcconKeywordList.sort(function(a, b) {
    return a.length < b.length;
  });

  // twitchEmotesUrlTemplate, twitchEmotesMap 초기화
  $.getJSON('https://twitchemotes.com/api_cache/v2/global.json', function(data1) {
    twitchEmotesUrlTemplate = data1.template.medium;
    for (var emote_keyword in data1.emotes) {
      if (data1.emotes.hasOwnProperty(emote_keyword)) {
        twitchEmotesMap[emote_keyword] = data1.emotes[emote_keyword].image_id;
      }
    }
    $.getJSON('https://twitchemotes.com/api_cache/v2/subscriber.json', function(data2) {
      for (var channel_name in data2.channels) {
        if (data2.channels.hasOwnProperty(channel_name)) {
          var channel = data2.channels[channel_name]
          for (var emote_index in channel.emotes) {
            var emote = channel.emotes[emote_index];
            twitchEmotesMap[emote.code] = emote.image_id;
          }
        }
      }
    });
  });

  // message에서 dccon keyword를 찾아 image로 변경
  function replaceDccon(message) {
    for (var i = 0; i < dcconKeywordList.length; i++) {
      var keyword = dcconKeywordList[i];
      if (message.indexOf(keyword) != -1) {
        var dccon = dcconSearchMap[keyword];
        message = message.split(keyword).join('<img class="dccon" src="' + dccon.path + '" />');
      }
    }
    return message;
  }

  // message에서 twitch emoticon을 찾아 image로 변경
  function replaceTwitchEmotes(message) {
    if (message.match(/\n\S*?\n/g)) {
      for (var emote_keyword in twitchEmotesMap) {
        if (twitchEmotesMap.hasOwnProperty(emote_keyword)) {
          var search_keyword = '\n' + emote_keyword + '\n';
          if (message.indexOf(search_keyword) != -1) {
            var emote_id = twitchEmotesMap[emote_keyword];
            var emote_url = twitchEmotesUrlTemplate.split('{image_id}').join(emote_id);
            message = message.split(search_keyword).join('<img class="twitch_emote" src="' + emote_url + '" />');
          }
        }
      }
    }
    return message;
  }

  // jQuery의 text 함수 실행후 replaceDccon을 실행할 수 있도록 hackedJqueryText 정의
  originalJqueryText = jQuery.fn.text;

  function hackedJqueryText() {
    var msg = originalJqueryText.apply(this, arguments);
    msg = replaceDccon(msg);
    msg = replaceTwitchEmotes(msg);
    return msg;
  }

  // jsassist의 addChatMessage를 덮어씀
  originalAddChatMessage = addChatMessage;
  addChatMessage = function(platform, username, message) {
    jQuery.fn.text = hackedJqueryText;
    var result = originalAddChatMessage(platform, username, message);
    jQuery.fn.text = originalJqueryText;
    return result;
  };
}

$(document).ready(function() {
  var dcconListUrl = getUrlParameter('dccon_list');
  if (dcconListUrl == undefined) {
    dcconListUrl = 'https://rawgit.com/rishubil/jsassist-open-dccon/master/js/dccon_list.json'
  }
  $.getJSON(dcconListUrl).done(function(data) {
      dcconList = data.dccons;
      init();
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
      init();
    });
});

// jsassist의 updateStyle을 덮어씀
// css/style.css 파일로 style 적용해야함
updateStyle = function() {};

// jsassist의 connect_jsassist을 덮어씀
// json data의 message에서 줄바꿈을 \n 문자로 변경함
connect_jsassist_str = connect_jsassist.toString();
connect_jsassist_str = connect_jsassist_str.replace(/JSON\.parse\((.*?)\);/g, 'JSON.parse($1.replace(/(?:\\r\\n|\\r|\\n)/g, "\\\\n"));');
connect_jsassist_str = connect_jsassist_str.substring(connect_jsassist_str.indexOf('{') + 1, connect_jsassist_str.lastIndexOf('}'));
connect_jsassist = new Function(connect_jsassist_str);
