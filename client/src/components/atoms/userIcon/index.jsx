import React from 'react'

function UserIcon ({imgUrl = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}) {
  return (
    <picture className='block rounded-full w-10 h-10'>
      <img className='w-full h-full object-cover' src={imgUrl} alt="User image profile" />
    </picture>
  )
}

export default UserIcon 
