/*
    base 스크립트
    PJH
*/

$(function(){
  // start
  set_UI();
  Components();

})  


   
/*---------------------------------------------------------------
    @Settings
---------------------------------------------------------------*/
function set_UI(){
  $window		= $(window);
  $document	= $(document);
  $html		= $('html');
  $body		= $('body');
  $html_body	= $('html, body');
  $wrapper	= $('#wrap');
  $header		= $('header');
  $footer		= $('footer');
}

/*---------------------------------------------------------------
  @Components Settings
---------------------------------------------------------------*/
function Components(){
  tabFn(); //one_tab 
  pagingFn();
  AQFn();
  designDatepicker(); //Datepicker
  popupFn();
  toolTipFn();
  swichBtnFn(); //switch toggle
  scrolltopFn(); //scrolltop
  theadFixFn();
  gnbDropDownFn();
  gnbFullDownFn();
  fileaddFn();
  accodianFn();
  mobilegnbFn();
  navFn();
  timebFn();
  mainnotice();
  smallbtn();
}   

/*---------------------------------------------------------------
  @Components area
---------------------------------------------------------------*/     
function tabFn(){
  
  var $item = $(".tabarea");

  // tabarea는 여러개 each 돌리고
  $item.each(function(depth01){

    // 기본 변수 셋팅
    var _this = $(this);
    var lis = _this.find("> .tablist > li ");
    var tablistbtn = _this.find("> .tablist > li > .btn");
    var tabarea_infoDiv = _this.find("> .tabarea_info > div");

    // 기본 속성 셋팅
    _this.attr({
      "role" : "tablist",
      "aria-label" : "Sample Tabs"
    });
    tablistbtn.attr({
      "role" : "tab",
      "aria-selected" : "false",
      "tabindex" : "0"
    });
    tabarea_infoDiv.attr({
      "role" : "tabpanel",
      "tabindex" : "0",
    });

    // li idx 를 위해 each 돌리고
    lis.each(function(idx){
      // 내가 원하는 변수인 idx 대입 순서 찾고
      var tab = "tab-" + depth01 + "-" + idx;
      var panel = "panel-" + depth01 + "-" + idx;

      var _this = $(this);
      
      _this.find(".btn").attr({
        "aria-controls" : panel,
        "id" : tab
      });

      // div밑에가 아니니 li idx 가져와서 eq()번째 바꾸고
      tabarea_infoDiv.eq(idx).attr({
        "id" : panel,
        "aria-labelledby" : tab
      });

    });

    tabarea_infoDiv.prop("hidden","false");

    // *************************** 위는 셋팅 아래부터 로직

    publicFn();

    // 공통로직
    function publicFn(id){
      
      // id 없으면 첫번째꺼 열리도록
      if( id === undefined){
        var id = lis.eq(0).addClass("on").find(".btn").attr("id");
      }else {
        var target1 = _this.find("> .tablist > li.on");
        var targetattr = target1.find(".btn").attr("id");
        // tab제목
        target1.removeClass("on").find(".btn").attr("aria-selected","false");
        $("[aria-labelledby|=" + targetattr + "]").removeClass("on").prop("hidden","false");
      }

      // tab 제목 - 기본셋팅
      $("[id|=" + id + "]").attr("aria-selected","true").parent().addClass("on");
      
      // div 탭내용 - 기본셋팅
      $("[aria-labelledby|=" + id + "]").addClass("on").removeProp("hidden");;
    } 

    // 클릭했을경우
    tablistbtn.on("click",function(){
      var thisID = $(this).attr("id");
      publicFn(thisID);
    });

  });
}

function pagingFn(){
  var $item = $(".paging ul li.num a");

    if( !$item.length ) return;
    
    $item.on("click",function(){
        $(this).parent().addClass("on").siblings().removeClass("on");
        return false;
    });
}

function AQFn(){
    var $item = $(".QAarea li a");

    if( !$item.length ) return;
    
    $item.on("click",function(){
        $(this).next().stop().slideToggle().parent().toggleClass("on");
        $(this).parent().siblings().find(".answer").slideUp().parent().removeClass("on");
        return false;
    });
}
    
function designDatepicker(){
    if(!($('.datepicker').length > 0)) return;

    $(".datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true
    });
}

function popupFn(){
  var $item = $(".modalbtn");
  var modal = $(".popupwrap");

  $item.each(function(){
    $item.on("click",function(){

      var id = $("#" + $(this).data("modalid"));
      
      modal.each(function(){
        if( modal.length ){
          id.removeClass("display");
          $("html").css({
            "overflow" : "hidden",
          });
          var closebtn = $(".popupclose");
          closebtn.on("click",function(){
            id.addClass("display");
            $("html").css({
              "overflow" : "auto",
            });
          });
        }
      });
    });
  });
}

