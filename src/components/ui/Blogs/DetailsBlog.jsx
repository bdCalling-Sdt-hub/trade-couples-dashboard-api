import { Form, Input, Modal } from 'antd';
import React from 'react';

const DetailsBlog = ({ open, setOpen, getNews }) => {
    return (
        <div>
        <Modal
          centered
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          width={500}
          footer={false}
        >
          <div className="p-6 ">
            <div className="mx-auto  w-[200px] my-6"> 
              <img src={getNews?.image} alt=""  className="w-[2000px] h-[120px] rounded-lg" />
   
            </div>
  
            <Form
              layout="vertical"
              initialValues={{
                title: getNews?.name,
                content: getNews?.description,
              }}
            >
              <Form.Item
                name="title"
                label={<p className="text-[#6D6D6D]"> Blog Title</p>}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[8px]"
                  type="text" 
                  readOnly
                />
              </Form.Item>
  
              <Form.Item
                name="content"
                label={<p className="text-[#6D6D6D]"> Blog Content</p>}
              >
                <Input.TextArea rows={6} readOnly />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
};

export default DetailsBlog;