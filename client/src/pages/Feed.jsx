import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets';
import Loading from '../components/Loading';
import Storiesbar from '../components/Storiesbar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';

const Feed = () => {
  const [feeds, setfeeds] = useState([]);
   const [loading, setLoading] = useState(true);

  const fetchFeeds = async() => {
    setfeeds(dummyPostsData);
    setLoading(false);
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
