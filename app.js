const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function (e) {
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

window.addEventListener("scroll", function (e) {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }
});

const navLinks = document.querySelectorAll(".nav-links");

for (let link of navLinks) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - navHeight;
    const isNavFixed = nav.classList.contains("fixed-nav");
    console.log(isNavFixed);
    console.log(containerHeight);

    if (!isNavFixed) {
      position = position - navHeight;
    }

    if (containerHeight > 70) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
}
