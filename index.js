// function showText(number) {
//     if (number === 1) {
//         document.querySelector("#desc1").classList.remove("hide-text");
//         document.querySelector("#desc1").classList.add("show-text");
//     } else if (number === 2) {
//         document.querySelector("#desc2").classList.remove("hide-text");
//         document.querySelector("#desc2").classList.add("show-text");
//     } else {
//         document.querySelector("#desc3").classList.remove("hide-text");
//         document.querySelector("#desc3").classList.add("show-text");
//     }
//     }

// // 텍스트가 감춰지는 기능
// // 1. 몇 번째 사진에서 마우스가 벗어났는지 확인(if문)
// // 2. 해당 사진을 찾아 shotText class를 지워주고, hideText는 삽입해줌
// function hideText(number) {
// if (number === 1) {
//     document.querySelector("#desc1").classList.remove("show-text");
//     document.querySelector("#desc1").classList.add("hide-text");
// } else if (number === 2) {
//     document.querySelector("#desc2").classList.remove("show-text");
//     document.querySelector("#desc2").classList.add("hide-text");
// } else {
//     document.querySelector("#desc3").classList.remove("show-text");
//     document.querySelector("#desc3").classList.add("hide-text");
// }
// }

// 클릭 기능
// 1. 선택된 사진의 숫자를 가진 텍스트를 alert 형태로 출력해줌
// function alertText(number) {
//     alert(`${number}번째 추억이에요! 눌러주셔서 감사합니다 :)`);
// }

let saveFiles = [];
const submit = document.querySelector(".submit-btn");


let fileInputs = document.querySelectorAll(".file-input");
let attZone = null;

fileInputs.forEach(fileInput => {
    fileInput.onchange = function(e){
        let file = e.target.files[0];
        attZone = e.target.parentElement;
        imageLoader(file, e.target.getAttribute('id'));
        console.log(saveFiles);
    }
})

imageLoader = function(file, id){

    if(saveFiles.length > 0){
        let duplIndex = saveFiles.findIndex(obj => obj.id == id);
        //해당 id가 이미 저장되었으면 
        if(duplIndex !=  -1){
            saveFiles.splice(duplIndex,1,{'id': id, 'file' : file});
            console.log("덮어씀");
        }else{
            saveFiles.push({
                'id' : id,
                'file' : file
            });
            console.log("추가됨");
        }
    }else{
        saveFiles.push({
            'id' : id,
            'file' : file
        });
        console.log("추가됨");
    }
    

    let reader = new FileReader();
    reader.addEventListener(
        'load',
        function () {
            let img = attZone.querySelector(".image");
            img.src = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
  }



submit.onclick = () => {
    fileInputs.forEach(fileInput => {
        fileInput.remove();
    });
    
}