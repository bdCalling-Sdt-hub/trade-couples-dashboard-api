import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';
import { CgGirl } from 'react-icons/cg';
import { FaChildren, FaRegEye, FaRegMap } from 'react-icons/fa6';
import { GiBodyHeight } from 'react-icons/gi';
import { GoHeartFill } from 'react-icons/go';
import { IoIosBody } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { MdCastForEducation, MdOutlineDateRange, MdOutlineTempleHindu } from 'react-icons/md';
import { SiEthers } from 'react-icons/si';

const AboutMe = () => { 
    const data = [
        {
            icon: <p className='text-white '><IoPersonSharp size={20}/></p>, 
             title:"Gender" ,
             value:"Female"
        } , 
        
        {
            icon: <p className='text-white '><MdOutlineDateRange size={20}/></p>, 
             title:"Age" ,
             value:"20, Date of birth: 09 Dec 2003"
        } , 
        
        {
            icon: <p className='text-white '><FaRegMap size={20}/></p>, 
             title:"Country" ,
             value:"BanglaDesh"
        } , 
        
        {
            icon: <p className='text-white '><AiOutlineGlobal size={20}/></p>, 
             title:"Province/Region" ,
             value:"New Work"
        } , 
        
        {
            icon: <p className='text-white '><SiEthers size={20}/></p>, 
             title:"Ethnicity" ,
             value:"American"
        } , 
        
        {
            icon: <p className='text-white '><MdCastForEducation size={20}/></p>, 
             title:"Education" ,
             value:"Graduate,from USA University"
        } , 
        
        {
            icon: <p className='text-white '><BsPersonVcard size={20}/></p>, 
             title:"Occupation" ,
             value:"Programmer"
        } , 
        
        {
            icon: <p className='text-white '><MdOutlineTempleHindu size={20}/></p>, 
             title:"Religion" ,
             value:"Christian"
        } , 
        
        {
            icon: <p className='text-white '><GoHeartFill size={20}/></p>, 
             title:"Marital status" ,
             value:"Single"
        } , 
        
        {
            icon: <p className='text-white '><FaChildren size={20}/></p>, 
             title:"Children" ,
             value:"0"
        } , 
        
        {
            icon: <p className='text-white '><GiBodyHeight size={20}/></p>, 
             title:"Height" ,
             value:"170 cm"
        } , 
        
        {
            icon: <p className='text-white '><IoIosBody size={20}/></p>, 
             title:"Body Shape" ,
             value:"fit"
        } , 
        
        {
            icon: <p className='text-white '><CgGirl size={20}/></p>, 
             title:"Hair Color" ,
             value:"Brown"
        } , 
        
        {
            icon: <p className='text-white '><FaRegEye size={20}/></p>, 
             title:"Eye Color" ,
             value:"Brown"
        } , 
        
    ]
    return (
        <div className='mb-5'>
           <p className=' bg-[#EEEEEE] p-5 text-[#4E4E4E] rounded-lg text-[16px] mb-4  text-justify'>fringilla felis, non Morbi placerat nulla, volutpat elementum laoreet Nam Quisque nulla, In at, facilisis porta Morbi non, maximus laoreet elit maximus Donec venenatis id venenatis ex. viverra ultrices Nam elementum volutpat leo. quis Ut sodales. dui lorem. ac at porta placerat consectetur amet, elementum vel In Ut Nullam enim. urna tincidunt non Praesent venenatis ipsum Praesent Ut efficitur. Lorem volutpat Nullam In felis, at lacus viverra vel eu Nullam Sed ex elementum </p>  

           <div className=' grid lg:grid-cols-2 grid-cols-1  items-center bg-[#EEEEEE] py-4 rounded-lg lg:px-5 px-3'>
{
    data?.map((value, index)=><div key={index} className='flex lg:w-2/3 w-full items-center   mb-4'> 
  <div className='flex items-center gap-2 lg:w-1/2 w-full text-start'>
    <div className=' flex justify-center items-center bg-primary h-8 w-8 rounded-full  '>{value?.icon}</div> 
    <p className='text-[#4E4E4E]  text-[14px]'>{value?.title}</p>
  </div> 
   <div className='text-[#4E4E4E] text-[14px] lg:w-1/2 w-full text-start'>: {value?.value}</div>
    </div>)
}
           </div>
        </div>
    );
};

export default AboutMe;