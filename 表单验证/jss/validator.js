$(function () {
  'use strict';

  window.Validator = function (val, rule) {

    this.is_valid = function (new_val) {
      var key;
      if (new_val !== undefined)
        val = new_val;

      /*如果不是必填项且用户未填写任何内容则直接判定为合法*/
      if (!rule.required && !val)
        return true;

      for (key in rule) {
        /*防止重复检查*/
        if (key === 'required')
          continue;
        var r;
        /*调用rule中相对应的方法*/
        switch (key){
          case 'max':r=validate_max ();break
          case 'min':r=validate_min();break
          case 'maxlength':r=validate_maxlength();break;
          case 'minlength':r=validate_minlength();break;
          case 'numeric':r=validate_numeric();break;
          case'pattern':r=validate_pattern();break;
        }
        if (!r) return false;
      }

      return true;
    }

    function validate_max () {
      pre_max_min();
      return val <= rule.max;
    }

    function validate_min () {
      pre_max_min();
      return val >= rule.min;
    }

    function validate_maxlength() {
      pre_length();
      return val.length <= rule.maxlength;
    }

    function validate_minlength() {
      pre_length();
      return val.length >= rule.minlength;
    }

    function validate_numeric () {
      return $.isNumeric(val);
    }

    function validate_required () {
      var real = $.trim(val);
      if (!real && real !== 0) {
        return false;
      }
      return true;
    }

    function validate_pattern () {
      var reg = new RegExp(rule.pattern);
      return reg.test(val);
    }

    /* 用于完成this.validate_max 或
      this.validate_min的前置工作
    * */
    function pre_max_min() {
      val = parseFloat(val);
    }

    /* 用于完成this.validate_maxlength或
      this.validate_minlength的前置工作
    * */
    function pre_length() {
      val = val.toString();
    }
  }
})
