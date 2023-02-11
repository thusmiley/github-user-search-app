const body = document.querySelector("body");
const initialTheme = "light";
const initialBtn = document.querySelector(".dark-btn");

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  body.setAttribute("data-theme", theme);
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
