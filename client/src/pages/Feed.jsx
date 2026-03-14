import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Storiesbar from '../components/Storiesbar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/post/feed', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <>
      <style>{`
        .feed-page {
          height: 100%;
          overflow-y: auto;
          background: #050A1A;
          padding: 2rem 1rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2rem;
          position: relative;
        }
        
        .feed-page::-webkit-scrollbar { width: 4px; }
        .feed-page::-webkit-scrollbar-track { background: transparent; }
        .feed-page::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }

       
        .feed-page::before {
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
      
        .feed-blob1 {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          width: 400px; height: 400px;
          background: #3B1FD4; opacity: 0.12; filter: blur(90px);
          top: -100px; left: -100px;
        }
        .feed-blob2 {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          width: 300px; height: 300px;
          background: #0D9488; opacity: 0.1; filter: blur(80px);
          bottom: 0; right: 0;
        }

        .feed-main {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          flex-shrink: 0;
        }

        .feed-sidebar {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          display: none;
        }
        @media (min-width: 1280px) { .feed-sidebar { display: block; } }

     
        .feed-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent);
          margin: 1rem 0;
        }

  
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #475569;
          font-size: 0.9rem;
        }
        .empty-state span {
          display: block;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div className="feed-page">
        <div className="feed-blob1" />
        <div className="feed-blob2" />

        
        <div className="feed-main">
          <Storiesbar />
          <div className="feed-divider" />

          {feeds.length === 0 ? (
            <div className="empty-state">
              <span>💬</span>
              No posts yet. Follow someone to see their posts!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingBottom: '2rem' }}>
              {feeds.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

      
        <div className="feed-sidebar">
          <RecentMessages />
        </div>
      </div>
    </>
  ) : <Loading />;
};

export default Feed;