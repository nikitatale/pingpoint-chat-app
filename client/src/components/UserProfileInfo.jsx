import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
  return (
    <>
      <style>{`
        .upi-wrap {
          position: relative;
          padding: 1rem 1.5rem 1.2rem;
          background: transparent;
        }
        .upi-avatar-ring {
          position: absolute;
          top: -56px; left: 1.5rem;
          width: 100px; height: 100px;
          border-radius: 50%;
          border: 4px solid #0B1425;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.2);
          overflow: hidden;
          background: #1E293B;
          z-index: 10;
        }
        .upi-avatar-ring img {
          width: 100px; height: 100px;
          object-fit: cover;
          border-radius: 50%;
          display: block;
          position: relative;
          z-index: 11;
        }
        .upi-body { padding-top: 3.5rem; }
        .upi-top {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .upi-top { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }
        .upi-name-row { display: flex; align-items: center; gap: 8px; }
        .upi-name { font-size: 1.4rem; font-weight: 700; color: #F0F4FF; }
        .upi-handle { font-size: 0.85rem; color: #475569; margin-top: 2px; }

        .upi-edit-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 10px;
          color: #94A3B8; font-size: 0.82rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
          white-space: nowrap; flex-shrink: 0;
        }
        .upi-edit-btn:hover { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.4); color: #A5B4FC; }

        .upi-bio { font-size: 0.88rem; color: #94A3B8; max-width: 480px; margin-top: 0.8rem; line-height: 1.6; }

        .upi-meta {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-top: 0.8rem;
        }
        .upi-meta-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.8rem; color: #475569;
        }

        .upi-stats {
          display: flex; align-items: center; gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(99,102,241,0.1);
        }
        .upi-stat-num { font-size: 1.1rem; font-weight: 700; color: #E2E8F0; }
        .upi-stat-label { font-size: 0.75rem; color: #475569; margin-left: 4px; }
      `}</style>

      <div className="upi-wrap">
      
        <div className="upi-avatar-ring">
          <img src={user.profile_picture} alt="avatar" />
        </div>

        <div className="upi-body">
          <div className="upi-top">
            <div>
              <div className="upi-name-row">
                <h1 className="upi-name">{user.full_name}</h1>
                <Verified style={{ width: 20, height: 20, color: '#38BDF8' }} />
              </div>
              <p className="upi-handle">{user.username ? `@${user.username}` : 'Add a username'}</p>
            </div>
            {!profileId && (
              <button className="upi-edit-btn" onClick={() => setShowEdit(true)}>
                <PenBox style={{ width: 14, height: 14 }} /> Edit Profile
              </button>
            )}
          </div>

          {user.bio && <p className="upi-bio">{user.bio}</p>}

          <div className="upi-meta">
            <span className="upi-meta-item">
              <MapPin style={{ width: 14, height: 14, color: '#6366F1' }} />
              {user.location || 'Add location'}
            </span>
            <span className="upi-meta-item">
              <Calendar style={{ width: 14, height: 14, color: '#6366F1' }} />
              Joined {moment(user.createdAt).fromNow()}
            </span>
          </div>

          <div className="upi-stats">
            <div>
              <span className="upi-stat-num">{posts.length}</span>
              <span className="upi-stat-label">Posts</span>
            </div>
            <div>
              <span className="upi-stat-num">{user.followers.length}</span>
              <span className="upi-stat-label">Followers</span>
            </div>
            <div>
              <span className="upi-stat-num">{user.following.length}</span>
              <span className="upi-stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileInfo