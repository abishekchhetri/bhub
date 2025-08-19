//continuous deployment

export const HOMEPAGE = `
    <div class="search-wrapper">
  <form id="search-form">
    <input type="text" class="searchBox" id="search-input" placeholder="Search..." />
    <button class= "searchBox"type="submit">Search</button>
    <button class ="sub-button recently-uploaded">Recently uploaded</button>
    <button class ="sub-button language">IT in BICTE</button>
  </form>
</div>

    <p style="font-family: Arial, sans-serif; color: #1E3A8A; text-align: center; 
            background-color: #E0E7FF; padding: 20px; border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 900px; margin: 40px auto; line-height: 1.6;">
    Welcome to <strong>BICTE HUB</strong> — a free and centralized platform designed for BICTE students to access academic resources effortlessly. 
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
<form>
<div class="login-box">
    <h2>Admin Login</h2>
    <input class="username" placeholder="Username">
    <input type="password" id="password" placeholder="Enter password">
    <button class="verifyL">Login</button>
    <div id="message"></div>
</div>
</form>`;

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
          <h3>Welcome admin!</h3>
            <p>⚠️ You can now update or delete posts, to update you can submit update from this form and to delete document of any sem you can head to any semester panel and you can see the delete button, and the logo getting red means you are admin now!</p>

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
        </div>
        `;

export const COURSES = `
<div class="courses-grid">

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXuuO8t9meLoNAhgCavnEUWmjQ3NwxUMdKQ&s" alt="C Programming" />
    <div class="course-content">
      <h2 class="course-title">C Programming</h2>
      <p class="course-semester">1st Semester</p>
      <p class="course-description">Introduction to C language basics, syntax, and problem-solving techniques.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wy-AZBLnYuTcmchMq_G_aEmfvWQ106npmg&s" />
    <div class="course-content">
      <h2 class="course-title">C++ Programming</h2>
      <p class="course-semester">2nd Semester</p>
      <p class="course-description">Object-oriented programming concepts with C++ and practical applications.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe05kRMBZaz-GjzMFgbEhdZ4LKV9i4lHKrTg&s" alt="DSA with C" />
    <div class="course-content">
      <h2 class="course-title">DSA</h2>
      <p class="course-semester">3rd Semester</p>
      <p class="course-description">Fundamentals of data structures and algorithms using C language.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mBsFXQsatgYRtp-g2n7eD0au8lWzzYl9TQ&s" alt="DSA with C" />
    <div class="course-content">
      <h2 class="course-title">Web Development</h2>
      <p class="course-semester">3rd Semester</p>
      <p class="course-description">This course teaches fronted html, css and js (AJAX) and backend php, basic My Sql</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdn8F2TXtoU7_eeXOezkrTRoHpFzGm598Yw&s" alt="DBMS SQL" />
    <div class="course-content">
      <h2 class="course-title">DBMS (SQL)</h2>
      <p class="course-semester">4th Semester</p>
      <p class="course-description">Relational databases, SQL queries, and database design principles.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpcgljXK64FAmOSdDgxp7exBd_aos05Dn1A&s" alt="Java Programming" />
    <div class="course-content">
      <h2 class="course-title">Java Programming</h2>
      <p class="course-semester">5th Semester</p>
      <p class="course-description">Core Java concepts, OOP, and building applications with Java.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKcCdtjBh4gfkNHfvIWtncTwBTzXU9cWO5yQ&s" alt="C# Programming" />
    <div class="course-content">
      <h2 class="course-title">C# Programming</h2>
      <p class="course-semester">6th Semester</p>
      <p class="course-description">C# language fundamentals and building desktop/web applications.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdKvHiXxKya3aQ59lvMG0PJp3CMaFY3oA5w&s" alt="Python Programming" />
    <div class="course-content">
      <h2 class="course-title">Python Programming</h2>
      <p class="course-semester">7th Semester</p>
      <p class="course-description">Python basics, scripting, and application development.</p>
    </div>
  </div>

  <div class="course-card">
    <img class="course-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdQgczv909nGjUFHLJAIK5irSjRJKk72X9w&s" alt="Linux" />
    <div class="course-content">
      <h2 class="course-title">Linux</h2>
      <p class="course-semester">8th Semester</p>
      <p class="course-description">Linux commands, shell scripting, and system administration basics.</p>
    </div>
  </div>
`;
