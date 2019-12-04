function showReplys(event){
    let content = event.target.parentNode.parentNode;
    let replys = content.querySelector('.replys');
    if(replys.style.display == 'block'){
        replys.style.display = 'none';
    }else{
        replys.style.display = 'block';
    }
}
function modifyDate(){
    let dateAndReply = document.getElementsByClassName('dateAndReply');
    for(let i=0;i<dateAndReply.length;i++){
        let date = dateAndReply[i].querySelector('p');
        let temp = new Date(date.textContent);
        let format = temp.getFullYear() + "-" + (temp.getMonth()+1)+"-"+temp.getDate();
        date.textContent = format;
    }
}

function searchLastestDiscussionByTopic(){
    let select = document.getElementsByClassName("searchLastestDiscussionByTopic");
    let content = document.getElementsByClassName('content');
    for(let i=0;i<content.length;i++){
        content[i].parentNode.style.display = 'none';
    }
    let five = 0;
    for(let i=0;i<content.length;i++){
        let span = content[i].querySelector('span');
        if(select[0].value == span.textContent){
            content[i].parentNode.style.display = 'flex';
            five++;
        }
        if(five == 5){
            break;
        }
    }
    let buttonNext = document.getElementById("buttonNext");
    let buttonPrevious = document.getElementById("buttonPrevious");
    buttonNext.setAttribute("onClick","showNextFiveByContent()");
    buttonPrevious.setAttribute("onClick","showPreviousFiveByContent()");
    buttonNext.parentNode.setAttribute("data","0");
    buttonNext.parentNode.setAttribute("dataTopic",select[0].value)

}
function clearUpDisplayNone(){
    let content = document.getElementsByClassName('content');
    for(let i=0;i<content.length;i++){
        content[i].parentNode.style.display = 'flex';
    }
    let buttonNext = document.getElementById("buttonNext");
    let buttonPrevious = document.getElementById("buttonPrevious");
    buttonNext.setAttribute("onClick","showFivePost()");
    buttonPrevious.setAttribute("onClick","showPreviousFivePost()");
    buttonNext.parentNode.setAttribute("data","0");
    buttonNext.parentNode.removeAttribute("dataTopic");
    showFive();
}
function showNextFiveByContent(){
    let buttonNext = document.getElementById("buttonNext");
    let page = buttonNext.parentNode.getAttribute("data");
    let topic = buttonNext.parentNode.getAttribute("dataTopic");
    let content = document.getElementsByClassName('content');
    let eachForShow = [];
    for(let i=0;i<content.length;i++){
        let span = content[i].querySelector('span');
        if(topic == span.textContent){
            eachForShow.push(content[i].parentNode);
        }
    }
    page++;
    numberOfShow = page*5;
    if(numberOfShow<=eachForShow.length){
        hidenAllOfPost();
        for(let i=numberOfShow;i<numberOfShow+5;i++){
            if(eachForShow[i]!=null){
                eachForShow[i].style.display = "flex"
            }
        }
        buttonNext.parentNode.setAttribute("data",page);
    }
}
function showPreviousFiveByContent(){
    let buttonPrevious = document.getElementById("buttonPrevious");
    let page = buttonPrevious.parentNode.getAttribute("data");
    let topic = buttonPrevious.parentNode.getAttribute("dataTopic");
    let content = document.getElementsByClassName('content');
    let eachForShow = [];
    for(let i=0;i<content.length;i++){
        let span = content[i].querySelector('span');
        if(topic == span.textContent){
            eachForShow.push(content[i].parentNode);
        }
    }
    page--;
    numberOfShow = page*5;
    if(numberOfShow>=0){
        hidenAllOfPost();
        for(let i=numberOfShow;i<numberOfShow+5;i++){
            if(eachForShow[i]!=null){
                eachForShow[i].style.display = "flex"
            }
        }
        buttonPrevious.parentNode.setAttribute("data",page);
    }
}
function showFivePost(){
    let sizeOfEach = document.getElementsByClassName("each").length;
    let pageNode = document.getElementById("buttonNext").parentNode;
    page = pageNode.getAttribute("data");
    page++;
    let each = document.getElementsByClassName("each");
    numberOfShow = page*5;
    if(numberOfShow<=sizeOfEach){
        hidenAllOfPost();
        for(let i=numberOfShow;i<numberOfShow+5;i++){
            if(each[i]!=null){
                each[i].style.display = "flex"
            }
        }
        pageNode.setAttribute("data",page);
    }
}
function showPreviousFivePost(){
    let pageNode = document.getElementById("buttonNext").parentNode;
    page = pageNode.getAttribute("data");
    page--;
    let each = document.getElementsByClassName("each");
    numberOfShow = page*5;
    if(numberOfShow>=0){
        hidenAllOfPost();
        for(let i=numberOfShow;i<numberOfShow+5;i++){
            if(each[i]!=null){
                each[i].style.display = "flex"
            }
        }
        pageNode.setAttribute("data",page);
    }
}

function hidenAllOfPost(){
    let each = document.getElementsByClassName("each");
    for(let i=0;i<each.length;i++){
        each[i].style.display = "none"
    }
    return each.length;
}

function showFive(){
    hidenAllOfPost();
    let each = document.getElementsByClassName("each");
    for(let i=0;i<5;i++){
        if(each[i]!=null){
            each[i].style.display = "flex"
        }
    }
}
showFive();
modifyDate();

