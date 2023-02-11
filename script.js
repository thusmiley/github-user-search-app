const body = document.querySelector("body");
const initialTheme = "light";
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

lightBtn.style.display = "none";
darkBtn.style.display = "none";
localStorage.getItem("theme") === "dark"
  ? (lightBtn.style.display = "block")
  : (darkBtn.style.display = "block");

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  body.setAttribute("data-theme", theme);
  switch (theme) {
    case "light":
      lightBtn.style.display = "none";
      darkBtn.style.display = "block";
      break;
    case "dark":
      darkBtn.style.display = "none";
      lightBtn.style.display = "block";
      break;
  }
};

const toggleTheme = () => {
  const activeTheme = localStorage.getItem("theme");
  activeTheme === "light" ? setTheme("dark") : setTheme("light");
};

const setThemeOnInit = () => {
  const savedTheme = localStorage.getItem("theme");
  savedTheme
    ? body.setAttribute("data-theme", savedTheme)
    : setTheme(initialTheme);
};

setThemeOnInit();
