import NavbarFlow2 from "@/components/shared/navbar/NavbarFlow";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="sticky top-0 right-0 left-0 z-50 ">
        {/* <Navbar /> */}
      
        <NavbarFlow2  />
      </div>
      <main className="min-h-dvh">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;
