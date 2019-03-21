/**
 * Created by Vvv on 2017/9/15.
 */


function mOve(obj,json,fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var flag=true;
        for(var stty in json){
            var curr=0;
            if(stty=='opacity'){
                curr=Math.round(parseFloat(getStyle(obj,stty))*100);
            }
            else{
                curr=parseInt(getStyle(obj,stty));
            }

            //速度计算
            var speed=0;
            speed=(json[stty]-curr)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            //判断停止
            if(curr!=json[stty]){flag=false;}

            //变化
            if(stty=='opacity'){
                obj.style.opacity=(curr+speed)/100;
            }
            else{
                obj.style[stty]=curr+speed+'px';
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(fn){fn();}
        }
    },30)
}



function getStyle(obj,sty){
    if(obj.currentStyle){
        return obj.currentStyle[sty];//IE里面是属性
    }
    else{
        return getComputedStyle(obj,false)[sty];//火狐里面这是方法
    }
}