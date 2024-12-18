import React from 'react';
import AboutMe from '../../components/ui/User/AboutMe';
import MyChoice from '../../components/ui/User/MyChoice';
import { ConfigProvider, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi';

const User = () => {

  const profileItems = [
    {
      key: '1',
      label: <p className='text-[15px] font-medium'> About </p>,
      children: <AboutMe />,
    },
    {
      key: '2',
      label: <p className='text-[15px] font-medium'>Choices</p>,
      children: <MyChoice />,
    },
  ];

  return (
    <div>
      <Link to="/users" className='flex items-center gap-[2px]  text-base  rounded-lg  ' > <span> <BiLeftArrowAlt size={22} /> </span> <span>Back</span></Link>
      <div >
        <div className='flex justify-center items-center'>
          <img src={"https://randomuser.me/api/portraits/men/1.jpg"} alt="" className='h-[200px] w-[350px] rounded-lg' />
        </div>
        <p className='font-semibold text-[24px] text-base py-3 text-center'>John Doe</p>
        <p className='font-medium text-[22px] text-base pb-2 text-center flex items-center justify-center gap-2'><span> 27 yr </span> , <span> New York, USA</span></p>
      </div>

      <div className='mb-4  flex justify-center items-center'>
        <div className=' w-4/5'>

          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  itemActiveColor: "#007BA5",
                  itemSelectedColor: "#007BA5",
                  inkBarColor: "#007BA5",
                  itemHoverColor: "#007BA5"
                },
              },
            }}
          >
            <Tabs defaultActiveKey="1" items={profileItems} />
          </ConfigProvider>
        </div>
      </div>

      <div className=' flex items-center justify-center gap-4 '>

        <button className=' w-[120px] h-[42px] rounded-lg bg-[#DF3232] text-white'> BLOCK </button>
      </div>

    </div>
  );
};

export default User;