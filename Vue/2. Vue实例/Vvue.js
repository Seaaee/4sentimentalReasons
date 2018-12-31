


// Vue从创建Vue实例开始
// let vm=new Vue({// 选项对象})

//  Vue 实例被创建时，
// 它向 Vue 的响应式系统中加入了其 data 对象中所有属性。
// 当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
let data={a:1}

let vm=new Vue({
    el:'#example',
    data:data
})

// vm.a===data.a// =>true

vm.a=2
// data.a// =>2
// 反之亦然
/**
 * 只有当实例创建时data存在的属性才是响应式的
 */
vm.b='hi'
// 不会触发任何视图更新 data.b为undefined
/** 但若初始化data后
 * Object.freeze(data)
 * 改动vm.任意属性 视图不会产生变化
 */


 /**
  *     除了数据属性 
  *     Vue实例还暴露了一些专用属性与方法
  *     ta们都有前缀 '$'
  * 
  *     例如
  *     vm.$data===data
  *     vm.$el===document.getElementById('example')
  * 
  *     vm.$watch('a',function(newValue,oldValue){
  *             //这个回调会在 a发生改变后调用
  *     })
  */


  /**
   *    实例生命周期钩子
   *    比如 created 钩子在实例被创建之后执行代码
   * 
   *    new Vue({
   *        data:{a:1},
   *        created:function(){
   *            console.log('a:'+this.a)
   *        }
   *    })
   *    
   *    还有其他的一些钩子 在生命周期不同时期调用
   *    比如 mounted、updated、destroyed
   */