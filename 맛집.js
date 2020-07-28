const scriptName = "맛집찾기";
/**
* (string) room
* (string) sender
* (boolean) isGroupChat
* (void) replier.reply(message)
* (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
* (string) imageDB.getProfileBase64()
* (string) packageName
*/

const kalingModule=require('kaling').Kakao();
const Kakao=new kalingModule;
Kakao.init('2d0e4efc34993dc5353ebb2f964f3f4d');
Kakao.login('jhj07152019@gmail.com','rkdmfdl.7');

function send_template(room,id,set){
  let template={};
  template['link_ver']='4.0';
  template['template_id']=id;
  template['template_args']=set;
  Kakao.send(room,template,'custom');
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  Jsoup = org.jsoup.Jsoup
  if (msg.startsWith("!맛집")) {
    search = msg.substr(3).trim();

    try{
      Kakao.init('2d0e4efc34993dc5353ebb2f964f3f4d');
      Kakao.login('jhj07152019@gmail.com','rkdmfdl.7');
      doc = Jsoup.connect("https://www.mangoplate.com/search/"+search).get();

      var img1=doc.select("img[class=center-croping lazy]").get(0).attr("abs:data-original"); //이미지 파싱 , 가게1
      var img2=doc.select("img[class=center-croping lazy]").get(1).attr("abs:data-original"); // 가게2
      var img3=doc.select("img[class=center-croping lazy]").get(2).attr("abs:data-original"); // 가게3
      var img4=doc.select("img[class=center-croping lazy]").get(3).attr("abs:data-original"); // 가게4
      var img5=doc.select("img[class=center-croping lazy]").get(4).attr("abs:data-original"); // 가게5

//가게1
      var ee1= doc.select("h2.title").get(0).text(); //가게이름
      var vv1=doc.select("p.etc").get(0).text(); //가게 위치 및 음식 정보
      var dd1=ee1.replace(/[ ]/gi,'')+" "+vv1; // 가게이름 + 위치정보 -> 검색하기 위함
      var f1=((dd1.split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,''); // 가게이름에 특수문자 제거,
      //위치 역시 지역이 3개이상시 검색이 안되길래, 위치가 방배/반포/잠원 이런식으로 /로 구분되어있어서, 지역하나와 특수문자가 제거된 가게이름으로 검색하여 오류 제거
      doc1 = Jsoup.connect("https://www.mangoplate.com/search/"+f1).get(); // 가게 이미지 누르면 가게 이름 검색된 페이지 나옴.
      let d1=doc1.select('div.info > a').get(0).attr('href'); // 가게이름+지역정보로 검색된 해당 가게정보가 바로 나오게끔 절대주소 파싱

//가게2
      var ee2= doc.select("h2.title").get(1).text();
      var vv2=doc.select("p.etc").get(1).text();
      var dd2=ee2.replace(/[ ]/gi,'')+" "+vv2;
      var f2=((dd2.split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,'');
      doc2 = Jsoup.connect("https://www.mangoplate.com/search/"+f2).get();
      let d2=doc2.select('div.info > a').get(0).attr('href');

//가게3
      var ee3= doc.select("h2.title").get(2).text();
      var vv3=doc.select("p.etc").get(2).text();
      var dd3=ee3.replace(/[ ]/gi,'')+" "+vv3;
      var f3=((dd3.split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,'');
      doc3 = Jsoup.connect("https://www.mangoplate.com/search/"+f3).get();
      let d3=doc3.select('div.info > a').get(0).attr('href');
//가게4
      var ee4= doc.select("h2.title").get(3).text();
      var vv4=doc.select("p.etc").get(3).text();
      var dd4=ee4.replace(/[ ]/gi,'')+" "+vv4;
      var f4=((dd4.split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,'');
      doc4 = Jsoup.connect("https://www.mangoplate.com/search/"+f4).get();
      let d4=doc4.select('div.info > a').get(0).attr('href');

//가게5
      var ee5= doc.select("h2.title").get(4).text();
      var vv5=doc.select("p.etc").get(4).text();
      var dd5=ee5.replace(/[ ]/gi,'')+" "+vv5;
      var f5=((dd5.split("-"))[0].split("/"))[0].replace(/[.]/gi,'').replace(/[(]/gi,' ').replace(/[)]/gi,' ').replace(/[,]/gi,'');
      doc5 = Jsoup.connect("https://www.mangoplate.com/search/"+f5).get();
      let d5=doc5.select('div.info > a').get(0).attr('href');

 // user argument 에 생성한 변수값 대입
      let set={
        m:search,
        d1:d1,
        d2:d2,
        d3:d3,
        d4:d4,
        d5:d5,
        e1:ee1,
        v1:vv1,
        i1:img1,
        e2:ee2,
        v2:vv2,
        i2:img2,
        e3:ee3,
        v3:vv3,
        i3:img3,
        e4:ee4,
        v4:vv4,
        i4:img4,
        e5:ee5,
        v5:vv5,
        i5:img5
      }
      send_template(room,33238,set); //카카오 디벨로퍼에 만든 33238 템플릿으로 만들어서 보냄
    }catch(e){replier.reply("검색결과가 없습니다");}  // 검색결과 없을 때 예외처리
  }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
