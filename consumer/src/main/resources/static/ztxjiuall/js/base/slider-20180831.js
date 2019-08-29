function couponSlider(num){
    var $selectedProd=$('.selectedProd'),
        $prevBtn = $selectedProd.find(".prodPrev"),
        $nextBtn = $selectedProd.find(".prodNext"),
        $bigUl = $selectedProd.find("ul"),
        liWidth =  231;
    liNum = num;
    marginLeft = 17;
    currentPage = 0;
    isAnimate = $bigUl.is(":animated");
	/*初始状态*/
    $bigUl.css({"width":liNum*liWidth+"px","marginLeft":-marginLeft+"px"});
    if(liNum<=4){
        $nextBtn.hide();
    }else {
        $nextBtn.show();
    }
    $prevBtn.hide();

}