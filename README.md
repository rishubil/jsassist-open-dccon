## :warning: 더 이상 개발되지 않음 :warning:

이 프로젝트는 더 이상 신규 기능 개발이 이루어지지 않으며, 정상적인 동작을 보장하지 않습니다.

대신 [Bridge BBCC](https://github.com/krynen/BridgeBBCC) 또는 [ChatAssistX-Client](https://github.com/Lastorder-DC/ChatAssistX-Client)를 사용하는 것을 권장합니다.

JSAssist Open DCcon
===

[이모티콘 목록 예시](https://rishubil.github.io/jsassist-open-dccon/#/list?dccon_list=https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json)

[방송용 채팅 소스](https://rishubil.github.io/jsassist-open-dccon/#/chat?dccon_list=https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json)

JSAssist Open DCcon는 [JSAssist](http://js-almighty.com/jsassist/)와 함께 사용하여 방송에 표시되는 채팅창에 방송인이 추가한 이모티콘을 출력할 수 있도록 하는 플러그인입니다.

초기 개발시 디시콘을 출력하기 위해 개발되었으나, 디시콘이 아닌 일반 이미지 역시 방송인이 직접 등록하여 사용할 수 있습니다.

## 빠른 설정 방법

아래 이미지를 클릭하시면 동영상 가이드를 보실 수 있습니다.

[![동영상 가이드](http://img.youtube.com/vi/g8UXUX1302U/0.jpg)](https://youtu.be/g8UXUX1302U?t=0s) 

## 설치 방법

- 1 . [dccon_list.json](https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json)를 클릭하여 복사하거나, 링크를 오른쪽 마우스 클릭하여 저장합니다.
- 2 . 자신이 사용하고자 하는 이모티콘을 방금 복사한 `dccon_list.json` 파일의 형식을 참고하여 적절히 추가합니다.
- 3 . [GisHubGist](https://gist.github.com/) 사이트에 접속합니다.
- 4 . `Filename including extentions...`라고 써있는 빈칸에 `dccon_list.json`을 입력합니다.
- 5 . 그 아래 큰 입력창에 작성해두었던 `dccon_list.json` 파일의 내용을 붙여넣고 `Create public gist` 버튼을 클릭합니다.
- 6 . 새 화면으로 이동하면, 우측 버튼 중 `Raw` 버튼을 클릭한 후 웹 브라우저에 표시된 주소를 복사합니다.
- 7 . `https://rishubil.github.io/jsassist-open-dccon/#/chat?dccon_list=`의 뒤에 6단계에서 복사한 주소를 덧붙입니다.

예시)
```
https://rishubil.github.io/jsassist-open-dccon/#/chat?dccon_list=https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json
```

- 8 . JSAssist를 실행한 후 정상적인 방송을 위한 설정을 진행합니다.
- 9 . 사용하는 방송 송출 프로그램 (OBS, XSplit)에 맞추어 브라우저 소스에서 8번에서 만든 주소를 사용하면 됩니다.

## 이모티콘 목록

위 설치 과정 6단계의 주소를 `https://rishubil.github.io/jsassist-open-dccon/#/list?dccon_list=` 뒤에 덧붙인 주소로 접속하여 확인할 수 있습니다.

예시)
```
https://rishubil.github.io/jsassist-open-dccon/#/list?dccon_list=https://rishubil.github.io/jsassist-open-dccon/static/dccon_list.json
```

## Build Setup

``` bash

# Start dev server
docker-compose -f docker-compose.dev.yml up

# Build for production
docker-compose -f docker-compose.build.yml up
```

## License

MIT
