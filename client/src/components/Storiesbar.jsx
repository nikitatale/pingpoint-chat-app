import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react';
import moment from 'moment';
import StoryModel from './StoryModel';
import StoryViewer from './StoryViewer';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Storiesbar = () => {

    const {getToken } = useAuth();
  
    const[stories, setStories] = useState([]);
    const[showModel, setShowModel] = useState(false);
    const[viewStory, setViewStory] = useState(null);

    const fetchStories = async () => {
       try {
        const token = await getToken()
        const { data } = await api('/api/story/get', {
            headers: {Authorization: `Bearer ${token}`}
        })


        if(data.success){
            setStories(data.stories)

        } else {
            toast(data.message)
        }
       } catch (error) {
         toast.error(error.message)
       }
    
    }

    useEffect(() => {
        fetchStories();
    }, [])

  return (
    <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
        <div className='flex gap-4 pb-5'>
            <div onClick={() => setShowModel(true)} className='rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-[#111B3D] bg-gradient-to-r from-indigo-50 to-white'>
               <div className='h-full flex flex-col items-center justify-center p-4 '>
                <div className='size-10 bg-[#111B3D] rounded-full flex items-center justify-center mb-3'>
                    <Plus className='w-5 h-5 text-white'/>
                </div>
                <p className='text-sm font-medium text-slate-700 text-center '>Create Story</p>
               </div>
            </div>

            {
                stories.map((story, index) => (
                    <div onClick={() => setViewStory(story)} className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-[#6375b3]  to-[#1b2957]  hover:from-[#47568b] hover:to-[#162450] active:scale-95`} key={index} >
                     <img src={story.user.profile__picture} alt="user" className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow'/>
                     <p className='absolute top-18 left-3 text-white/16 text-sm truncate max-w-24 '>{story.content}</p>
                     <p className='text-white absolute bottom-1 right-2 z-10 text-xs '>{moment(story.createdAt).fromNow()}</p>
                      {
                        story.media_type !== 'text' && (
                            <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                                   {
                        story.media_type === "image" ? 
                        <img src={story.media_url} alt="image" className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80' />
                       :
                       <video src={story.media_url} className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80' />
                    }
                            </div>
                        )
                      }
                    
                    </div>
                ))
            }


        </div>

        {/* Add story model */}
        {
        
            showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories}/>
        }

        {
            viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>
        }
      
    </div>
  )
}

export default Storiesbar
