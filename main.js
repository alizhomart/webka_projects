function imgSlider(anything){
    document.querySelector('.img1').src = anything

}
function changeColor(color){
    const sec = document.querySelector('.sec');
    sec.style.background = color;
}

function load(){
    $(".navbar").animate({top: '+=20px', opacity: '0'});
    $(".navbar").animate({top: '-=20px', opacity: '1'});
}
