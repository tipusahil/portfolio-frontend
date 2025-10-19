export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };
export const config = { matcher: ["/dashboard"] };

export const  middleware = async () =>{
console.log("hello from middleware")
};
//  ei middleware file diei nextjs project e public and private route protected kore. 
// ----------------nextjs middleware --------------
// import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export const middleware = async (request: NextRequest) => {
//   return NextResponse.redirect(new URL("/", request.url));
// };

// export const config = {
//  / matcher: "/about", // ekane array er vitore ja route dewa hobe shudo sei route er ketre ei middleware trigger hobe, default vabe sob route er ketre trigger hoi jodi config name obj ta na dewa hoi.
//   matcher: ['/about', '/dashboard'],
//   matcher: ['/about/:path*', '/dashboard/:path*'],
// };
