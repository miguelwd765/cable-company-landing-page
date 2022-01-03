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

const searchForm = document.querySelector(".search-form");
const clearBtn = document.querySelector(".clear-btn");
const input = document.querySelector(".search-input");
const showContainer = document.querySelector(".show-container");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchApi();
});

clearBtn.addEventListener("click", function (e) {
  input.value = "";
});

const fetchApi = async () => {
  const userInput = input.value;
  const config = { params: { q: userInput } };
  const res = await axios.get("https://api.tvmaze.com/search/shows", config);
  displayShow(res.data);
  input.value = "";
};

const displayShow = (request) => {
  const tempReq = request.slice(0, 3);
  const showInfo = tempReq
    .map(function (item) {
      const { image, name } = item.show;
      const cardImg = image
        ? image.medium
        : "https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg";
      return `<div class="card">
    <div class="card-image">
      <img
        src="${cardImg}"
        alt=""
      />
    </div>
    <h2>${name}</h2>
  </div>`;
    })
    .join("");
  showContainer.innerHTML = showInfo;
};

const articleLinks = document.querySelectorAll(".article-link");

for (let link of articleLinks) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
}

const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();
