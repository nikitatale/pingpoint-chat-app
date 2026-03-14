import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
  return (
    <>
      <style>{
      `
        .menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 14px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 500;
          color: #64748B;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }
        .menu-link:hover {
          background: rgba(99,102,241,0.08);
          color: #A5B4FC;
        }
        .menu-link.active {
          background: rgba(99,102,241,0.15);
          color: #A5B4FC;
          border: 1px solid rgba(99,102,241,0.25);
        }
        .menu-link.active::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 3px;
          background: linear-gradient(to bottom, #6366F1, #0EA5E9);
          border-radius: 0 3px 3px 0;
        }
      `}
      
      </style>

      
      <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {menuItemsData.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <Icon style={{ width: 18, height: 18 }} />
            {label}
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default MenuItems