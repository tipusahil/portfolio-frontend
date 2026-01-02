// ✅ Browser-safe UUID generator


/* 
total 3ta folder er modde (facebook conversion api and pixel setup) er jabotio sob kisu ase : folder gulo holo : 
1. --> src/lib/(facebook-conversion-api-and-pixel-setup-folder-1) : ei folder ta 
2. --> src/app/api/(meta/capi/route.ts) : ei file ta// evabei rakte hobe.
3. --> FacebookPixelProvider-folder-2 : ei folder ta ekdom .env er layer e eta ase.
*/


export const generateUUID = (): string => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    // Modern browsers
    return window.crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};