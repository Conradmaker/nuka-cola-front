<script defer>
  'use strict' //함수의 매개변수 값으로 유저번호, 팔로잉할회원번호, 클릭된객체가
  들어온다. const addFollowing = (frNo,fgNo,e)=>
  {axios
    .get('addFollowing.conn', {
      params: {
        userNo: frNo,
        followingNo: fgNo,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.result > 0) {
        //팔로잉 추가 성공
        e.target.innerText = '팔로우 취소';
        e.target.setAttribute(
          'onclick',
          'cancelFollowing(' +
            res.data.followerNo +
            ',' +
            res.data.followingNo +
            ',event)'
        );
      } else {
        //팔로잉 추가 실패
        alert('요청에 실패했습니다.');
      }
    })
    .catch((err) => {
      //통신 실패
      console.log(err);
    })}
  ; const cancelFollowing = (frNo,fgNo,e)=>
  {axios
    .get('cancelFollowing.conn', {
      params: {
        userNo: frNo,
        followingNo: fgNo,
      },
    })
    .then((res) => {
      if (res.data.result > 0) {
        //팔로잉 삭제 성공
        e.target.innerText = '팔로우';
        e.target.setAttribute(
          'onclick',
          'addFollowing(' +
            res.data.followerNo +
            ',' +
            res.data.followingNo +
            ',event)'
        );
      } else {
        //팔로잉 삭제 실패
        alert('요청에 실패했습니다.');
      }
    })
    .catch((err) => {
      //통신 실패
      console.log(err);
    })}
  ;
</script>;
