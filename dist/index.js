const drawEye = (callback) => {
    const drawing = new Vivus('eye-svg', {
        duration: 200,
        type: 'delayed'
    }, callback);
}


const replacePath = (svgId) => {
    let paths = document.getElementById(svgId).querySelectorAll('path');
    console.log(paths);

    for(let i = paths.length; i--; i>=0) {
        let path = paths[i];

        if (!path.style.fill && !path.style.stroke && path.parentElement.style.opacity) {
            path.style.fill = 'none';
            path.style.stroke = `rgb(0,0,0, ${path.parentElement.style.opacity})`
            console.log('setting default black', path);
        }
    }
}
/* replacePath('my-svg'); */


const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TimingManager {
    constructor() {

    }



    startLoading() {
        let loadTextLeft = document.querySelector('.load-left .load-text');
        let loadTextRight = document.querySelector('.load-right .load-text');

        loadTextLeft.style.animation = 'flashfade 2s linear 0s infinite forwards';
        loadTextRight.style.animation = 'flashfade 2s linear 0s infinite forwards';
    }

    drawEye(animate=true) {
        document.getElementById('eye-cover').classList.remove('hide');
        document.getElementById('eye-svg').classList.add('show');

        if (animate) {
            drawEye(this.introEnd);
            
            setTimeout(() => {
                this.startLoading();
            }, 1000);
        } else {
            setTimeout(() => {
                this.introEnd();
            }, 1000);
        }
    }

    introEnd() {
        document.body.classList.remove('hide-scrollbar')
        enableScroll();

        let loadTextLeft = document.querySelector('.load-left .load-text');
        loadTextLeft.onanimationiteration = (e) => {
            console.log(e.target)
            e.target.style.animationIterationCount = 1

            document.querySelector('.load-left.wait').classList.remove('wait')
        }
 
        let loadTextRight = document.querySelector('.load-right .load-text');
        loadTextRight.onanimationiteration = (e) => {
            console.log(e.target)
            e.target.style.animationIterationCount = 1

            document.querySelector('.load-right.wait').classList.remove('wait')
        }

        loadTextLeft.style.animationDuration = '0.4s';
        loadTextRight.style.animationDuration = '0.4s';
    }
}   

const manager = new TimingManager();
const skip = true;

(() => {
    let text = document.querySelector('.welcome .your');
    text.onanimationstart = (e) => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || skip == true) {
            setTimeout(() => {
                manager.drawEye(false);
            }, 1000)
            return;
        }
        setTimeout(() => {
            manager.drawEye();
        }, 400)
    }
})();







// Scrolling enabling/disabling

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
if (skip == false) {
    disableScroll()
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


var animate = new Animate({        
    target: '.semi-circle',
    animatedClass: 'animated',
    offset: [0, 0],
    delay: 0,
    remove: true,
    scrolled: false,
    reverse: true,
    onLoad: false,
    onScroll: true,
    onResize: false,
    disableFilter: false,
    callbackOnInit: function() {},
    callbackOnInView: function(el) {},
    callbackOnAnimate: function(el) {},
});
animate.init();