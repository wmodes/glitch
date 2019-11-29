// var loader = document.getElementById('loader');
// window.addEventListener("load", function(event) {
//     document.body.classList.add('glitched');
// });

$(document).ready(function(){

    $('body').addClass('glitched');

    $('h1,h2,h3,h4').addClass('contentTitle');
    $('p').addClass('contentText');

    function glitchImages() {
        $('img').addClass("been-glitched");
        $('img.been-glitched').each(function(){
            var imgEl = $(this);
            var imgTag = imgEl[0].outerHTML;
            imgEl.on('load', function(){
                var positionObj = {
                    top: imgEl.position().top,
                    left: imgEl.position().left,
                    width: imgEl.width(),
                    height: imgEl.height()
                };
                // console.log(imgTag);

                glitchEl = $('<div class="glitch">');
                glitchEl.css(positionObj);
                imgEl.after(glitchEl);
                for(i=0;i<5;i++) {
                    var newImg = $(imgTag).removeClass("been-glitched");
                    var newGlitch = $('<div class="glitchit">').append(newImg);
                    glitchEl.append(newGlitch);
                }
            });
        });
    }

    function repositionGlitch() {
        $('img.been-glitched').each(function(){
            var imgEl = $(this);
            var positionObj = {
                top: imgEl.position().top,
                left: imgEl.position().left,
                width: imgEl.width(),
                height: imgEl.height()
            };
            glitchEl = imgEl.next('.glitch');
            glitchEl.css(positionObj);
        });
    }

    glitchImages();
    $(window).resize(function(){
        repositionGlitch();
    });

});