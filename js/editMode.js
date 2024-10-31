// editMode.js

import { db, collection, getDocs } from './firebase.js';

const editMode = sessionStorage.getItem('editMode');

if (editMode === 'true') {
    $('#editbtn').text('편집종료');
}

$('#editbtn').click(async function () {
    if (editMode !== 'true') {
        let key = prompt('편집 key를 넣어주세요.', '');

        const editKey = collection(db, 'edit');
        const querySnapshot = await getDocs(editKey);

        // key 값을 1개 임으로, 문서의 1번째에 접근하여 데이터 가져옴
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();

            if (data.key === key) {
                alert('관리자로 확인이 되었습니다.');
                window.location.href = 'index.html';

                // 세션에 로그인 상태 저장
                sessionStorage.setItem('editMode', 'true');
            } else {
                alert('잘못된 접근 입니다.');
            }
        } else {
            alert('오류가 발생하였습니다. 관리자에게 문의해주세요.');
        }
    } else {
        sessionStorage.clear();
        window.location.reload();
        window.location.href = 'index.html';
    }   
    //세션 값 읽어오기
const editMode = sessionStorage.getItem('editMode')
// toggle 기능이 한번만 동작하도록 
let editHidden = false;

// 관리자 모드 일 시 댓글삭제 버튼이 보이도록
if (editMode !== 'true' && editHidden === false) {
    $("button[name='plsbtn']").toggle();
}else if (editMode === 'true' && editHidden === true) {
    $("button[name='plsbtn']").toggle();
    editHidden = false;
} 

});
