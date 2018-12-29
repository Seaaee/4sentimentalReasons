let app=new Vue({
    el:'#app',
    data:{
        message: 'Hello Vue ',
        messageB: '页面加载于 ' + new Date().toLocaleString(),
        seen:true,
        theNames:[
            {text:'John 　　　Lennon'},
            {text:'Paul McCartney'},
            {text:'George Harrison'},
            {text:'Ringo Starr'}
        ]
    },
    methods:{
        reverseMess:function(){
            this.message=this.message.split('').reverse().join('')
        }
    }
})
