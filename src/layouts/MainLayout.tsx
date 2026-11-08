
import { Outlet } from "react-router-dom";
import { NavigationSidebarSection } from "../components/common/NavigationSidebarSection";
import { SearchAndActionsSection } from "../components/common/SearchAndActionsSection";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      <div className="fixed top-0 left-0 w-[367px] h-screen z-50">
        <NavigationSidebarSection />
      </div>

      <div className="flex flex-col flex-1 ml-[367px] min-w-0">

        <div className="sticky top-0 z-40 bg-white">
          <SearchAndActionsSection />
        </div>

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
