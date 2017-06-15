var searchMap = {};
var keywordList = [];
for (var i = 0; i < dcconList.length; i++) {
  var dccon = dcconList[i];
  for (var j = 0; j < dccon.keywords.length; j++) {
    var keyword = '~' + dccon.keywords[j];
    searchMap[keyword] = dccon;
    keywordList.push(keyword);
  }
}
keywordList.sort(function(a, b) {
  return a.length < b.length;
});

function addDccon(message) {
  console.log(message);
  for (var i = 0; i < keywordList.length; i++) {
    var keyword = keywordList[i];
    if (message.indexOf(keyword) != -1) {
      var dccon = searchMap[keyword];
      message = message.split(keyword).join('<img class="dccon" src="images/dccon/' + dccon.path + '" />');
    }
  }
  console.log(message);
  return message;
}

originalAddChatMessage = addChatMessage;
addChatMessage = function(platform, username, message) {
  originalJqueryText = jQuery.fn.text;
  jQuery.fn.text = function() {
    return addDccon(originalJqueryText.apply(this, arguments));
  }
  var result =  originalAddChatMessage(platform, username, message);
  jQuery.fn.text = originalJqueryText;
  return result;
};
updateStyle = function(){};
