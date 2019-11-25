
function modifyDateOnMessagePage(){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let recentMessageDate = document.getElementsByClassName('recentMessageDate');
    for(let i=0;i<recentMessageDate.length;i++){
        let date = recentMessageDate[i].textContent;
        let temp = new Date(date);
        let format = month[temp.getMonth()]+" "+temp.getDate();
        recentMessageDate[i].textContent = format;
    }
}

function modifyDateOnMessagePage1(){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let eachMessage = document.getElementsByClassName('eachMessage');
    for(let i=0;i<eachMessage.length;i++){
        let spanDate = eachMessage[i].querySelector('h4>span')
        let date = spanDate.textContent;
        let temp = new Date(date);
        let format = month[temp.getMonth()]+" "+temp.getDate();
        spanDate.textContent = format;
        
        let spanTime = eachMessage[i].querySelector('.p-name span')
        let hours = temp.getHours();
        
        let minutes = temp.getMinutes();
        let AmOrPm = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        spanTime.textContent = " - " + hours + ":" + minutes + " " + AmOrPm; 
        
    }
}


modifyDateOnMessagePage();
modifyDateOnMessagePage1();