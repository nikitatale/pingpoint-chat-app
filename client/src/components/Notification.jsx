import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Notification = ({ t, message }) => {
  const navigate = useNavigate()

  return (
    <>
      <style>
        {`
        .notif-card {
          max-width: 380px;
          width: 100%;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 14px;
          display: flex;
          overflow: hidden;
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1);
          transition: transform 0.2s;
        }
        .notif-card:hover { transform: scale(1.02); }

        .notif-body { flex: 1; padding: 12px 14px; display: flex; align-items: flex-start; gap: 10px; }
        .notif-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(99,102,241,0.3); }
        .notif-name { font-size: 0.82rem; font-weight: 600; color: #E2E8F0; margin-bottom: 2px; }
        .notif-text { font-size: 0.78rem; color: #64748B; }

        .notif-action {
          display: flex;
          align-items: center;
          border-left: 1px solid rgba(99,102,241,0.15);
        }
        .notif-btn {
          padding: 0 16px;
          height: 100%;
          font-size: 0.8rem;
          font-weight: 600;
          color: #818CF8;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .notif-btn:hover { color: #A5B4FC; background: rgba(99,102,241,0.1); }
      `}
      
      </style>

      <div className="notif-card">
        <div className="notif-body">
          <img src={message.from_user_id.profile_picture} alt="avatar" className="notif-avatar" />
          <div>
            <p className="notif-name">{message.from_user_id.full_name}</p>
            <p className="notif-text">{message.text.slice(0, 55)}{message.text.length > 55 ? '…' : ''}</p>
          </div>
        </div>
        <div className="notif-action">
          <button
            className="notif-btn"
            onClick={() => {
              navigate(`/messages/${message.from_user_id._id}`)
              toast.dismiss(t.id)
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </>
  )
}

export default Notification