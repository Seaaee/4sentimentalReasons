$(function () {
    'use strict';

    /*选中页面中所有的input[data-rule]*/

    var $inputs=$('[data-rule]') /*选中所有input*/
        , inputs=[]
        , $form= $('#signup')


    $inputs.each(function(index,node){
        // console.log('index,node', index,node )
        // 将所有选中的input                         
        //所有selector交给input.js new 一个 Input
        inputs.push(new Input(node))
    })
    // console.log(inputs)
    // console.log($inputs)
    $form.on('submit',function(e){
        e=event||window.event
        e.preventDefault()
        $inputs.trigger('blur')
    })
});

