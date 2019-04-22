//Отрисовка градиента
let gradDraw = function (param) { 
    $('.gradient').css('background', 'linear-gradient(' + param.deg + 'deg' + ', #' + param.color1.color + ' ' + param.color1.val + 
    '%, #' + param.color2.color + ' ' + param.color2.val + '%');
};
//Генерация CSS кода
let codeGeneration = function (param) {
    $('.css-code-grad textarea').text( 
    'background: -moz-linear-gradient('+ param.deg + 'deg, #' + param.color1.color + ' ' + param.color1.val + '%, #'+ param.color2.color + ' ' + param.color2.val + '%);' + '\n' +
    'background: -webkit-linear-gradient('+ param.deg + 'deg, #' + param.color1.color + ' ' + param.color1.val + '%, #'+ param.color2.color + ' ' + param.color2.val + '%);' + '\n' +
    'background: -o-linear-gradient('+ param.deg + 'deg, #' + param.color1.color + ' ' + param.color1.val + '%, #'+ param.color2.color + ' ' + param.color2.val + '%);' + '\n' +
    'background: -ms-linear-gradient('+ param.deg + 'deg, #' + param.color1.color + ' ' + param.color1.val + '%, #'+ param.color2.color + ' ' + param.color2.val + '%);' + '\n' +
    'background: linear-gradient('+ param.deg + 'deg, #' + param.color1.color + ' ' + param.color1.val + '%, #'+ param.color2.color + ' ' + param.color2.val + '%);');
};

$(document).ready(function(){
    //Параметры градиента
    let param = {
        color1: {
            color: '009688',
            val: 0
        },
        color2: {
            color: 'ffffff',
            val: 100
        },
        deg: 180
    };
    gradDraw(param);
    codeGeneration(param);
    //Обработка выбора первого цвета
    $('.color-pick1').ColorPicker({
        color: '#' + param.color1.color,
        livePreview: true,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(300);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(300);
            return false;
        },
        onChange: function (hsb, hex) {
            $('.color1').css('backgroundColor', '#' + hex);
            $('.right-col').css('background', '#' + hex);
            param.color1.color = hex;
            gradDraw(param);
            codeGeneration(param);
        }
    });
    //Обработка выбора второго цвета
    $('.color-pick2').ColorPicker({
        color: '#' + param.color2.color,
        livePreview: true,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(300);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(300);
            return false;
        },
        onChange: function (hsb, hex) {
            $('.color2').css('backgroundColor', '#' + hex);
            $('.right-col').css('background', '#' + hex);
            param.color2.color = hex;
            gradDraw(param);
            codeGeneration(param);
        }
    });
    //Обработка первого цвета градиента
    $('.grad_range1').focus(function(){
        $(this).on('mousemove', function(){
            let value = $(this).val();
            $('.grad_numb1').val(value);
            param.color1.val = value;
            gradDraw(param);
            codeGeneration(param);
        });
    });
    //Обработка второго цвета градиента
    $('.grad_range2').focus(function(){
        $(this).on('mousemove', function(){
            let value = $(this).val();
            $('.grad_numb2').val(value);
            param.color2.val = value;
            gradDraw(param);
            codeGeneration(param);
        });
    });
    //Обработка угла
    $('.deg').focus(function(){
        $(this).on('mousemove', function(){
            let value = $(this).val();
            $('.deg_numb').val(value);
            param.deg = value;
            gradDraw(param);
            codeGeneration(param);
        });
    });
    //Обработка input с числовыи типом
    $('.grad_numb1').on('change', function(){
        let val = $(this).val();
        $('.grad_range1').val(val);
        param.color1.val = val;
        gradDraw(param);
        codeGeneration(param);
    });

    $('.grad_numb2').on('change', function(){
        let val = $(this).val();
        $('.grad_range2').val(val);
        param.color2.val = val;
        gradDraw(param);
        codeGeneration(param);
    });
    
    $('.deg_numb').on('change', function(){
        let val = $(this).val();
        $('.deg').val(val);
        param.deg = val;
        gradDraw(param);
        codeGeneration(param);
    });

    //Копирование кода в буффер обмена
    $('.copy-btn-grad').on('click', function(){
        copy($('.css-code-grad textarea'));
    });
});