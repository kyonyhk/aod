const pet1 = document.querySelector(".hero_pet01-wrap")
const pet2 = document.querySelector(".hero_pet02-wrap")
const pet3 = document.querySelector(".hero_pet03-wrap")
const pet4 = document.querySelector(".hero_pet04-wrap")

const logo = document.querySelector(".hero_genopets-logo-wrap")
const heading = document.querySelector(".hero_heading-wrap")
const download = document.querySelector(".hero_download-wrap")

const glow = document.querySelector(".hero_glow-wrap")

const section2 = document.querySelector(".is-second-section")

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section2,
      start: "top 50%",
      end: "bottom top", 
      scrub: true,
      markers: true,
    }
  })

  tl.to(pet1, {
    duration: 1,
    xPercent: 200,
    yPercent: -200,
    scale: 4,
    ease: "power4.in",
  })

  tl.to(pet2, {
    duration: 1,
    xPercent: -200,
    yPercent: 200,
    scale: 4,
    ease: "power4.in",
  })

  tl.to([logo, heading, download], {
    duration: 1,
    xPercent: 10,
    scale: 4,
    ease: "power4.in",
  })

  tl.to(pet3, {
    duration: 1,
    xPercent: 200,
    yPercent: 200,
    scale: 4,
    ease: "power4.in",
  })

  tl.to(pet4, {
    duration: 1,
    xPercent: -200,
    yPercent: -200,
    scale: 4,
    ease: "power4.in",
  })

  tl.to(glow, {
    duration: 1,
    opacity: 0,
    ease: "power4.out"
  }) 

})
