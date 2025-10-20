// import CreateBlogForm from '@/components/modules/Blogs/CreateBlogForm';

import CreateBlogForm_Advance from "@/components/modules/Blogs/CreateBlogForm_advance_normal_form_tag_useKore";

const CreateBlogPage = () => {
//     const createBlogServerActionFunc = async (data:FormData) =>{
//         "use server";
// // const session = await getuser
// console.log(data);
// };
    return (
        <div>
            {/* <h2 className="text-4xl">create blog page</h2> */}
 <CreateBlogForm_Advance/>
 
  {/* normal form tag use kore, e.prevent use korata, state valo vabe handle kora jai */}



 {/* <CreateBlogForm/> */}
 {/* nextJs er Form compo use kore, action er modde just createActionFunc ta call kor kaj kora, */}
           
        </div>
    );
};

export default CreateBlogPage;