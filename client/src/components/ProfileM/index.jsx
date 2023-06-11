import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Flex from "../Flexbetween/Flex";
import Flex1 from '../Flexbetween/Flex1';
import * as Components from "../components";

function ProfileM() {
  const [Tmsg, setTmsg]=useState([]);

  const getTransporterReply= async()=>{
    try {
      const url= "http://localhost:8080/api/msg/transporter/view"
      const response= await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user feeds");
      }
      const data= await response.json();
      setTmsg(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransporterReply();
  }, []);
  const [data, setData] = useState('');

  const getMdata = async () => {
    try {
      const url = `http://localhost:8080/api/login/Manufacturer`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user feeds');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMdata();
  }, []);

  const [Mmsg, setMmsg] = useState({
    To: '',
    from: '',
    Quantity: '',
    Address: '',
    Transporter: '',
  });

  // useEffect(() => {
  //   if (data.Address) {
  //     setMmsg((prevMmsg) => ({
  //       ...prevMmsg,
  //       Address: data.Address,
  //     }));
  //   }
  // }, [data]);

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setMmsg({ ...Mmsg, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/msg/manufacturer';
      const { data: res } = await axios.post(url, Mmsg);
      window.location = '/profile';
      setMsg(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className='mt-[10%]'>
    
    
      {error && <div>{error}</div>}
      {msg && <div>{msg}</div>}
      
      <div className="form bg-black flex justify-center mt-[30px]">
      <Components.Form className='w-[60%]' onSubmit={handleSubmit}>
        <Components.Input
          type="text"
          name="To"
          value={Mmsg.To}
          onChange={handleChange}
          placeholder="To"
        />
        <Components.Input
          type="text"
          name="from"
          value={Mmsg.from}
          onChange={handleChange}
          placeholder="From"
        />
        <Components.Select
  name="Quantity"
  value={Mmsg.Quantity}
  onChange={handleChange}
>
  <Components.Option value="">Select Quantity</Components.Option>
  <Components.Option value="1 ton">1 ton</Components.Option>
  <Components.Option value="2 ton">2 ton</Components.Option>
  <Components.Option value="3 ton">3 ton</Components.Option>
</Components.Select>

        <Components.Input
          type="text"
          name="Address"
          value={data.Address}
          onChange={handleChange}
          placeholder="Address"
        />
        <Components.Select
  name="Transporter"
  value={Mmsg.Transporter}
  onChange={handleChange}
>
  <Components.Option value="">Select Transporter</Components.Option>
  <Components.Option value="Transporter 1">Transporter 1</Components.Option>
</Components.Select>

        <Components.Button type="submit">Place your Order</Components.Button>
      </Components.Form>
      </div>
      <Flex1 />
    
      <div className="msg">
      <Components.Title className='text-center'>Replies from Transporter--</Components.Title>
      {/* <Flex1/> */}
      <div className="tables w-[100%] flex justify-center mt-[20px]">
      <table className='border-collapse w-[40%] text-center'>
  <thead className='bg-black-rgba rounded-[5rem]'>
    <tr>
      <th>Order ID</th>
      <th>Price</th>
      
    </tr>
  </thead>
  <tbody>
    {Tmsg.map((msg) => (
      <tr key={msg._id}>
        <td>{msg.orderId}</td>
        <td>{msg.Price}</td>
        
      </tr>
    ))}
  </tbody>
</table>
      </div>
        

      </div>
    </div>
  );
}

export default ProfileM;
