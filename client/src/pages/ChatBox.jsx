import React, { useEffect, useId, useRef, useState } from 'react'
import { ImageIcon, SendHorizonal, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import { addMessage, resetMessages } from '../features/messages/messagesSlice'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const { messages } = useSelector((state) => state.messages)
  const { userId } = useParams()
  const { getToken } = useAuth()
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(null)
  const messageEndRef = useRef(null)
  const connections = useSelector((state) => state.connections.connections)

  const fetchUserMessages = async () => {
    try {
      const token = await getToken()
      dispatch(fetchUserMessages({ token, userId }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendMessage = async () => {
    try {
      if (!text && !image) return
      const token = await getToken()
      const formData = new FormData()
      formData.append('to_user_id', userId)
      formData.append('text', text)
      image && formData.append('image', image)
      const { data } = await api.post('/api/message/send', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setText(''); setImage(null)
        dispatch(addMessage(data.message))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserMessages()
    return () => { dispatch(resetMessages()) }
  }, [useId])

  useEffect(() => {
    if (connections.length > 0) {
      setUser(connections.find(c => c._id === userId))
    }
  }, [connections, useId])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return user && (
    <>
      <style>{`
        .chatbox-wrap {
          display: flex; flex-direction: column;
          height: 100vh;
          background: #050A1A;
          position: relative;
        }
        
        .chatbox-wrap::before {
          content: '';
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

    
        .chat-header {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 1.5rem;
          background: rgba(8,15,36,0.9);
          border-bottom: 1px solid rgba(99,102,241,0.15);
          backdrop-filter: blur(12px);
          position: relative; z-index: 2; flex-shrink: 0;
        }
        .chat-header-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(99,102,241,0.4);
          flex-shrink: 0;
        }
        .chat-header-name { font-size: 0.92rem; font-weight: 600; color: #E2E8F0; }
        .chat-header-handle { font-size: 0.75rem; color: #475569; margin-top: 1px; }
        .chat-online-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 6px rgba(52,211,153,0.6);
          margin-left: auto; flex-shrink: 0;
        }

    
        .chat-messages {
          flex: 1; overflow-y: auto;
          padding: 1.2rem 1.5rem;
          position: relative; z-index: 1;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }

        .chat-messages-inner { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }

  
        .bubble-wrap-sent   { display: flex; flex-direction: column; align-items: flex-end; }
        .bubble-wrap-recv   { display: flex; flex-direction: column; align-items: flex-start; }

        .bubble {
          padding: 10px 14px;
          font-size: 0.875rem;
          line-height: 1.55;
          max-width: 340px;
          word-break: break-word;
        }
        .bubble-sent {
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          border-radius: 18px 18px 4px 18px;
          box-shadow: 0 3px 12px rgba(79,70,229,0.3);
        }
        .bubble-recv {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(99,102,241,0.15);
          color: #CBD5E1;
          border-radius: 18px 18px 18px 4px;
        }
        .bubble img {
          max-width: 260px; border-radius: 10px;
          margin-bottom: 6px; display: block;
        }

   
        .chat-input-area {
          padding: 0.8rem 1.5rem 1.2rem;
          position: relative; z-index: 2; flex-shrink: 0;
        }
        .chat-input-bar {
          display: flex; align-items: center; gap: 10px;
          background: rgba(15,23,42,0.9);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 50px;
          padding: 6px 6px 6px 18px;
          max-width: 680px; margin: 0 auto;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s;
        }
        .chat-input-bar:focus-within {
          border-color: rgba(99,102,241,0.45);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }
        .chat-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: #E2E8F0; font-size: 0.9rem; font-family: inherit;
        }
        .chat-input::placeholder { color: #334155; }

        .chat-img-btn {
          color: #475569; cursor: pointer; transition: color 0.2s;
          display: flex; align-items: center;
          flex-shrink: 0;
        }
        .chat-img-btn:hover { color: #818CF8; }
        .chat-img-preview {
          height: 30px; border-radius: 6px;
          border: 1px solid rgba(99,102,241,0.3);
          cursor: pointer;
        }

        .chat-send-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          border: none; color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
          box-shadow: 0 3px 10px rgba(79,70,229,0.35);
        }
        .chat-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 14px rgba(79,70,229,0.5); }
        .chat-send-btn:active { transform: scale(0.95); }
      `}</style>

      <div className="chatbox-wrap">
     
        <div className="chat-header">
          <img src={user.profile__picture} alt="avatar" className="chat-header-avatar" />
          <div>
            <p className="chat-header-name">{user.full_name}</p>
            <p className="chat-header-handle">@{user.username}</p>
          </div>
          <div className="chat-online-dot" />
        </div>

   
        <div className="chat-messages">
          <div className="chat-messages-inner">
            {messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, i) => {
                const isSent = message.to_user_id === user._id
                return (
                  <div key={i} className={isSent ? 'bubble-wrap-sent' : 'bubble-wrap-recv'}>
                    <div className={`bubble ${isSent ? 'bubble-sent' : 'bubble-recv'}`}>
                      {message.message_type === 'image' && (
                        <img src={message.media_url} alt="media" />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                )
              })}
            <div ref={messageEndRef} />
          </div>
        </div>

      
        <div className="chat-input-area">
          <div className="chat-input-bar">
            <input
              type="text"
              className="chat-input"
              placeholder="Write something…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <label htmlFor="chat-image" className="chat-img-btn">
              {image
                ? <img src={URL.createObjectURL(image)} className="chat-img-preview" alt="preview" onClick={() => setImage(null)} />
                : <ImageIcon size={22} />
              }
              <input type="file" id="chat-image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <button className="chat-send-btn" onClick={sendMessage}>
              <SendHorizonal size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBox