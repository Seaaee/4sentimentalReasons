/**
 * Created by 10537 on 2017/9/25.
 */

$(window).on('load',function(){
    waterfall();
    var dataInt={'data':[{'src':'-605226708.gif'},{'src':'481203786.gif'}]}
    $(window).on('scroll',function(){
        if(checkScrollSlide){
            $.each(dataInt.data,function(key,value){
                var Obox=$('<div class="box">').appendTo($('#main'))
                var Opic=$('<div class="pic">').appendTo($(Obox))
                $('<img>').attr('src','../img/equal/'+$(value).attr('src')).appendTo(Opic)
            })
            waterfall();
        }
    })
})

function waterfall(){
    var $boxs=$('#main>div')
    var cols=5
    var w=$boxs.eq(0).outerWidth()
    $('#main').width(w*cols).css('margin','0 auto')
    var hArr=[]
    $boxs.each(function(index,value){
        var h=$boxs.eq(index).outerHeight()
        if(index<cols){
            hArr[index]=h
        }else{
            var minH=Math.min.apply(null,hArr)
            var minHIndex= $.inArray(minH,hArr)
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px'
            })
            hArr[minHIndex]+=h
        }
    })
}

function checkScrollSlide(){
    var $lastBox=$('#main>div').last()
    var lastBoxDis=$lastBox.offset().top
    var scrollTop=$(window).scrollTop()
    var documentH=$(window).height()
    return(lastBoxDis<scrollTop+documentH)?true:false
}