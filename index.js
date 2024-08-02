const images = [
  "./trees.webp",
  "./lake.jpg",
  "./crying-sky.jpeg",
  "./purple-sky.jpg",
];
const parent = document.querySelector(".slider");
const nxtBtn = document.querySelector(".next");
const prvBtn = document.querySelector(".previous");
const statusEl = document.querySelector(".status");
nxtBtn.addEventListener("click", next);
prvBtn.addEventListener("click", previous);
const slider = new Proxy(
  { index: 0 },
  {
    set: (state, key, value) => {
      console.log(`proxy value is ${value}`);
      if (value > images.length - 1) {
        state[key] = 0;
        window.dispatchEvent(new CustomEvent("indexchange"));
        return true;
      }
      if (value < 0) {
        state[key] = images.length - 1;
        window.dispatchEvent(new CustomEvent("indexchange"));
        return true;
      }
      state[key] = value;
      window.dispatchEvent(new CustomEvent("indexchange"));
      return true;
    },
  }
);

initiate();

function initiate() {
  createImages();
  createPaginations();
  const paginations = document.querySelectorAll(".pagination button");
  paginations[paginations.length - 1].classList.add("active");
  document.querySelector("img").classList.add("active");
  window.addEventListener("indexchange", actions);
  statusEl.textContent = `${slider.index + 1} of ${images.length}`;
}
function createImages() {
  for (let src of images) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `slider image`;
    parent.appendChild(img);
  }
}

function createPaginations() {
  const paginationSection = document.querySelector(".pagination");
  for (const i of images) {
    const btn = document.createElement("button");
    btn.dataset.index = images.length - 1 - images.indexOf(i);
    btn.addEventListener("click", goto);
    paginationSection.appendChild(btn);
  }
}

function next() {
  slider.index = slider.index + 1;
}
function previous() {
  slider.index = slider.index - 1;
}

function actions() {
  console.log(slider.index);
  const paginations = document.querySelectorAll(".pagination button");
  const imgElems = document.querySelectorAll("img");
  imgElems.forEach((ie) => ie.classList.remove("active"));
  paginations.forEach((ie) => ie.classList.remove("active"));
  imgElems[slider.index].classList.add("active");
  paginations[images.length - 1 - slider.index].classList.add("active");
  statusEl.textContent = `${slider.index + 1} of ${images.length}`;
}

function goto(e) {
  const index = parseInt(e.target.dataset.index);
  slider.index = index;
}
