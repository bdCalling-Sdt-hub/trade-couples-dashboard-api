import React from 'react'
import { imageUrl } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa6';
import { Badge } from 'antd';
import { useUser } from '../../provider/User';
import { useProfileQuery } from '../../redux/apiSlices/authSlice';

const Header = () => { 
    const {data:profile} = useProfileQuery()
    const {user}  = useUser();
    const src = profile?.data?.image?.startsWith("https") ? profile?.data?.image : `${imageUrl}${profile?.data?.image}`
    return (
        <div className='flex items-center gap-5 justify-end'>
            <Link to="/notification" className='h-fit mt-[10px]'>
                <Badge count={5} >
                    <FaRegBell color="#4E4E4E" size={24}/>
                </Badge>
            </Link>

            <Link to="/profile" className='flex  items-center gap-3'>
                <img
                    style={{ 
                        clipPath: "circle()",
                        width: 45,
                        height: 45
                    }}
                    src={src}
                    alt="person-male--v2"
                    className='clip'
                />
                <p>{profile?.data?.name} </p>
            </Link>
        </div>
    )
}

export default Header