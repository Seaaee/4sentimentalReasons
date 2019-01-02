/**
 *  <插值
 *      
 *      #文本
 *          Mustache语法 
 *          <span>{{msg}}</msg>
 *          绑定的数据对象上msg属性发生改变 差指处内容都会更新
 * 
 *          通过v-once指令也能执行一次性插值 数据改变时差指处内容不会改变
 *          
 * 
 * 
 *      #原始HTML
 *          双大括号会解释为普通文本非HTML代码（比如&nbsp;）
 *          v-html指令
 *             Using mustaches: {{rawHtml}}
 *             Using v-html directive:<span v-html="rawHtml"></span>
 *             第一行直接把span标签解析为文本
 *             第二行正确只显示rawHtml 且是红色
 * 
 *          不要用v-html复合局部模板，使用组件
 * 
 * 
 *      #特性
 *          大括号语法没法写HTML属性或者说特性
 *          应该用v-bind指令
 *              <button v-bind='isBtnDisable'></button>
 *              如果isBtnDisable值为 false、null等
 *              则disable特性不会被包含在渲染出来的<button>元素中
 * 
 * 
 * 
 *      #使用JS表达式
 *          在模板中可以
 * 
 */