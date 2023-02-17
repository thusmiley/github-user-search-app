// Theme setup

const body = document.body;
const initialTheme = "light";
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

const updateTheme = () => {
  lightBtn.style.display = "none";
  darkBtn.style.display = "none";

  localStorage.getItem("theme") === "dark"
    ? (lightBtn.style.display = "block")
    : (darkBtn.style.display = "block");
};

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

// Search
const searchError = document.getElementById("error-msg");

function search(event) {
  event.preventDefault();

  const inputName = document.getElementById("inputname").value;

  fetchUser(inputName);
}

async function fetchUser(name) {
  try {
    const response = await fetch(`https://api.github.com/users/${name}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return (searchError.style.display = "block");
    }

    return updateUser(parsedResponse);
  } catch (err) {
    return console.log(err);
  }
}

function updateUser(user) {
  // Process date format from "2008-01-14T04:33:35Z" to "25 Jan 2011"
  const createdAt = user.created_at.split("T")[0];
  const splitDate = createdAt.split("-");

  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2];

  // Process 3-letter month name
  const date = new Date(year, month, day);
  date.setMonth(month - 1);
  const monthShort = date.toLocaleString("en-US", { month: "short" });

  // Process other data
  const avatar = document.getElementById("user-img");
  const name = document.getElementById("user-name");
  const userID = document.getElementById("user-id");
  const joinedDate = document.getElementById("joined-date");
  const bio = document.getElementById("bio");
  const repos = document.getElementById("repos");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const location = document.getElementById("location");
  const twitter = document.getElementById("twitter");
  const website = document.getElementById("website");
  const company = document.getElementById("company");

  avatar.src = user.avatar_url;
  if (!user.name || user.name.length < 1) {
    name.innerText = user.login;
  } else {
    name.innerText = user.name;
  }
  userID.innerText = `@${user.login}`;
  joinedDate.innerText = `Joined ${day} ${monthShort} ${year}`;

  if (!user.bio || user.bio.length < 1) {
    bio.innerText = "This profile has no bio.";
    bio.style.opacity = "0.7";
  } else {
    bio.style.opacity = "1";
    bio.innerText = user.bio;
  }

  repos.innerText = user.public_repos;
  followers.innerText = user.followers;
  following.innerText = user.following;

  if (!user.location || user.location.length < 1) {
    location.innerText = "Not Available";
    location.style.opacity = "0.7";
  } else {
    location.style.opacity = "1";
    location.innerText = user.location;
  }

  if (!user.twitter_username || user.twitter_username.length < 1) {
    twitter.innerText = "Not Available";
    twitter.style.opacity = "0.7";
    twitter.removeAttribute("href");
  } else {
    twitter.style.opacity = "1";
    twitter.innerText = `@{user.twitter_username}`;
    twitter.href = `https://twitter.com/${user.twitter_username}`;
  }

  if (!user.blog || user.blog.length < 1) {
    website.innerText = "Not Available";
    website.style.opacity = "0.7";
    website.removeAttribute("href");
  } else {
    website.style.opacity = "1";
    website.innerText = user.blog;
    website.href = user.blog;
  }

  if (!user.company || user.company.length < 1) {
    company.innerText = "Not Available";
    company.style.opacity = "0.7";
  } else {
    company.style.opacity = "1";
    company.innerText = user.company;
  }
}

fetchUser("octocat"); //as default
