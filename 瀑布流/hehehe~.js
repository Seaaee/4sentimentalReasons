/**
 * Created by 10537 on 2017/9/24.
 */
window.onload=function(){
    waterfall('main','box');
    var dataInt={'data':[{'src':'-605226708.gif'},{'src':'481203786.gif'}]}
    window.onscroll=function(){
        if(checkScrollSlide){
            for(var i=0;i<dataInt.data.length;i++) {
                var oParent = document.getElementById('main')
                var oBox = document.createElement('div')
                oBox.className = 'box'
                oParent.appendChild(oBox)
                var oPic = document.createElement('div')
                oPic.className = 'pic'
                oBox.appendChild(oPic)
                var oImg = document.createElement('img')
                oImg.src = '../img/equal/' + dataInt.data[i].src
                oPic.appendChild(oImg)
            }
            waterfall('main','box');
        }
    }

}
function waterfall(parent,box){
    //将所有box取出来
    var oParent=document.getElementById(parent)
    var oBoxs=oParent.getElementsByClassName(box)
    //计算列数
    var oBoxW=oBoxs[0].offsetWidth
    var cols=5
    oParent.style.cssText='width:'+oBoxW*cols+'px'
    var hArr=[]
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight)
        }else{
            var minH=Math.min.apply(null,hArr)
            var index=getMinhIndex(hArr,minH)
            oBoxs[i].style.position='absolute'
            oBoxs[i].style.top=minH+'px'
            oBoxs[i].style.left=oBoxW*index+'px'
            hArr[index]+=oBoxs[i].offsetHeight
        }
    }

}

function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){return i}
    }
}

function checkScrollSlide(){
    var oParent=document.getElementById('main')
    var oBoxs=document.getElementsByClassName('box')
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop
    var scrollTop=document.documentElement.scrollTop
    var height=document.documentElement.clientHeight
    return (lastBoxH<scrollTop+height)?true:false;
}