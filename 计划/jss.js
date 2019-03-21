;(function(){
    'use strict'




    var Event=new Vue()


    Vue.component('task',{
        template:'#task-tpl',
        props:['goingtodo'],
        methods:{
            action:function(name,params){
                Event.$emit(name,params)
            }
        }
    })


    new Vue({
        el:'#main',
        data:{
            list:[],
            current:{
                detail:false
            },
        },
        mounted:function(){
            this.list=ms.get('list')||this.list
            var me=this
            setInterval(function(){
                me.check_alerts();
            },1000)

            Event.$on('remove',function(id){
                if(id)
                me.remove(id)
            })
            Event.$on('toggle_completed',function(id){
                if(id)
                me.toggle_completed(id)
            })
            Event.$on('gengxin',function(id){
                if(id)
                me.gengxin(id)
            })
            Event.$on('toggle_detail',function(id){
                if(id)
                me.toggle_detail(id)
            })
        }
        ,
        watch:{
            list:{
                deep:true,
                handler:function(n,o){
                    if(n){
                        ms.set('list',n)
                    }
                }
            }
        }
        ,
        methods:{


            check_alerts:function(){
                var me=this
                this.list.forEach(function(item,i){
                    var alert_at=item.alert_at;
                    if(!alert_at || item.alert_comfirmed)return;
                    alert_at= (new Date(alert_at)).getTime()
                    var now=(new Date()).getTime()
                    if(now>=alert_at){
                        var confirmed=confirm(item.title)
                        Vue.set(me.list[i],'alert_comfirmed',confirmed)
                    }
                })
            }
            ,
            add:function(){
                var id=this.current.id;
                if(id){
                    this.current.detail=true;
                    var item=this.find_index_by_id(id)
                    Vue.set(this.list,item,Object.assign({},this.current))
                }

                else{
                    var title=this.current.title;
                    if(!title&& title!==0)return
                    var sthtodo=Object.assign({},this.current)
                    sthtodo.id=this.get_id()
                    this.list.push(sthtodo)
                }
                this.reset_current()
            },

            remove:function(i){
                var index=this.find_index_by_id(i)
                this.list.splice(index,1)
            },






            get_id:function(){
                return Math.round(Math.random()*100)
            },
            gengxin:function(todo){
                this.current=Object.assign({},todo)
                this.current.detail=true;
            },
            reset_current:function(){
                this.current={}
            },
            find_index_by_id:function(id){
                return this.list.findIndex(function(item){
                    return item.id==id
                })
            },
            toggle_completed:function(id){
                var i=this.find_index_by_id(id)
                Vue.set(this.list[i],'completed',!this.list[i].completed)
            },
            toggle_detail:function(id){
                var index=this.find_index_by_id(id)
                Vue.set(this.list[index],'show_detail',!this.list[index].show_detail)
            },
            false_detail:function(){
                this.current.detail=false;
            }

        }
    })
})()
