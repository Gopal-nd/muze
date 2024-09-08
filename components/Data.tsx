'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const Data = () => {
    const session = useSession()
  return (
    <div className='text-white'>data : {session.data?.user?.email}</div>
  )
}

export default Data