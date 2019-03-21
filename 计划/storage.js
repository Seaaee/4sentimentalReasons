/**
 * Created by Vvvv on 2017/11/3.
 */
;(function(){

    window.ms={
        set:set,
        get:get
    };

    function set(key,val){
        localStorage.setItem(key,JSON.stringify(val))
    }
    function get(key){
        var json=localStorage.getItem(key)
        if(json){
            return JSON.parse(json)
        }
    }

})()