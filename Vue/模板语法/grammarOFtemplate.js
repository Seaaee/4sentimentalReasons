/**
 * <h1>插值
 *      
 *      #文本
 *          Mustache语法 
 *          <span>{{msg}}</msg>
 *          绑定的数据对象上msg属性发生改变 差指处内容都会更新
 * 
 *          通过v-once指令也能执行一次性插值 数据改变时差指处内容不会改变
 *          
 *      #原始HTML
 *          双大括号会解释为普通文本非HTML代码（比如&nbsp;）
 *          v-html指令
 *             Using mustaches: {{rawHtml}}
 *             Using v-html directive:<span v-html="rawHtml"></span>
 * 
 * 
 */