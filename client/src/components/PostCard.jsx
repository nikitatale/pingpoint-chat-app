import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react"
import React, { useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useAuth } from "@clerk/clerk-react"
import api from "../api/axios"
import toast from "react-hot-toast"

const PostCard = ({ post }) => {
  const currentUser = useSelector((state) => state.user.value)
  const [likes, setLikes] = useState(post.likes_count || [])
  const { getToken } = useAuth()
  const navigate = useNavigate()

  const postWithHashtags = post.content.replace(
    /(#\w+)/g,
    '<span style="color:#818CF8;font-weight:500">$1</span>'
  )

  const handleLike = async () => {
    try {
      const { data } = await api.post("/api/post/like", { postId: post._id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        toast.success(data.message)
        setLikes(prev =>
          prev.includes(currentUser._id)
            ? prev.filter(id => id !== currentUser._id)
            : [...prev, currentUser._id]
        )
      } else {
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const isLiked = likes.includes(currentUser._id)

  return (
    <>
      <style>{`
        .post-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 16px;
          padding: 1rem;
          width: 100%;
          max-width: 600px;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .post-card:hover {
          border-color: rgba(99,102,241,0.25);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .post-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-bottom: 0.8rem;
        }
        .post-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(99,102,241,0.3);
          flex-shrink: 0;
        }
        .post-username { font-size: 0.92rem; font-weight: 600; color: #E2E8F0; }
        .post-handle  { font-size: 0.78rem; color: #475569; }

        .post-content {
          font-size: 0.88rem;
          color: #CBD5E1;
          line-height: 1.65;
          white-space: pre-line;
          margin-bottom: 0.8rem;
        }

        .post-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          margin-bottom: 0.8rem;
        }
        .post-images img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid rgba(99,102,241,0.1);
        }
        .post-images.single img { grid-column: span 2; height: auto; max-height: 360px; }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(99,102,241,0.1);
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          color: #475569;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 8px;
          transition: all 0.2s;
          background: transparent;
          border: none;
          font-family: inherit;
        }
        .action-btn:hover { background: rgba(99,102,241,0.1); color: #A5B4FC; }
        .action-btn.liked { color: #F87171; }
        .action-btn.liked:hover { background: rgba(248,113,113,0.1); color: #F87171; }
      `}</style>

      <div className="post-card">
      
        <div className="post-user-row" onClick={() => navigate(`/profile/${post.user._id}`)}>
          <img src={post.user.profile_picture} alt="avatar" className="post-avatar" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="post-username">{post.user.full_name}</span>
              <BadgeCheck style={{ width: 15, height: 15, color: '#38BDF8' }} />
            </div>
            <p className="post-handle">@{post.user.username} · {moment(post.createdAt).fromNow()}</p>
          </div>
        </div>

       
        {post.content && (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postWithHashtags }}
          />
        )}

     
        {post.image_urls.length > 0 && (
          <div className={`post-images ${post.image_urls.length === 1 ? 'single' : ''}`}>
            {post.image_urls.map((img, i) => (
              <img src={img} key={i} alt="post" />
            ))}
          </div>
        )}

       
        <div className="post-actions">
          <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <Heart style={{
              width: 16, height: 16,
              fill: isLiked ? '#F87171' : 'none',
              transition: 'all 0.2s'
            }} />
            {likes.length}
          </button>

          <button className="action-btn">
            <MessageCircle style={{ width: 16, height: 16 }} />
            12
          </button>

          <button className="action-btn">
            <Share2 style={{ width: 16, height: 16 }} />
            7
          </button>
        </div>
      </div>
    </>
  )
}

export default PostCard