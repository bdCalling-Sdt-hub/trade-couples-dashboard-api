import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../components/common/Title';
import { useAboutQuery, useCreateAboutMutation, useUpdateAboutMutation } from '../../redux/apiSlices/settingSlices';
import Swal from 'sweetalert2';

const AboutUs = () => {
  const editor = useRef(null);
  const { data: about, refetch } = useAboutQuery()
  const [createAbout] = useCreateAboutMutation()
  const [updateAbout] = useUpdateAboutMutation()
  const aboutContents = about?.data
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(aboutContents?.content)
  }, [aboutContents])

  const handleSubmit = async () => {
    const data = {
      content: content
    }

    if (aboutContents?._id) {
      await updateAbout(data).then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            text: res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();

          })
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
    else {
      await createAbout(data).then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            text: res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();

          })
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
  }





  return (
    <div className=" ">
    <Title className="mb-4">About Us</Title>
    <div>

      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
    <div
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={() => handleSubmit()}
        style={{
          height: 44,
          width: 150,
          backgroundColor: "#00809E",
          color: "white",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        Save Changes
      </button>
    </div>
  </div>
  );
};

export default AboutUs;
