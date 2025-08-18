import { reloadData, semesterAction } from "../models/model.js";
import {
  EXPORTDELETEFORM,
  HOMEPAGE,
  LOGINBOX,
  RENDERABOUT,
  RENDERTEAMS,
} from "./htmlInjection.js";

const mainBody = document.querySelector(".mainClass");
const processA = false;

export const renderMessage = (message = "please wait.......") => {
  mainBody.innerHTML = ``;
  mainBody.innerHTML = `<div class='message'>${message}</div>`;
};
export const renderHomepage = () => {
  const html = HOMEPAGE;
  mainBody.innerHTML = html;
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
    renderMessage("some error occured");
  }
};

//DONT DELETE THIS HANDLES THE PAGES
export const renderSemester = async () => {};

//ADMIN
export const renderAdmin = async () => {
  try {
    // Render login form first
    const adminLogin = LOGINBOX;

    mainBody.innerHTML = adminLogin;

    document.querySelector(".verifyL").addEventListener("click", () => {
      const passwordInput = document.getElementById("password");
      const messageDiv = document.getElementById("message");

      if (!passwordInput) return;

      const enteredPassword = passwordInput.value;

      if (enteredPassword !== "abcdefg") {
        if (messageDiv)
          messageDiv.textContent = "❌ Either Username Or Password is wrong!";
        // return;
      }

      // Password correct, render admin upload + delete form
      const html = EXPORTDELETEFORM;
      mainBody.innerHTML = html;

      // Upload listener
      const uploadForm = document.getElementById("uploadForm");
      if (uploadForm) {
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
              "✅ DATA UPLOADED SUCCESSFULLY!\n" +
              JSON.stringify(data, null, 4));
        });
      }

      // Delete listener
      const deleteForm = document.getElementById("deleteForm");
      if (deleteForm) {
        deleteForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const deleteType = document.getElementById("deleteType").value;
          const deleteSemester =
            +document.getElementById("deleteSemester").value;
          const deleteKey = +document.getElementById("deleteKey").value;

          await semesterAction(deleteSemester, {
            action: "delete",
            type: deleteType,
            deleteKey: deleteKey,
          });

          await reloadData();

          document.getElementById("deleteType").value = "";
          document.getElementById("deleteSemester").value = "";
          document.getElementById("deleteKey").value = "";
          document.getElementById(
            "deleteOutput"
          ).textContent = `✅ Deleted ${deleteType} at index ${deleteKey} in semester ${deleteSemester}`;
        });
      }
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
  mainBody.innerHTML = sortedData
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
                    <span style="color:purple">           Showing ${
                      idx + 1
                    } of ${sortedData.length} results.</span>
                    <div class="data-meta">
                        <span>📂 ${item.type}</span>
                        <span>🎓 Sem: ${item.semester}</span>
                        <span>📅 ${item.year}</span>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

// Example usage:
export const renderAbout = () => {
  mainBody.innerHTML = ``;
  mainBody.innerHTML = RENDERABOUT;
};

export const renderTeams = () => {
  mainBody.innerHTML = "";
  mainBody.innerHTML = RENDERTEAMS;
};
// Render on page load
