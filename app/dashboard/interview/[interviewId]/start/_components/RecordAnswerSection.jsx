"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { is } from 'drizzle-orm'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

    const [userAnswer, setUserAnswer] = useState('')
    const {user} = useUser();
    const [loading, setLoading] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          updateUserAnswer()
        }
      },[userAnswer])

      const startStopRecording=async()=>{
        if(isRecording){
          
            stopSpeechToText();
            
        }else{
            startSpeechToText()
        }
      }

      const updateUserAnswer=async()=>{
        setLoading(true);
        const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+", User answer:"+userAnswer+", Depends on question and user answer for given interview question"+"please give as rating for answers and feedback as area of improvment if any"+"just in 3 to 4 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef:interviewData?.mockId,
          question:mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        })

        if(resp){
          toast('User Answer recorded succesfully')
          setUserAnswer('')
          setResults([])
        }
        setResults([])
        
        setLoading(false)
      }

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col mt-20 justify-center items-center bg-white rounded-lg p-5'>
            <Image className='absolute' src={'/webcam.png'} width={200} height={200}/>
            <Webcam 
            mirrored={true}
            style={{
                height:300,
                width:'100%',
                zIndex:10,

            }}
            />
        </div>
        <Button disabled={loading} onClick={startStopRecording} variant='outline' className='my-10'>
        {isRecording?
        <h2 className='text-red-600 flex items-center gap-2'>
            <Mic/> Stop Recording </h2>
            : 'Record Answer'
        }
        </Button>

    </div>
  )
}

export default RecordAnswerSection