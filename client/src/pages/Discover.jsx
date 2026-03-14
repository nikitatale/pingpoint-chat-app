import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'
import api from '../api/axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'

const Discover = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        setUsers([]); setLoading(true)
        const { data } = await api.post('/api/user/discover', { input }, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        })
        data.success ? setUsers(data.users) : toast.error(data.message)
        setLoading(false); setInput('')
      } catch (error) {
        toast.error(error.message); setLoading(false)
      }
    }
  }

  useEffect(() => {
    getToken().then((token) => dispatch(fetchUser(token)))
  }, [])

  return (
    <>
      <style>{`
        .disc-page {
          min-height: 100vh; background: #050A1A; position: relative;
        }
        .disc-page::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .disc-inner { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; position: relative; z-index: 1; }
        .disc-title { font-size: 1.8rem; font-weight: 700; color: #F0F4FF; margin-bottom: 4px; }
        .disc-sub   { font-size: 0.88rem; color: #475569; margin-bottom: 1.5rem; }

        .disc-search-wrap {
          background: rgba(15,23,42,0.85);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 16px; padding: 1rem 1.2rem;
          margin-bottom: 1.8rem;
          backdrop-filter: blur(12px);
        }
        .disc-search-inner { position: relative; }
        .disc-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #475569; pointer-events: none;
        }
        .disc-search-input {
          width: 100%; padding: 10px 14px 10px 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 10px;
          color: #E2E8F0; font-size: 0.9rem; font-family: inherit;
          outline: none; transition: all 0.2s; box-sizing: border-box;
        }
        .disc-search-input:focus {
          border-color: rgba(99,102,241,0.45);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }
        .disc-search-input::placeholder { color: #334155; }

        .disc-grid { display: flex; flex-wrap: wrap; gap: 14px; }
        .disc-hint {
          font-size: 0.85rem; color: #334155;
          text-align: center; padding: 3rem 0;
          width: 100%;
        }
      `}</style>

      <div className="disc-page">
        <div className="disc-inner">
          <h1 className="disc-title">Discover People</h1>
          <p className="disc-sub">Build meaningful connections around you.</p>

          <div className="disc-search-wrap">
            <div className="disc-search-inner">
              <Search className="disc-search-icon" size={18} />
              <input
                type="text"
                className="disc-search-input"
                placeholder="Search people by name or username…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={handleSearch}
              />
            </div>
          </div>

          <div className="disc-grid">
            {users.map((user) => <UserCard user={user} key={user._id} />)}
            {!loading && users.length === 0 && (
              <p className="disc-hint">Type a name and press Enter to search</p>
            )}
          </div>

          {loading && <Loading height="50vh" />}
        </div>
      </div>
    </>
  )
}

export default Discover