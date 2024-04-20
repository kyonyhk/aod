const pet1 = document.querySelector(".hero_pet01-wrap")
const pet2 = document.querySelector(".hero_pet02-wrap")
const pet3 = document.querySelector(".hero_pet03-wrap")
const pet4 = document.querySelector(".hero_pet04-wrap")
const content = document.querySelector(".hero_content-wrap")
const section2 = document.querySelector(".is-second-section")

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section2 ,
      start: "top 50%",
      end: "bottom 50%", 
      scrub: true,
      markers: true,
    }
  })

  tl.to(pet1, {
    z: 100,
    ease: "power4.out",
  })

  tl.to(pet2, {
    z: 100,
    ease: "power4.out",
  })

  tl.to(content, {
    z: 100,
    ease: "power4.out",
  })

  tl.to(pet2, {
    z: 100,
    ease: "power4.out",
  })

  tl.to(content, {
    z: 100,
    ease: "power4.out",
  })
})
