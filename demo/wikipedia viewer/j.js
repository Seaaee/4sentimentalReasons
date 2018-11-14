;
(function () {
    var close = $('.ekl'),
        form = $('form'),
        input = $("input"),
        search = $("#search"),
        rsts = $("#rsts>ul");

    function clear() {
        rsts.html('')
    }

    close.click(function () {

        if (!form.hasClass('open')) {
            form.addClass('open')
            rsts.removeClass('open')
            input.css({
                "opacity": 1
            })
            input.focus();
        } else {
            if (input.val()!= "") {
                input.val("");
            } else {
                setTimeout(function(){
                    clear();
                },800)
                form.removeClass("open")
                rsts.addClass('open')
                input.animate({
                        opacity: 0
                    },
                    300,
                    function () {
                        input.val('')
                    }
                )
                search.addClass('fullHeight')
            }
        }
    })

    form.submit(function () {
        if (search.hasClass('fullHeight')) {
            search.removeClass('fullHeight');
        }
        clear()
        var title = input.val();
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var page = 'https://en.wikipedia.org/?curid=';
        $.ajax({
            url: api + title,
            type: "GET",
            dataType: "JSONP",
            success: function (r) {
                var res = r.query.pages;
                for (var ll in res) {
                    var item = res[ll]
                    var pageid = page + item.pageid,
                        tit = item.title,
                        p = item.extract
                    li = '<li><a target="_blank" href="' + pageid + '"><h1>' + tit + '</h1><p>' + p + '</p></a></li>';
                    rsts.append(li);
                }
            }
        })

        return false;
    })
}())