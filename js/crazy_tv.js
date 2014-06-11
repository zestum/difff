$(document).ready(function(){ 
    var frames = {
        "eyes": 
            [
                "http://difff.ru/media/gallery/glr_701_image.png",
                "http://difff.ru/media/gallery/glr_702_image.png",
                "http://difff.ru/media/gallery/glr_703_image.png",
                "http://difff.ru/media/gallery/glr_704_image.png"
            ],
            
        "mouth": 
            [
                "http://difff.ru/media/gallery/glr_697_image.png",
                "http://difff.ru/media/gallery/glr_698_image.png",
                "http://difff.ru/media/gallery/glr_699_image.png",
                "http://difff.ru/media/gallery/glr_700_image.png"
            ],
            
        "env":
            [
                "http://difff.ru/media/gallery/glr_705_image.png",
                "http://difff.ru/media/gallery/glr_706_image.png",
                "http://difff.ru/media/gallery/glr_707_image.png",
                "http://difff.ru/media/gallery/glr_708_image.png"
           ]
    } 
    
    $('#carousel_posncrop').children().each(function(){
        frame_class = $(this).attr('class').replace("carousel ", "");
        shuffle(frames[frame_class]);
        var cnt = '<ul class="images">';
        for (var i = frames[frame_class].length; i--;)
        {
            cnt += '<li><img src="'+frames[frame_class][i]+'" /></li>';
        }
        cnt += '</ul>';
        $('div.carousel.'+frame_class).html(cnt);
        $('div.carousel.'+frame_class+' ul.images li:first').before($('div.carousel.'+frame_class+' ul.images li:last'));
    });
    
    var wdth = 593;
    var dir = ["right", "left"];
    var layers = new Array();
    for (var key in frames) {
        if (key === 'length' || !frames.hasOwnProperty(key)) continue;
        layers.push(key);
    }
    
    timer = setInterval(function(){
        frame_class_name = layers[getRandomInt (0,(layers.length-1))];
        frame_class = '.'+frame_class_name+' ul.images';
        direction = dir[getRandomInt (0,1)];
        direction_class = ".controller_cont ."+frame_class_name+' .'+direction+'_move';
        $(direction_class).addClass('hover_effect').delay(300).queue(function(){
            $(this).removeClass('hover_effect').dequeue();
        });
        turn(direction, frame_class);
    }, 5000);
    
     $('.controller span').bind('touchend mouseup', function (e) {
        e.preventDefault();
        $(this).removeClass('hover_effect');
     });
    
     $('span.left_move').bind('touchstart mousedown', function (e) {
        clearInterval(timer);
        e.preventDefault();
        $(this).addClass('hover_effect');
        layer_name = "."+$(this).parent().attr("class").replace("controller ", "")+" ul.images";
        turn ("left", layer_name);
    }); 
    
    $('span.right_move').bind('touchstart mousedown', function (e) {
        clearInterval(timer);
        e.preventDefault();
        $(this).addClass('hover_effect');
        layer_name = "."+$(this).parent().attr("class").replace("controller ", "")+" ul.images";
        turn ("right", layer_name);
    });  
    
    /////////////////////////////////////
    //                                 //
    //        функционал карусели      //
    //                                 //
    /////////////////////////////////////
    
    function turn(dir, layer_name) {
        if (dir == "right"){
            if(!$(layer_name).is(':animated')){
                var left_margin = parseInt($(layer_name).css('margin-left'))+wdth;
                $(layer_name).animate({"margin-left": left_margin+"px"}, 500, 'swing', function() {
                    $(layer_name+' li:first').before($(layer_name+' li:last'));
                    $(layer_name).css({"margin-left": "-"+wdth+"px"})
                });
            }
        } else if (dir == "left") {
            if(!$(layer_name).is(':animated')){
                var left_margin = parseInt($(layer_name).css('margin-left'))-wdth;
                $(layer_name).animate({"margin-left": left_margin+"px"}, 500, 'swing', function() {
                    $(layer_name+' li:last').after($(layer_name+' li:first'));
                    $(layer_name).css({"margin-left": "-"+wdth+"px"})
                });
            }
        }
    }
    
    /////////////////////////////////////
    
    function shuffle(arr) {
        return arr.sort(function() {return 0.5 - Math.random()});
    }
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    $("#tv_frame").show("fast");
    styles = '.carousel {width:593px;height:497px;position:absolute;top:210px;left:270px;z-index:-1;overflow:hidden;}';
    styles += '.carousel ul {list-style-type:none;border:1px solid #666;position:relative;padding:0;margin:0;width:400%;margin-left:-593px;border:none;}';
    styles += '.carousel ul li {display:inline-block;float:left;text-align:center;padding:0;margin:0;width:593px;margin-top:20px;border:none;}';
    styles += '.controller {position:absolute;height:74px;width:158px;left:45px;}';
    styles += '.controller:hover {cursor:pointer;}';
    styles += '.controller.eyes {top:280px;}';
    styles += '.controller.mouth {top:440px;}';
    styles += '.controller.env {top:610px;}';
    styles += '.controller span.left_move {background:url(http://difff.ru/media/gallery/glr_692_image.png) no-repeat center;float:left;height:74px;width:79px;display:inline-block;}';
    styles += '.controller span.left_move:hover {background:url(http://difff.ru/media/gallery/glr_690_image.png) no-repeat center;}';
    styles += '.controller span.left_move.hover_effect {background:url(http://difff.ru/media/gallery/glr_691_image.png) no-repeat center;}';
    styles += '.controller span.right_move {background:url(http://difff.ru/media/gallery/glr_695_image.png) no-repeat center;float:right;height:74px;width:79px;display:inline-block;}';
    styles += '.controller span.right_move:hover {background:url(http://difff.ru/media/gallery/glr_693_image.png) no-repeat center;}';
    styles += '.controller span.right_move.hover_effect {background:url(http://difff.ru/media/gallery/glr_694_image.png) no-repeat center;}';
    styles += '.hover {-webkit-user-select: none;-webkit-touch-callout: none;}';
    
    $('head').append('<style type="text/css">'+styles+'</style>');
	//difff.ru local page template override
	$('.carousel ul li').css('background','none');
	$('.carousel ul').css('padding','0');
	$('.carousel ul').css('margin-left','-593px');
	$('.carousel ul li').css('padding','0');
	$('.carousel ul li').css('margin-left','0');
	$('.carousel ul li').css('text-align', 'center');
})