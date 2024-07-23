import React, { useState } from 'react';
import { Button, Form, Input, Select, Modal,  DatePicker,message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import  Axios  from 'axios';

function EditTask({data,setData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (formData) => {
        Axios.patch(`http://localhost:3000/todo/update/${data.Id}`,{
                Title : formData?.title,
                Narration :formData?.narration,
                State:formData?.state, 
                End_Date:new Date(formData?.end_at),

        }).then((res)=>{
          setData(res.data)
          setIsModalOpen(false);
          messageApi.info('Updated Successfully!');
        })
    }
  
    const showModal = () => {
      setIsModalOpen(true);
    
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

// State
    const { Option } = Select;
    const onStateChange = (value) => {
        switch (value) {
          case 'complete':
            form.setFieldsValue();
            break;
          case 'pending':
            form.setFieldsValue();
            break;
          default:
        }
      };
    
  return (
    <>
    {contextHolder}
    <Button type="primary" onClick={showModal} >Edit</Button>
    <Modal title="Update" open={isModalOpen} onOk={form.submit}  onCancel={handleCancel}>
    
    <Form
      form={form}
      initialValues={{
        title:data?.Title,
        narration:data?.Narration,
        end_at:moment(data?.End_At),
        state:data?.State ? 'complete' : 'pending'
      }}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
>
<Form.Item
        name="title"
        label="Title"
        // onChange={(e)=>(e.target.value)}
        rules={[
          {
            type: 'text',
            // message: 'The input is not valid E-mail!',
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
        name="state"
        label="State"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onStateChange}
          allowClear
        >
          <Option value={true}>Complete</Option>
          <Option value={false}>Pending</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="narration"
        label="Narration"
        rules={[
          {
            type: 'text',
            // message: 'The input is not valid E-mail!',
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

export default EditTask;