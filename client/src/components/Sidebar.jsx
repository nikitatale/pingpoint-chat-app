import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems';
import { CirclePlus, LogOut } from 'lucide-react';
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useSelector } from 'react-redux'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const { signOut } = useClerk();

  return (
    <>
      <style>{`
        .sidebar-wrap {
          width: 240px;
          background: #080F24;
          border-right: 1px solid rgba(99,102,241,0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 20;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        @media (min-width: 1280px) { .sidebar-wrap { width: 272px; } }
        @media (max-width: 639px) {
          .sidebar-wrap {
            position: absolute;
            top: 0; bottom: 0;
          }
          .sidebar-wrap.closed { transform: translateX(-100%); }
          .sidebar-wrap.open   { transform: translateX(0); }
        }

        
        .sidebar-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
        }

        .sidebar-logo {
          width: 100%;
          padding: 1.1rem 1.5rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        .logo-icon {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #6366F1, #0EA5E9);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 14px rgba(99,102,241,0.4);
        }
        .logo-name {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: -0.3px;
          background: linear-gradient(90deg, #ffffff, #A5B4FC);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebar-divider {
          width: calc(100% - 2rem);
          height: 1px;
          background: rgba(99,102,241,0.15);
          margin: 0 1rem 1.5rem;
        }

        .new-post-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 0;
          margin: 1rem 1.5rem 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 4px 15px rgba(79,70,229,0.3);
          position: relative;
          overflow: hidden;
        }
        .new-post-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.4s;
        }
        .new-post-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.45); }
        .new-post-btn:hover::after { left: 100%; }
        .new-post-btn:active { transform: scale(0.97); }

        .sidebar-footer {
          width: 100%;
          border-top: 1px solid rgba(99,102,241,0.15);
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user-info { display: flex; gap: 10px; align-items: center; cursor: pointer; }
        .user-name { font-size: 0.85rem; font-weight: 500; color: #E2E8F0; }
        .user-handle { font-size: 0.72rem; color: #64748B; }
        .logout-btn {
          color: #475569;
          width: 18px; height: 18px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .logout-btn:hover { color: #F87171; }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap"
        rel="stylesheet"
      />

      <div className={`sidebar-wrap ${sidebarOpen ? 'open' : 'closed'}`}>
        <div style={{ width: '100%' }}>

        
          <div className="sidebar-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9"  cy="10" r="1" fill="white" stroke="none" />
                <circle cx="12" cy="10" r="1" fill="white" stroke="none" />
                <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="logo-name">PingPoint</span>
          </div>

          <div className="sidebar-divider" />

          <MenuItems setSidebarOpen={setSidebarOpen} />

          <Link to="/create-post" className="new-post-btn">
            <CirclePlus style={{ width: 18, height: 18 }} />
            New Post
          </Link>
        </div>

      
        <div className="sidebar-footer">
          <div className="user-info">
            <UserButton />
            <div>
              <p className="user-name">{user.full_name}</p>
              <p className="user-handle">@{user.username}</p>
            </div>
          </div>
          <LogOut className="logout-btn" onClick={signOut} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;