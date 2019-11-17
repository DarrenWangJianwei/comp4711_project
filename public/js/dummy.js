
function getLastestDiscussionDate(){
    let dicussion = document.getElementsByClassName('each');
    let url = "/user/discussion"
    for(let i=0;i<dicussion.length;i++){
        let post_id = dicussion[i].getAttribute("data");
        fetch( url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id:post_id[0]
            })
        })
        .then(response => {
            status = response.status; 
            return response.json();
        })
        .then((result) => {
            setEachContent(result,dicussion[i]);
            setPostTime(result,dicussion[i]);
        })
        .catch(error => console.log('error:', error));
    }
}
function setEachContent(data,currentNode){
    let spanTopic = currentNode.querySelector('.content >span');
    let h4Topic = currentNode.querySelector('.content >h4');
    let pDetail = currentNode.querySelector('.content >p');
    let img = currentNode.querySelector('.img > img')
    spanTopic.textContent = data.topic;
    h4Topic.textContent = data.subject;
    pDetail.textContent = data.details;
    img.setAttribute('src',data.image_url);

}
function setPostTime(data,currentNode){
    let p = currentNode.querySelector('.content > .dateAndReply >p')
    let date = new Date(data.post_date);
    let formatDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    p.textContent = formatDate;
}

function getLastestDiscussionReply(){
    let dicussion = document.getElementsByClassName('each');
    let url = "/user/discussion/reply"
    for(let i=0;i<dicussion.length;i++){
        let post_id = dicussion[i].getAttribute("data");
        fetch( url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id:post_id[0]
            })
        })
        .then(response => {
            status = response.status; 
            return response.json();
        })
        .then((result) => {
            setReplys(result,dicussion[i]);
            addEventListener(dicussion[i]);
        })
        .catch(error => console.log('error:', error));
    }
}
function setReplys(data,currentNode){
    let span = currentNode.querySelector('.content > .dateAndReply > span')
    span.textContent = data.length + " replies";

    let content = currentNode.querySelector('.content > .replys');
    for(let i=0;i<data.length;i++){
        let eachReply = document.createElement('div');
        eachReply.setAttribute("class","eachReply");
        let divImage = document.createElement('div');
        divImage.setAttribute("class",'imgReplier');
        let img = document.createElement('img');
        img.setAttribute("src",data[i].image_url);
        divImage.append(img);
        let replyP = document.createElement('p');
        replyP.textContent = data[i].content;
        eachReply.append(divImage);
        eachReply.append(replyP);
        content.append(eachReply);
    }



}

function addEventListener(currentNode){
    let replys = currentNode.querySelector('.content>.replys');
    replys.style.display = 'none';
    let span = currentNode.querySelector('.content > .dateAndReply >span');
    console.log(span);
    span.addEventListener("click",function(){
        if(replys.style.display=='none'){
            replys.style.display = 'block';
        }else{
            replys.style.display = 'none';
        }
    });
}


function postReply(event){
    console.log(event.target.parentNode.parentNode.parentNode.parentNode);
    let post_id = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data");
    console.log(post_id[0]);
    let userDiv =  document.getElementsByClassName('user');
    let user_id = userDiv[0].getAttribute('data');
    console.log(user_id);
    let comment = event.target.parentNode.parentNode.querySelector('.comment > textarea');
    let commentValue = event.target.parentNode.parentNode.querySelector('.comment > textarea').value;
    if(commentValue == ""){
        return ;
    }
    console.log(commentValue);
    let current = new Date();
    console.log(current);

    let url = "/user/discussion/reply/submit"
    fetch( url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id:post_id[0],
            user_id:user_id,
            comment:commentValue,
            reply_date:current
        })
    })
    .then(response => {
        status = response.status; 
    })
    .then(() => {
        console.log(comment);
        addNewReply(event.target,commentValue);
        comment.value = '';
    })
    .catch(error => console.log('error:', error));
    
}
function addNewReply(node,commentValue){
    console.log("reply Div "+node.parentNode.parentNode);
    let comment = node.parentNode.parentNode.querySelector('.comment')
    let eachReply = document.createElement('div');
    eachReply.setAttribute('class','eachReply');
    let imgReplier = document.createElement('div');
    imgReplier.setAttribute('class','imgReplier');
    let userImg = document.querySelector('.user > img');
    var cln = userImg.cloneNode(true);
    console.log("user img "+cln);
    imgReplier.append(cln);
    let p = document.createElement('p');
    p.textContent = commentValue;
    eachReply.append(imgReplier);
    eachReply.append(p);
    comment.after(eachReply);
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


getLastestDiscussionDate();
getLastestDiscussionReply();
