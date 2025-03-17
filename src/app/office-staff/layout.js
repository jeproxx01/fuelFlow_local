"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/office-staff/Sidebar";
import { Topbar } from "@/components/office-staff/Topbar";
import { usePathname } from "next/navigation";

export default function OfficeStaffLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Automatically handle sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Don't show sidebar and topbar on login page
  const isLoginPage = pathname === "/office-staff/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Fixed Topbar */}
        <div className="fixed top-0 right-0 left-0 z-20">
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-20"
            }`}
          >
            <Topbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}
