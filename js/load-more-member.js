'use strict';

let currentPage = 2;

//특정 area에 구성원 정보 추가해주는 메소드
const loadList = (list, area) => {
    list.forEach((v) => {
        //유저의 회사가 비어있는 경우 공백으로 대체
        if (v.userComp == undefined) v.userComp = '';

        let member = '<div class="charater__info">';
        
                        if (v.userAvatar == undefined) {
                            member = member 
                            + '<div class="member__avatar">'
                                + '<img src="resources/assets/avatar.png" alt="profile"/>'
                            + '</div>';//member__avatar
                        } else {
                            member = member 
                            +'<div class="member__avatar">'
                                +'<img src="${pageContext.request.contextPath}/'+v.userAvatar+'" alt="" />'
                            +'</div>'//member__avatar
                        }
                        member = member
                            + '<div class="member__info__list">'
                                + '<ul class="member__info">'
                                    + '<li><strong>' + v.userName +'</strong></li>'
                                    + '<li>' + v.userComp +'</li>'
                                + '</ul>'
                            + '</div>'//member__info__list

                    + '</div>'; //charater__info

        area.insertAdjacentHTML('beforeend', member);
    });
};


//more버튼 클릭된 경우
const loadMore = (cno)=>{
    
    axios
        .get('loadMoreMember.co', {
            params: {
                cno: cno,
                currentPage: currentPage
            }
        })
        .then(function (loadedInfo){

            let pi = loadedInfo.data.piBox[0];
            let list = loadedInfo.data.memberList;
            let area = document.querySelector('.member-box');

            loadList(list,area);

            currentPage++;

            //현재페이지가 마지막페이지면 more버튼 지운다.
            if(pi.currentPage==pi.maxPage){
                document.querySelector('.member_btn').remove();
            }


        })
        .catch(function (err) {
            console.log(err);
        });
    
}
