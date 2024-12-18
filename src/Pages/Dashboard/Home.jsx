import React from "react";
import { FaChartGantt, FaUserGroup } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdOutlineSubscriptions } from "react-icons/md";
import UserChart from "../../components/ui/Home/UserChart";
import RevenueChart from "../../components/ui/Home/RevenueChart";
import ActivityChart from "../../components/ui/Home/ActivityChart";




const Home = ()=>{  

    const summaryData = [
        {
            icon: <FaUserGroup color="#007BA5" className="" size={24} /> ,
            title:"Total User" ,
            price: 1000
        } , 
        {
            icon: <MdOutlineSubscriptions color="#007BA5" className="" size={24} /> ,
            title:"Total Subscriber" ,
            price: 600
        } , 
        {
            icon: <FaChartGantt color="#007BA5" className="" size={24} /> ,
            title:"Total Revenue" ,
            price: 500
        } , 
        {
            icon: <MdOutlineAttachMoney color="#007BA5" className="" size={24} /> ,
            title:"Total Income" ,
            price: 700
        } , 

    ]


    return (
        <div>

            <div className="grid grid-cols-4 gap-6 h-[100px]">  
                {
                    summaryData?.map((value , index)=>     <div key={index} className='bg-white rounded-lg py-0 px-6 flex items-center justify-between gap-4'>  
                    <div className="flex items-center gap-3"> 

                    <div className=" w-10 h-10 rounded-full bg-[#EFEFEF] flex items-center justify-center "> 

                  {value?.icon}
                    </div>
                    <h2 className="text-center text-2xl text-base ">{value?.title}</h2>

                    </div>
                    <h3 className="text-center text-primary text-[32px] font-semibold">${value?.price}</h3>
                </div>)
                }

           

            </div> 

            <div className=" w-full bg-white rounded-lg  h-[330px] mt-6"> 
            <p className="text-base font-semibold px-4 py-4 ">User Activity</p>  
            <ActivityChart />
            </div>

         <div className="grid grid-cols-12 gap-5 mt-6">
  
  <div className="col-span-6 bg-white rounded-lg  h-[310px] "> 
    <p className="text-base font-semibold px-4 py-4 ">Total User</p> 
    <UserChart/>

  </div> 

  <div className="col-span-6 bg-white rounded-lg h-[310px]">
  <p className="text-base font-semibold px-4 py-4  ">Total Revenue</p>  
  <RevenueChart />
  </div>

         </div>
     
        </div>
    );
}

export default Home;