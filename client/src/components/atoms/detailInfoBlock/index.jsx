import React from 'react'

function DetailInfoBlock({title, children}) {
  return (
    <article className="flex flex-col bg-primary-1 rounded-xl p-3 lg:p-5 w-full lg:max-w-sm xl:max-w-md">
      <h3 className='font-bold text-xl my-3'>{title}</h3>
      {children}
    </article>
  )
}

export default DetailInfoBlock
