export const HOMEPAGE = `
    <p style="font-family: Arial, sans-serif; color: #1E3A8A; text-align: center; 
            background-color: #E0E7FF; padding: 20px; border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 900px; margin: 40px auto; line-height: 1.6;">
    Welcome to <strong>BICTE HUB</strong> — a free and centralized platform designed for BICTE students to access academic resources effortlessly. 
    Here you can find organized <strong>notes, syllabi, and past question papers</strong> for all 8 semesters. 
    The platform ensures quick access to study materials, making learning and exam preparation more efficient. 
    Admin users can securely upload, manage, and update content, so students always have the latest resources at their fingertips.
</p>

    <div class="cardCollection">
        ${[1, 2, 3, 4, 5, 6, 7, 8]
          .map(
            (val) => `
            <div class="mainCard">
                <p class="semTitle">Semester ${val}</p>
                <div class="subSemEdit">
                    <p data-id="note ${val}">Notes</p>
                    <p data-id="oldPapers ${val}">Past Questions</p>
                    <p data-id="syllabus ${val}">Syllabus</p>
                </div>
            </div>
        `
          )
          .join("")}
    </div>
    `;

export const LOGINBOX = `
    <div class="login-box">
        <h2>Admin Login</h2>
        <input class="username" placeholder="Username">
        <input type="password" id="password" placeholder="Enter password">
        <button class="verifyL">Login</button>
        <div id="message"></div>
    </div>`;

export const RENDERABOUT = `<section id="about" style="padding: 40px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <h2 style="text-align: center; color: #333;">About BICTEHUB</h2>
    <p style="max-width: 800px; margin: 20px auto; font-size: 1rem; line-height: 1.6; color: #555;">
        BICTEHUB is a centralized platform designed for students of BICTE to access academic resources easily. 
        It provides a structured repository of notes, syllabi, and past question papers for all 8 semesters, 
        making learning and exam preparation more efficient. The platform also allows admin users to securely 
        upload and manage content, ensuring that the resources remain up-to-date and organized.
    </p>
    <p style="max-width: 800px; margin: 20px auto; font-size: 1rem; line-height: 1.6; color: #555;">
        This project has been developed by <strong>Jeewani Sapkota, Manoj Mahatra Chhetri, and Aashma Sapkota</strong>, 
        students of <strong>BICTE 7th Semester</strong>, with the aim of simplifying access to academic materials 
        and supporting student success.
    </p>
</section>`;

export const RENDERTEAMS = `<section id="team" style="padding: 40px; background-color: #fff; font-family: Arial, sans-serif;">
    <h2 style="text-align: center; color: #333; margin-bottom: 40px;">Our Team</h2>
    <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 30px;">

        <!-- Team Member 1 -->
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; width: 220px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h3 style="margin: 0; color: #222;">Jeewani Sapkota</h3>
            <p style="margin: 5px 0 0; font-size: 0.9rem; color: #555;">BICTE 7th Semester</p>
        </div>

        <!-- Team Member 2 -->
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; width: 220px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h3 style="margin: 0; color: #222;">Manoj Mahatra Chhetri</h3>
            <p style="margin: 5px 0 0; font-size: 0.9rem; color: #555;">BICTE 7th Semester</p>
        </div>

        <!-- Team Member 3 -->
        <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; width: 220px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h3 style="margin: 0; color: #222;">Aashma Sapkota</h3>
            <p style="margin: 5px 0 0; font-size: 0.9rem; color: #555;">BICTE 7th Semester</p>
        </div>

    </div>
</section>

`;

export const EXPORTDELETEFORM = `
        <div class="admin-container">
            <h2>Admin Panel</h2>

            <!-- UPLOAD FORM -->
            <div class="upload-container">
                <h3>Upload Data</h3>
                <form id="uploadForm">
                    <label for="type">Type</label>
                    <select id="type" name="type" required>
                        <option value="">Select type</option>
                        <option value="note">Note</option>
                        <option value="syllabus">Syllabus</option>
                        <option value="oldPapers">Old Papers</option>
                    </select>

                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter title" required>

                    <label for="drivepath">Google Drive Path</label>
                    <input type="url" id="drivepath" name="drivepath" placeholder="Paste Google Drive link" required>

                    <label for="year">Year</label>
                    <input type="number" id="year" name="year" placeholder="e.g. 2025" required>

                    <label for="semester">Semester</label>
                    <select id="semester" name="semester" required>
                        <option value="">Select semester</option>
                        ${[1, 2, 3, 4, 5, 6, 7, 8]
                          .map((s) => `<option value="${s}">${s}</option>`)
                          .join("")}
                    </select>

                    <label for="uploadedBy">Uploaded By</label>
                    <input type="text" id="uploadedBy" name="uploadedBy" placeholder="Admin name" required>

                    <button type="submit">Upload</button>
                </form>
                <pre id="uploadOutput"></pre>
            </div>

            <!-- DELETE FORM -->
            <div class="delete-container" style="margin-top:40px;">
                <h3>Delete Data</h3>
                <form id="deleteForm">
                    <label for="deleteType">Type</label>
                    <select id="deleteType" name="deleteType" required>
                        <option value="">Select type</option>
                        <option value="note">Note</option>
                        <option value="syllabus">Syllabus</option>
                        <option value="oldPapers">Old Papers</option>
                    </select>

                    <label for="deleteSemester">Semester</label>
                    <select id="deleteSemester" name="deleteSemester" required>
                        <option value="">Select semester</option>
                        ${[1, 2, 3, 4, 5, 6, 7, 8]
                          .map((s) => `<option value="${s}">${s}</option>`)
                          .join("")}
                    </select>

                    <label for="deleteKey">Index / Key</label>
                    <input type="number" id="deleteKey" name="deleteKey" placeholder="Enter index/key to delete" required>

                    <button type="submit">Delete</button>
                </form>
                <pre id="deleteOutput"></pre>
            </div>
        </div>
        `;
