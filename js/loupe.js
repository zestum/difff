$(document).ready(function () {
    var $par = $('#loupe_container'),
        $bg = $('#loupe_control'),
        parW = $par.outerWidth(), //500
        parH = $par.outerHeight(), //420
        bgW = $bg.width() / 2, //70
        bgH = $bg.height() / 2, //70
        X, Y, posX, posY;

    $bg.bind({
        'touchstart mousedown': function (e) {
            e.preventDefault();
            shift_x = (e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX) - $(this).offset().left;
            shift_y = (e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY) - $(this).offset().top;
            $bg.bind({
                'touchmove mousemove': function (e) {
                    X = (e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX) - $(this).parent().offset().left;
                    Y = (e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY) - $(this).parent().offset().top;
                    posX = Math.min(Math.max(shift_x, X), parW + shift_x - (bgW * 2)) - shift_x;
                    posY = Math.min(Math.max(shift_y, Y), parH + shift_y - (bgH * 2)) - shift_y;
                    $bg.css({
                        left: posX,
                        top: posY
                    });
                    $("#loupe_control").css({
                        'background-position': '-' + posX + 'px -' + posY + 'px'
                    });
                }
            });
        }
    });

    $bg.bind({
        'touchend mouseup': function (e) {
            $bg.unbind('mousemove touchmove');
        }
    });
});