import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import FaqModal from '../../components/ui/FAQ/FaqModal';
import Title from '../../components/common/Title';
import { useDeleteFaqMutation, useGetFaqQuery } from '../../redux/apiSlices/faqSlice';
import Swal from 'sweetalert2';
import { ConfigProvider, Pagination } from 'antd';


const FAQ = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState(null); 
  const [page, setPage] = useState(1);
  const { data: faqs, refetch } = useGetFaqQuery(page)
  const [deleteFaq] = useDeleteFaqMutation()

  const faqInfo = faqs?.data?.faqs?.map((value) => ({
    id: value?._id,
    answer: value?.answer,
    question: value?.question

  }))

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFaq(id).then((res) => {
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
    });
  };



  return (
    <div className="">
      <div className=" mb-4 flex justify-between items-center w-full">
        <Title className=''>Frequently Asked Questions</Title>
        <button
          onClick={() => setOpenAddModel(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-[#00809E] rounded hover:bg-[#006d80] transition-colors"
        >
          <FaPlus />
          Add FAQ
        </button>
      </div>

      <div className=" pb-6 px-4 rounded-md">
        {faqInfo?.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 py-4 px-4 rounded-lg bg-white mb-3">
            <GoQuestion color="#00809E" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                <span className="flex-1">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2 px-4 mt-4">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
                  setModalData(item);
                }}
                className="text-2xl cursor-pointer text-[#00809E]"
              />
              <RxCross2
                onClick={() => handleDelete(item?.id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>

      <FaqModal
        setOpenAddModel={setOpenAddModel}
        openAddModel={openAddModel}
        modalData={modalData}
        setModalData={setModalData} 
        refetch={refetch}

      /> 

      <div> 
      <ConfigProvider
  theme={{
    components: {
      Pagination: {
        itemActiveBg: "#00809E"
      },
    }, 
    token: {
      borderRadius:100 ,
      colorText:"#fffff"

    },
  }}
>
        <Pagination defaultCurrent={1} total={faqs?.data?.meta?.total}  current={ parseInt(page)}  onChange= {(page)=> setPage(page)} />
</ConfigProvider>
      </div>
    </div>
  );
};

export default FAQ;
