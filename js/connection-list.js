
'use strict';


//팔로워,팔로잉,연결 모두 현재페이지가 마지막 페이지면 more버튼 비활성화.
if(    ${frPi.currentPage}==${frPi.maxPage} 
  && ${fgPi.currentPage}==${fgPi.maxPage} 
  && ${cnPi.currentPage}==${cnPi.maxPage}){
  
  let moreBtn = document.querySelector('#moreBtn');
  moreBtn.setAttribute('disabled',true);
    
}

//리스트 로드 중지 플래그
let stopFrLoad = false;
let stopFgLoad = false;
let stopCnLoad = false;

//리스트 추가해주는 메소드
const loadList = (stop,list,area)=>{
  if(!stop){//현재페이지가 마지막페이지가 아닌 경우 리스트 가져옴
    
    list.forEach((v)=>{ //팔로워리스트
      
      if(v.userAvatar==undefined) v.userAvatar='';
      if(v.userComp==undefined) v.userComp='';
      
      let profile = '<div class="content__profile">'
              +'<img '
                +'class="circle"'
                +'src="${pageContext.request.contextPath}/'+v.userAvatar+'"'
                +'alt="PROFILE"'+'/>'
              +'<div class="content_introduce">'
                +'<strong>'+v.userName+'</strong>'
                +'<p>'+v.userComp+'</p>'
            +'</div>'
            +'</div>';
  area.insertAdjacentHTML('beforeend',profile);
    });
    
  }
};

//페이지 비교해주는 메소드
const comparePage = (pCon)=>{
  
  //현재페이지가 마지막페이지면 stopLoad 활성화
  if(pCon.data.piBox[0].currentPage==pCon.data.piBox[0].maxPage){//follower
    stopFrLoad=true;
  }
  if(pCon.data.piBox[1].currentPage==pCon.data.piBox[1].maxPage){//following
    stopFgLoad=true;
  }
  if(pCon.data.piBox[2].currentPage==pCon.data.piBox[2].maxPage){//connection
    stopCnLoad=true;
  }
  
};

//모두 마지막 페이지면 버튼 비활성화해주는 메소드
const disMoreBtn=()=>{
  //팔로워,팔로잉,연결 모두 현재페이지가 마지막 페이지면 more버튼 비활성화.
    if(    stopFrLoad==true
        && stopFgLoad==true
        && stopCnLoad==true){
        let moreBtn = document.querySelector('#moreBtn');
        moreBtn.setAttribute('disabled',true);
    }
};

//more버튼 속성 변경 메소드
const changeMoreBtn=(pCon)=>{
  //더보기버튼 속성 변경
    if(!document.querySelector('#moreBtn').hasAttribute('disabled')){ //버튼이 비활성화되어있지 않으면 세팅
      
    document.querySelector('#moreBtn').setAttribute('onclick',
                  'loadMore('+${loginUser.userNo}+','
                  +pCon.data.piBox[0].currentPage+','//follower
                  +pCon.data.piBox[0].maxPage+','
                  +pCon.data.piBox[1].currentPage+','//following
                  +pCon.data.piBox[1].maxPage+','
                  +pCon.data.piBox[2].currentPage+','//connection
                  +pCon.data.piBox[2].maxPage+')'
                );
    }
}


//"처음" more버튼 누를 때 실행되는 함수
const loadMore = function(userNo,frCp,frMp,fgCp,fgMp,cnCp,cnMp){
  
  
  //현재페이지가 마지막페이지가 아니면 다음페이지(현재페이지+1) 세팅
  //현재페이지가 마지막페이지면 stopLoad 세팅
  if(frCp<${frPi.maxPage}){//follower
    frCp++;
  }else{
    stopFrLoad=true;
  }
  
  if(fgCp<${fgPi.maxPage}){//following
    fgCp++;
  }else{
    stopFgLoad=true;
  }
  
  if(cnCp<${cnPi.maxPage}){//connection
    cnCp++;
  }else{
    stopCnLoad=true;
  }
  
  
  axios.get('connection2.us',{
    params:{
      userNo:userNo,
      frCp:frCp,
      fgCp:fgCp,
      cnCp:cnCp
    }
  })
  .then(function(pCon){
    
    console.log('loadMore통신 성공');
    
    //넘어온 팔로워,팔로잉,연결 리스트 변수에 담아두자.
    const frList = pCon.data.followers;
    const fgList = pCon.data.followings;
    const cnList = pCon.data.connections;
    
    //리스트를 출력해줄 각 구역 Dom객체 저장
    let frArea = document.querySelector(".section__connection:first-child");//팔로워
    let fgArea = document.querySelector(".section__connection:nth-child(2)");//팔로잉
    let cnArea = document.querySelector(".section__connection:nth-child(3)");//연결

    
    //가져온 데이터를 가지고 리스트 수정해주기
    loadList(stopFrLoad,frList,frArea);
    loadList(stopFgLoad,fgList,fgArea);
    loadList(stopCnLoad,cnList,cnArea);
    
    //현재페이지가 마지막페이지면 stopLoad 활성화
    comparePage(pCon);
    
    //팔로워,팔로잉,연결 모두 현재페이지가 마지막 페이지면 more버튼 비활성화.
      disMoreBtn();
    
    //더보기버튼 속성 변경
      changeMoreBtn(pCon);
    
    console.log('loadMore통신 마무리!');
  })
  .catch(function (error){
    console.log(error);
  })
};