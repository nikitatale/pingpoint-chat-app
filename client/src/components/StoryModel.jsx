import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const bgColors = [
  "#1E1E2F",  // Dark Navy
  "#FF6F61",  // Light Coral
  "#2E8B57",  // Sea Green
  "#F4A261",  // Soft Orange
  "#264653",  // Deep Teal
  "#6A0572",  // Deep Purple
  "#D62828",  // Dark Red
  "#F1FAEE",  // Off White
  "#E9C46A",  // Warm Yellow  
  "#A8DADC",  // Light Aqua
  "#E91E63",  // Pink
  "#00BCD4",  // Cyan
  "#FF9800",  // Orange
  "#4CAF50",  // Leaf Green
  ];

const StoryModel = ({setShowModel, fetchStories}) => {
    const [mode, setMode] = useState("text");
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
     
    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if(file) {
            setMedia(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleCreateStory = async () => {

    }

  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
            <div className='text-center mb-4 flex items-center justify-between'>
            <button className='text-white p-2 cursor-pointer' onClick={() => setShowModel(false)}>
                <ArrowLeft/>
            </button>
             <h2 className='text-lg font-semibold'>Create Story</h2>
             <span className='w-10'></span>
            </div>
            <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor: background}}>
             {
                mode === "text" && (
                    <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder='Add Something..' onChange={(e) => setText(e.target.value)} value={text}/>
            )}

            {
                mode === "media" && previewUrl  && (
                 media?.type.startsWith('image') ?  (
                    <img src={previewUrl} alt="image" className='object-contain max-h-full'/>
                 ) : (
                    <video src={previewUrl} className='object-contain max-h-full'/>
                 )
                )
            }

            </div>

            <div className='flex mt-4 gap-2'>
                {
                    bgColors.map((color) => (
                        <button key={color} className='w-6 h-6 rounded-full ring cursor-pointer' style={{backgroundColor: color}} onClick={() => setBackground(color)}/>
                    ))
                }
            </div>

            <div className='flex mt-4 gap-2'>
               <button className={`flex-1 cursor-pointer flex items-center justify-center gap-2 p-2 rounded ${mode === "text" ? "bg-white text-black" : "bg-zinc-800"}`} onClick={() => {setMode('text'), setMedia(null), setPreviewUrl(null)}}>
                <TextIcon size={18} /> Text
               </button>
               <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                <input type="file" accept='image/*, video/*' className='hidden' onChange={(e) => {handleMediaUpload(e); setMode("media")}}/>
                <Upload size={18} /> Photo / Video
               </label>
            </div>

            <button onClick={() => toast.promise(handleCreateStory(), {
                loading: "Saving...",
                success: <p>Story Added</p>,
                error: e => <p>{e.message}</p>
            })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-[#111B3D] to-[#394b88] hover:from-[#394b88] hover:to-[#111B3D] active:scale-95 transition cursor-pointer'>
                <Sparkle size={18}/> Create Story
            </button>
        </div>
    </div>
  )
}

export default StoryModel
