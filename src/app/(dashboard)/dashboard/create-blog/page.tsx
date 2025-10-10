import CreateBlogForm from '@/components/modules/Blogs/CreateBlogForm';
import React from 'react';

const CreateBlogPage = () => {
//     const createBlogServerActionFunc = async (data:FormData) =>{
//         "use server";
// // const session = await getuser
// console.log(data);
// };
    return (
        <div>
            {/* <h2 className="text-4xl">create blog page</h2> */}
            <CreateBlogForm/>
        </div>
    );
};

export default CreateBlogPage;