$(document).ready(function() {
    $(window).on("load", function() {
        imglocation();
        var dataImg = {
            "data": [{
                "src": "1.jpg"
            }, {
                "src": "2.jpg"
            }, {
                "src": "3.jpg"
            }, {
                "src": "4.jpg"
            }, {
                "src": "5.jpg"
            }]
        };
        window.onscroll = function() {
            if (scrollside()) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);
                });
                imglocation();
            }
        };
    });
});

function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
}

function imglocation() {
    var box = $(".box");
    var xc = $(".box").offset().top;
    var boxwidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxwidth);
    var boxArr = [];
    box.each(function(index, value) {
        var boxHeight = box.eq(index).height();
        if (index < num) {
            boxArr[index] = boxHeight;
        } else {
            var minboxHeight = Math.min.apply(null, boxArr);
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            $(value).css({
                "position": "absolute",
                "top": minboxHeight + xc,
                "left": box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).height();
        }
    });
}
