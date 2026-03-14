import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'

const Layout = () => {
  const user = useSelector((state) => state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return user ? (
    <>
      <style>{`
        .layout-wrap { width: 100%; display: flex; height: 100vh; background: #050A1A; overflow: hidden; }
        .layout-main { flex: 1; overflow: hidden; background: #050A1A; }

        .layout-menu-toggle {
          position: absolute; top: 12px; right: 12px; z-index: 100;
          width: 38px; height: 38px;
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #94A3B8; cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .layout-menu-toggle:hover { background: rgba(99,102,241,0.15); color: #A5B4FC; border-color: rgba(99,102,241,0.4); }

    
        .sidebar-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 19;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(2px);
        }
        @media (max-width: 639px) {
          .sidebar-overlay.visible { display: block; }
          .layout-menu-toggle { display: flex; }
        }
        @media (min-width: 640px) {
          .layout-menu-toggle { display: none; }
        }
      `}</style>

      <div className="layout-wrap">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

       
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        <div className="layout-main">
          <Outlet />
        </div>

        
        <div
          className="layout-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen
            ? <X size={18} />
            : <Menu size={18} />
          }
        </div>
      </div>
    </>
  ) : <Loading />
}

export default Layout