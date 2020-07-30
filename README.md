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
<pre>
<code>
function store(){
  var i;
  for(i=0;i<5;i++){
    try{
      img[i]=doc.select("img[class=center-croping lazy]").get(i).attr("abs:data-original"); //이미지 파싱
      ee[i]= doc.select("h2.title").get(i).text(); //가게이름
      vv[i]=doc.select("p.etc").get(i).text(); //가게 위치 및 음식 정보
      dd[i]=ee[i].replace(/[ ]/gi,'')+" "+vv[i]; // 가게이름 + 위치정보 -> 검색하기 위함
      f[i]=((dd[i].split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,'');
      /* 가게이름에 특수문자 제거,//위치 역시 지역이 3개이상시 검색이 안되길래, 위치가 방배/반포/잠원 이런식으로 '/'로 구분되어있어서,
      지역하나와 특수문자가 제거된 가게이름으로 검색하여 오류 제거*/
      d[i] = (Jsoup.connect("https://www.mangoplate.com/search/"+f[i]).get()).select('div.info > a').get(0).attr('href');
      // 가게 이미지 누르면 가게 이름 검색된 페이지 나옴. 가게이름+지역정보로 검색된 해당 가게정보가 바로 나오게끔 절대주소 파싱
    }catch(e){img[i]=null,ee[i]=' ',vv[i]=' ',dd[i]=null,f[i]=null;}
    // 오류났을시, 가게이름과 해당 속성값 ' '처리 -> null 일 경우 템플릿형식에 맞지않아 전부다 공백으로 나옴
  }
}
</code>
</pre>
