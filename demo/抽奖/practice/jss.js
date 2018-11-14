/**
 * Created by 10537 on 2017/9/13.
 */
window.onload=function(){
    var box=document.getElementById('divselect'),
        title=document.getElementById('title'),
        list=document.getElementById('list'),
        li=document.getElementsByTagName('li'),
        index=-1;

    title.onclick=function(e){
        e=event||window.event;
        if(e.stopPropagation){e.stopPropagation();}
        else{e.cancelBubble=true;}
        list.style.display='block';
        document.onkeyup=function(e){
            e=event||window.event;
            for(var i=0;i<li.length;i++){li[i].style.background='none';}
            if(e.keyCode==40){
                index++;
                if(index>=li.length){
                    index=0;
                }
                li[index].style.background='#ccc';
            }
            if(e.keyCode==38){
                if(index<=0){index=li.length}
                index--;
                li[index].style.background='#ccc';
            }
            if(e.keyCode==13 && index!=-1){
                title.innerHTML=li[index].innerHTML;
                list.style.display='none';
                index=-1;
            }
        }


        for(var i=0;i<li.length;i++){
            li[i].onmouseover=function(){this.style.background='#ccc';}
            li[i].onmouseout=function(){this.style.background='none';}
            li[i].onclick=function(){title.innerHTML=this.innerHTML;}
        }
    }


    document.onclick=function(){
        list.style.display='none';
    }


}