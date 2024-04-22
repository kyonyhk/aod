const pet1 = document.querySelector(".hero_pet01-wrap")
const pet2 = document.querySelector(".hero_pet02-wrap")
const pet3 = document.querySelector(".hero_pet03-wrap")
const pet4 = document.querySelector(".hero_pet04-wrap")

const content = document.querySelector(".hero_content-container")
const logo = document.querySelector(".hero_genopets-logo-wrap")
const heading = document.querySelector(".hero_heading-wrap")
const download = document.querySelector(".hero_download-wrap")

const glow = document.querySelector(".hero_glow-wrap")

const section2 = document.querySelector(".is-second-section")

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    paused: true,
    reversed: true,
  });

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
    scale: 150,
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

  ScrollTrigger.create({
    animation: tl,
    trigger: section2,
    start: "top 90%",
    end: "bottom top",
    toggleActions: "play pause reverse none",
    markers: true,
  });
});
