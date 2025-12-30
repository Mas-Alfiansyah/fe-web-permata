import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/Sidebar';
import { SidebarProvider } from '../context/SidebarContext';
import TopNavbar from '../components/common/TopNavbar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          <main className="flex-1 overflow-auto p-4 lg:p-6 scroll-smooth">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
