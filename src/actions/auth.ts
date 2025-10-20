"use server";
export const UserRegisterServerActionFunc = async (values: unknown) => {
  console.log(values);
  return {
    message: "only owner can register",
    success: true,
  };
};
