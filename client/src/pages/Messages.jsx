import React from 'react'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Messages = () => {
  const { connections } = useSelector((state) => state.connections)
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        .msg-page {
          min-height: 100vh; background: #050A1A; position: relative;
        }
        .msg-page::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .msg-inner { max-width: 700px; margin: 0 auto; padding: 2rem 1.5rem; position: relative; z-index: 1; }
        .msg-title { font-size: 1.8rem; font-weight: 700; color: #F0F4FF; margin-bottom: 4px; }
        .msg-sub   { font-size: 0.88rem; color: #475569; margin-bottom: 1.5rem; }

        .msg-list { display: flex; flex-direction: column; gap: 8px; }

        .msg-card {
          display: flex; align-items: center; gap: 14px;
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 16px; padding: 1rem 1.2rem;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .msg-card:hover {
          border-color: rgba(99,102,241,0.28);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transform: translateX(3px);
        }
        .msg-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid rgba(99,102,241,0.3);
        }
        .msg-info { flex: 1; min-width: 0; }
        .msg-name { font-size: 0.92rem; font-weight: 600; color: #E2E8F0; }
        .msg-handle { font-size: 0.75rem; color: #475569; }
        .msg-bio { font-size: 0.78rem; color: #64748B; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .msg-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .msg-action-btn {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(99,102,241,0.15);
          background: rgba(255,255,255,0.04);
          color: #64748B; cursor: pointer; transition: all 0.2s;
        }
        .msg-action-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.35); color: #A5B4FC; }
        .msg-action-btn:active { transform: scale(0.94); }

        .msg-empty { font-size: 0.88rem; color: #475569; text-align: center; padding: 3rem 0; }
      `}</style>

      <div className="msg-page">
        <div className="msg-inner">
          <h1 className="msg-title">Messages</h1>
          <p className="msg-sub">Stay in touch with your world, one message at a time.</p>

          <div className="msg-list">
            {connections.length === 0 ? (
              <p className="msg-empty">No connections yet. Connect with people to message them!</p>
            ) : (
              connections.map((user) => (
                <div key={user._id} className="msg-card">
                  <img src={user.profile__picture} alt="avatar" className="msg-avatar" />
                  <div className="msg-info">
                    <p className="msg-name">{user.full_name}</p>
                    <p className="msg-handle">@{user.username}</p>
                    {user.bio && <p className="msg-bio">{user.bio}</p>}
                  </div>
                  <div className="msg-actions">
                    <button className="msg-action-btn" onClick={() => navigate(`/messages/${user._id}`)} title="Message">
                      <MessageSquare size={16} />
                    </button>
                    <button className="msg-action-btn" onClick={() => navigate(`/profile/${user._id}`)} title="View Profile">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Messages