import React from 'react';
import { GoDotFill } from 'react-icons/go';

const MyChoice = () => {  
    const data=[
        "I Have a home ." , 
        "I am living with my parents ." , 
        "I am a Cristian." ,
        "I believe Jesus Christ is the head of the house and then the man." ,
        "My preferred ethnicity for partner should be American ." ,
        "My preferred age range for a partner should be 28-35." ,
        "I believe that men are role models for little boys." ,
        "I have no problem to step up and father another man's children." ,
        "I want 3 children." ,
        "I believe the man is the main provider and protector of the household." ,
        "I believe Jesus Christ is the head of the house and then the man."
    ]
    return (
        <div>
             <div>
                {
                    data?.map((value , index)=><div key={index} className='bg-[#EEEEEE] py-2 px-3 rounded-full mb-3'>  
                    <p className='text-[#4E4E4E] flex items-center  gap-[2px] text-[15px]'> <span> <GoDotFill size={14} /> </span> <span>{value}</span> </p>
                         </div>)
                }
             </div>
        </div>
    );
};

export default MyChoice;