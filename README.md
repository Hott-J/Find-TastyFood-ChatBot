# * Find_TastyFood_ChatBot
- - -

     카카오링크를 사용하여 나만의 템플릿으로 맛집을 검색해주는 채팅봇입니다. 

<br/>

## * 사용법 : !맛집 (대상) (특징)
- - -

     대상 : 지역, 식당 또는 음식 이름이 들어갑니다.
     특징 : 대상의 범위를 좁혀줍니다.  ex) 카페, 술집 등 / cf) 공백이여도 상관없습니다.

<br/>

## * 사용 예시
- - -

     !맛집 (대상) <리스트 5개 이상>
   ![맛집숭실대예시](https://user-images.githubusercontent.com/47052106/88888394-34fb9480-d279-11ea-9f1e-2647a667c51e.jpg)

<br/>

     !맛집 (대상) <리스트 5개 미만>
  ![맛집맨체스터예시](https://user-images.githubusercontent.com/47052106/88888541-75f3a900-d279-11ea-9e20-66937a195925.jpg)
   
<br/>

     !맛집 (대상) (특징)
  ![숭실대카페맛집예시](https://user-images.githubusercontent.com/47052106/88888575-8a37a600-d279-11ea-83a1-30d56d09faba.jpg)
  
   
<br/>

## * 구현 로직
- - -

     템플릿 type-object가 리스트이고, 리스트가 5개일시, 만약 리스트가 5개미만이라면 형식에 맞지 않아 전부다 공백으로 출력됩니다.
     따라서, try-catch 문을 활용하여 검색결과가 없을시에, 공백이 반환되도록 예외처리를 하였습니다.

<br/>

 ![맛집로직](https://user-images.githubusercontent.com/47052106/88889284-d3d4c080-d27a-11ea-9cf1-11912968bd15.JPG)