function toolTipFn(){
  var $item = $(".tooltipFn");
  
  $item.each(function(){
    if ( $item.length ){
      var titlevalue = $(this).attr('titlename');
  
      $(this).append('<div class="tooltipninfo">' + titlevalue + '</div>');

      var match_w = $(this).find(".tool span").width();
      var match_h = $(this).outerHeight();

      var tooltipinfo = $(this).find(".tooltipninfo");
      tooltipinfo.css({
        "width" : match_w,
      });

      if( titlevalue == 'left_tool' ){
        tooltipinfo.css({
          "left" : - ( match_w + 10 ),
        });
      }else if ( titlevalue == 'right_tool' ){
        tooltipinfo.css({
          "right" : - ( match_w + 10 ),
        });
      }else if ( titlevalue == 'top_tool' ){
        tooltipinfo.css({
          "top" : - (match_h - 3),
        });
      }else if ( titlevalue == 'bottom_tool' ){
        tooltipinfo.css({
          "bottom" : - (match_h - 3),
        });
      }
    }

    $item.on("mouseover",function(){
      var tooltipinfo = $(this).find(".tooltipninfo");
      tooltipinfo.css({
        "display" : "block"
      });
    });

    $item.on("mouseleave",function(){
      var tooltipinfo = $(this).find(".tooltipninfo");
      tooltipinfo.css({
        "display" : "none"
      });

    });
  });
}

function swichBtnFn(){
  var toggle = false;
  var $item = $(".switch label");
  $item.on("click",function(){
    toggle = !toggle;
    if (toggle == true){
      $item.addClass("on");
    }else {
      $item.removeClass("on");
    }
    console.log(toggle);
  });
}

function scrolltopFn(){
  var $item = $(".scrollTop .btn");
  $item.on("click",function(){
    $html_body.animate({scrollTop:0},600, 'linear');
    return false;
  });
}

function theadFixFn(){
	var checkPar = $(".scroll_wrapper");
	if( !checkPar.length ) return;

	checkPar.each(function(){
		var el = $(this);
		var $item = el.find($("table"));
		var $itemHeight = $item.outerHeight();

		if( $itemHeight > 300 ){
			var fauxTable = el.find($(".faux_wrap"));
			el.find($(".tbl_wrap")).addClass("FIX");

			var clonedElement = $item.clone(); 
			fauxTable.append(clonedElement);
		}
	})
}

function gnbDropDownFn(){
  var $item1 = $(".gnb-dropdown .node1-item"),
      $item2 = $(".gnb-dropdown .node2-item"),
      $item3 = $(".gnb-dropdown .node3-menu");

      if( $item3.length ){
        $item3.parent().addClass("open");
      }

      var setTime = null;
      $item1.not("is-enterd").on("mouseenter focusin", function(){
        //clearTimeout 위에서 실행한 그 함수를 취소할 때 사용
        clearTimeout(setTime);
        $(this).addClass('is-active');
            $(this).siblings().removeClass('is-active');

      }).addClass("is-enterd");
      
      $item1.not("is-leaved").on("mouseleave focusout", function(){
        var $this = $(this);
        //settimeout : 일정 시간이 지난 후에 함수를 실행
        setTime = setTimeout(function(){ $this.removeClass('is-active') });
      }).addClass("is-leaved");

      $item2.not("is-enterd").on("mouseenter focusin", function(){
          //clearTimeout 위에서 실행한 그 함수를 취소할 때 사용
          $(this).addClass('is-active').find(".node3-menu").css("display","block");
          $(this).siblings().removeClass('is-active').find(".node3-menu").css("display","none");
  
      }).addClass("is-enterd");

      $item2.not("is-leaved").on("mouseleave focusout", function(){
          var $this = $(this);
          //settimeout : 일정 시간이 지난 후에 함수를 실행
          setTime = setTimeout(function(){ $this.removeClass('is-active') });
          $item3.css("display","none");
      }).addClass("is-leaved");
      
}

function gnbFullDownFn(){
  var fulldown = $(".gnb-fulldown"),
      node1item = $(".gnb-fulldown .node1-item"),
      node2list = $(".gnb-fulldown .node2-list"),
      node2menu = $(".gnb-fulldown .node2-menu");

      initFn();
      function initFn(){
        var _this = this, setTimeEnter1 = null; setTimeLeave1 = null; setTimeLeave2 = null;
        // 1Depth
        node1item.not('.is-entered').on('mouseenter focusin', function(){
            var $this = $(this);
            clearTimeout(setTimeLeave1); // 포커스가 있으면 타이커 초기화
            setTimeEnter1 = setTimeout(function(){
//              $this.find('> a').attr({'aria-expanded':'true'});
                fulldown.addClass('is-active');
                $this.addClass('is-active').siblings().removeClass('is-active');

                bgFn(); 
                function bgFn(){
                  var $item = node2menu.outerHeight();
                  var node1link_h = $(".node1-link").outerHeight();
                  var match = $item;
                  
                  $(".gnb-bg").css({
                    height: match,
                  });
                }
            },100);
              
        }).addClass('is-entered');
        node1item.not('.is-leaved').on('mouseleave focusout', function(){
            clearTimeout(setTimeEnter1);
            setTimeLeave1 = setTimeout(function(){
                fulldown.removeClass('is-active');
                node1item.removeClass('is-active');
                //$this.find('> a').attr({'aria-expanded':'false'});

                $(".gnb-bg").css({
                  height: 0,
                });

            },100);
        }).addClass('is-leaved');
 
        // 2Depth
        node2list.not('.is-entered').on('mouseenter focusin', function(){
            clearTimeout(setTimeLeave2);
            node2list.removeClass('is-active');
            $(this).addClass('is-active');
        }).addClass('is-entered');
        node2list.not('.is-leaved').on('mouseleave focusout', function(){
            var $this = $(this);
            setTimeLeave2 = setTimeout(function(){
            $this.removeClass('is-active');
            },100);
        }).addClass('is-leaved');
      }
}

