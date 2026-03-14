import React, { useEffect, useState } from 'react'
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { fetchConnections } from '../features/connections/connectionSlice'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Connections = () => {
  const [currentTab, setCurrentTab] = useState('Followers')
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const { connections, pendingConnections, followers, following } = useSelector((state) => state.connections)

  const dataArray = [
    { label: 'Followers',    value: followers,           icon: Users },
    { label: 'Following',    value: following,           icon: UserCheck },
    { label: 'Pending',      value: pendingConnections,  icon: UserRoundPen },
    { label: 'Connections',  value: connections,         icon: UserPlus },
  ]

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await api.post('/api/user/unfollow', { id: userId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) { toast.success(data.message); dispatch(fetchConnections(await getToken())) }
      else toast(data.error)
    } catch (error) { toast.error(error.message) }
  }

  const acceptConnection = async (userId) => {
    try {
      const { data } = await api.post('/api/user/accept', { id: userId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) { toast.success(data.message); dispatch(fetchConnections(await getToken())) }
      else toast(data.error)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => {
    getToken().then((token) => dispatch(fetchConnections(token)))
  }, [])

  const activeData = dataArray.find((d) => d.label === currentTab)?.value || []

  return (
    <>
      <style>{`
        .conn-page {
          min-height: 100vh;
          background: #050A1A;
          position: relative;
        }
        .conn-page::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .conn-inner { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; position: relative; z-index: 1; }

        .conn-page-title { font-size: 1.8rem; font-weight: 700; color: #F0F4FF; margin-bottom: 4px; }
        .conn-page-sub   { font-size: 0.88rem; color: #475569; }

    
        .conn-stats { display: flex; flex-wrap: wrap; gap: 12px; margin: 1.5rem 0; }
        .conn-stat-card {
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 14px; padding: 1rem 1.4rem;
          min-width: 110px;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s;
        }
        .conn-stat-card:hover { border-color: rgba(99,102,241,0.35); }
        .conn-stat-num   { font-size: 1.3rem; font-weight: 700; color: #E2E8F0; }
        .conn-stat-label { font-size: 0.75rem; color: #475569; }

 
        .conn-tabs {
          display: inline-flex; flex-wrap: wrap;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 12px; padding: 4px; gap: 2px;
          margin-bottom: 1.5rem;
        }
        .conn-tab {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 9px;
          font-size: 0.82rem; font-weight: 500;
          border: none; cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .conn-tab.active {
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          box-shadow: 0 3px 10px rgba(79,70,229,0.3);
        }
        .conn-tab.inactive { background: transparent; color: #64748B; }
        .conn-tab.inactive:hover { background: rgba(99,102,241,0.1); color: #A5B4FC; }

        
        .conn-list { display: flex; flex-direction: column; gap: 10px; }
        .conn-user-card {
          display: flex; align-items: center; gap: 14px;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 14px; padding: 1rem 1.2rem;
          max-width: 600px;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .conn-user-card:hover { border-color: rgba(99,102,241,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .conn-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          object-fit: cover; flex-shrink: 0;
          border: 2px solid rgba(99,102,241,0.3);
        }
        .conn-user-name { font-size: 0.92rem; font-weight: 600; color: #E2E8F0; }
        .conn-user-handle { font-size: 0.78rem; color: #475569; }
        .conn-user-bio { font-size: 0.78rem; color: #64748B; margin-top: 2px; }

        .conn-actions { display: flex; flex-direction: column; gap: 6px; margin-left: auto; flex-shrink: 0; }
        @media (min-width: 480px) { .conn-actions { flex-direction: row; align-items: center; } }

        .conn-btn-primary {
          padding: 7px 16px; border-radius: 9px; border: none;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white; font-size: 0.8rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(79,70,229,0.3);
        }
        .conn-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(79,70,229,0.4); }

        .conn-btn-secondary {
          padding: 7px 16px; border-radius: 9px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94A3B8; font-size: 0.8rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
          display: flex; align-items: center; gap: 5px; white-space: nowrap;
        }
        .conn-btn-secondary:hover { background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.3); color: #A5B4FC; }

        .conn-empty { font-size: 0.88rem; color: #475569; padding: 2rem 0; }
      `}</style>

      <div className="conn-page">
        <div className="conn-inner">
          <h1 className="conn-page-title">Connections</h1>
          <p className="conn-page-sub">Expand your circle, meet like-minded people, and turn every connection into a meaningful relationship.</p>

       
          <div className="conn-stats">
            {dataArray.map((item, i) => (
              <div key={i} className="conn-stat-card">
                <item.icon style={{ width: 18, height: 18, color: '#6366F1', marginBottom: 4 }} />
                <span className="conn-stat-num">{item.value.length}</span>
                <span className="conn-stat-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="conn-tabs">
            {dataArray.map((tab) => (
              <button
                key={tab.label}
                className={`conn-tab ${currentTab === tab.label ? 'active' : 'inactive'}`}
                onClick={() => setCurrentTab(tab.label)}
              >
                <tab.icon style={{ width: 14, height: 14 }} />
                {tab.label}
              </button>
            ))}
          </div>

       
          <div className="conn-list">
            {activeData.length === 0 ? (
              <p className="conn-empty">No {currentTab.toLowerCase()} yet.</p>
            ) : (
              activeData.map((user) => (
                <div key={user._id} className="conn-user-card">
                  <img src={user.profile_picture} alt="avatar" className="conn-avatar" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="conn-user-name">{user.full_name}</p>
                    <p className="conn-user-handle">@{user.username}</p>
                    {user.bio && <p className="conn-user-bio">{user.bio.slice(0, 50)}{user.bio.length > 50 ? '…' : ''}</p>}
                  </div>
                  <div className="conn-actions">
                    <button className="conn-btn-primary" onClick={() => navigate(`/profile/${user._id}`)}>
                      View Profile
                    </button>
                    {currentTab === 'Following' && (
                      <button className="conn-btn-secondary" onClick={() => handleUnfollow(user._id)}>
                        Unfollow
                      </button>
                    )}
                    {currentTab === 'Pending' && (
                      <button className="conn-btn-secondary" onClick={() => acceptConnection(user._id)}>
                        Accept
                      </button>
                    )}
                    {currentTab === 'Connections' && (
                      <button className="conn-btn-secondary" onClick={() => navigate(`/messages/${user._id}`)}>
                        <MessageSquare style={{ width: 14, height: 14 }} /> Message
                      </button>
                    )}
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

export default Connections