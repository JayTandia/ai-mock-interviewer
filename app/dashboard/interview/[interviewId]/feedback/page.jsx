"use client"

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown, ChevronsUpDownIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Feedback({params}) {

    const [feedbacklist, setFeedbacklist] = useState([])

    useEffect(()=>{
        getFeedback()
    },[])

    const getFeedback=async()=>{
       const result = await db.select()
       .from(UserAnswer)
       .where(eq(UserAnswer.mockIdRef,params.interviewId))
       .orderBy(UserAnswer.id)

       setFeedbacklist(result)
    }

  return (
    <div className='p-10 m-5'>
        
        {feedbacklist?.length==0?<h2 className='font-bold text-xl text-gray-500'>No Interview Feedback record found</h2>:<>
            <h2 className='text-green-500 font-bold text-3xl'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
        <h2 className='text-primary text-lg my-3'>Your overall interview rating :<strong>7/10</strong></h2>


        <h2 className='text-gray-500 text-sm'>Find below your interview question with correct answer, Your answer and feedback for improvment</h2>
        {feedbacklist&&feedbacklist.map((item,index)=>(
            <Collapsible key={index}>
            <CollapsibleTrigger className='my-2 p-2 bg-secondary rounded text-left flex justify-between gap-7'>{item.question}<ChevronsUpDown className='h-4 w-5'/></CollapsibleTrigger>
            <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-red-600 p-2 rounded-lg border'><strong>Rating: {item.rating}</strong></h2>
                    <h2 className='text-sm text-red-900 bg-red-50 p-2 rounded-lg border'><strong>Your Answer: {item.userAns}</strong></h2>
                    <h2 className='text-sm text-green-900 bg-green-50 p-2 rounded-lg border'><strong>Correct Answer: {item.correctAns}</strong></h2>
                    <h2 className='text-sm text-primary bg-blue-50 p-2 rounded-lg border'><strong>Feedback: {item.feedback}</strong></h2>
                </div>
            </CollapsibleContent>
            </Collapsible>
        ))}
        </>}

        <Link href={'/dashboard'}>
        <Button>Go Home</Button>
        </Link>
    </div>
  )
}

export default Feedback