import crypto from "crypto";

export const hashData = (data?: string): string | undefined => {
  if (!data) return undefined;

  return crypto
    .createHash("sha256")
    .update(data.trim().toLowerCase())
    .digest("hex");


    /* 
    const externalId = crypto
  .createHash("sha256")
  .update(userId)
  .digest("hex");
    
    */
};
