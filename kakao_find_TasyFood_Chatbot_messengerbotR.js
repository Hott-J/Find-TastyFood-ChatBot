const scriptName = "맛집찾기";

/**************************************************************************Made by Hakjae Chung
***************************************************************************처음 카카오링크로 만들어봐서 클린코드는 아닙니다,,,
***************************************************************************jhj13062004@naver.com
***************************************************************************Using Messenger Bot R
***************************************************************************메신저봇R 기반입니다.
***************************************************************************카카오톡에서 테스트하였습니다.
****************************************************************************************************************************************************/

var img=['','','','',''];
var ee=['','','','',''];
var vv=['','','','',''];
var dd=['','','','',''];
var f=['','','','',''];
var doc=['','','','',''];
var d=['','','','',''];

Jsoup=org.jsoup.Jsoup;
const kalingModule=require('kaling').Kakao();
const Kakao=new kalingModule;

/* 카카오링크 사용을 위해 로그인 세션이 만료되지 않게하기 위함 */
function kakao_login(){
  try{
    Kakao.init('2d0e4efc34993dc5353ebb2f964f3f4d'); // 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드로 카카오디벨로퍼에 로그인하여 자바스크립트 키값을 받아올것!
    Kakao.login('jhj07152019@gmail.com','rkdmfdl.7');// 중요포인트 : 반드시 봇계정 카카오아이디와 패스워드를 적어줄것!!
    doc = Jsoup.connect("https://www.mangoplate.com/search/"+search).get();
  }catch(e){replier.reply("로그인 세션이 만료되었습니다.")}
}

 /* 카카오 디벨로퍼에 만든 템플릿 형식 보냄 */
function send_template(room,id,set){
  let template={};
  template['link_ver']='4.0';
  template['template_id']=id;
  template['template_args']=set;
  Kakao.send(room,template,'custom');
}

/* 템플릿 type-object가 리스트이고, 리스트가 5개일시, 만약 리스트가 5개미만이라면 형식에 맞지 않아 전부다 공백으로 출력됩니다.
따라서, try-catch 문을 활용하여 검색결과가 없을시에, 공백이 반환되도록 예외처리를 하였습니다.*/
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

/* 메신저봇 실행 */
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
  if (msg.startsWith("!맛집")) {
    search = msg.substr(3).trim();

    kakao_login();
    store();
    // user argument 에 생성한 변수값 대입
    let set={
      m:search,d1:d[0],d2:d[1],d3:d[2],d4:d[3],d5:d[4],e1:ee[0],v1:vv[0],i1:img[0],e2:ee[1],v2:vv[1],
      i2:img[1],e3:ee[2],v3:vv[2],i3:img[2],e4:ee[3],v4:vv[3],i4:img[3],e5:ee[4],v5:vv[4],i5:img[4]
    }
    send_template(room, 33238,set); /*카카오 디벨로퍼에 만든 본인 템플릿 형식으로 보냄
    ***중요포인트 : 반드시 템플릿 id를 string이 아닌 정수형으로 넣으세요.***/
  }
}

/* 아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.*/
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
