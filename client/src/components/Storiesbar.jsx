import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Storiesbar = () => {
  const { getToken } = useAuth()
  const [stories, setStories] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = async () => {
    try {
      const token = await getToken()
      const { data } = await api('/api/story/get', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) setStories(data.stories)
      else toast(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchStories() }, [])

  return (
    <>
      <style>{`
        .stories-bar {
          width: 100%;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .stories-bar::-webkit-scrollbar { height: 3px; }
        .stories-bar::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }

        .stories-track {
          display: flex;
          gap: 12px;
          padding: 4px 2px 8px;
          width: max-content;
        }

       
        .story-create {
          min-width: 100px; max-width: 100px;
          aspect-ratio: 3/4;
          border-radius: 14px;
          border: 2px dashed rgba(99,102,241,0.4);
          background: rgba(99,102,241,0.06);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .story-create:hover {
          border-color: rgba(99,102,241,0.7);
          background: rgba(99,102,241,0.12);
          transform: translateY(-2px);
        }
        .story-create-icon {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #4F46E5, #0EA5E9);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 12px rgba(79,70,229,0.4);
        }
        .story-create-label {
          font-size: 0.72rem; font-weight: 500; color: #64748B; text-align: center;
        }

       
        .story-card {
          position: relative;
          min-width: 100px; max-width: 100px;
          aspect-ratio: 3/4;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          background: linear-gradient(to bottom, #4F46E5, #1E293B);
          border: 1px solid rgba(99,102,241,0.2);
          transition: all 0.2s;
        }
        .story-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .story-card:active { transform: scale(0.96); }

        .story-avatar {
          position: absolute;
          top: 8px; left: 8px; z-index: 10;
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid rgba(99,102,241,0.8);
          object-fit: cover;
          box-shadow: 0 0 8px rgba(79,70,229,0.5);
        }
        .story-media {
          position: absolute; inset: 0; z-index: 1;
          border-radius: 14px; overflow: hidden;
        }
        .story-media img,
        .story-media video {
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0.75; transition: opacity 0.2s;
        }
        .story-card:hover .story-media img,
        .story-card:hover .story-media video { opacity: 0.9; }

       
        .story-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          z-index: 2;
        }
        .story-time {
          position: absolute; bottom: 6px; right: 8px;
          font-size: 0.6rem; color: rgba(255,255,255,0.7);
          z-index: 3;
        }
        .story-text-preview {
          position: absolute; bottom: 24px; left: 8px; right: 8px;
          font-size: 0.65rem; color: rgba(255,255,255,0.5);
          z-index: 3;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
      `}</style>

      <div className="stories-bar">
        <div className="stories-track">

       
          <div className="story-create" onClick={() => setShowModel(true)}>
            <div className="story-create-icon">
              <Plus style={{ width: 18, height: 18, color: 'white' }} />
            </div>
            <span className="story-create-label">Create Story</span>
          </div>

       
          {stories.map((story, i) => (
            <div key={i} className="story-card" onClick={() => setViewStory(story)}>
              <img src={story.user.profile__picture} alt="user" className="story-avatar" />

              {story.media_type !== 'text' && (
                <div className="story-media">
                  {story.media_type === 'image'
                    ? <img src={story.media_url} alt="story" />
                    : <video src={story.media_url} />
                  }
                </div>
              )}

              <div className="story-fade" />
              {story.content && <p className="story-text-preview">{story.content}</p>}
              <p className="story-time">{moment(story.createdAt).fromNow()}</p>
            </div>
          ))}
        </div>
      </div>

      {showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories} />}
      {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
    </>
  )
}

export default Storiesbar