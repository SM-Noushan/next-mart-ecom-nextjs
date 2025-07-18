import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100dvh-447px)]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
