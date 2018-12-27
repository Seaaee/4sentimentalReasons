let app=new Vue({
    el:'#app',
    data:{
        message: 'Hello Vue  ' ,
        messageB: '页面加载于  ' + new Date().toLocaleString(),
        seen:true,
        theNames:[
            {text:'John Lennon'},
            {text:'Paul McCartney'},
            {text:'George Harrison'},
            {text:'Ringo Starr'}
        ]
    }
})
//   这不对
// console.log(app.data.seen)
//   
//   得这的
// console.log(app.seen) 正确访问姿势