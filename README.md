JSAssist Open DCcon
===

JSAssist Open DCcon는 [JSAssist](http://js-almighty.com/jsassist/)와 함께 사용하여 방송에 표시되는 채팅창에 방송인이 추가한 이모티콘을 출력할 수 있도록 하는 플러그인입니다.

초기 개발시 디시콘을 출력하기 위해 개발되었으나, 디시콘이 아닌 일반 이미지 역시 방송인이 직접 등록하여 사용할 수 있습니다.

:warning: **JSAssist의 위젯 설정의 폰트, 배경, 플랫폼 선택은 현재 동작하지 않습니다. 관련 설정이 필요한 경우, 직접 css와 js를 수정하여 적용하야여 합니다.**

## 이모티콘 미리보기

[이모티콘 목록 예시](http://htmlpreview.github.io/?https://gist.githubusercontent.com/anonymous/c88618150436fd11cde68241cd6afa60/raw/e1eba2b633779c38e0ee0c5b7d36ac7a84cc757e/list.html)

## 설치 방법

1. [다운로드](https://github.com/rishubil/jsassist-open-dccon/archive/master.zip)를 클릭하여 압축 파일을 다운로드합니다.
2. 적절한 위치에 압축 파일을 풀어줍니다.
3. 압축 푼 폴더의 `jsassist-open-dccon/js/dccon_list.js` 파일을 적절히 수정합니다.
4. JSAssist를 실행한 후 정상적인 방송을 위한 설정을 진행합니다.
5. 압축 푼 폴더의 `jsassist-open-dccon/chat.html` 파일을 브라우저에서 열어 채팅이 정상적으로 출력되는지 확인합니다.
6. 사용하는 방송 송출 프로그램 (OBS, XSplit)에 맞추어 브라우저에서 해당 파일을 열 수 있도록 설정합니다.

## 사용 방법

### 이모티콘 목록 작성

JSAssit Open DCcon을 사용하기 위해서는 사용하고자 하는 이모티콘을 미리 등록해야 합니다.

이는 `jsassist-open-dccon/js/dccon_list.js`의 파일을 텍스트 편집기(ex 메모장)로 직접 편집하여 등록할 수 있습니다.

JSAssit Open DCcon은 기본적으로 **이북-리더** 의 디시콘을 기본적으로 포함하고 있습니다. 신규 디시콘 추가시 이를 참고하여 추가합니다.

### 이모티콘 목록 보기

등록한 이모티콘의 목록은 `jsassist-open-dccon/list.html` 파일을 브라우저에서 열어 확인할 수 있습니다.

만약 `jsassist-open-dccon/js/dccon_list.js`을 수정했다면, `jsassist-open-dccon/js/dccon_list.js` 파일의 모든 내용을 복사하여
`jsassist-open-dccon/list.html` 파일의 중간 지정된 곳에 붙여넣습니다.

지정된 공간은 다음과 같이 표시되어 있을 것입니다.

```
...
<script>
// 여기에 dccon_list.js의 내용을 붙여넣으세요
...
</script>
...
```

`// 여기에 dccon_list.js의 내용을 붙여넣으세요` 라는 내용 바로 아랫줄부터 가장 가까운 `</script>` 줄 사이에 `jsassist-open-dccon/js/dccon_list.js`의 내용을 붙여넣으면 됩니다. 만약 기존에 입력했던 `jsassist-open-dccon/js/dccon_list.js` 파일의 내용이 이미 붙여넣어져 있는 경우, 이를 모두 지운 후 새로 붙여넣습니다.

해당 작업을 완료한 후, 웹 브라우저에서 `jsassist-open-dccon/list.html` 파일을 열면 이모티콘 목록을 볼 수 있을 것입니다.

만약 등록한 이모티콘이 출력되지 않거나 이상한 동작을 보이는 경우 오타가 없는지 잘 확인하세요.

### 이모티콘 목록 공개

이모티콘 목록을 시청자들이 볼 수 있도록 하기 위해서는 `jsassist-open-dccon/list.html` 파일을 호스팅하여야 합니다.

이 과정은 많은 방법으로 할 수 있지만, 간단하게 다음과 같은 방법으로도 할 수 있습니다.

1. [GisHubGist](https://gist.github.com/) 사이트에 접속합니다.
2. `Fileanem including extentions...`라고 써있는 빈칸에 `list.html`을 입력합니다.
3. 그 아래 큰 입력창에 작성해두었던 `jsassist-open-dccon/list.html` 파일의 내용을 붙여넣고 `Create public gist 버튼을 클릭합니다.`
4. 새 화면으로 이동하면, 우측 버튼 중 `Raw` 버튼을 클릭합니다.
5. 새 화면으로 이동하면 주소창의 주소를 복사합니다. (예시: https://gist.githubusercontent.com/anonymous/c88618150436fd11cde68241cd6afa60/raw/e1eba2b633779c38e0ee0c5b7d36ac7a84cc757e/list.html)
6. 해당 주소의 앞에 `http://htmlpreview.github.io/?`를 덧붙입니다. (예시: http://htmlpreview.github.io/?https://gist.githubusercontent.com/anonymous/c88618150436fd11cde68241cd6afa60/raw/e1eba2b633779c38e0ee0c5b7d36ac7a84cc757e/list.html)
7. 만들어진 주소에 접속하여 화면이 제대로 표시되는지 확인합니다.
8. 정상적으로 동작한다면, 해당 주소를 시청자들에게 알려주세요.

## License

MIT
