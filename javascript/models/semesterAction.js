//ADMIN ACTIONS
import { FIRST,SECOND, THIRD, FOURTH, FIFTH, SIXTH, SEVENTH, EIGHTH } from '../config.js';
import { loadBlog,uploadData,deleteId } from './main.js';

const semesters = [FIRST,SECOND,THIRD,FOURTH,FIFTH,SIXTH,SEVENTH,EIGHTH];

const buildAdminData = (section,data,semData,deleteKey=false)=>{
    if(!deleteKey){
        semData[section].unshift(data)
        return semData;
    }
    else{
        if(deleteKey>0&&semData[section].length>=deleteKey){
            semData[section].splice(deleteKey-1,1);
            console.log(semData);
            return semData;
        }else throw new Error('cannot delete empty or incorrect index');
    }
};

export const semesterAction = async (semester,admin=false)=>{
    try{
        const sem = semesters[semester-1];
        const semData = await loadBlog(sem); 
        if(!admin){
            return semData;
        }
        else{
            if(admin.action==='upload'){
                if(admin.array==='note')
                    admin.data = buildAdminData('note',admin.data,semData);
                if(admin.array==='syllabus')
                   admin.data =  buildAdminData('syllabus',admin.data,semData);
                if(admin.array==='oldPapers')
                    admin.data = buildAdminData('oldPapers',admin.data,semData);
            return await uploadData(sem,admin.data);
        }
            if(admin.action==='delete')
                {
                if(admin.array==='note')
                    admin.data = buildAdminData('note',null,semData,admin.deleteKey);
                if(admin.array==='syllabus')
                   admin.data =  buildAdminData('syllabus',null,semData,admin.deleteKey);
                if(admin.array==='oldPapers')
                    admin.data = buildAdminData('oldPapers',null,semData,admin.deleteKey);

                    return await uploadData(sem,admin.data);
                }
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Something went wrong!');
    }
}


// Documentation of the core JSON API DATA STRUCTURES 
// THE FUNCTIONS EXPORTED ARE 
/*
PARAMETERS
(SEMESTER(1-8), {ACTION : ('upload' / 'delete' ), ARRAY: {json data to upload}, deleteKey: if necessary })

this will upload the syllabus 
await semesterAction(8, {action:"upload", array:"syllabus", data:{name:"this is the data to upload"}});

this will delete the syllabus 
await semesterAction(6, {action:"delete", array:"syllabus", deleteKey:1});

to see syllabus for users only use
await semesterAction(5)  //this will load all the json 
*/

//testing in IIFE BLOCK 
// (async()=>{
// //    //upload any semester

// //working great after modeling a bit wierdly 
   await semesterAction(8, {action:"upload", array:"syllabus", data:{name:"this is the data to upload"}});
   //delete data
 await semesterAction(6, {action:"delete", array:"syllabus", deleteKey:1});
   //again see datas
// //    const againSee = await semesterAction(8)
// //    console.log(againSee);
// })()
