"use client"

import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SocialIcon } from 'react-social-icons'


function LandingNavBar() {

    const {isSignedIn} = useAuth();

  return (
    <>
    <div className='flex items-center justify-between   '>

        <Link href={'/'}>
            <div className='flex items-center gap-2 font-bold text-xl'>
                <Image src={'/logo.svg'} width={45} height={45}/>
                <h2>AI Mock Interviewer</h2>
            </div>
        </Link>

       

        <div className='flex '>
            <SocialIcon bgColor='black' url='https://twitter.com/JayTandia05' />
            <SocialIcon bgColor='black' url='https://github.com/JayTandia' />
            <SocialIcon bgColor='black' url='www.linkedin.com/in/jay-tandia' />
            <SocialIcon bgColor='black' url='https://www.behance.net/jaytandia'/>
            <SocialIcon bgColor='black' url='https://www.instagram.com/jay_tandia/'/>
        </div>

        <Link href={isSignedIn ? '/dashboard':'/sign-up'}>
            <Button >Try it for free</Button>
        </Link>
        
    </div>
    </>
  )
}

export default LandingNavBar