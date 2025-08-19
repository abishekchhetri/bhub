import { JSONBIN_API_KEY, BIN_ID } from "../config.js";

export const loadBlog = async function () {
  try {
    const data = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "GET",
      headers: {
        "X-Master-Key": JSONBIN_API_KEY,
      },
    });
    const blog = await data.json();
    console.log("server fetching!");
    return blog.record;
  } catch (err) {
    throw new Error(err);
  }
};

export const uploadData = async function (json) {
  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY,
      },
      body: JSON.stringify(json),
    });
    console.log("post successfull!");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
