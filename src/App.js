import { Route, Routes } from "react-router";
import "./App.css";
import UserForm from "./UserForm";
import TodoDetails from "./TodoDetails";

function App() {
  return (
    <>
    <div className="App">
      <Routes>
       <Route path='/' element={<UserForm/>} /> 
       <Route path='/tododetails/:id' element={<TodoDetails/>} /> 
      </Routes>
    </div>
    </>
  );
}

export default App;
