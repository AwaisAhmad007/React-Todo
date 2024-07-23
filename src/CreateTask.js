import React, { useState } from 'react';
import { Button, Form, Input, Modal,  DatePicker,message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import  Axios  from 'axios';

function CreateTask({setData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const randomId = Math.floor(Math.random()*10)
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (formData) => {
        // console.log("Data",formData);
        // console.log('date', new Date())
        Axios.post("http://localhost:3000/todo/add",{
            Title:formData?.title,
            Narration:formData?.narration,
            Created_Date:new Date(),
            End_Date:new Date(formData?.end_at),
            User_Id:randomId
        }).then((res)=>{
            setData((prev)=>[res.data,...prev])
            setIsModalOpen(false);
            messageApi.info('Add Successfully!');
        })
    }
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
    <>
    {contextHolder}
    <Button type="primary" onClick={showModal} >Add Task</Button>
    <Modal title="Add Task" open={isModalOpen} onOk={form.submit}  onCancel={handleCancel}>

    <Form
      form={form}
      name="register"
      onFinish={onFinish}
    style={{
        maxWidth: 600,
      }}
>
<Form.Item
        name="title"
        label="Title"
        rules={[
          {
            type: 'text',
          },
          {
            required: true,
            message: 'Please input your Title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    
      <Form.Item
        name="narration"
        label="Narration"
        rules={[
          {
            type: 'text',
          },
          {
            required: true,
            message: 'Please input your Narration!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="End Date" name="end_at" rules={[ {
            required: true,
            message: 'Please input your End Date !',
          },]}>
        <DatePicker multiple={false} size='small'  disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }} />
        </Form.Item>  
 </Form>
    </Modal>
  </>
  );
}
export default CreateTask;