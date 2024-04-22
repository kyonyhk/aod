document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline();

  ScrollTrigger.create({
    trigger: section2,
    start: "top 90%",
    end: "bottom top",
    markers: true,
    onEnter: () => { // This will start the timeline when the trigger is reached
      tl.to(pet1, {
        xPercent: 300,
        yPercent: -300,
        scale: 4,
        ease: "power4.in",
        duration: 0.5
      })
      .to(pet2, {
        xPercent: -300,
        yPercent: 300,
        scale: 4,
        ease: "power4.in",
        duration: 0.5
      }, "-=0.25") // overlap for seamless transition
      .to(content, {
        xPercent: 100,
        scale: 100,
        ease: "power4.in",
        duration: 0.5
      }, "-=0.25") // overlap for seamless transition
      .to(pet3, {
        xPercent: 300,
        yPercent: 300,
        scale: 4,
        ease: "power4.in",
        duration: 0.5
      }, "-=0.25") // overlap for seamless transition
      .to(pet4, {
        xPercent: -300,
        yPercent: -300,
        scale: 4,
        ease: "power4.in",
        duration: 0.5
      }, "-=0.25") // overlap for seamless transition
      .to(glow, {
        opacity: 0,
        ease: "power4.out",
        duration: 0.5
      }, "-=0.25"); // overlap for seamless transition
    }
  });
});
