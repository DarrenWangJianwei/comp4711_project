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
    clearUpDisplayNone();
    let content = document.getElementsByClassName('content');
    for(let i=0;i<content.length;i++){
        let span = content[i].querySelector('span');
        console.log(span.textContent);
        if(select[0].value != span.textContent){
            content[i].parentNode.style.display = 'none';
        }
    }
}
function clearUpDisplayNone(){
    let content = document.getElementsByClassName('content');
    for(let i=0;i<content.length;i++){
        content[i].parentNode.style.display = 'flex';
    }
}

modifyDate();

