import React from 'react'

const Loading = ({text}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
         <span className="loading loading-dots loading-lg"></span>
         <small>{text}</small>
    </div>
  )
}

export default Loading
