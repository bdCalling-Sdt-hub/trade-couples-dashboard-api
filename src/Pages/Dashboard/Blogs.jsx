import { Table } from 'antd';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import DetailsBlog from '../../components/ui/Blogs/DetailsBlog';
import CreateBlog from '../../components/ui/Blogs/CreateBlog';
import Title from '../../components/common/Title';
import { useDeleteBlogMutation, useGetAllBlogsQuery } from '../../redux/apiSlices/blogsSlice';
import moment from 'moment/moment';
import { imageUrl } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';



const Blogs = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [getNews, setGetNews] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemForEdit, setItemForEdit] = useState(null);
  const perPageSize = 10
  const { data: blogs, refetch } = useGetAllBlogsQuery()
  const [deleteBlog] = useDeleteBlogMutation()
  console.log(blogs);

  const data = blogs?.data?.map((value, index) => ({
    key: index + 1, 
    id: value?._id ,
    name: value?.title,
    description: value?.description,
    date: moment(value?.createdAt).format("YYYY-MM-DD"),
    image: value?.image?.startsWith("https") ? value?.image : `${imageUrl}${value?.image}`
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
        await deleteBlog(id).then((res) => {
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



  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (key) => <p>{((page - 1) * perPageSize) + key}</p>
    },
    {
      title: "News Title",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 12,
            }}
            className=' '
          >
            <img src={img}  className="rounded-lg h-[75px] w-[110px]" />
            <p className='w-[200px] truncate'>{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Publication Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <button
            onClick={() => {
              setOpen(true), setGetNews(record);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              color: "#00809E",
              background: "white",
            }}
          >
            <FaEye size={22} />
          </button>

          <button
            onClick={() => {
              setOpenAddModel(true), setItemForEdit(record);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              color: "#00809E",
              background: "white",
            }}
          >
            <CiEdit size={25} />
          </button>
          <button
            onClick={() => handleDelete(record?.id)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              background: "white",
              color: "red",
            }}
          >
            <FaRegTrashAlt size={20} />
          </button>
        </p>
      ),
    },
  ];


  return (
    <div>

      {/* header */}
      <div className='flex items-center justify-between mb-4'>
        <Title className=''>Blogs</Title>
        <button onClick={() => setOpenAddModel(true)} className='bg-primary text-white h-10 px-4 rounded-md'>+ Add Blog</button>
      </div>

      <Table dataSource={data} pagination={false} columns={columns} />
      <DetailsBlog open={open} setOpen={setOpen} getNews={getNews} />
      <CreateBlog itemForEdit={itemForEdit} setItemForEdit={setItemForEdit} setOpenAddModel={setOpenAddModel} openAddModel={openAddModel} refetch={refetch} />

    </div>
  )
}

export default Blogs