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
const footer = document.querySelector(".footer");
const container = document.querySelector(".container");

let fileInputs = document.querySelectorAll(".file-input");
let previewZone = null;

let title = document.querySelector(".f-title");
let date = document.querySelector(".f-date");


let colorWhite = "color:white";

fileInputs.forEach(fileInput => {
    fileInput.onchange = function(e){
        let file = e.target.files[0];
        previewZone = e.target.parentElement;
        previewZone.querySelector(".image").src = "";
        imageLoader(file, e.target.getAttribute('id'));
    }
});

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
            let img = previewZone.querySelector(".image");
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
    let valueT = title.value;
        let valueD = date.value;
        
        title.remove();
        date.remove();
        submit.remove();

        let titVal = document.createElement("p");
        titVal.setAttribute("class","f-title");
        titVal.setAttribute("style","color:white");

        titVal.textContent = valueT;
        let dateVal = document.createElement("p");
        dateVal.setAttribute("class",colorWhite);
        dateVal.setAttribute("style",colorWhite);
        dateVal.textContent = valueD;
        
        footer.appendChild(titVal);
        footer.appendChild(dateVal);

    printDiv(container);
}

function printDiv(div){
    
    // div = div[0]; 이새끼 때문에 Uncaught (in promise) Invalid element provided as first argument 오류 
    html2canvas(div).then(function(canvas){
        let myImage = canvas.toDataURL();
        downloadURI(myImage, new Date() + "_myImage.png");
    });
}

function downloadURI(uri, name){
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    if(confirm("사진을 다운로드 하십니까?")){
        link.click();
    }else{
        location.reload;
    }
    
}
