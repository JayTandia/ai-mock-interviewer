"use client";

import { Button } from '@/components/ui/button'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function LandingHero() {
  const {isSignedIn} = useAuth();
  return (
    
    <div className='flex flex-col items-center justify-center mt-52'>
        
        
        <h1  className='font-bold text-6xl p-3'>AI Mock Interviewer</h1>
        <h4 className='text-lg'>Best AI-powered Mock Interviwer to clear your all interviews</h4>

        <div className=' flex gap-6 p-8'>
            <Link href={isSignedIn ? '/dashboard':'/sign-up'}>
                <Button variant='outline' >Sign up</Button>
            </Link>

            <Link href={isSignedIn ? '/dashboard':'/sign-up'}>
              <Button >Try it for free</Button>
            </Link>
        </div>

    

        <div className='mt-48 '>Made by<strong className='underline'> <a target='_blank' href='https://github.com/JayTandia'>Jay Tandia</a></strong> with ❤️</div>
        
    </div>
   
  )
}

export default LandingHero


