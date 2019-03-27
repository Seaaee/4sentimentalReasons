import _ from 'lodash';
import css from './ll.css';
import qqq from './qqq.js';
import $ from 'jquery'
(function(){

var colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"
  ];
  
  function getQuote() {
    var currentQuote = "",
      currentAuthor = "";
    $.ajax({
      headers: {
        "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=",
      success: function(r) {
        // if (typeof r === "string") {
        //   console.log(r)
        //   r = JSON.parse(r[0]);
        // }
        r=r[0]
        currentQuote = r.quote;
        currentAuthor = r.author;
        $(".quote-text").animate(
          {
            opacity: 0
          },
          500,
          function() {
            $(this).animate(
              {
                opacity: 1
              },
              500
            );
            $("#text").text(r.quote);
          }
        );
  
        $(".quote-author").animate(
          {
            opacity: 0
          },
          500,
          function() {
            $(this).animate(
              {
                opacity: 1
              },
              500
            );
            $("#author").text(r.author);
          }
        );
        // var color = Math.floor(Math.random() * colors.length);
        let color =_.sample(colors)
        $("html body").css("background-color",color)
        $("html body").css("color",color)
        $(".button").css("background-color", color
        );
      }
    });
  }

    getQuote();
    $("#new-quote").on("click", getQuote);


  
}());