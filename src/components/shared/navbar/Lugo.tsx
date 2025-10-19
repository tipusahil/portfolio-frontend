"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Lugo = () => {
    const router = useRouter();
  return (
    <div>
   
 <button onClick={ () => router.push("/")}>
           <div className="flex items-center text-primary p-1">
          {/* <div className="flex items-center custom-bg p-1"> */}
          <Image src={"/lugos/lugo_ts.png"} width={40} alt="Lugo" height={40} />
          <h2 className="text-2xl">Tipusahil</h2>
        </div>
 </button>
      
    </div>
  );
};

export default Lugo;
