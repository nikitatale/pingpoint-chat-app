import { useAuth } from '@clerk/clerk-react'
import { ArrowLeft, Sparkles, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const bgColors = [
  "#1E1E2F", "#FF6F61", "#2E8B57", "#F4A261",
  "#264653", "#6A0572", "#D62828", "#F1FAEE",
  "#E9C46A", "#A8DADC", "#E91E63", "#00BCD4",
  "#FF9800", "#4CAF50",
]

const StoryModel = ({ setShowModel, fetchStories }) => {
  const [mode, setMode] = useState("text")
  const [background, setBackground] = useState(bgColors[0])
  const [text, setText] = useState("")
  const [media, setMedia] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const { getToken } = useAuth()

  const MAX_VIDEO_DURATION = 60
  const MAX_VIDEO_SIZE_MB = 50

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("video")) {
        if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
          toast.error(`Video cannot exceed ${MAX_VIDEO_SIZE_MB}MB`)
          return
        }
        const video = document.createElement("video")
        video.preload = 'metadata'
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src)
          if (video.duration > MAX_VIDEO_DURATION) {
            toast.error("Video cannot exceed 1 minute")
            setMedia(null); setPreviewUrl(null)
          } else {
            setMedia(file); setPreviewUrl(URL.createObjectURL(file))
            setText(''); setMode("media")
          }
        }
        video.src = URL.createObjectURL(file)
      } else if (file.type.startsWith("image")) {
        setMedia(file); setPreviewUrl(URL.createObjectURL(file))
        setText(''); setMode("media")
      }
    }
  }

  const handleCreateStory = async () => {
    const media_type = mode === 'media'
      ? media?.type.startsWith('image') ? 'image' : 'video'
      : 'text'
    if (media_type === 'text' && !text) throw new Error("Please enter some text")

    const formData = new FormData()
    formData.append('content', text)
    formData.append('media_type', media_type)
    formData.append('media', media)
    formData.append('background_color', background)

    const token = await getToken()
    try {
      const { data } = await api.post('/api/story/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setShowModel(false)
        toast.success("Story created!")
        fetchStories()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <style>{`
        .story-overlay {
          position: fixed; inset: 0; z-index: 110;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .story-modal {
          width: 100%; max-width: 420px;
        }
        .story-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1rem;
        }
        .story-back-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 8px;
          color: #94A3B8; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .story-back-btn:hover { background: rgba(99,102,241,0.15); color: #A5B4FC; border-color: rgba(99,102,241,0.3); }

        .story-title {
          font-size: 1rem; font-weight: 600; color: #F0F4FF;
        }

        .story-preview {
          border-radius: 16px;
          height: 380px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(99,102,241,0.2);
        }
        .story-preview textarea {
          background: transparent; color: white;
          width: 100%; height: 100%; padding: 1.5rem;
          font-size: 1.1rem; resize: none; outline: none;
          font-family: inherit; line-height: 1.6;
        }
        .story-preview textarea::placeholder { color: rgba(255,255,255,0.35); }

        .color-row {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1rem;
        }
        .color-dot {
          width: 24px; height: 24px; border-radius: 50%;
          cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .color-dot:hover { transform: scale(1.2); }
        .color-dot.selected {
          border-color: white;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
          transform: scale(1.15);
        }

        .mode-row {
          display: flex; gap: 8px; margin-top: 1rem;
        }
        .mode-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 7px; padding: 10px;
          border-radius: 10px; cursor: pointer;
          font-size: 0.85rem; font-weight: 500;
          transition: all 0.2s; font-family: inherit; border: none;
        }
        .mode-btn.active {
          background: white; color: #0F172A;
        }
        .mode-btn.inactive {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94A3B8;
        }
        .mode-btn.inactive:hover { background: rgba(99,102,241,0.12); color: #A5B4FC; }

        .create-btn {
          width: 100%; margin-top: 1rem;
          padding: 12px; border-radius: 12px;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          border: none; color: white;
          font-size: 0.92rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          cursor: pointer; transition: all 0.25s; font-family: inherit;
          box-shadow: 0 4px 15px rgba(79,70,229,0.35);
        }
        .create-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.45); }
        .create-btn:active { transform: scale(0.97); }
      `}</style>

      <div className="story-overlay">
        <div className="story-modal">

       
          <div className="story-header">
            <button className="story-back-btn" onClick={() => setShowModel(false)}>
              <ArrowLeft size={18} />
            </button>
            <span className="story-title">Create Story</span>
            <span style={{ width: 38 }} />
          </div>

     
          <div className="story-preview" style={{ backgroundColor: background }}>
            {mode === "text" && (
              <textarea
                placeholder="Add something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}
            {mode === "media" && previewUrl && (
              media?.type.startsWith('image')
                ? <img src={previewUrl} alt="preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                : <video src={previewUrl} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            )}
          </div>

        
          <div className="color-row">
            {bgColors.map((color) => (
              <button
                key={color}
                className={`color-dot ${background === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setBackground(color)}
              />
            ))}
          </div>

      
          <div className="mode-row">
            <button
              className={`mode-btn ${mode === 'text' ? 'active' : 'inactive'}`}
              onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null) }}
            >
              <TextIcon size={16} /> Text
            </button>
            <label className={`mode-btn ${mode === 'media' ? 'active' : 'inactive'}`}>
              <input type="file" accept="image/*, video/*" hidden onChange={handleMediaUpload} />
              <Upload size={16} /> Photo / Video
            </label>
          </div>

         
          <button
            className="create-btn"
            onClick={() => toast.promise(handleCreateStory(), { loading: "Creating story..." })}
          >
            <Sparkles size={17} /> Create Story
          </button>

        </div>
      </div>
    </>
  )
}

export default StoryModel