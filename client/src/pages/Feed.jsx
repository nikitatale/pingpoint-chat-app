import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Storiesbar from '../components/Storiesbar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Feed = () => {
  const [feeds, setfeeds] = useState([]);
   const [loading, setLoading] = useState(true);

   const {getToken} = useAuth();

  const fetchFeeds = async() => {
    try {
      setLoading(true)
      const {  data } = await api.get('/api/post/feed', {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success) {
        setfeeds(data.posts)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
      }
      setLoading(false)
    }
  

  useEffect(() => {
    fetchFeeds();
  }, [])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories and posts data */}
       
       <div className=''>
            <Storiesbar/>
           <div className='py-4 space-y-6'>
             {
              feeds.map((post) => (
                <PostCard key={post._id} post={post}/>
              ))
             }
           </div>
       </div>

       {/* right sidebar */}

       <div>
         <RecentMessages/>

       </div>
     
    </div>
  ) : <Loading/>
}

export default Feed
