import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Title from '../../components/common/Title';
import { useAffiliateQuery, useCreateAffiliateMutation, useUpdateAffiliateMutation } from '../../redux/apiSlices/settingSlices';
import Swal from 'sweetalert2';

const AffiliateProgram = () => { 
      const editor = useRef(null);
        const { data: affiliate, refetch } = useAffiliateQuery()
        const [createAffiliate] = useCreateAffiliateMutation()
        const [updateAffiliate] = useUpdateAffiliateMutation()
        const affiliateContents = affiliate?.data
        const [content, setContent] = useState("");
      
        useEffect(() => {
          setContent(affiliateContents?.content)
        }, [affiliateContents])
      
        const handleSubmit = async () => {
          const data = {
            content: content
          }
      
          if (affiliateContents?._id) {
            await updateAffiliate(data).then((res) => {
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
            await createAffiliate(data).then((res) => {
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
    <Title className="mb-4">Affiliate Program</Title>
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

export default AffiliateProgram;