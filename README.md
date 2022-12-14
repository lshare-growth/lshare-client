## 💻 서비스 소개

![Untitled-5-01](https://user-images.githubusercontent.com/68919333/195964523-e2d4c5a6-03c7-44ac-bebb-af9f2b952101.png)

<div align="center">

[📚 스터디 모집 플랫폼](https://lnshare-study.com/) <br>

`# 학습` `# 스터디` `# 성장` `# 자극` <br/>
`# 스터디 모집` `# 회고 스터디`

</div>
<br/>

|                                                        소셜 로그인                                                        |                                                         회원 수정                                                          |
| :-----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
| ![로그인 로그아웃](https://user-images.githubusercontent.com/58525009/197402080-761812a4-c887-4c16-bc5b-7430c6f6b069.gif) |     ![회원수정](https://user-images.githubusercontent.com/58525009/197403387-31ebd007-bdb4-453d-8635-fa65f75517be.gif)     |
|                                                        스터디 작성                                                        |                                                        스터디 수정                                                         |
|   ![스터디 작성](https://user-images.githubusercontent.com/58525009/197402091-13c5d48c-41f8-43b4-9f71-3a90511f409e.gif)   |   ![스터디 수정](https://user-images.githubusercontent.com/58525009/197401459-650b51a3-b9a0-4d18-99b4-0ffadfc44243.gif)    |
|                                                        스터디 검색                                                        |                                                        스터디 삭제                                                         |
|   ![스터디검색](https://user-images.githubusercontent.com/58525009/200170826-e1dd3867-10d3-445e-be1c-c09e4ebee770.gif)    |    ![스터디삭제](https://user-images.githubusercontent.com/58525009/200170970-2a591183-0fd8-4feb-8731-a52e04cc902d.gif)    |
|                                                    댓글 추가 & 이모지                                                     |                                                      댓글 수정 & 삭제                                                      |
|    ![댓글 추가](https://user-images.githubusercontent.com/58525009/197402435-dd68f674-10ad-451f-b114-1d39949408cf.gif)    |   ![댓글수정삭제](https://user-images.githubusercontent.com/58525009/197402620-39b80f5d-9437-4708-9654-15aef4cd45a7.gif)   |
|                                                    답글 추가 & 이모지                                                     |                                                      답글 수정 & 삭제                                                      |
|   ![대댓글추가](https://user-images.githubusercontent.com/58525009/197402835-d75bb41b-8b24-4bc3-a919-874fea4f20fa.gif)    | ![대댓글 수정 삭제](https://user-images.githubusercontent.com/58525009/197403213-c5721a86-5f92-4584-b79c-3ab3db47ccdc.gif) |
|                                                      팔로워 & 팔로우                                                      |                                                      프로필 정보 조회                                                      |
|     ![팔로우](https://user-images.githubusercontent.com/58525009/200167901-dd60c14d-f073-4184-809d-d0979e968113.gif)      |    ![아바타호버](https://user-images.githubusercontent.com/58525009/200170556-5e11f395-581f-4630-ad73-de8e2a3cae0a.gif)    |

## 🏃 기술 스택

![image](https://user-images.githubusercontent.com/58525009/200190120-ddfce5db-8a07-49d4-9920-0bfaf6637de6.png)

## 📑 고민한 사항

<details>
<summary>페이지네이션 vs 무한스크롤</summary>

- 페이지네이션, 무한스크롤을 상황에 맞게 적용
    - 스터디 글 목록 페이지에서는 스터디 모집글을 사용자가 찾을 것이기 때문에 페이지네이션이 적합하다고 판단하였습다. 하지만 랜딩 페이지는 서비스를 맛보기로 소개하는 것이기 때문에 무한스크롤로 해도 크게 상관없다고 판단하였습니다. 하지만 그렇게 되면 사용자가 푸터를 초기화면에서 찾기 어렵습니다. 애써 찾게되더라도 무한스크롤로 다시 로딩되면 푸터는 시야에서 사라지기 때문입니다. 그런 면에서 페이지네이션이나 ‘더보기’버튼을 눌러서 로딩하게 되면 푸터를 볼 수 있다고 생각하여 그 방식들이 더 적합하다고 판단하였습니다. 여기서는 글을 찾는 목적이 아니므로 보통의 페이지네이션보다 ‘더보기’가 가장 적합하다고 판단하였다. 그렇다면 실제 서비스에서는 어떻게 적용했을지 찾아보았습니다.
- 실제 서비스를 찾아보며 근거 보완
    - 페이스북은 무한스크롤로 렌더링하되 푸터를 프로필 메뉴바 하단에서 확인할 수 있게 하였습니다.
    - 깃허브와 네이버는 ‘더보기’버튼을 두어서 누르면 추가적으로 로딩하게 하는 대신에 사용자가 원하면 그 버튼을 누리지 않고 푸터를 볼 수 있도록 하였습니다.
- 최종 결정하여 프로젝트에 적용
    
     랜딩 페이지는 더보기 버튼으로 결정하였습니다. 스터디 글을 찾는 목적이 아니라 최근 글들을 엿볼 수 있는 공간이기 때문입니다. 글 목록 페이지는 기본 페이지네이션을 적용합니다. 스터디 글을 찾는데 편리하기 때문입니다.
    
     그렇다면 무한스크롤은 어디에 적용하는것이 좋을지 고민하였습니다. 댓글과 같이 크게 컨텐츠를 찾지 않고 나열해도 되는부분에 적용하고자 하였습니다. 그래서 댓글, 답글 다는 부분에 적용하도록 결정했습니다.
    
- 이후 계획 - 백엔드와 빠른 데이터 로딩과 렌더링에 더 중점
    
    지금까지는 서비스가 작기 때문에 프론트엔드적으로 생각하여 적용하였습니다. 하지만 이후 서비스가 커지면서 효과적인 데이터 로딩과 렌더링이 필요하다고 생각합니다. 그래서 팔로우, 팔로워 목록은 커서 기반 페이지네이션으로 불러와서 무한스크롤로 렌더링 하고 있습니다. 이 부분을 다른 페이지네이션에도 추후 리팩토링할 예정입니다. 프론트엔드적으로는 이전 방식이 더 사용자 경험에 좋다고 생각하지만, 서버와의 빠른 데이터 로딩과 렌더링이 더 가능하다면 그 부분에 더 집중하는것이 좋다고 생각하여서 개선하고자 합니다.
</details>

<details>
<summary>디자인 시스템 도입</summary>

- 문제
    - Figma를 작성하면서 일관된 UI를 제공하지 않다고 판단하였습니다.
    - 새로운 UI가 추가될때 기존의 컴포넌트를 재활용하기 어렵습니다.
- 해결
    - 디자인시스템의 한 방법으로 아토믹 디자인을 도입하면 이 부분을 효과적으로 해결할 수 있다고 판단하였습니다.
    - Figma에서 일관된 크기, 모양의 요소를 재활용하도록 작성하고 기본적인 색상, 크기에 대한 요소들을 결정하였습니다.
    - 디자인의 기본 요소들을 세팅하고 이를 기반으로 공통 컴포넌트를 먼저 개발한 이후에 bottom up 방식으로 구현해나갑니다.
    - 디자인 시스템을 구축하고 기존 프로젝트에 적용하고 이를 관찰하여 다시 디자인 시스템을 개선할 필요성이 있습니다. 또한 다른 파트 팀원에게 프론트엔드의 컴포넌트 구현 단계를 효과적으로 전달하기 위하여 storybook을 도입하였습니다.

</details>

<details>
<summary>아토믹 디자인</summary>

- 폴더구조

폴더구조를 atom, molecule, organism 등으로 나누게 되면 개발할때에 어떤 컴포넌트를 호출할지 헷갈릴거라고 생각하였습니다. 왜냐하면 구현할때에 해당 컴포넌트를 불러오려고 이름을 떠올리기 때문입니다. 그래서 폴더구조는 header, footer와 같이 컴포넌트 이름으로 하였습니다.

- 고민사항

page를 제외한 atom, molecule, organism은 순수함수로 해야해서 전역상태조차 사용하지 않고 page로부터 props로 다 받아야하는데 왜 그래야하는지 고민중입니다. 해당 컴포넌트에서만 필요한 지역변수는 순수함수에 위배되지 않는지 궁금합니다. props로만 내려주는것이 props drilling이 심해져서 전역상태로 리택토링할 예정입니다. 이러한 이유로 아토믹 디자인을 제한적으로 도입하여 atom, molecule, organism등을 개념적으로 생각하여 설계하고 구현하고자 하였습니다. template는 atomic design을 위한 억지로 적용하게 되는것 같아서 각 공통에 사용하는 헤더와 푸터가 적용되도록 Layout컴포넌트를 만들때 활용하였습니다.

</details>

<details>
<summary>웹 접근성 고려 </summary>

- 이모지

img 태그에 alt가 null이나 “”인 경우에 screen reader는 해당 img에 대하여 알려주지 않습니다. 보통 단순히 꾸미기 위한 이미지의 경우에 이러한 특성을 이용합니다.

aria-label을 이용하여 다른 태그에서 label을 설정할 수 있습니다. 만약 값을 “”로 하는 경우에 대해 어떻게 되는지 궁금하여 w3문서를 보았지만 비어있는 값인 경우에 대한 언급이 없었습니다.

그래서 aria-label이 “”인 경우 aria-label을 hidden으로 처리하여 화면에는 보이되 screen reader에서 읽히지 않게 하였습니다. 즉, 꾸미기 위한 이미지와 같이 특별한 의미가 없는 경우에 개발시에 aria-label을 “”으로 설정하면 screen reader가 무시하도록 하였습니다. 가령 글에 대한 이모지는 사용자간의 상호작용으로 필요하겠지만 댓글에 스마일을 여러개 하면 불필요할 것입니다. 이럴때에 스마일 하나를 제외하고는 label을 빈 값으로 해도 충분하다고 판단하였습니다. 이 부분은 당장 프로젝트에는 상호작용에만 필요한 이모지만 있겠지만 큰 작업이 아니기 때문에 중간에 디자인 변경 및 추후 확장시에 이용될 수 있도록 고려하였습니다.

```jsx
<span
    // ...
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {content}
  </span>
```

하지만 span과 같이 중립적인 태그인데 어떤 의미를 부여해야할때가 있습니다. 예를들어 string의 emoji를 span으로 감쌌다면 그것이 이미지이고 그것의 설명이 smile이라고 주고 싶을 수 있습니다.

```jsx
<span role="img" aria-label="smile">{content}</span>
```

screen reader가 smile의 이미지로 읽을 수 있게 하였습니다.

최종적으로 다음과 같이 작성하였습니다.

```jsx
<span
    // ...
    role="img"
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {content}
  </span>
```

</details>

<details>
<summary>번들링</summary>

- 필요성
    
    백엔드 nginx에 배포할때 번들링을 하여 올리는 작업이 필요하였습니다.
    
- 과정
    
    production 모드로 webpack을 이용하여 번들링 하였습니다. MiniCssExtractPlugin 플러그인을 이용하여 css 파일을 별도 파일로 추출하였습니다. CssMinimizerPlugin 플러그인을 이용하여 css를 최적화 하였습니다.

</details>

<details>
<summary>번들 사이즈 최적화</summary>

![image](https://user-images.githubusercontent.com/58525009/203201845-ce0e690b-19c4-423c-a3a9-ec48ded68fbf.png)
- gzipped 기준으로 번들 사이즈 모니터링 필요성
    
    `webpack-bundle-analyzer`를 이용하여 번들 사이즈를 모니터링 하고 있습니다. 실제로 번들러를 거쳤을때의 압축된 사이즈를 알기 위하여 gzipped를 기준으로 번들 사이즈를 모니터링하고 있습니다. 압축된 사이즈는 전달하는 속도에 영향을 미치지만 압축되지 않은 사이즈는 파싱, 컴파일, js 실행시간에 영향을 끼치기 때문입니다.
    
- 상황
    
    react-icons를 사용하여 이것으로 인하여 사이즈를 많이 차지할것을 우려하여 모니터링을 시작하였습니다. 특정 아이콘을 위하여 react-icons를 전체 불러오는것이 아닌 해당 icon에 해당하는 부분이 import되는것으로 react-icons가 개선되서 그런지 생각보다 사이즈를 차지하지 않았습니다. 현재는 아이콘이 퀄리티있게 만들 디자이너가 존재하지 않기 때문에 라이브러리를 사용했지만 디자이너가 있게 된다면 이 조차도 사이즈를 줄일 수 있을것입니다. 그렇다고 현재 사이즈를 많이 차지하는것도 아니라 일단 그래도 두었습니다. 
    
     다만, 생각보다 암호화 라이브러리가 사이즈를 차지 한다는 것을 알 수 있었습니다. 추후 로그인 관련되어서는 백엔드와 대대적으로 논의 및 리팩토링을 하기로 하였습니다. 백엔드가 로그인 세션 기능을 다 처리하게 된다면 프론트에서 암호화하는 라이브러리도 걷어낼 수 있을것입니다.

</details>

<details>
<summary>스스로 가설을 세워 문제 해결</summary>

- 어려운점
    
    실제로 배포할 서비스를 염두해 두고 개발을 하다보니 어떤 문제가 발생하였을때 주변에 물어봐도 모르는 경우가 많았고 검색해도 저의 상황에 맞게 무엇이 문제이고 해결책은 무엇인지 찾기가 어려웠습니다. 
    
- 예시 상황
    
    예를 들어 깃허브 로그인시 깃허브 계정에 설정한 콜백 url로 이동하게 되는데 이동하고 나서는 클라이언트의 라우팅을 따르지 않는 상황이 발생하였습니다. ([`https://lnshare-study.com/`](https://lnshare-study.com/) → [`https://lnshare-study.com/loading`](https://lnshare-study.com/loading) 로 이동시)
    
    loading페이지가 클라이언트 라우팅을 따라서 로그인 후 이전 페이지로 돌아가는데 그 이후에 라우팅 대로 동작하지 않았습니다. 
    
- 원인 파악
    
    클라이언트 라우팅을 벗어났다는 것이기 때문에 /loading 부터는 클라이언트의 라우팅을 따르지 않고 깃허브가 콜백 url로 지정해주는 순간 클라이언트 라우팅을 벗어나서 깃허브가 요청한 url로 이동한 것이라고 생각하였습니다. 
    
- 가설 설정 및 실행, 해결
    
    클라이언트 단에서 통제할 수 있는것이 아니기 때문에 nginx의 try_files를 설정하여 서버단에서 해당 url일 경우 클라이언트 라우팅으로 연결되도록 설정하면 될것이라고 예상하였습니다. 백엔드에게 이를 요청했고 설정해보니 예상은 맞았습니다. 문제 원인의 가설과 해결책 모두 올바르게 찾을 수 있었습니다.

</details>

<details>
<summary>앞으로 보완할 사항</summary>

- 렌더링 최적화
- 로직과 디자인 분리
- Suspense 컴포넌트를 이용하여 선언형 코드로 리팩토링
- 사용자 작성중인 페이지에서 벗어나는 경우 대처
    - 임시저장
    - 내용이 유실될 수 있음을 알림창으로 알림

</details>