function fileaddFn(){
  var $fileBox = null;
  
  $(function() {
    init();
  })
  
  function init() {
    $fileBox = $('.input-file');
    fileLoad();
  }
  
  function fileLoad() {
    $.each($fileBox, function(idx){
      var $this = $fileBox.eq(idx),
          $btnUpload = $this.find('[type="file"]'),
          $label = $this.find('.file-label');
      
      $btnUpload.on('change', function() {
        var $target = $(this),
            fileName = $target.val(),
            $fileText = $label.prev();
        $fileText.val(fileName);
      })
      
      $btnUpload.on('focusin focusout', function(e) {
        e.type == 'focusin' ?
          $label.addClass('file-focus') : $label.removeClass('file-focus');
      })
      
    })
  }
}

function accodianFn(){
  var $item = $(".accodian"),
      $box =  $(".accodian-box > a"),
      info =  $(".accodian-box > div"),
      find = $(".accodian-box .accodian-box > a"),
      etc = $(".sub_accodian");
  var i;

  etc.find(".accodian-box > a").addClass("ano");

  if($item.length){
    if( info.length ){
      var want = info.parent().find(" > a");
      want.addClass("open");
      console.log('asdf');
    }

    for(i=0; i<$box.length; i++){
      $box[i].addEventListener("click", function() {
        var info = $(this).next();
        info.stop().slideToggle();
        $(this).parent().siblings().find("> div").slideUp();
        $(this).toggleClass("change").parent().siblings().find("a").removeClass("change");
        console.log(i)
        if ($(this).hasClass("ano") === true) {
          $(this).parent().siblings().find("> div").stop();
        }
      });
      $box.on("click",function(){
        return false;
      });
    }
  }
  
}


// function accodianFn(){
//   var $item = $(".accodian"),
//       $box =  $(".accodian-box > a"),
//       info =  $(".accodian-box > div"),
//       find = $(".accodian-box .accodian-box > a");
//   var i;

//   $(".lnb").find(".accodian-box > a").addClass("ano");
//   $(".gnbinfo").find(".accodian-box > a").addClass("ano");

//   if($item.length){
//     if( info.length ){
//       var want = info.parent().find(" > a");
//       want.addClass("open");
//       console.log('asdf');
//     }

//     for(i=0; i<$box.length; i++){
//       $box[i].addEventListener("click", function() {
//         var info = $(this).next();
//         info.stop().slideToggle();
//         $(this).toggleClass("change");
//         console.log(i)
//         if ($(this).hasClass("ano") === true) {
//           $(this).parent().siblings().find("> div").slideUp().stop();
//           $(this).toggleClass("change").parent().siblings().find("a").removeClass("change");
//         }
//       });
//       $box.on("click",function(){
//         return false;
//       });
//     }
//   }
  
// }



function mobilegnbFn(){
  var $item = $(".M_open_btn .m_open");
  var $mobliepop = $(".M_gnb");
  var $overlay = $(".moverlay");
  var $close = $(".m_close");
  
    $item.on("click",function(){
      $(this).addClass("open");
      $(this).parent().parent().parent().next().addClass("open");
      $overlay.addClass("open");
    });
    $close.on("click",function(){
      $item.removeClass("open");
      $overlay.removeClass("open");
      $mobliepop.removeClass("open");
    });
}

function navFn(){
  var $item = $('.lnb_wrap .inr > ul > li > a');
  $item.on("click",function(){
    $(this).next().stop().slideToggle();
    $(this).parent().toggleClass('open');
    $(this).parent().siblings().removeClass('open').find(".depth02").slideUp();
  });
}

function timebFn(){
  var $item = $(".time .btn");

  $item.on("click",function(){
    $(this).addClass("on").siblings().removeClass("on");    
  });
}

function mainnotice(){
  var $item = $(".usernotice");
  var $usernoticemodal = $(".usernotice-modal");

  $item.on("click",function(){
    $usernoticemodal.toggleClass("open");
  });
}

// add
function smallbtn(){
  var $item = $(".smallbtn li");

  $item.find("a").on("click",function(){
    $(this).parent().toggleClass("on");
  });

  var location = $(".mappicker a");

  location.on("click",function(){
    $(this).parent().toggleClass("on");
  });

  var selectbtn = $(".selectbtn a");
  selectbtn.on("click",function(){
    $(this).parent().toggleClass("on");
  });

  var opener = $(".openclose");
  opener.on("click",function(){
    $(this).parent().toggleClass("on");
  });

  
}