function getByClass(clsName,parent){
    var oParent=parent?document.getElementById(parent):document,
        eles=[],
        elements=oParent.getElementsByTagName('*');
    for(var i= 0,l=elements.length;i<l;i++){
        if(elements[i].className==clsName) {
            eles.push(elements[i]);
        }
    }
    return eles;
}


window.onload=drag;

function drag(){
    var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
    oTitle.onmousedown=fnDown;
    var oClose=document.getElementById('ui_boxyClose');
    oClose.onclick=function(){
        document.getElementById('loginPanel').style.display='none';
    }
    var loginState=document.getElementById('loginState'),
        stateList=document.getElementById('loginStatePanel'),
        lis=stateList.getElementsByTagName('li'),
        stateTxt=document.getElementById('login2qq_state_txt'),
        loginStateShow=document.getElementById('loginStateShow');
    loginState.onclick=function(e){
        e=e||window.event;
        if(e.stopPropagation){e.stopPropagation();}
        else{e.cancelBubble=true;}
        stateList.style.display='block';
    }
    for(var i= 0,l=lis.length;i<l;i++){
        lis[i].onmouseover=function(){
            this.style.background='#567';
        }
        lis[i].onmouseout=function(e){
            this.style.background="#fff";
        }
        lis[i].onclick=function(e){
            var id=this.id;
            e=e||window.event;
            if(e.stopPropagation){e.stopPropagation();}
            else{e.cancelBubble=true;}
            stateList.style.display='none';
            stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
            loginStateShow.className='';
            loginStateShow.className='login-state-show '+id;
        }
    }
    document.onclick=function(){
        stateList.style.display='none';
    }
}

function fnDown(event){
    event=event||window.event;
    var oDrag=document.getElementById('loginPanel'),
        disX=event.clientX-oDrag.offsetLeft,
        disY=event.clientY-oDrag.offsetTop;
    document.onmousemove=function(event){
        event=event||window.event;
        fnMove(event,disX,disY);
    };
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    }
}

function fnMove(event,posX,posY){
    var oDrag=document.getElementById('loginPanel'),
        l=event.clientX-posX,
        t=event.clientY-posY,
        winW=document.documentElement.clientWidth || document.body.clientWidth,
        winH=document.documentElement.clientHeight || document.body.clientHeight,
        maxW=winW-oDrag.offsetWidth,
        maxH=winH-oDrag.offsetHeight;
    if(l<0){l=2;}else if(l>maxW){l=maxW-10;}
    if(t<0){t=7;}else if(t>maxH){t=maxH-5;}
    oDrag.style.left=l+'px';
    oDrag.style.top=t+'px';
}