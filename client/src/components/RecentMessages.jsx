import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuth, useUser } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const RecentMessages = () => {
  const [messages, setMessages] = useState([])
  const { user } = useUser()
  const { getToken } = useAuth()

  const fetchRecentMessages = async () => {
    try {
      const token = await getToken()
      const { data } = await api.get('/api/user/recent-messages', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        const grouped = data.messages.reduce((acc, msg) => {
          const id = msg.from_user_id._id
          if (!acc[id] || new Date(msg.createdAt) > new Date(acc[id].createdAt)) acc[id] = msg
          return acc
        }, {})
        setMessages(Object.values(grouped).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRecentMessages()
      const interval = setInterval(fetchRecentMessages, 3000)
      return () => clearInterval(interval)
    }
  }, [user])

  return (
    <>
      <style>{`
        .rm-card {
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 16px;
          padding: 1rem;
          width: 260px;
          margin-top: 1rem;
          backdrop-filter: blur(12px);
        }
        .rm-title {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 0.8rem;
        }
        .rm-list {
          display: flex;
          flex-direction: column;
          max-height: 320px;
          overflow-y: auto;
          gap: 2px;
        }
        .rm-list::-webkit-scrollbar { width: 3px; }
        .rm-list::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }

        .rm-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .rm-item:hover { background: rgba(99,102,241,0.08); }

        .rm-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(99,102,241,0.3);
          flex-shrink: 0;
        }
        .rm-name { font-size: 0.8rem; font-weight: 600; color: #E2E8F0; }
        .rm-time { font-size: 0.65rem; color: #475569; }
        .rm-text { font-size: 0.75rem; color: #64748B; }
        .rm-unseen {
          width: 18px; height: 18px;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(79,70,229,0.5);
        }
        .rm-empty {
          font-size: 0.8rem;
          color: #475569;
          text-align: center;
          padding: 1.5rem 0;
        }
      `}</style>

      <div className="rm-card">
        <p className="rm-title">Recent Messages</p>
        <div className="rm-list">
          {messages.length === 0 ? (
            <p className="rm-empty">No messages yet</p>
          ) : (
            messages.map((msg, i) => (
              <Link to={`/messages/${msg.from_user_id._id}`} key={i} className="rm-item">
                <img src={msg.from_user_id.profile_picture} alt="avatar" className="rm-avatar" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="rm-name">{msg.from_user_id.full_name}</span>
                    <span className="rm-time">{moment(msg.createdAt).fromNow()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="rm-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130 }}>
                      {msg.text || 'Media'}
                    </span>
                    {!msg.seen && <span className="rm-unseen">1</span>}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default RecentMessages