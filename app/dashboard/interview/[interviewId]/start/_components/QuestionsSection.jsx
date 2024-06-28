import { Lightbulb, Speaker, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {

    const textToSpeech=(text) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        } else {
            alert('Your browser does not support text to speech')
        }
    }


  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg m-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
                <h2 className={`bg-secondary p-2 rounded-full text-center text-sm cursor-pointer ${activeQuestionIndex==index&&' bg-primary text-primary'}`}>Question #{index+1}</h2>
                
            ))}
        </div>
        <h2 className='my-5 md:text-md lg:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb />
                <strong>Note :</strong>
            </h2>
            <h2 className='text-sm p-2 text-primary'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div> 
  )
}

export default QuestionsSection