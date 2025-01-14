import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { useUpdateReportStatusMutation } from '../../../redux/apiSlices/reportSlice';

const ReportsModal = ({ open, setOpen, details, refetch }) => {
    const [updateReportStatus] = useUpdateReportStatusMutation()

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusChange = async (id) => {

        await updateReportStatus(id).then((res) => {
        
            if (res?.data?.success) {
                message.success(res?.data?.message);
                refetch()
            }
        })
    }

    return (
        <Modal
            centered
            open={open}
            onCancel={handleClose}
            width={500}
            footer={null}
        >
            <div>
                <Form
                    layout="vertical"
                    initialValues={{
                        name: details?.name,
                        email: details?.email,
                        reason: details?.reason,

                    }}
                >
                    <Form.Item
                        name="name"
                        label={<p className="text-[#6D6D6D]"> Report For Name</p>}
                    >
                        <Input
                            className="w-[100%] border outline-none px-3 py-[8px]"
                            type="text"
                            readOnly
                        />
                    </Form.Item>


                    <Form.Item
                        name="email"
                        label={<p className="text-[#6D6D6D]"> Report For Email</p>}
                    >
                        <Input
                            className="w-[100%] border outline-none px-3 py-[8px]"
                            type="text"
                            readOnly
                        />
                    </Form.Item>



                    <Form.Item
                        name="reason"
                        label={<p className="text-[#6D6D6D]"> Report Reason</p>}
                    >
                        <Input.TextArea rows={6} readOnly />
                    </Form.Item>
                </Form>

                <div className='flex justify-end'>
                    <button className=' bg-red-600 text-white py-2 px-4 rounded-full ' onClick={() => handleStatusChange(details?.id)}>
                        {
                            details?.status === "ACTIVE" ? "Block ?" : "Unblock ?"
                        }
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ReportsModal;