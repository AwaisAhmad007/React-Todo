import "./userform.css";
import Axios from "axios";
import React, { useState } from "react";
import { Button, message, Popconfirm } from "antd";

function TaskDeletePopUp({taskId,data,setData}) {
    const [open,setOpen] = useState(false)
    const [confirmLoading,setConfirmLoading] = useState(false);
    const confirm = (e) => {
        e.stopPropagation();
        setConfirmLoading(true)
        Axios.delete(`http://localhost:3000/todo/delete/${taskId}`,{
          method:"DELETE"
        }).then((result)=>{
          if(result?.data?.data){
            const updatedData = data?.filter((item)=>item?.id !== taskId)
            setData(updatedData)
            setConfirmLoading(false)
            setOpen(false)
            message.success(`${result?.data?.data?.message}`);
      
          }else {
            message.error(`${result?.data?.error?.message}`);
            setOpen(false)
          }
       
      }).catch((err)=>{
        console.log('Error',err)
        message.error('Something Went wrong.Please try again.');
        setOpen(false)
      })
      };
      
      const cancel = (e) => {
        e.stopPropagation()
       setOpen(false)
      }

  return (
    <Popconfirm
              open={open}
              okButtonProps={{
                loading: confirmLoading,
              }}
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
              <Button danger onClick={(e)=>{e.stopPropagation();setOpen(true)}}>Delete</Button>
  </Popconfirm>
  )
}

export default TaskDeletePopUp;