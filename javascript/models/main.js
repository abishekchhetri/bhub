import { JSONBIN_API_KEY } from "../config.js";

export const loadBlog = async function (BIN_ID) {
    try {
      const data = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
        },
      });
      const blog = await data.json();
      const record = await blog.record;
      return record;
    } catch (err) {
      throw new Error(err);
    }
  };

//   loadBlog(); //works fine; 

//upload the bin id 
// const json = [{name: 'I inserted this successfully in existing json 234!'}];

export const uploadData = async function (BIN_ID,json,deleteOk=false) {
  try {
    // if(!deleteOk){
    //       const jsonData = await (loadBlog(BIN_ID));
    //         console.log(jsonData)
    //         jsonData.unshift(json);
    //         json=jsonData;
    //     }

      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
        },
        body: JSON.stringify(json),
      });
      console.log('post successfull!');
    } catch (err) {
        console.log(err);
      throw new Error(err);
    }
  };

//   uploadData(json);

  export const deleteId = async function (BIN_ID,id) {
    try{
        const json = await loadBlog(BIN_ID);
        console.log(json);
        if(id>0 && id<=json.length){
            json.splice(id-1,1);
            uploadData(BIN_ID,json,true);
            console.log('deleted id '+id);
        }
        else 
        throw new Error("cannot delete this id")
    }
    catch(err){
        console.log(err)
    }
  };
  
//   deleteId(1);



