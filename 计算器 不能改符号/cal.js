'use strict';

var cal = {

  data: {
    showInput: document.getElementById("show-input"),
    preStep: document.getElementById("pre-step"),
    coverIf: false,
    unaryIf:false,
    operatorStack: [],
    operandStack: [],
    operPriority: {
      "+": 0,
      "-": 0,
      "÷": 1,
      "×": 1
    },
    operatorR: {
      "＋": "+",
      "－": "-",
      "÷": "÷",
      "×": "×"
    },
    unaryNote:{
      "±":"negate(",
      "√":"√(",
      "x²":"sqrt(",
      "¹/x":"1/("
    }
  },

  addListener: function () {
    // C
    cal.addEvent(document.getElementById("clear-all"), "click", function () {
      cal.data.showInput.innerText = "0";
      cal.data.preStep.innerHTML = "";
      cal.data.operandStack = [];
      cal.data.operatorStack = []
    })
    // back
    cal.addEvent(document.getElementById("back"), 'click', function () {
      var o = cal.data.showInput.innerHTML;
      cal.data.showInput.innerHTML = o.length > 1 ? o.substring(0, o.length - 1) : "0";
    })
    // CE
    cal.addEvent(document.getElementById("ce"), "click", function () {
      cal.data.showInput.innerHTML = "0";
    })
    //运算键
    var lis = document.getElementsByTagName("button");

    for (var i = 0; i < lis.length; i++) {

      cal.addEvent(lis[i], "click", function () {
        cal.handleKey(this.innerText);
      });
    }
  },





  handleKey: function (value) {

    if (!isNaN(value) || value === "·") cal.numAndPoint(value);
    else {
      var o = cal.data.showInput.innerHTML;
      switch (value) {
        case "±":
          cal.unaryOper(function () {
            if (o === "0")
              return "0"
            else if (o[0] === "-")
              return o.substring(1)
            else
              return "-" + o;
          },"±");
          break;

        case "√":
          cal.unaryOper(function () {
            return Math.sqrt(o, 2);
          },"√")
          break;

        case "x²":
          cal.unaryOper(function () {
            return cal.checkLen(Math.pow(o, 2));
          },"x²")
          break;

        case "¹/x":
          cal.unaryOper(function () {
            if (o === "0"){
              document.getElementById("ce").click()
              return "你怕是个撒子吧";
            } 
            return 1 / o
          },"¹/x")
          break;

        case "％":
          document.getElementById("ce").click()
          cal.data.showInput.innerHTML = "???";
          cal.data.coverIf = true;
          break;
        
        case "÷":
        case "×":
        case "－":
        case "＋":
          value = cal.data.operatorR[value];
          cal.binaryOper(value);
          break;

        case "＝":
          cal.binaryOper("+");
          cal.data.preStep.innerHTML = "";
          cal.data.operandStack = [];
          cal.data.operatorStack = []
          break;
      }

    }


  },


  numAndPoint: function (value) {
    var o = cal.data.showInput.innerText,
      n = o;
    if (o === "0") {
      cal.data.coverIf = true;
    }
    if (cal.data.coverIf) {
      if (value === "·") {
        n = "0.";
      } else {
        n = value;
      }
    } else if (o.length < 12) {
      if (value === "·") {
        if (o.indexOf(".") != -1) return;
        value = ".";
      }
      n += value;
    }
    if(cal.data.unaryIf){
      var pre=cal.data.preStep.innerHTML;
      cal.data.preStep.innerHTML=pre.substring(0,pre.lastIndexOf(" "));
      cal.data.unaryIf=false;
    }
    cal.data.showInput.innerText = n;
    cal.data.coverIf = false;
  },




  unaryOper: function (operation,tor) {
    /*
    *    显示prestep等
    */
    var pre=cal.data.preStep.innerHTML;
    var note=" "+cal.data.unaryNote[tor]+cal.data.showInput.innerHTML+")"
    if(cal.data.unaryIf){
     cal.data.preStep.innerHTML=pre.substring(0,pre.lastIndexOf(" "))+note
    }
    else{
      cal.data.preStep.innerHTML+=note
    }


    cal.data.showInput.innerHTML = operation()
    cal.data.unaryIf=true;
    cal.data.coverIf = true;
  },



  /**
   *  model 1
   *              now
   *      a pre b               
   * 
   * 
   *  model 2
   *        low      high
   *     a        b
   * 
   *          model 2.1
   *                low                nowHigh
   *             a        b PreHigh c
   * 
   *          model 2.2
   *                low                nowLow
   *             a        b PreHigh c                then go to model 1
   * 
   * 
   * 
   * 
   *!!!!!!!!!!!!  bug  符号不能换 
   */
  binaryOper: function (operator) {

    cal.data.operandStack.push(cal.data.showInput.innerHTML - 0);
    var pre = cal.data.operatorStack.pop();

    if (pre) {

      takeAstep(pre, operator)
    }

    cal.data.operatorStack.push(operator);
    if(cal.data.unaryIf){
      cal.data.preStep.innerHTML+=" "+operator
    }else{
      cal.data.preStep.innerHTML += " "+cal.data.showInput.innerHTML + " " + operator
    }

    if (cal.data.operandStack.length == 1) {

      cal.data.showInput.innerHTML = cal.data.operandStack[0]
    }

    cal.data.coverIf = true;
    cal.data.unaryIf=false;






    function takeAstep(pre, now) {

      if (cal.data.operPriority[pre] >= cal.data.operPriority[now]) {
        // model 1
        var b = cal.data.operandStack.pop();
        var a = cal.data.operandStack.pop();
        var res = cal.calExactly(a, b, pre);
        cal.data.operandStack.push(res);


        //model 2.*
        if (cal.data.operatorStack.length >= 1) {

          takeAstep(cal.data.operatorStack.pop(), now)
        }
      } else {

        cal.data.operatorStack.push(pre)
      }


    }



  },




  calExactly: function (a, b, op) {
    op = op + ""
    var toInteger = function (n) {
      var t = {
        num: 0,
        times: 1
      }
      if (Math.floor(n) === n) {
        t.num = n;
        return t;
      }
      var strN = n + "",
        dotPos = strN.indexOf("."),
        len = strN.substring(dotPos + 1).length,
        times = Math.pow(10, len);
      t.times = times;
      t.num = parseInt(n * times + 0.5, 10);
      return t;
    }

    var o1 = toInteger(a)
    var o2 = toInteger(b)
    var n1 = o1.num
    var n2 = o2.num
    var t1 = o1.times
    var t2 = o2.times
    var max = t1 > t2 ? t1 : t2
    var result = null
    switch (op) {
      case '+':
        if (t1 === t2) { // 两个小数位数相同
          result = n1 + n2
        } else if (t1 > t2) { // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2)
        } else { // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2
        }
        return result / max
      case '-':
        if (t1 === t2) {
          result = n1 - n2
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) - n2
        }
        return result / max
      case '×':
        result = (n1 * n2) / (t1 * t2)
        return result
      case '÷':
        return result = function () {
          var r1 = n1 / n2
          var r2 = t2 / t1
          return cal.calExactly(r1, r2, '×')
        }()
    }


  },


  checkLen: function (value) {
    var t = value.toString();
    if (t.length > 11) {
      return value.toPrecision(6).toString()
    }
    return t;
  },


  addEvent: function (ele, name, handler) {
    if (window.addEventListener) {
      ele.addEventListener(name, handler, false);
    } else if (window.attachEvent) {
      ele.attachEvent("on" + name, handler);
    }
  }



}



cal.addListener();