import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react';

const ProfileModel = ({setShowEdit}) => {

  const user = dummyUserData;

  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location, 
    profile_picture: user.profile__picture, 
    full_name: user.full_name,
    cover_photo: null
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 h-screen overflow-y-scroll bg-black/50">
      <div className="max-w-2xl sm:py-6 mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

          <form className="space-y-4" onSubmit={handleSaveProfile}>

          
            <div className='flex flex-col items-start gap-3'>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="profile_picture"
              >
                Profile Picture

              <input hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    profile_picture: e.target.files[0]
                  })
                }
                type="file"
                accept="image/*"
                id="profile_picture"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />

              <div className="relative group w-fit mt-3">
                <img
                  src={
                    editForm.profile_picture instanceof File
                      ? URL.createObjectURL(editForm.profile_picture)
                      : editForm.profile_picture
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div className="absolute inset-0 cursor-pointer bg-black/30 rounded-full hidden group-hover:flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>
              </label>
            </div>


            <div className='flex flex-col items-start gap-3'>
                   <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1'>
                     Cover Photo

             <input hidden
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0]
                  })
                }
                type="file"
                accept="image/*"
                id="cover_photo"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
              <div className='cursor-pointer group/cover relative'>
                <img src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo} alt="image" 
                className='w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2' />
                <div className='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center'>
                    <Pencil className="w-5 h-5 text-white" /> 
                </div>
              </div>
            </label>
            </div>


             <div className=''>
                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                </label>
                <input type="text" placeholder='Tell Your Name' className='w-full border border-gray-200 p-3 rounded-lg' onChange={(e) => setEditForm({...editForm, full_name: e.target.value})} value={editForm.full_name}/>
             </div>

              <div className=''>
                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                    Username
                </label>
                <input type="text" placeholder='Tell Your Username' className='w-full border p-3 border-gray-200 rounded-lg' onChange={(e) => setEditForm({...editForm, username: e.target.value})} value={editForm.username}/>
             </div>


             <div className=''>
                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                    Bio
                </label>
                <textarea rows={3}  placeholder='Tell Your Bio' className='w-full border p-3 border-gray-200 rounded-lg' onChange={(e) => setEditForm({...editForm, bio: e.target.value})} value={editForm.bio}/>
             </div>

               <div className=''>
                <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>
                    Location
                </label>
                  <input type="text" placeholder='Tell Your Location' className='w-full border p-3 border-gray-200 rounded-lg' onChange={(e) => setEditForm({...editForm, location: e.target.value})} value={editForm.location}/>
             </div>

             <div className='flex justify-end space-x-3 pt-6'>
                 <button type='button' onClick={() => setShowEdit(false)} className='px-4 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'>Cancel</button>
                 <button type='submit' className='px-4 py-2 bg-gradient-to-br from-[#111B3D] to-[#394b88] hover:from-[#394b88] hover:to-[#111B3D] active:scale-95 transition text-white font-medium p-2 cursor-pointer'>Save Changes</button>
             </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileModel;


