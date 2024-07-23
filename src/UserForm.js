import './userform.css'
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout, Menu, theme, Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import TaskDeletePopUp from './TaskDeletePopUp';
import CreateTask from './CreateTask';

const { Header, Content, Footer } = Layout;
const tabs = [{key:1,label:(<NavLink to='/'>Home</NavLink>)}]
const items = tabs.map((item, index) => ({
  key: item?.key,
  label:item?.label
}));

const UserForm = () => {
  const navigate = useNavigate();
    const [data, setData] = useState();
const baseUrl = "http://localhost:3000/todo/findAll";

    useEffect(() => {
      Axios.get(baseUrl).then((response) => {
        // console.log("response", response.data);
        const newData = response?.data
        const sortedData = newData.sort((a,b)=>{
          if(a.Id > b.Id){
            return -1
          }else if(a.Id < b.Id){
            return 1
          }else {
            return 0
          }
        })
        setData(sortedData);
      });
    }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          defaultSelectedKeys={["1"]}
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
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            marginTop:25,
          }}
        >
          <CreateTask  data={data} setData={setData}/>
          {
data?.map((item) =>{
  
    return (
        <Card
        key={item?.id}
        onClick={()=>{
          navigate(`/tododetails/${item?.Id}`)      
        }}
        
        className="todo-card"
            title= {<div className='custom-head'>
              
              <h2>{item?.Title}</h2>
              <TaskDeletePopUp taskId={item?.Id} data={data} setData={setData}/>
              </div>}
            bordered={false}
          >
            <p>{item?.Narration}</p>  
          </Card>
    )
})
          }
          {/* <EditTask/> */}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor:"#4096ff"
        }}
      >
        @Created by Awais Ahmad
      </Footer>
    </Layout>
  );
};
export default UserForm;
