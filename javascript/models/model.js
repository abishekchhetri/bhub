/*
following are types ; 
      "recentDate": null,
      "note": [],
      "oldPapers": [],
      "syllabus": [],
      "images": [],
      "subjects": []

      and the data inside after recentDate is : 

      type: "note",
      name: "visual programming",
      drivepath:
        "https://drive.google.com/file/d/1gsbMlS1RdDaAbpBMQwe5jPL6BNQvXcOT/view?usp=drive_link",
      year: "2025",
      semester: "6",
      uploadedBy: "admin",
      uploadedAt: "2025-08-15T02:27:58.967Z",
*/

import { uploadData, loadBlog } from "./main.js";

let isLoaded = false;
export let allData;

export const reloadData = async () => {
  try {
    allData = await loadBlog();
  } catch (err) {
    throw new Error(err);
  }
};

export const semesterAction = async (semester, adminOptions = false) => {
  try {
    if (!(semester >= 1 && semester <= 8))
      throw new Error("Youve entered wrong semester !"); //if by mistake i entered wrong semester then we do this

    if (!isLoaded) {
      //fall backing to preserve state
      allData = await loadBlog();
      isLoaded = true;
    }

    if (!adminOptions) {
      //if we only fetch semester data we return that data
      return allData.data[semester - 1];
    }

    //ADMIN OPTIONS

    //ADMIN UPLOAD
    if (adminOptions.action === "upload") {
      allData?.data[semester - 1][adminOptions.type].push(adminOptions.data);
      await uploadData(allData);
      console.log("uploaded!!");
    }

    //ADMIN DELETE
    if (adminOptions.action === "delete") {
      if (adminOptions.deleteKey < 1)
        throw new Error("cannot delete 0 index data!");

      const delIdx = allData?.data[semester - 1][adminOptions.type].splice(
        adminOptions.deleteKey - 1,
        1
      );
      if (delIdx.length < 1) throw new Error("cannot delete, data unavailable");
      await uploadData(allData);
      console.log("deleted!!");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const searchHelper = (array, searchKey) => {
  let arr = [];
  array.forEach((val, idx) => {
    if (val.name.toLowerCase().includes(searchKey)) arr.push(val);
  });

  return arr;
};

export const searchThisThing = async (searchKey) => {
  const arr = [];
  await reloadData();
  searchKey = searchKey.toLowerCase().trim();

  allData.data.forEach((val, idx) => {
    const arrayContent1 = searchHelper(val.note, searchKey);
    const arrayContent2 = searchHelper(val.oldPapers, searchKey);
    const arrayContent3 = searchHelper(val.syllabus, searchKey);

    if (arrayContent1.length > 0) arr.push(arrayContent1);
    if (arrayContent2.length > 0) arr.push(arrayContent2);
    if (arrayContent3.length > 0) arr.push(arrayContent3);
  });

  return arr;
};
