import { searchThisThing } from "../models/model.js";
import {
  renderAbout,
  renderAdmin,
  renderHomepage,
  renderSemester,
  renderTeams,
} from "./pageRenderer.js";
//initiating homepage
location.hash = "homepage";
renderHomepage();

const mainBody = document.querySelector(".mainClass");

window.addEventListener("hashchange", (e) => {
  if (location.hash === "#homepage") {
    renderHomepage();
    return;
  }

  if (
    ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8"].includes(location.hash)
  ) {
    renderSemester();
  }
  if (location.hash === "#admin") {
    renderAdmin();
  }
  if (location.hash === "#about") renderAbout();

  if (location.hash === "#teams") renderTeams();
});

// searchform initiation
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent page reload
  const body = document.querySelector(".cardCollection");
  const searchText = searchInput.value.trim();
  if (searchText === "") return;
  const result = await searchThisThing(searchText);
  console.log(result);

  body.innerHTML = `
  <div class="search-results-wrapper">
    <h2 class="search-title">Search Results</h2>
    <div class="search-results">
      ${result
        .map(
          (val) => `
          <div class="search-result-card">
            <div class="result-info">
              <h3 class="result-name">${val[0].name}</h3>
              <p class="result-meta">📘 ${val[0].type} &nbsp; | &nbsp; 🧩 Semester ${val[0].semester}</p>
            </div>
            <a 
              href="${val[0].drivepath}" 
              target="_blank" 
              class="view-button">
              View Note
            </a>
          </div>
        `
        )
        .join("")}
    </div>
  </div>
`;

  if (result.length < 1) body.innerHTML = "NO SEARCH RESULTS ";
});
