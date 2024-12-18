import { ConfigProvider, Input, Table } from 'antd'
import React, { useState } from 'react'
import Title from '../../components/common/Title';
import { useBlockUserMutation, useGetAllUsersQuery } from '../../redux/apiSlices/usersSlice';
import { imageUrl } from '../../redux/api/baseApi';
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia";
import Swal from 'sweetalert2';

const Users = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const { data: users, refetch } = useGetAllUsersQuery(undefined)
    const [blockUser] = useBlockUserMutation()
    console.log(users);

    const data = users?.data?.map((user, index) => ({
        key: index + 1,
        id: user?._id,
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
        gender: user?.gender,
        image: user?.image?.startsWith("https") ? user?.image : `${imageUrl}${user?.image}`,
        status: user?.status
    }))

    const handleUserBlock = async (id) => {
        console.log(id);
        await blockUser(id).then((res) => {
            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                });
            } else {
                Swal.fire({
                    title: "Oops",
                    text: res?.error?.data?.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        })
        }

    const columns = [
            {
                title: "Serial No.",
                dataIndex: "name",
                key: "name",
                render: (_, record, index) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>
            },
            {
                title: "User",
                dataIndex: "user",
                key: "user",
                render: (_, record, index) => <div className='flex items-center gap-x-2'>
                    <img
                        src={record?.image}
                        style={{ height: 40, width: 40, borderRadius: 8 }}
                        alt=""
                    />
                    <p> {record?.name}</p>
                </div>
            },
            {
                title: "EMAIL",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Gender",
                dataIndex: "gender",
                key: "gender",
            },

            {
                title: "Contact",
                dataIndex: "contact",
                key: "contact",

            },
            {
                title: "ACTIONS",
                dataIndex: "actions",
                key: "actions",
                render: (_, record) => <div onClick={() => handleUserBlock(record?.id)}>
                    {
                        record?.status === "ACTIVE" ? <LiaUserSolid color='gray' size={26} /> : <LiaUserSlashSolid color='red' size={26} />
                    }
                </div>

            },
        ];
        return (
            <>
                <div className='flex items-center justify-between mb-4'>
                    <Title >Users</Title>
                    <Input
                        style={{
                            width: 300,
                            height: 40,
                            outline: "none",
                            border: "1px solid #d9d9d9",
                            boxShadow: "none"
                        }}
                        placeholder="Search.."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <ConfigProvider
                    theme={{
                        components: {
                            Pagination: {
                                itemActiveBg: "#007BA5",
                                borderRadius: "100%"
                            }
                        },
                        token: {
                            colorPrimary: "white"
                        }
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            current: parseInt(page),
                            onChange: (page) => setPage(page)
                        }}
                    />
                </ConfigProvider>
            </>
        )
    }

    export default Users;