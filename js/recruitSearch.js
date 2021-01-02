var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [3000, 4000, 5000, 6000, 7000, 8000, 9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000],
    range: true,
    step:10,
    tooltip: true,
    scale: true,
    labels: false,
    set: [3000, 20000],
    width:190
});



//연봉버튼 및 모달 플래그
//연봉버튼 토글로 모달이 열리면 1 닫히면 0
let btnFlag = 0;

//연봉 버튼 클릭하면 연봉 선택바 보여주거나 숨김
document.querySelector('.salary').addEventListener("click", ()=>{
    if(btnFlag){
        document.querySelector('.salary-bar').style.height="0";
        document.querySelector('.salary-bar').style.border="none";
        btnFlag=0; //모달 닫았어
    }else{
        document.querySelector('.salary-bar').style.height="170px";
        document.querySelector('.salary-bar').style.border="1px solid #c7c7c7";
        btnFlag=1; //모달 열었어
    }
})




//연봉 적용버튼 클릭하면 태그 추가해주기
document.querySelector('.salary-bar button').addEventListener('click',()=>{
    document.querySelector('.salary-bar').style.height="0";
    document.querySelector('.salary-bar').style.border="none";
    btnFlag=0; //모달 닫았어
})


//요소 바깥 클릭 감지 메소드
document.addEventListener('click', (e)=>{

    if(btnFlag){//연봉버튼 눌러서 모달이 띄워진 경우

        //연봉모달 제어용 변수
        let salaryModal = document.querySelector('.salary-bar');

        //연봉버튼클릭 제어용 변수
        let salaryBtn = document.querySelector('.salary');

        let clicked = e.target;//클릭된 요소 담을 변수

    
        //클릭된 요소부터 시작해 부모요소들로 거슬러 올라가며 클래스명 탐색
        while(clicked){

            if(clicked.className==salaryModal.className
                ||clicked.className==salaryBtn.className){
                //클릭된 요소가 salaryModal에 포함되는 경우
                //혹은 연봉버튼에 포함되는 경우
                return; //아무것도 안하고 빠져나간다.
            }

            clicked = clicked.parentNode;//클릭된 요소의 부모요소 세팅
        }

        //만약 처음에 연봉버튼 클릭하고 연봉모달이 열렸는데, 
        //아래 명령이 바로 실행되면 연봉모달이 열리자마자 닫혀버리게된다.
        //그래서 위에 while문에 바로 안닫히게 조건걸어줌
        document.querySelector('.salary-bar').style.height="0";
        document.querySelector('.salary-bar').style.border="none";
        btnFlag=0;
    }
    
})


//태그 추가 메소드
let addTag = (name,value)=>{

    //이미 있는 태그면 추가 안함
    let tags = document.querySelectorAll('.selected-tag');
    let stop = false;
    tags.forEach((v)=>{
        if(v.firstElementChild.innerText==`${name} : ${value}`){
            alert('이미 추가된 태그입니다.');
            stop=true; //추가하지마
        }
    })

    //추가 안되어있는 태그면 추가해주자
    if(!stop){
        let newTag = '<div class="selected-tag"><span>'+`${name} : ${value}`
        +'</span><span class="material-icons clear-btn" onclick="deleteTag(event)">clear</span></div>'
        
        document.querySelector('.info-search__tags').insertAdjacentHTML('afterbegin',newTag);

    }
}

//태그관련 메소드들
let getPosition = (v)=>{
    addTag('활동분야',v.value);

    // let options = document.querySelectorAll('select[name="position"]>option')
    // options.forEach((v) => {
    //     console.log(v.value==='활동분야');
    //     if(v.value==='활동분야'){
    //         v.setAttribute('selected',true);
    //     }else{
    //         v.removeAttribute('selected');
    //     }
    // })
}
let getIndustry = (v)=>{
    addTag('산업분야',v.value);
}
let getTechStack = (v)=>{
    addTag('테크스택',v.value);
}
let getCondition = (v)=>{
    addTag('채용조건',v.value);
}
let getAddress = (v)=>{
    addTag('지역',v.value);
}


mySlider.onChange((v)=>{
    console.log(v);
})


document.querySelector('.salary-btn').addEventListener('click',()=>{
    let a = mySlider.getValue().split(',');
    if(a[0]==a[1]){ //최소연봉 최대연봉 같은 경우 금액 조절해서 태그추가
        if(a[1]==20000){
            a[0]=Number(a[0])-1000;
        }else{
            a[1]=Number(a[1])+1000;
        }
    }
    addTag('연봉',`${a[0]} ~ ${a[1]}`);
})

//태그 클릭시 삭제
let deleteTag = (e)=>{
    e.target.parentNode.remove();
}

//검색돋보기버튼 클릭시
document.querySelector('.search-btn').addEventListener('click',()=>{
    let keyword = document.querySelector('.search-keyword').value;
    console.log(keyword);
})

//검색창에서 엔터치면 실행될 메소드
document.querySelector('.search-keyword').addEventListener('keydown',(e)=>{
    if(e.keyCode==13){
        console.log('엔터쳤다');
    }
})

//선택된 정렬옵션 진하게해주는 메소드
document.querySelectorAll('.search-results__align-options>span').forEach((v)=>{
    v.addEventListener('click',()=>{
        //클릭된 정렬옵션을 진하게해준다.
        document.querySelector('.aligning').classList.remove('aligning');
        v.classList.add('aligning');
    })
})

