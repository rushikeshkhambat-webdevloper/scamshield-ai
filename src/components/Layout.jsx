import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <NavBar />
      <main className="max-w-2xl mx-auto p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}