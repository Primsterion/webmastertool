//Навигация
let css_nav = $(".css-nav"); 
let scroll = 0;
//Спрятать все инструменты
let hideAll = function(){
    $('.menu').each(function () {
        $(this).css("display", "none");
    });
};

//Копирование текста
let copy = function(object){
    object.select();
    document.execCommand('copy');
};

$(document).ready(function () {
     //Авторазмер текстового поля сообщения
    //Отображение начального экрана
    $('.title').on('click', function () {
        hideAll();
        $('.main-menu').css("display", "flex");
    });
    //Переход между меню
    $('.nav-el').on('click', function (event) {
        let id = event.target.id;
        hideAll();
        $('.' + id).css("display", "flex");
    });
    //Всплывающее меню CSS
    $('.css').hover(
        //Курсор true
        function () {
            $('.css img').css({
                'animation' : 'rotate',
                'animation-fill-mode' : 'both',
                'animation-duration' : '.4s'});
            css_nav.fadeIn(200);
        },
        //Курсор false
        function () {
            css_nav.fadeOut(200);
            $('.css img').css({
                'animation' : 'rotateBack',
                'animation-duration' : '.4s'});
        }
    );
    let count = 0;
    $('#msg').on('keydown', function(e){
        scroll = $(this).prop('scrollHeight');
        $(this).css('height', scroll + 'px');
        if(e.keyCode === 8){
            count++;
            console.log($(this).prop('scrollHeight'));
            if(count >= 30 && $(this).prop('scrollHeight') > 20){
                count = 0;
                $(this).css('height', scroll-20 + 'px');
            }
        }
    });
    //Эффект наведения на лампочку
    $('.idea').hover(
        //Курсор true
        function () {
            $('.idea img').attr('src', './img/ideahover.png');
        },
        //Курсор false
        function () {
            $('.idea img').attr('src', './img/idea.png');
        }
    );
});