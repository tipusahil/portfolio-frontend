"use server";
export const UserRegisterServerActionFunc = async (values: any) => {
  console.log(values);
  return {
    message: "only owner can register",
    success: true,
  };
};
