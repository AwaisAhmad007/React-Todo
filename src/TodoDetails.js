import "./userform.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout, Menu, theme,  Button, Tag, message, Popconfirm } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import EditTask from "./EditTask";

const { Header, Content, Footer } = Layout;
const tabs = [
  { key: 1, label: <NavLink to="/">Home</NavLink> },
  { key: 2, label: <NavLink to="#">ToDo</NavLink> },
];
const items = tabs.map((item, index) => ({
  key: item?.key,
  label: item?.label,
}));

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [open,setOpen] = useState(false)
  const [confirmLoading,setConfirmLoading] = useState(false);
  const baseUrl = `http://localhost:3000/todo/gettask/${id}`;
  // console.log("baseUrl", baseUrl);

  useEffect(() => {
    Axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  }, [id]);
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const createdDate = new Date(data?.Created_Date);
  const endDate = new Date(data?.End_Date);
  
  const confirm = (e) => {
  setConfirmLoading(true)
  Axios.delete(`http://localhost:3000/todo/delete/${data?.Id}`,{
    method:"DELETE"
  }).then((result)=>{
    if(result?.data?.data){
      setConfirmLoading(false)
      message.success(`${result?.data?.data?.message}`);
      setOpen(false)
      navigate('/')

    }else {
      message.error(`${result?.data?.error?.message}`);
      setOpen(false)
    }
 
}).catch((err)=>{
  message.error('Something Went wrong.Please try again.');
  setOpen(false)
})
};

const cancel = (e) => {
 setOpen(false)
};

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
          marginTop:'40px'
        }}
      >
    
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <h1>{data?.Title}</h1> 
              <Tag color={data?.State ? "green" : "yellow"}>
                {data?.State ? "Complete" : "Pending"}
              </Tag>
             
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <EditTask data={data} setData={setData} />
             
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
              <Button danger onClick={()=>setOpen(true)}>Delete</Button>
  </Popconfirm>
            </div>
          </div>
          <div>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-start",
                minHeight: "80px",
              }}
            >
              {data?.Narration}
            </p>
          </div>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            {`Created At : ${createdDate.getDate()}-${createdDate.getMonth() + 1}-${createdDate.getFullYear()}`}
          </p>
          <p style={{ display: "flex", justifyContent: "flex-end" }}>
            {`End At : ${endDate.getDate()}-${endDate.getMonth() + 1}-${endDate.getFullYear()}`}
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: "black",
            }}
          >{`Created By: ${data?.user?.U_Name}`}</p>

          {/* Content */}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        @Created by Awais Ahmad
      </Footer>
    </Layout>
  );
};
export default TodoDetails;