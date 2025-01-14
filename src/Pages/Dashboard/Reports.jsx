import React, { useState } from 'react';
import SubscriberReplyModal from '../../components/ui/Subscribers/SubscriberReplyModal';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Table } from 'antd';
import { useGetReportListQuery } from '../../redux/apiSlices/reportSlice';
import { render } from 'react-dom';
import ReportsModal from '../../components/ui/Reports/ReportsModal';

const data = [
    {
        key: 1,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",

    },
    {
        key: 2,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    },
    {
        key: 3,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    },
    {
        key: 4,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    },
    {
        key: 5,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    }
]

const Reports = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [open, setOpen] = useState(false) 
    const [details , setDetails] = useState()
    const { data: reports  , refetch } = useGetReportListQuery(page)
    const reportList = reports?.data 
  

    const data = reportList?.reports?.map((item, index) => ({
        key: index + 1,
        name: item?.reportTo?.name,
        email: item?.reportTo?.email,
        reason: item?.reason,
        status: item?.reportTo?.status,
        id: item?.reportTo?._id
    }))


    const columns = [
        {
            title: "Serial No.",
            dataIndex: "name",
            key: "name",
            render: (_, record, index) => <p>{((page - 1) * itemsPerPage) + index + 1}</p>
        },
        {
            title: "Report For Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Report For EMAIL",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason", 
            render: (_, record) => <p>{record?.reason.slice(0,20)}...</p>

        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status", 
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "Action",
            render: (_, record) => <div>
                <button className=' bg-primary text-white py-2 px-4 rounded-md ' onClick={() => {setOpen(true) , setDetails(record)}}> Details</button>
            </div>
        },

    ];

    return (
        <div>
            <div className='flex items-center justify-between mb-4'>
                <Title >Reports</Title>
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
            <ReportsModal details={details} open={open} setOpen={setOpen}  refetch={refetch}/>
        </div>
    );
};

export default Reports;