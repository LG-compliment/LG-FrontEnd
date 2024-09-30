# ComplimentHub - FrontEnd
<div align="center">
<h2>Compliment Hub</h2>
Compliment Hub는 구성원들이 서로 칭찬을 주고받으며 긍정적인 팀 문화를 형성하는 서비스입니다!

칭찬을 통해 건강한 관계를 구축하고💪🏻, 동료 간의 동기부여와 협업 효율을 높이는 것🆙이 목표입니다. 

Compliment Hub는 칭찬의 지속적인 순환을 촉진하여 더 나은 성과를 창출하는 환경을 만듭니다.

</div>

# 목차
- [개발환경](#개발환경) 
- [주요 폴더 구조 설명](#주요-폴더-구조-설명)
- [주요 기능 설명](#주요-기능-설명)

## 개발환경
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)


## 주요 폴더 구조 설명
```
📦src
 ┃ ┣ 📂Pages
 ┃ ┃ ┣ 📂ComplimentList
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┗ 📂User
 ┃ ┣ 📂UI
 ┃ ┣ 📂api
 ┃ ┣ 📂images
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┣📜package.json
 ┗📜package-lock.json

 ```
- Pages : react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트가 위치하는 폴더
- UI : 재사용 가능한 컴포넌트들이 위치하는 폴더
- images : 프로필 사진 등 이미지가 저장되는 폴더
- api : api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함
- package.json : 프로젝트에 관련된 기본적인 내용(프로젝트의 이름, 버전 등)과 라이브러리들의 목록이 포함

## 주요 기능 설명
### 회원가입 
- 신규 회원 가입
- 회원가입 조건
    - 아이디 : 영문 대소문자와 숫자 사용, 길이 4~12, 
        - 중복 확인으로 같은 아이디는 사용하지 못함
    - 이름 : 한글만 사용
    - 비밀번호 : 제한없음

### 로그인
- Compliment Hub를 이용하기 위해서 로그인이 필요
### Home
- 한달 동안 가장 많은 칭찬을 한 유저와 칭찬을 받은 유저의 랭킹을 보여줌
### Compliment List
- 유저들이 다른 유저를 칭찬한 메시지를 볼 수 있음
- 칭찬 메시지를 클릭하면 더 상세하게 글을 읽어볼 수 있음
### User List
- 모든 유저의 목록을 볼 수 있음
- 유저를 선택하여 칭찬하기를 보낼 수 있음

### 칭찬 보내기
- 칭찬하기 버튼을 클릭하면 다른 유저에게 칭찬을 보낼 수 있음
- 칭찬 템플릿에서 선택하여 칭찬을 쉽게 보낼 수 있음
- 칭찬 템플릿을 선택하지 않고 원하는 칭찬 메시지를 작성할 수 있음
- ⚠️ 익명으로 보내기를 선택하면 비밀스럽게 자신을 밝히지 않고 보낼 수 있음
- ⚠️ 칭찬은 하루에 한번만 보낼 수 있음
