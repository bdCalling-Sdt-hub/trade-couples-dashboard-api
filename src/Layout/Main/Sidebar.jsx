import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdOutlineAdminPanelSettings, MdOutlineSubscriptions } from 'react-icons/md';
import { AiOutlineDashboard, AiOutlineTransaction } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiUserGroup } from "react-icons/hi2";
import {  TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBookContent } from 'react-icons/bi';
import { FaQuestion } from 'react-icons/fa6';
import { PiUserPlus, PiUsers } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { SiAdblock } from 'react-icons/si';


const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname; 
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();


    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/auth/login")
    }

    const menuItems = [
        {
            key: "/",
            icon: <LuLayoutDashboard size={24} />,
            label: <Link to="/" className='' >Dashboard</Link>
        },
        {
            key: "/users",
            icon: <PiUsers  size={24} />,
            label: <Link to="/users">Users</Link>
        },
         {
            key: "/subscribers",
            icon: <TbUserScreen size={24} />,
            label: <Link to="/subscribers">Subscribers</Link>
        }, 
         {
            key: "/admin",
            icon: <PiUserPlus size={24} />,
            label: <Link to="/admin">Make Admin</Link>
        }, 
        {
            key: "/blogs",
            icon: <BiBookContent  size={24} />,
            label: <Link to="/blogs" >Blogs</Link>
        },
        {
            key: "/faq",
            icon: <FaQuestion size={24} />,
            label: <Link to="/faq" >FAQ</Link>
        }, 
        {
            key: "/reports",
            icon: <SiAdblock size={24} />,
            label: <Link to="/reports" >Reports</Link>
        }, 
        {
            key: "/transactions",
            icon: <AiOutlineTransaction size={24} />,
            label: <Link to="/transactions" >Transactions</Link>
        }, 
        {
            key: "/subscription",
            icon: <MdOutlineSubscriptions size={24} />,
            label: <Link to="/subscription">Subscription</Link>
        }, 
        {
            key: "subMenuSetting",
            icon: <IoSettingsOutline size={24} />,
            label: "Settings",
            children: [
             
                { 
                    key: "/about-us", 
                    label: <Link to="/about-us" className="text-[#6B6B6B] hover:text-white">About Us</Link>
                },
                { 
                    key: "/terms-and-conditions", 
                    label: <Link to="/terms-and-conditions" className="text-white hover:text-white">Terms And Condition</Link>
                },
                { 
                    key: "/privacy-policy", 
                    label: <Link to="/privacy-policy" className="text-white hover:text-white">Privacy Policy</Link>
                },
                { 
                    key: "/press", 
                    label: <Link to="/press" className="text-white hover:text-white">Press</Link>
                },
                { 
                    key: "/affiliate-program", 
                    label: <Link to="/affiliate-program" className="text-white hover:text-white">Affiliate Program</Link>
                },
                { 
                    key: "/support", 
                    label: <Link to="/support" className="text-white hover:text-white">Support</Link>
                },
                { 
                    key: "/safety-tips", 
                    label: <Link to="/safety-tips" className="text-white hover:text-white">Safety Tips</Link>
                },
                { 
                    key: "/cookie-policy", 
                    label: <Link to="/cookie-policy" className="text-white hover:text-white">Cookie Policy</Link>
                },
                
           
            ]
        },
        {
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Logout</p>
        },
    ];

    useEffect(() => {
        const selectedItem = menuItems.find(item => 
            item.key === path || item.children?.some(sub => sub.key === path)
        );

        if (selectedItem) {
            setSelectedKey(path);

            if (selectedItem.children) {
                setOpenKeys([selectedItem.key]);
            } else {
                const parentItem = menuItems.find(item => 
                    item.children?.some(sub => sub.key === path)
                );
                if (parentItem) {
                    setOpenKeys([parentItem.key]);
                }
            }
        }
    }, [path]);

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <div className='mt-5'>
            <Link to={"/"} className=' flex items-center justify-center py-4'>
            <p className="text-4xl font-semibold font-sans tracking-wider text-primary">TradCouples</p>
            </Link>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                style={{ borderRightColor: "transparent", background: "transparent"  }}
                items={menuItems} 
           
            />
        </div>
    )
}

export default Sidebar;
