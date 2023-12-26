var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstpageanimation(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:-10,
        opacity:0,
        duration:1.5,
        ease: "expo.easeInOut"
    })
        .to(".boundingelem",{
            y:0,
            stagger:0.2,
            duration:1,
            delay:-1,
            ease: "expo.easeInOut"
        })
        .from("#herofooter",{
            y:'-10',
            opacity:0,
            duration:1.5,
            delay:-1,
            ease: "expo.easeInOut"
        })
}

function circleskewanimation(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);
        circlefollowmouse(xscale, yscale);

        timeout = setTimeout(()=>{
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX }px, ${dets.clientY}px) scale(1, 1) `;
        },100);

    });
}

function circlefollowmouse(xscale, yscale){
    window.addEventListener("mousemove", function(e){
        document.querySelector('#minicircle').style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale}) `;
    });
}

document.querySelectorAll('.elem')
.forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener('mouseleave',function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power3,
            duration:0.5,
            transform:'scale(1)',
        })
    })
    elem.addEventListener('mousemove',function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.5),
        })
    })
    elem.addEventListener('mouseenter',function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.5),
        })
    })
})




circleskewanimation();
firstpageanimation();
circlefollowmouse();
