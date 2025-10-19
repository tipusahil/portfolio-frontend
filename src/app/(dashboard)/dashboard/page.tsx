"use client";
import Loading from '@/components/ui/Loading';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {


  // -----start---- browser theke next-auth er maddome token get kora ----
  // const session =await getServerSession(authOptions)
  // console.log("dashboard theke : ----",session)
  
  // // if (status === "loading") return <p>Loading...</p>;
  // if (!session) redirect("/login");

  // -------end--


  // --option-2:
    const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  if (status === "loading") return <Loading/>;


  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className="text-2xl">dashboard page</h2>
      <h2 className="text-2xl">Owner Email: {session?.user.email}</h2>
      <h2 className="text-2xl">Owner Name: {session?.user?.name}</h2>
      {/* <LogoutCompo/> */}
    </div>
  );
};

export default DashboardPage;