import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      {/* Navbar / Header irundha inga */}
      <Toaster position="top-right" />
      <Outlet />
      {/* Footer irundha inga */}
    </>
  );      
} 
