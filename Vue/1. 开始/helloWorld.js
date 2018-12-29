
Vue.component('todo-item',{
    // 组件接受prop 灵活起来
    // 相当于arguments 
    props:['todo'],
    template:'<li>{{ todo.text }}</li>'
})



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
        ],
        componentList:[
            {id:0,text:'张学友'},
            {id:1,text:'刘德华'},
            {id:2,text:'黎明'},
            {id:3,text:'郭富城'}
        ]
    },
    methods:{
        reverseMess:function(){
            this.message=this.message.split('').reverse().join('')
        }
    }
})
