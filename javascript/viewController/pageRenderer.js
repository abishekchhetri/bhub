import {
  reloadData,
  semesterAction,
  searchThisThing,
} from "../models/model.js";
import {
  COURSES,
  EXPORTDELETEFORM,
  HOMEPAGE,
  LOGINBOX,
  RENDERABOUT,
  RENDERTEAMS,
} from "./htmlInjection.js";

export let WHOAMI = null;
let flag = false;
const mainBody = document.querySelector(".mainClass");

document.querySelector(".active").addEventListener("click", () => {
  renderHomepage();
});

//tHIS IS LIKE MISC LAYOUT TO GENERATE MESSAGE LIKE ERROR MESSAGE
export const renderMessage = (message = "please wait.......") => {
  mainBody.innerHTML = ``;
  mainBody.innerHTML = `<div class='message'>${message}</div>`;
};

//THIS IS LIKE ENTRY POINT TO DO STUFFS IN WHOLE PAGE
export const renderHomepage = async () => {
  setTimeout(() => {
    if (flag) alert("deletion successfull!");
    flag = false;
  }, 10);
  const html = HOMEPAGE;
  mainBody.innerHTML = html;
  // searchform initiation
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  searchForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent page reload
    const body = document.querySelector(".cardCollection");
    const searchText = searchInput.value.trim();
    if (searchText === "") return;
    let result = await searchThisThing(searchText);
    searchInput.value = "";
    result = result.flat();
    //flat decompresses the result

    body.classList.add("removeGrid");
    body.innerHTML = `
  <div class="search-results-wrapper">
    <h2 class="search-title">Search Results</h2>
    <div class="search-results">
      ${result
        .map(
          (val) => `
          <div class="search-result-card">
            <div class="result-info">
              <h3 class="result-name">${val.name}</h3>
              <p class="result-meta">📘 ${val.type} &nbsp; | &nbsp; 🧩 Semester ${val.semester}</p>
            </div>
            <a 
              href="${val.drivepath}" 
              target="_blank" 
              class="view-button">
              open
            </a>
          </div>
        `
        )
        .join("")}
    </div>
  </div>
`;
  });

  document
    .querySelector(".recently-uploaded")
    .addEventListener("click", async () => {
      const body = document.querySelector(".cardCollection");
      let arr = await searchThisThing(null, true);
      //sorting this array for recent dates:
      arr = arr
        .flat()
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

      body.classList.add("removeGrid");
      body.innerHTML = `
  <div class="search-results-wrapper">
    <h2 class="search-title">Recently uploaded</h2>
    <div class="search-results">
      ${arr
        .map(
          (val) => `
          <div class="search-result-card">
            <div class="result-info">
            <p class="result-meta">${
              new Date(val.uploadedAt).toISOString().split("T")[0]
            }</p>
            <h3 class="result-name" syle = "color:orange">${val.name}</h3>
              <p class="result-meta">📘 ${
                val.type
              } &nbsp; | &nbsp; 🧩 Semester ${val.semester}</p>
              </div>
            <a 
              href="${val.drivepath}" 
              target="_blank" 
              class="view-button">
              open
            </a>
          </div>
        `
        )
        .join("")}
    </div>
  </div>
`;
    });

  document.querySelector(".language").addEventListener("click", () => {
    const body = document.querySelector(".cardCollection");
    body.style.display = "block";
    body.innerHTML = COURSES;
  });
};

//LISTENER FOR HOMEPAGE
mainBody.addEventListener("click", async (e) => {
  const route = e.target.getAttribute("data-id");
  if (route) {
    mainBody.innerHTML = ``;
    const data = route.split(" ");
    location.hash = `#${data[0]}-${data[1]}-semester`;
    await renderSemSpecific(data);
    return;
  }
});

//RENDER THE SEMESTER SPECIFIC DATA ACTUALLY !
const renderSemSpecific = async (data) => {
  try {
    const [location, sem] = data;
    renderMessage();
    const dataSpecific = await semesterAction(sem);
    mainBody.innerHTML = "data is " + location + " and from semester" + sem;
    renderDataList(dataSpecific[location]);
    return;
  } catch (err) {
    renderMessage("Please wait...");
  }
};

//DONT DELETE THIS HANDLES THE PAGES
export const renderSemester = async () => {};

