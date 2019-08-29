$(function(){
//兑换排行榜
var iMax=2;
  var num=0;
  var timer=null;
  var oli=$('.gold_change li');
  var op=$('.goldtitle');
  var odiv=$('.gold_chge_prt');
  
  odiv.hide();
  $('.gold_chge_on').find('div').show();
  oli.mousemove(function(mevent){
    
    var ev=mevent.currentTarget;
    op.show();
    odiv.hide();
    $(ev).children('.gold_chge_prt').show();
    $(ev).find('.goldtitle').hide();
  })

  tab();
  $('.gold_cor_big li:first').css({'opacity':'1','z-index':'1'});
  
  $('.gold_cor_small li').each(function(i){
    $(this).bind('mouseover',function(){
      
      $('.gold_cor_small li').removeClass('cor_list_on');
      $(this).addClass('cor_list_on');
      $('.gold_cor_big li').eq(i).css({'opacity':'0','z-index':iMax}).animate({opacity:1},500);
      num=i;
      
      iMax++;
    })
  })
  $('.gold_ban').mouseover(function(){
    clearInterval(timer);
  })
  
  $('.gold_ban').mouseout(function(){
    tab();
  })
    function tab(){
    timer=setInterval(function(){
      num++;
      if(num==3)
      {
        num=0;  
      }
      iMax++;
      $('.gold_cor_big li').eq(num).css({'opacity':0,'z-index':iMax}).animate({opacity:1},800)
      $('.gold_cor_small li').removeClass('cor_list_on');
      $('.gold_cor_small li').eq(num).addClass('cor_list_on');
      
    },2400)  
  }
})