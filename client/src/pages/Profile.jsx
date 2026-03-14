import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import UserProfileInfo from '../components/UserProfileInfo';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ProfileModel from '../components/ProfileModel';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.value);
  const { getToken } = useAuth();
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async (profileId) => {
    const token = await getToken();
    try {
      const { data } = await api.post('/api/user/profiles', { profileId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setUser(data.profile);
        setPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchUser(profileId);
    } else {
      fetchUser(currentUser._id);
    }
  }, [profileId, currentUser]);

  return user ? (
    <>
      <style>{`
        .profile-page {
          height: 100%;
          background: #050A1A;
          padding: 1.5rem;
          overflow-y: scroll;
          position: relative;
          box-sizing: border-box;
        }
       
        .profile-page::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .profile-inner {
          max-width: 720px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

       
        .profile-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(0,0,0,0.4);
        }

      
        .cover-wrap {
          height: 160px;
          background: linear-gradient(135deg, #111B3D, #394b88);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) { .cover-wrap { height: 210px; } }
        .cover-wrap img { width: 100%; height: 100%; object-fit: cover; }
       
        .cover-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(15,23,42,0.6));
        }

       
        .tab-bar {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 14px;
          padding: 4px;
          display: flex;
          max-width: 360px;
          margin: 1.5rem auto 0;
        }
        .tab-btn {
          flex: 1;
          padding: 8px 12px;
          font-size: 0.82rem;
          font-weight: 500;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #64748B;
          font-family: inherit;
        }
        .tab-btn.active {
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          color: white;
          box-shadow: 0 3px 10px rgba(79,70,229,0.35);
        }
        .tab-btn:not(.active):hover { color: #A5B4FC; background: rgba(99,102,241,0.1); }

       
        .posts-section {
          margin-top: 1.5rem;
          padding: 0 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }

     
        .media-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 1.5rem;
          padding: 0 1rem 1.5rem;
        }
        .media-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(99,102,241,0.1);
        }
        .media-item img {
          width: 180px;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .media-item:hover img { transform: scale(1.05); }
        .media-overlay {
          position: absolute;
          bottom: 0; right: 0;
          font-size: 0.65rem;
          padding: 4px 8px;
          backdrop-filter: blur(8px);
          background: rgba(0,0,0,0.5);
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 6px 0 0 0;
        }
        .media-item:hover .media-overlay { opacity: 1; }
      `}</style>

      <div className="profile-page">
        <div className="profile-inner">
          <div className="profile-card">

           
            <div className="cover-wrap">
              {user.cover_photo && <img src={user.cover_photo} alt="cover" />}
            </div>

         
            <div style={{ padding: '0 1rem' }}>
              <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
            </div>

          
            <div style={{ padding: '0 1rem' }}>
              <div className="tab-bar">
                {["posts", "media", "likes"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'posts' && (
              <div className="posts-section">
                {posts.length === 0 ? (
                  <p style={{ color: '#475569', fontSize: '0.85rem', padding: '2rem 0' }}>No posts yet.</p>
                ) : (
                  posts.map((post) => <PostCard key={post._id} post={post} />)
                )}
              </div>
            )}

         
            {activeTab === 'media' && (
              <div className="media-grid">
                {posts.filter((p) => p.image_urls.length > 0).length === 0 ? (
                  <p style={{ color: '#475569', fontSize: '0.85rem', padding: '2rem 1rem' }}>No media yet.</p>
                ) : (
                  posts.filter((p) => p.image_urls.length > 0).map((post) =>
                    post.image_urls.map((image, index) => (
                      <Link target="_blank" to={image} key={index} className="media-item">
                        <img src={image} alt="media" />
                        <span className="media-overlay">
                          {moment(post.createdAt).fromNow()}
                        </span>
                      </Link>
                    ))
                  )
                )}
              </div>
            )}

          </div>
        </div>

        {showEdit && <ProfileModel setShowEdit={setShowEdit} />}
      </div>
    </>
  ) : <Loading />;
};

export default Profile;