//ADMIN
const renderActions = async () => {
  const html = EXPORTDELETEFORM;
  mainBody.innerHTML = html;

  // Upload listener
  document.querySelector(".logo").style.color = "#fb5a5c";

  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    WHOAMI = "creator";
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        type: document.getElementById("type").value,
        name: document.getElementById("name").value,
        drivepath: document.getElementById("drivepath").value,
        year: document.getElementById("year").value,
        semester: document.getElementById("semester").value,
        uploadedBy: document.getElementById("uploadedBy").value,
        uploadedAt: new Date().toISOString(),
      };
      await semesterAction(+data.semester, {
        action: "upload",
        type: data.type,
        data: data,
      });

      await reloadData();

      (document.getElementById("type").value = ""),
        (document.getElementById("name").value = ""),
        (document.getElementById("drivepath").value = ""),
        (document.getElementById("year").value = ""),
        (document.getElementById("semester").value = ""),
        (document.getElementById("uploadedBy").value = ""),
        (document.getElementById("uploadOutput").textContent =
          "✅ DATA UPLOADED SUCCESSFULLY!\n" + JSON.stringify(data, null, 4));
    });
  }
};

//DEALS WITH CORE ADMIN FEATURES
export const renderAdmin = async () => {
  try {
    // Render login form first

    const adminLogin = LOGINBOX;
    mainBody.innerHTML = adminLogin;
    const passwordInput = document.getElementById("password");
    const messageDiv = document.getElementById("message");

    setTimeout(() => {
      if (WHOAMI === "creator") renderActions();
    }, 2);
    document.querySelector(".verifyL").addEventListener("click", async () => {
      if (!passwordInput) return;
      const enteredPassword = passwordInput.value;

      if (enteredPassword !== "abcdefg") {
        if (messageDiv)
          messageDiv.textContent = "❌ Either Username Or Password is wrong!";
        return;
      }

      // Password correct, render admin upload + delete form
      await renderActions();
    });
  } catch (err) {
    renderMessage(err);
  }
};

//RENDERING THE CARD OF SEMESTER ACTION RESULTS
function renderDataList(dataArray) {
  // Sort by uploadedAt (newest first)
  const sortedData = dataArray.sort(
    (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
  );

  if (sortedData.length < 1) {
    mainBody.innerHTML =
      "<div class='message'>Sorry but admin has not uploaded any data!</div>";
    return;
  }

  mainBody.innerHTML = `
    <div class="gridContainer">
      ${sortedData
        .map((item, idx) => {
          // Convert Google Drive share link to embed link
          let embedLink = item.drivepath;
          if (embedLink.includes("view")) {
            embedLink = embedLink.replace("view", "preview");
          }

          return `
            <div class="data-card">
              <h3>${item.name}</h3>
              <div class="data-preview">
                <iframe src="${embedLink}" allow="autoplay"></iframe>
              </div>
              <div class="data-content">
                <strong>${item.name}</strong>
                <span style="color:purple">Showing ${idx + 1} of ${
            sortedData.length
          } results.</span>
                <div class="data-meta">
                  <a href="${
                    item.drivepath
                  }" target="_blank" class="button">Open File</a>
                  <span>📂 ${item.type}</span>
                  <span>🎓 Sem: ${item.semester}</span>
                  <span>📅 ${item.year}</span>
                  ${
                    WHOAMI === "creator"
                      ? `<button class="delete" data-id=${idx}>🗑️ DELETE</button>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  const delBtn = document.querySelector(".delete");
  if (delBtn)
    delBtn.addEventListener("click", async () => {
      try {
        const data = location.hash.slice(1).split("-");
        const idx = +delBtn.getAttribute("data-id") + 1;
        const [type, semester] = data;
        await semesterAction(semester, {
          action: "delete",
          type: type,
          deleteKey: idx,
        });
        await reloadData();
        flag = true;
        renderHomepage();
      } catch (err) {
        console.log(err);
      }
    });
}

// ABOUT SECTION OF SITE JS
export const renderAbout = () => {
  mainBody.innerHTML = ``;
  mainBody.innerHTML = RENDERABOUT;
};

//TEAMS SECTION RENDERING
export const renderTeams = () => {
  mainBody.innerHTML = "";
  mainBody.innerHTML = RENDERTEAMS;
};
// Render on page load
