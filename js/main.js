/**
 * Created by Administrator on 2017/5/20.
 */
//$(function());简写
$(document).ready(function(){
    /**
     * 响应式布局页面
     */
    function resize(){
        //获取屏幕宽度
        var screenSize = $(window).width();
        //console.log(screenSize);
        var smallScreen = screenSize < 768;
        //根据屏幕设置item图片
        $("#slider .carousel-inner > .item").each(function(i,item){
            var $item = $(item);
            var imgSrc = smallScreen ? $item.data("img-sm") : $item.data("img-lg");
            //console.log(imgSrc);
            $item.css('backgroundImage',"url('" + imgSrc + "')");
            //当小图片时用img标签
            if(smallScreen){
                $item.html('<img src="' + imgSrc + '"/>');
            }else {
                $item.empty();
            }
        });

        // 标签选项横向滚动条
        var tabUl = $("#product .nav-tabs");
        var ulWidth = 30; // 加上ul原本的paddingleft（box-sizing: border-box;）
        tabUl.children().each(function(i,li){
            ulWidth = ulWidth + li.clientWidth; // $(li).width(); li.clientWidth
        });
        //console.log(ulWidth);
        // 判断当ulwidth大于屏幕宽度时出现横向滚动条
        if(ulWidth > $(window).width()){
            tabUl.css('width',ulWidth)
                .parent().css('overflow-x','scroll');
        }else {
            tabUl.css('width','')
                .parent().css('overflow-x','');
        }
    }
    $(window).on("resize",resize).trigger("resize");

    /**
     * 初始化tooltip插件
     */
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * news上a点击注册获取title
     */
    $("#news .nav a").on('click',function(){
        $this = $(this);
        var title = $this.data('title');
        $(".newsTitle").text(title);
    });

   /**
    *  触摸手机屏幕轮播图滑动
    */
    var carousel = $(".carousel");
    //获取触摸屏幕时的x位置
    var startX;
    carousel.on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
        //console.log(startX);
    });
    //获取触摸移动结束时的x
    var endX;
    carousel.on('touchmove',function (e){
        endX = e.originalEvent.touches[0].clientX;
        //console.log(endX);
    });
    //触摸结束后判断移动方向
    carousel.on('touchend',function(e){
        var moveDt = Math.abs(endX - startX);
        if (moveDt > 50){
            endX - startX > 0 ? $(this).carousel('prev') : $(this).carousel('next');
        }

    });
});
