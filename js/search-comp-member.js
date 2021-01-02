'use strict'

//area에 구성원 정보 추가해주는 메소드
const loadSearchedList = (list, area) => {

    let num = 0;//label 전용 변수

    list.forEach((v) => {
        //유저의 회사가 비어있는 경우 공백으로 대체
        if (v.userComp == undefined) v.userComp = '';
        
        console.log(v.userNo);

        let member = '<div class="charater__info">'
                        +'<div class="charater__info__left">';
                        if(v.userAvatar==undefined){
                            member = member
                            +'<div class="member__avatar">'
                                +'<img src="resources/assets/avatar.png" alt="" />'
                            +'</div>';
                        }else{
                            member = member
                            +'<div class="member__avatar">'
                                +'<img src="'+v.userAvatar+'" alt="" />'
                            +'</div>';
                        }
            member = member + '<label for="add_option'+num+'" class="add__member__check">'
                            +'<ul class="add__member__info">'
                                +'<li><strong>'+v.userName+'</strong></li>'
                                + '<li>' + v.email +'</li>'
                            +'</ul>'
                            +'</label>'
                        +'</div>'
                        +'<div class="charater__info__right">'
                            +'<input type="checkbox" id="add_option'+num+'" name="uno" value="'+v.userNo+'">'
                        +'</div>'
                    +'</div>';


        area.insertAdjacentHTML('beforeend', member);

        num++;
    });

};


//구성원으로 추가할 일반회원 검색할 때 검색키워드에 맞는 구성원 리스트를 보여준다.
document.querySelector('#find-email').addEventListener('input',(e)=>{
    console.log(e.target.value);
    axios.get('searchMemberList.co',{
        params:{
            email:e.target.value
        }
    })
    .then((searchedList)=>{

        //searchResult는 한 개 이상의 검색된 일반회원 리스트임
        let list = searchedList.data;
        let area = document.querySelector('.modal__member__content');//리스트 추가해줄 요소

		console.log(list);
        if(searchedList.data.length==0){ //검색결과가 없다면
            area.innerHTML='<p class="no-result">검색 결과가 없습니다.</p>';
        }else{//검색결과 있다면
            area.innerHTML=''; //기존 리스트 초기화
            loadSearchedList(list,area);
        }


    })
    .catch((err)=>{
        console.log(err);
    })
})
