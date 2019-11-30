// var loader = document.getElementById('loader');
// window.addEventListener("load", function(event) {
//     document.body.classList.add('glitched');
// });

// $(document).ready(function(){

    $('body').addClass('glitched');

    $('h1,h2,h3,h4').addClass('contentTitle');
    $('p').addClass('contentText');

    imgDir = 'img/';
    overlays = [
        'glitch-overlay-1.png',
        'glitch-overlay-2.png',
        'glitch-overlay-3.png',
        'glitch-overlay-4.png',
        'glitch-overlay-5.png',
        'glitch-overlay-6.png',
        'glitch-overlay-7.png',
        'glitch-overlay-8.png',
        'glitch-overlay-9.png'
    ];

    function addGlitchOverlays() {
        $("body").append('<div class="overlay overlay-white">');
        for (var i=0;i<overlays.length;i++) {
            newElHTML = `<div class="overlay overlay${i}" ` +
                `style="background-image:url(${imgDir + overlays[i]});">`;
            $("body").append(newElHTML);
        }
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function flashOverlays() {
        // set delay in ms
        delay = 500;
        // set z-index
        zBack = -1000;
        zFront = 1000;
        // select how many
        min = 1;
        max = 4;
        howMany = getRandomInt(min, max);
        // pick overlays
        for (var i=0; i<=howMany; i++) {
            randIndex = getRandomInt(0, overlays.length - 1);
            console.log("flash: .overlay" + randIndex);
            setTimeout(function(){
                console.log("showing .overlay" + randIndex + " (z-index:"+(zFront+i) + ")");
                $('.overlay' + randIndex).css('z-index', zFront+i)
            }.bind(randIndex, i), delay*i);
        }
        // setTimeout(function(){
        //         $('.overlay').css('z-index', zBack);
        // }, delay*(howMany+1));
    }

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
    addGlitchOverlays();

// });