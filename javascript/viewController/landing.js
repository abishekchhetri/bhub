import { semesterAction } from "../models/model.js";
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
