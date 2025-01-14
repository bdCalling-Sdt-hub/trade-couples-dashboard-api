import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../components/common/Title';

import Swal from 'sweetalert2';
import { useCreatePrivacyMutation, usePrivacyPolicyQuery, useUpdatePricyPolicyMutation } from '../../redux/apiSlices/settingSlices';

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const { data: privacy, refetch } = usePrivacyPolicyQuery()
  const [createPrivacy] = useCreatePrivacyMutation()
  const [updatePricyPolicy] = useUpdatePricyPolicyMutation()

  const privacyContents = privacy?.data
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(privacyContents?.content)
  }, [privacyContents])

  const handleSubmit = async () => {
    const data = {
      content: content
    }

    if (privacyContents?._id) {
      await updatePricyPolicy(data).then((res) => {
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
      await createPrivacy(data).then((res) => {
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
      <Title className="mb-4">Privacy Policy</Title>
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

export default PrivacyPolicy;
