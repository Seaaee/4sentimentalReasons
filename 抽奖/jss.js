/**
 * Created by 10537 on 2017/9/13.
 */

var data=['iPhone X','$_$','1t毛片','乃格兰一次','北京二环大宅子','求也没有','范冰冰一个','杜蕾斯一箱',"McDonald's 开心乐园餐一份",'全套五年高考三年模拟'],
    timer=null,
    flag=0;

window.onload=function() {
    var play = document.getElementById('play'),
        stop = document.getElementById('stop');
    play.onclick = playfun;
    stop.onclick= stopfun;
    //
    document.onkeyup=keyfun;
    //
    function keyfun(event){
        event=event||window.event;
        if(event.keyCode==13){
            if(flag==0){
                playfun();
                flag=1;
            }else{
                stopfun();
                flag=0;
            }
        }
    }

    function playfun(){
        var title = document.getElementById('title');
        clearInterval(timer);
        timer=setInterval(function(){
            var random=Math.floor(Math.random()*data.length);
            title.innerHTML=data[random];
        },0)
        play.style.background='red';
    }

    function stopfun(){
        clearInterval(timer);
        play.style.background='#036';
    }

}

