import { BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer, interval
    if (viewStory && viewStory.media_type !== 'video') {
      setProgress(0)
      const duration = 5000
      const step = 100
      let elapsed = 0
      interval = setInterval(() => {
        elapsed += step
        setProgress((elapsed / duration) * 100)
      }, step)
      timer = setTimeout(() => setViewStory(null), duration)
    }
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [viewStory, setViewStory])

  const handleClose = () => setViewStory(null)
  if (!viewStory) return null

  const renderContent = () => {
    switch (viewStory.media_type) {
      case 'image':
        return <img src={viewStory.media_url} alt="story" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 12 }} />
      case 'video':
        return <video controls autoPlay src={viewStory.media_url} style={{ maxHeight: '90vh', borderRadius: 12 }} onEnded={() => setViewStory(null)} />
      case 'text':
        return (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', color: 'white', fontSize: '1.5rem',
            textAlign: 'center', lineHeight: 1.5,
          }}>
            {viewStory.content}
          </div>
        )
      default: return null
    }
  }

  return (
    <>
      <style>{`
        .sv-overlay {
          position: fixed; inset: 0; z-index: 110;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.92);
        }

        
        .sv-progress {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: rgba(255,255,255,0.15);
          z-index: 120;
        }
        .sv-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366F1, #38BDF8);
          transition: width 0.1s linear;
          border-radius: 0 2px 2px 0;
        }

        
        .sv-user {
          position: absolute; top: 20px; left: 16px;
          display: flex; align-items: center; gap: 10px;
          background: rgba(15,23,42,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 50px;
          padding: 6px 14px 6px 6px;
          z-index: 120;
        }
        .sv-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(99,102,241,0.5);
        }
        .sv-name {
          color: #E2E8F0; font-size: 0.82rem; font-weight: 500;
          display: flex; align-items: center; gap: 5px;
        }

        
        .sv-close {
          position: absolute; top: 16px; right: 16px; z-index: 120;
          background: rgba(15,23,42,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 8px;
          color: #94A3B8; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .sv-close:hover { background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.3); color: #F87171; }

        .sv-content {
          max-width: 90vw; max-height: 90vh;
          display: flex; align-items: center; justify-content: center;
          z-index: 110;
        }
      `}</style>

      <div
        className="sv-overlay"
        style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : undefined }}
      >
       
        <div className="sv-progress">
          <div className="sv-progress-fill" style={{ width: `${progress}%` }} />
        </div>

      
        <div className="sv-user">
          <img src={viewStory.user?.profile__picture} alt="user" className="sv-avatar" />
          <span className="sv-name">
            {viewStory.user?.full_name}
            <BadgeCheck size={14} style={{ color: '#38BDF8' }} />
          </span>
        </div>

     
        <button className="sv-close" onClick={handleClose}>
          <X size={18} />
        </button>

    
        <div className="sv-content">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default StoryViewer