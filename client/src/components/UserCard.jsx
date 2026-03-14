import React from 'react'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { fetchUser } from '../features/user/userSlice'

const UserCard = ({ user }) => {
  const currentUser = useSelector((state) => state.user.value)
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFollow = async () => {
    try {
      const { data } = await api.post('/api/user/follow', { id: user._id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) { toast.success(data.message); dispatch(fetchUser(await getToken())) }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const handleConnectionRequest = async () => {
    if (currentUser.connections.includes(user._id)) return navigate('/messages/' + user._id)
    try {
      const { data } = await api.post('/api/user/connect', { id: user._id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) toast.success(data.message)
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const isFollowing = currentUser?.following.includes(user._id)
  const isConnected = currentUser?.connections.includes(user._id)

  return (
    <>
      <style>{`
        .user-card {
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 16px;
          padding: 1.2rem 1rem 1rem;
          width: 240px;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          display: flex; flex-direction: column;
        }
        .user-card:hover {
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 6px 24px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .uc-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(99,102,241,0.4);
          margin: 0 auto;
          display: block;
          box-shadow: 0 0 16px rgba(99,102,241,0.2);
        }
        .uc-name {
          font-size: 0.95rem; font-weight: 600;
          color: #E2E8F0; text-align: center; margin-top: 0.75rem;
        }
        .uc-username { font-size: 0.78rem; color: #475569; text-align: center; }
        .uc-bio {
          font-size: 0.78rem; color: #64748B;
          text-align: center; margin-top: 0.5rem;
          line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .uc-meta {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 6px; margin-top: 0.8rem;
        }
        .uc-badge {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 20px; padding: 3px 10px;
          font-size: 0.72rem; color: #64748B;
        }
        .uc-actions { display: flex; gap: 8px; margin-top: 1rem; }
        .uc-follow-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 9px 0; border-radius: 10px; border: none;
          font-size: 0.82rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: inherit;
        }
        .uc-follow-btn.following {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818CF8;
        }
        .uc-follow-btn.not-following {
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          box-shadow: 0 3px 12px rgba(79,70,229,0.3);
        }
        .uc-follow-btn.not-following:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(79,70,229,0.4); }

        .uc-connect-btn {
          width: 40px; height: 38px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #64748B; transition: all 0.2s; flex-shrink: 0;
        }
        .uc-connect-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.3); color: #A5B4FC; }
        .uc-connect-btn:active { transform: scale(0.95); }
      `}</style>

      <div className="user-card">
        <img src={user.profile__picture} alt="avatar" className="uc-avatar" />
        <p className="uc-name">{user.full_name}</p>
        {user.username && <p className="uc-username">@{user.username}</p>}
        {user.bio && <p className="uc-bio">{user.bio}</p>}

        <div className="uc-meta">
          {user.location && (
            <span className="uc-badge">
              <MapPin style={{ width: 11, height: 11 }} /> {user.location}
            </span>
          )}
          <span className="uc-badge">
            {user.followers.length} Followers
          </span>
        </div>

        <div className="uc-actions">
          <button
            disabled={isFollowing}
            onClick={handleFollow}
            className={`uc-follow-btn ${isFollowing ? 'following' : 'not-following'}`}
          >
            <UserPlus style={{ width: 14, height: 14 }} />
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="uc-connect-btn" onClick={handleConnectionRequest}>
            {isConnected
              ? <MessageCircle style={{ width: 17, height: 17 }} />
              : <Plus style={{ width: 17, height: 17 }} />
            }
          </button>
        </div>
      </div>
    </>
  )
}

export default UserCard