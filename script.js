locomotive();
gsapTriggers();

function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function gsapTriggers(){
    gsap.to("#page1>.track",{
        scrollTrigger:{
            trigger:`#page1>.track`,
            scroller:`#main`,
            start:`top 10%`,
            // end:`top 50%`,
            scrub:true,
            // markers:true
        },
        y:180,
        duration:3,
        ease:Power4
    });
    gsap.to("#page1>.surf",{
        scrollTrigger:{
            trigger:`#page1>.surf`,
            scroller:`#main`,
            start:`top 80%`,
            // end:`top 50%`,
            scrub:true,
            // markers:true
        },
        y:-180,
        duration:3,
        ease:Power4
    });
    gsap.to("#page2>.slide",{
        scrollTrigger:{
            trigger:`#page2>.slide`,
            scroller:`#main`,
            start:`top 100%`,
            // end:`top 50%`,
            scrub:true,
            // markers:true
        },
        x:-250,
        duration:3,
        ease:Expo.ease
    });
    gsap.to("#page3>.cover>h1>span",{
        scrollTrigger:{
            trigger:`#page3>.cover>h1>span`,
            scroller:`#main`,
            start:`top bottom`,
            end:`bottom top`,
            scrub:.5,
            // markers:true
        },
        stagger:.2,
        opacity:1,
        color:`#fff`
    })
    
}