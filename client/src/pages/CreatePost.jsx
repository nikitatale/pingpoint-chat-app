import React, { useState } from 'react'
import { Image, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user.value)
  const { getToken } = useAuth()

  const handleSubmit = async () => {
    if (!images.length && !content) return toast.error('Please add at least one image or text')
    setLoading(true)
    const postType = images.length && content ? 'text_with_image' : images.length ? 'image' : 'text'
    try {
      const formData = new FormData()
      formData.append('content', content)
      formData.append('post_type', postType)
      images.forEach((img) => formData.append('images', img))
      const { data } = await api.post('/api/post/add', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) navigate('/')
      else throw new Error(data.message)
    } catch (error) {
      throw new Error(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        .cp-page {
          min-height: 100vh;
          background: #050A1A;
          position: relative;
        }
        .cp-page::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .cp-inner { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; position: relative; z-index: 1; }
        .cp-title { font-size: 1.8rem; font-weight: 700; color: #F0F4FF; margin-bottom: 4px; }
        .cp-sub   { font-size: 0.88rem; color: #475569; margin-bottom: 1.5rem; }

        .cp-card {
          max-width: 560px;
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 18px;
          padding: 1.4rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(0,0,0,0.3);
          position: relative;
        }
        .cp-card::before {
          content: '';
          position: absolute; top: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);
        }

      
        .cp-user-row { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
        .cp-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(99,102,241,0.35);
          flex-shrink: 0;
        }
        .cp-user-name   { font-size: 0.9rem; font-weight: 600; color: #E2E8F0; }
        .cp-user-handle { font-size: 0.75rem; color: #475569; }

  
        .cp-textarea {
          width: 100%; resize: none; max-height: 160px;
          background: transparent; border: none; outline: none;
          color: #CBD5E1; font-size: 0.92rem; font-family: inherit;
          line-height: 1.6; box-sizing: border-box;
        }
        .cp-textarea::placeholder { color: #334155; }

     
        .cp-images { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 0.8rem; }
        .cp-img-wrap { position: relative; }
        .cp-img-wrap img { height: 80px; border-radius: 10px; border: 1px solid rgba(99,102,241,0.2); display: block; }
        .cp-img-remove {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          border-radius: 10px;
          display: none; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .cp-img-wrap:hover .cp-img-remove { display: flex; }

        
        .cp-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 0.8rem;
          margin-top: 0.8rem;
          border-top: 1px solid rgba(99,102,241,0.1);
        }
        .cp-img-label {
          display: flex; align-items: center; gap: 6px;
          color: #475569; cursor: pointer; transition: color 0.2s;
          font-size: 0.82rem;
        }
        .cp-img-label:hover { color: #818CF8; }

        .cp-submit-btn {
          padding: 9px 28px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white; font-size: 0.88rem; font-weight: 600;
          cursor: pointer; transition: all 0.25s; font-family: inherit;
          box-shadow: 0 4px 14px rgba(79,70,229,0.3);
        }
        .cp-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(79,70,229,0.4); }
        .cp-submit-btn:active { transform: scale(0.97); }
        .cp-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      `}</style>

      <div className="cp-page">
        <div className="cp-inner">
          <h1 className="cp-title">Start a New Post</h1>
          <p className="cp-sub">Write what's on your mind and turn your moment into something worth sharing.</p>

          <div className="cp-card">
    
            <div className="cp-user-row">
              <img src={user.profile__picture} alt="avatar" className="cp-avatar" />
              <div>
                <p className="cp-user-name">{user.full_name}</p>
                <p className="cp-user-handle">@{user.username}</p>
              </div>
            </div>

        
            <textarea
              className="cp-textarea"
              rows={4}
              placeholder="Start typing your thoughts…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

          
            {images.length > 0 && (
              <div className="cp-images">
                {images.map((img, i) => (
                  <div key={i} className="cp-img-wrap">
                    <img src={URL.createObjectURL(img)} alt="preview" />
                    <div
                      className="cp-img-remove"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    >
                      <X style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

           
            <div className="cp-footer">
              <label htmlFor="cp-images" className="cp-img-label">
                <Image size={22} />
                <input
                  type="file" id="cp-images" accept="image/*" multiple hidden
                  onChange={(e) => setImages([...images, ...e.target.files])}
                />
              </label>

              <button
                className="cp-submit-btn"
                disabled={loading}
                onClick={() => toast.promise(handleSubmit(), {
                  loading: 'Uploading…',
                  success: <p>Post added!</p>,
                  error: <p>Post not added</p>
                })}
              >
                Post It
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost