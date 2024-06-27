"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/router'

  

function AddNewInterview() {

    const [openDialog,setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setjsonResponse] = useState([])
    const {user} = useUser()
    const router = useRouter

    const onSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)

        const InputPrompt = "Job position: "+jobPosition+",job description:"+jobDesc+", Years of Experience: "+jobExperience+", Depend on given information give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions answered in JSON format. "

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setjsonResponse(MockJsonResp)

        if(MockJsonResp){
            const resp = await db.insert(MockInterview)
        .values({
            mockId: uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobPosition,
            jobDesc:jobDesc,
            jobExperience:jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD-MM-yyyy")
        }).returning({mockId:MockInterview.mockId})

        console.log("inserted id:", resp)
        if(resp){
            setOpenDialog(false)
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }

    }else{
        console.log("ERROR")
    }
        setLoading(false);
    }
    
  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer' onClick={()=>setOpenDialog(true)}>
            <h2 className=' text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDialog}>
        
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job interviwing</DialogTitle>
            <DialogDescription>
            <form onSubmit={onSubmit}>
                <div>
                    <h2>Add details about your job position/role, Job description and years of experience</h2>

                    <div className='mt-7 my-3'>
                        <label >Job Role/Job Position</label>
                        <Input onChange={(e)=>setJobPosition(e.target.value)} className='mt-1' placeholder='Ex. Full Stack Developer' required/>
                    </div>

                    <div className='my-3'>
                        <label >Job Description</label>
                        <Textarea onChange={(e)=>setJobDesc(e.target.value)} className='mt-1' placeholder='Ex. NextJS, ReactJS, NodeJS' required/>
                    </div>

                    <div className='mt-7 my-3'>
                        <label >Years of Experience</label>
                        <Input onChange={(e)=>setJobExperience(e.target.value)} className='mt-1' placeholder='Ex.5' type='number' max="25" required/>
                    </div>
                </div>

                <div className='flex gap-5 justify-end'>
                    <Button onClick={()=>setOpenDialog(false)} variant='ghost'>Cancel</Button>
                    <Button 
                    disabled={loading} 
                    type="submit">
                    {loading?<><LoaderCircle className='animate-spin'/>'Generating from AI'</>:'Start Interview'}
                    </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview