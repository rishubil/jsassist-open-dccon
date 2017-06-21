var urlParams;
(window.onpopstate = function() {
    var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
        return decodeURIComponent(s.replace(pl, " "));
    }, query = window.location.search.substring(1);
    urlParams = {};
    while ((match = search.exec(query)) ) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
}
)();
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var chat_count = 0;
var chat_count_max = 50;
var $chat_first_element;
var chat_fade;
var preset_name;
function fillSettingParam() {
    chat_fade = getParam("chat_fade", 10);
    preset_name = getParam("preset", "default");
}
function hasParam(name) {
    if (urlParams[name] == undefined) {
        return false;
    }
    return true;
}
function getParam(name, def) {
    var value = urlParams[name];
    if (value == undefined) {
        return def;
    }
    return value;
}
var platformIcon;
var platform;
var animation;
var chatFade;
var font;
var fontUsernameSize;
var fontUsernameColor;
var fontChatSize;
var fontChatColor;
var backgroundColor;
var backgroundAlpha;
var chatBackgroundColor;
var chatBackgroundAlpha;
function setConfig(config) {
    if (preset_name != config.presetName) {
        return;
    }
    platformIcon = config.platformIcon;
    platform = config.platform;
    animation = config.animation;
    chatFade = config.chatFade;
    font = config.font;
    fontUsernameSize = config.fontUsernameSize;
    fontUsernameColor = config.fontUsernameColor;
    fontChatSize = config.fontChatSize;
    fontChatColor = config.fontChatColor;
    backgroundColor = config.backgroundColor;
    backgroundAlpha = config.backgroundAlpha * 0.01;
    chatBackgroundColor = config.chatBackgroundColor;
    chatBackgroundAlpha = config.chatBackgroundAlpha * 0.01;
    if (hasParam("chat_fade")) {
        chatFade = chat_fade;
    }
    updateStyle();
}
function updateStyle() {
    $(".chat_text_nickname").css({
        'font-family': font
    });
    $(".chat_text_message").css({
        'font-family': font
    });
    $(".chat_text_nickname").css({
        'font-size': fontUsernameSize
    });
    $(".chat_text_nickname").css("color", "rgb(" + fontUsernameColor + ")");
    $(".chat_text_message").css({
        'font-size': fontChatSize
    });
    $(".chat_text_message").css("color", "rgb(" + fontChatColor + ")");
    $("body").css("background", "rgba(" + backgroundColor + "," + backgroundAlpha + ")");
    $(".chat_text_message").css("background-color", "rgba(" + chatBackgroundColor + "," + chatBackgroundAlpha + ")");
}
$(document).ready(function() {
    chat_count = 0;
    connect_jsassist();
    fillSettingParam();
});
function addChatMessage(platform, nickname, message) {
    var style = "style='display:none; '";
    var stylePlatform = "chat_platform_";
    if (platformIcon) {
        stylePlatform += platform;
    } else {
        stylePlatform += "none";
    }
    var chatNickname = "<span class='" + stylePlatform + "'" + style + "/><span class='chat_text_nickname' style='display:none'>" + nickname + "</span>";
    var msg = $("<div>" + message + "</div>").text();
    var chatMessage = "<div class='chat_text_message' style='display:none'>" + msg + "</div>";
    var $chatElement = $(chatNickname + chatMessage);
    $chatElement.appendTo($(".chat_container"));
    updateStyle();
    if (animation == "none") {
        $chatElement.show();
    } else {
        $chatElement.show(animation, {
            easing: "easeOutQuint",
            direction: "down"
        });
    }
    chat_count++;
    if (chatFade != 0) {
        var fadeTime = chatFade * 1000;
        if (animation == "none") {
            $chatElement.delay(fadeTime).hide(0).promise().done(function() {
                $(this).remove();
                chat_count--;
            });
        } else {
            $chatElement.delay(fadeTime).hide(animation, 1000).promise().done(function() {
                $(this).remove();
                chat_count--;
            });
        }
    } else {
        if (chat_count > chat_count_max) {
            chat_count--;
            $remove_temp = $(".chat_container span:first-child");
            $remove_temp.next().remove();
            $remove_temp.next().remove();
            $remove_temp.remove();
        }
    }
}
is_connected = false;
is_init_oldver = false;
function connect_jsassist() {
    var ws = new WebSocket("ws://localhost:4649/JSAssistChatServer");
    ws.onopen = function() {
        is_connected = true;
    }
    ;
    ws.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        if (data.type == "chat_message") {
            if (platform != "all") {
                if (platform != data.platform) {
                    return;
                }
            }
            addChatMessage(data.platform, data.username, data.message);
        } else if (data.type == "config") {
            setConfig(data);
        } else {
            if (data.type == undefined) {
                if (is_init_oldver == false) {
                    platformIcon = true;
                    platform = "all";
                    animation = "fade";
                    chatFade = chat_fade;
                    font = "Jeju Gothic";
                    fontUsernameSize = 14;
                    fontUsernameColor = "255, 255, 255";
                    fontChatSize = 16;
                    fontChatColor = "255, 255, 255";
                    backgroundColor = "255, 255, 255";
                    backgroundAlpha = 0;
                    chatBackgroundColor = "255, 255, 255";
                    chatBackgroundAlpha = 0.25;
                    is_init_oldver = true;
                }
                addChatMessage(data.platform, data.username, data.message);
            }
        }
    }
    ;
    ws.onclose = function() {
        is_connected = false;
        setTimeout(connect_jsassist, 1000);
    }
    ;
}
