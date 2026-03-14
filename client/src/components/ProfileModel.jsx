import React, { useState } from 'react'
import { Pencil, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../features/user/userSlice'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

const ProfileModel = ({ setShowEdit }) => {
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const user = useSelector((state) => state.user.value)

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: user.profile_picture,
    full_name: user.full_name,
    cover_photo: null,
  })

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    try {
      const userData = new FormData()
      const { full_name, username, bio, location, profile_picture, cover_photo } = editForm
      userData.append('username', username)
      userData.append('bio', bio)
      userData.append('location', location)
      userData.append('full_name', full_name)
      profile_picture && userData.append('profile', profile_picture)
      cover_photo && userData.append('cover', cover_photo)
      const token = await getToken()
      dispatch(updateUser({ userData, token }))
      setShowEdit(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          overflow-y: auto;
          padding: 1.5rem 1rem;
        }
        .modal-card {
          max-width: 600px;
          margin: 0 auto;
          background: #0B1425;
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px;
          padding: 1.8rem;
          position: relative;
          box-shadow: 0 0 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1);
        }
        .modal-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #F0F4FF;
          margin-bottom: 1.5rem;
        }

        .close-btn {
          position: absolute;
          top: 1.2rem; right: 1.2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #64748B;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .close-btn:hover { background: rgba(248,113,113,0.1); border-color: rgba(248,113,113,0.3); color: #F87171; }

        .field-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: #94A3B8;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
        }

        .dark-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 10px;
          padding: 10px 14px;
          color: #E2E8F0;
          font-size: 0.88rem;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .dark-input:focus {
          border-color: rgba(99,102,241,0.45);
          background: rgba(99,102,241,0.06);
        }
        .dark-input::placeholder { color: #334155; }

        .form-row { margin-bottom: 1rem; }

       
        .avatar-wrap {
          position: relative;
          width: fit-content;
          cursor: pointer;
          margin-top: 8px;
        }
        .avatar-img {
          width: 80px; height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(99,102,241,0.35);
        }
        .avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .avatar-wrap:hover .avatar-overlay { opacity: 1; }

    
        .cover-wrap {
          position: relative;
          cursor: pointer;
          margin-top: 8px;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          max-width: 360px;
        }
        .cover-img {
          width: 100%;
          height: 130px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(99,102,241,0.2);
          background: linear-gradient(135deg, #111B3D, #394b88);
          display: block;
        }
        .cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cover-wrap:hover .cover-overlay { opacity: 1; }

     
        .btn-cancel {
          padding: 9px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #94A3B8;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-cancel:hover { background: rgba(255,255,255,0.08); color: #E2E8F0; }

        .btn-save {
          padding: 9px 22px;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          font-family: inherit;
          box-shadow: 0 4px 14px rgba(79,70,229,0.35);
        }
        .btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.45); }
        .btn-save:active { transform: scale(0.97); }

        .form-divider {
          height: 1px;
          background: rgba(99,102,241,0.1);
          margin: 1.2rem 0;
        }
      `}</style>

      <div className="modal-overlay">
        <div className="modal-card">

         
          <button className="close-btn" type="button" onClick={() => setShowEdit(false)}>
            <X style={{ width: 16, height: 16 }} />
          </button>

          <h2 className="modal-title">Edit Profile</h2>

          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
            onSubmit={(e) => toast.promise(handleSaveProfile(e), { loading: 'Saving...' })}
          >
        
            <div className="form-row">
              <label className="field-label" htmlFor="profile_picture">Profile Picture</label>
              <input
                hidden
                id="profile_picture"
                type="file"
                accept="image/*"
                onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })}
              />
              <label htmlFor="profile_picture" className="avatar-wrap">
                <img
                  src={
                    editForm.profile_picture instanceof File
                      ? URL.createObjectURL(editForm.profile_picture)
                      : editForm.profile_picture
                  }
                  alt="avatar"
                  className="avatar-img"
                />
                <div className="avatar-overlay">
                  <Pencil style={{ width: 18, height: 18, color: 'white' }} />
                </div>
              </label>
            </div>

         
            <div className="form-row">
              <label className="field-label" htmlFor="cover_photo">Cover Photo</label>
              <input
                hidden
                id="cover_photo"
                type="file"
                accept="image/*"
                onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })}
              />
              <label htmlFor="cover_photo" className="cover-wrap">
                <img
                  src={
                    editForm.cover_photo
                      ? URL.createObjectURL(editForm.cover_photo)
                      : user.cover_photo
                  }
                  alt="cover"
                  className="cover-img"
                />
                <div className="cover-overlay">
                  <Pencil style={{ width: 20, height: 20, color: 'white' }} />
                </div>
              </label>
            </div>

            <div className="form-divider" />

        
            <div className="form-row">
              <label className="field-label">Name</label>
              <input
                type="text"
                className="dark-input"
                placeholder="Your full name"
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              />
            </div>

         
            <div className="form-row">
              <label className="field-label">Username</label>
              <input
                type="text"
                className="dark-input"
                placeholder="@username"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              />
            </div>

         
            <div className="form-row">
              <label className="field-label">Bio</label>
              <textarea
                rows={3}
                className="dark-input"
                style={{ resize: 'vertical' }}
                placeholder="Tell something about yourself..."
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            </div>

          
            <div className="form-row">
              <label className="field-label">Location</label>
              <input
                type="text"
                className="dark-input"
                placeholder="Where are you based?"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            </div>

          
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: '1rem' }}>
              <button type="button" className="btn-cancel" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProfileModel