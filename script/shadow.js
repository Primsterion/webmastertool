let rgba = 'rgba(0, 0, 0, 0.75)';
let rgbArr = [0, 0, 0];
//HEX таблица
let hexMap = new Map([
    ['F', 15], ['f', 15],
    ['E', 14], ['e', 14],
    ['D', 13], ['d', 13],
    ['C', 12], ['c', 12],
    ['B', 11], ['b', 11],
    ['A', 10], ['a', 10],
    ['9', 9],
    ['8', 8],
    ['7', 7],
    ['6', 6],
    ['5', 5],
    ['4', 4],
    ['3', 3],
    ['2', 2],
    ['1', 1],
    ['0', 0]
]);
//Отрисовка и генерация кода тени
let shadowInfo = function(param){
    $('.box').css('box-shadow', param.type + ' ' + param.x + 'px ' + param.y + 'px ' + param.blur + 'px ' 
    + param.spread + 'px ' + param.color);
    $('#code-shadow').val(
        '-webkit-box-shadow: ' + param.type + ' ' + param.x + 'px ' + param.y + 'px ' + param.blur + 'px ' +
        param.spread + 'px ' + param.color + ';\n' +
        'box-shadow: ' + param.type + ' ' + param.x + 'px ' + param.y + 'px ' + param.blur + 'px ' +
        param.spread + 'px ' + param.color + ';');
};
//Из RGB в RGBA
let toRGBA = function(rgb, alpha){
    rgba = 'rgba(' + rgb[0] + ','+ rgb[1] + ','+ rgb[2] + ',' + alpha + ')';
    return rgba;
};
//Из HEX в RGBA
let hexToRgba = function(hex, alpha){
    let j = 0;
    for(let i = 0; i < 6; i+=2){
        let first = hexMap.get(hex[i]);
        let second = hexMap.get(hex[i+1]);
        j = i/2;
        rgbArr[j] = first*16 + second;
    }
    return 'rgba(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ', ' + alpha + ')';
};

$(document).ready(function(){
    //Параметры тени
    let shadow = {
        x: 0,
        y: 0,
        alpha: 0.75,
        type: '',
        blur: 0,
        spread: 0,
        color: 'rgba(0,0,0,0.75)'
    };
    shadowInfo(shadow);
    //Позиция тени по X
    $('.posX_range').on('focus', function(){
        $(this).on('mousemove', function(){
            shadow.x = $(this).val();
            $('.posX_num').val(shadow.x);
            shadowInfo(shadow);
        });
    });
    //Позиция тени по Y
    $('.posY_range').on('focus', function(){
        $(this).on('mousemove', function(){
            shadow.y = $(this).val();
            $('.posY_num').val(shadow.y);
            shadowInfo(shadow);
        })
    });
    //Прозрачность
    //Размытие
    $('.blur_range').on('focus', function(){
        $(this).on('mousemove', function(){
            shadow.blur = $(this).val();
            $('.blur_num').val(shadow.blur);
            shadowInfo(shadow);
        })
    });
    //Распространение
    $('.spread_range').on('focus', function(){
        $(this).on('mousemove', function(){
            shadow.spread = $(this).val();
            $('.spread_num').val(shadow.spread);
            shadowInfo(shadow);
        });
    });
    //=============Выбор цветов
    //Цвет тени
    $('.shadow-color-pick1').ColorPicker({
        color: '#000000',
        livePreview: true,
        onShow: function(colpkr){
            $(colpkr).fadeIn(300);
            return false;
        },
        onHide: function(colpkr){
            $(colpkr).fadeOut(300);
            return false;
        },
        onChange: function(hsb, hex, rgb){
            let rg = JSON.stringify(rgb).split(',');
            for(let i = 0; i < 3; i++){
                rg[i] = rg[i].replace(/\D/g, '');
                rgbArr[i] = rg[i];
            }
            rgba = 'rgba(' + rg[0] + ','+ rg[1] + ','+ rg[2] + ',' + shadow.alpha + ')';
            shadow.color = rgba;
            $('.shadow-color-pick1').css('background', '#' + hex);
            $('.shadow-color-numb').val('#' + hex);
            shadowInfo(shadow);
        }
    });
    //Цвет куба
    $('.shadow-color-pick3').ColorPicker({
        color: '#FFFFFF',
        livePreview: true,
        onShow: function(colpkr){
            $(colpkr).fadeIn(300);
            return false;
        },
        onHide: function(colpkr){
            $(colpkr).fadeOut(300);
            return false;
        },
        onChange: function(hsb, hex){
            $('.box').css('background', '#' + hex);
            $('.color-block').css('background', '#' + hex);
            $('.shadow-block-numb').val('#' + hex);
            shadowInfo(shadow);
        }
    });
    //Цвет фона
    $('.shadow-color-pick2').ColorPicker({
        color: '#C4C4C4',
        livePreview: true,
        onShow: function(colpkr){
            $(colpkr).fadeIn(300);
            return false;
        },
        onHide: function(colpkr){
            $(colpkr).fadeOut(300);
            return false;
        },
        onChange: function(hsb, hex){
            $('.block').css('background', '#' + hex);
            $('.color-bg').css('background', '#' + hex);
            $('.shadow-bg-numb').val('#' + hex);
            $('.shadow-color-pick2').css('background', '#' + hex);
            shadowInfo(shadow);
        } 
    });
    //Прозрачность
    $('.alpha-range').on('focus', function(){
        $(this).on('mousemove', function(){
            shadow.alpha = $(this).val();
            $('.alpha-numb').val(shadow.alpha);
            shadow.color = toRGBA(rgbArr, shadow.alpha);
            shadowInfo(shadow);
        });
    });
    //Radio кнопки
    $('#type-shadow-in').on('click', function(){
        shadow.type = 'inset';
        shadowInfo(shadow);
    });

    $('#type-shadow-out').on('click', function(){
        shadow.type = '';
        shadowInfo(shadow);
    });
    //Числовые поля
    $('.posX_num').on('change', function () {
        const x = $(this).val();
        shadow.x = x;
        $('.posX_range').val(x);
        shadowInfo(shadow);
    });
    $('.posY_num').on('change', function () {
       const y = $(this).val();
       shadow.y = y;
       $('.posY_range').val(y);
       shadowInfo(shadow);
    });
    $('.alpha-numb').on('change', function () {
        const alpha_val = $(this).val();
        console.log(alpha_val);
        shadow.alpha = alpha_val;
        shadowInfo(shadow);
        $('.alpha-range').val(alpha_val);
    });
    $('.blur_num').on('change', function () {
       const blur_val = $(this).val();
       shadow.blur = blur_val;
       $('.blur_range').val(blur_val);
       shadowInfo(shadow);
    });
    $('.spread_num').on('change', function () {
       const spread_val = $(this).val();
       shadow.spread = spread_val;
       $('.spread_range').val(spread_val);
       shadowInfo(shadow);
    });
    $('.shadow-color-numb').on('change', function () {
       let shadow_color = $(this).val();
       shadow_color = shadow_color.replace(/#/i, '');
       $('.shadow-color-pick1').css('background', '#' + shadow_color);
       shadow.color = hexToRgba(shadow_color, shadow.alpha);
       shadowInfo(shadow);
    });
    $('.shadow-bg-numb').on('change', function () {
        let color = $(this).val();
        if(color[0] === '#') {
            $('.shadow-color-pick2').css('background', color);
            $('.block').css('background', color);
        }else{
            $('.shadow-color-pick2').css('background', '#' + color);
            $('.block').css('background', '#' + color);
        }
    });
    $('.shadow-block-numb').on('change', function () {
        let color = $(this).val();
        if(color[0] === '#') {
            $('.shadow-color-pick3').css('background', color);
            $('.box').css('background', color);
        }else{
            $('.shadow-color-pick3').css('background', '#' + color);
            $('.box').css('background', '#' + color);
        }
    });
    //Копирование
    $('.copy-btn-shadow').on('click', function(){
        let codeShadow = $('#code-shadow');
        copy(codeShadow);
    });
});