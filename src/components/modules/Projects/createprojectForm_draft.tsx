// "use client";

// import { createProjectServerActionFunc } from "@/actions/new_project-create";
// import SingleImageUploader from "@/components/SingleFileUploader";
// import Form from "next/form";

// const CreateProjectForm = () => {
//   return (
//     <div className=" min-w-[300px] max-w-[700px] w-full h-screen ">
//       <Form
//         // action={"/projects"}
//         action={createProjectServerActionFunc}
//         formEncType="multipart/form-data"
//         className="max-w-3xl mx-auto p-6  shadow-md rounded-lg space-y-3 w-full"
//       >
//         <h2 className="text-xl font-semibold mb-4">Create Project</h2>

//         <div>
       
//           <div>
//             <input
//               type="text"
//               placeholder="project title"
//               id="project-title"
//               name="title"
//               className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           <div>
//             <textarea
//               rows={2}
//               placeholder="Description"
//               id="project-description"
//               name="description"
//               className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//                     <div>
//               <input
//               type="text"
//               placeholder="project Live Link"
//               id="project-Link"
//               name="link"
//               className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//        {/* --------- */}
//           <div className="w-full rounded-md">
//             <SingleImageUploader
//               message={"Thumbnail"}
//               onChange={(file) => {
//                 if (file) {
//                   const dataTransfer = new DataTransfer();
//                   dataTransfer.items.add(file as File);
//                   const input =
//                     document.querySelector<HTMLInputElement>("#thumbnail-file");
//                   if (input) {
//                     input.files = dataTransfer.files;
//                   }
//                 }
//               }}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="tags">
//               Tags (comma separated)
//             </label>
//             <input
//               disabled
//               type="text"
//               id="tags"
//               name="tags"
//               placeholder="Which Technology you use in this project e.g: next.js, typescript, etc"
//               className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Submit
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default CreateProjectForm;
