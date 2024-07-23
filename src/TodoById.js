import Axios from "axios";
import React, { useEffect, useState } from "react";

const baseUrl = "http://localhost:3000/todo/getone/2";

function TodoById() {
  const [data, setData] = useState();
  useEffect(() => {
    Axios.get(baseUrl).then((response) => {
    //   console.log("response", response.data);
      setData(response.data);
    });
  }, []);
  return (
    <>
      {data?.length > 0 &&
        data?.map((item) => {
          return (
            <>
              <h1>{item?.Id}</h1>
              <h2>{item?.Title}</h2>
              <h3>{item?.Narration}</h3>
              <h4>{item?.Created_Date}</h4>
              <h4>{item?.End_Date}</h4>
              <h6>{item?.State}</h6>
              <h1>{item?.User_Id}</h1>
            </>
          );
        })}
    </>
  );
}

export default TodoById;
