


// Vue从创建Vue实例开始
// VM (view-model)
// let vm=new Vue({// 选项对象})

//  Vue 实例被创建时，
// 它向 Vue 的响应式系统中加入了其 data 对象中所有属性。
// 当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
let data={a:1}

let vm=new Vue({
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
