import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flex from '../Flexbetween/Flex';
import Flex1 from '../Flexbetween/Flex1';
import * as Components from "../components";

function ProfileT() {
  const [Mmsg, setMmsg] = useState([]);
  const [searchInputOrderId, setSearchInputOrderId] = useState("");
const [searchInputTo, setSearchInputTo] = useState("");
const [searchInputFrom, setSearchInputFrom] = useState("");
const [searchInputAddress, setSearchInputAddress] = useState("");

  const getManufacturerMsg = async () => {
    try {
      const url = "http://localhost:8080/api/msg/manufacturer/view";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user feeds");
      }
      const data = await response.json();
      setMmsg(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getManufacturerMsg();
  }, []);


  let filteredmsgs = Mmsg;

if (searchInputOrderId.length > 0) {
  filteredmsgs = filteredmsgs.filter((msg) =>
    msg.orderId.toLowerCase().includes(searchInputOrderId.toLowerCase())
  );
}
if (searchInputTo.length > 0) {
  filteredmsgs = filteredmsgs.filter((msg) =>
    msg.To.toLowerCase().includes(searchInputTo.toLowerCase())
  );
}
if (searchInputFrom.length > 0) {
  filteredmsgs = filteredmsgs.filter((msg) =>
    msg.from.toLowerCase().includes(searchInputFrom.toLowerCase())
  );
}
if (searchInputAddress.length > 0) {
  filteredmsgs = filteredmsgs.filter((msg) =>
    msg.Address.toLowerCase().includes(searchInputAddress.toLowerCase())
  );
}


  const [Tmsg, setTmsg] = useState({
    orderId: "",
    Price: 0,
  });

  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setTmsg({ ...Tmsg, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/msg/transporter';
      const { data: res } = await axios.post(url, Tmsg);
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
    
    <div className="input flex justify-center items-center gap-[10px] h-[50px]">
    <Components.Input 
  type="search"
  placeholder="Search by Order ID"
  onChange={(e) => setSearchInputOrderId(e.target.value)}
  value={searchInputOrderId}
/>
<Components.Input
  type="search"
  placeholder="Search by To"
  onChange={(e) => setSearchInputTo(e.target.value)}
  value={searchInputTo}
/>
<Components.Input
  type="search"
  placeholder="Search by From"
  onChange={(e) => setSearchInputFrom(e.target.value)}
  value={searchInputFrom}
/>
<Components.Input
  type="search"
  placeholder="Search by Address"
  onChange={(e) => setSearchInputAddress(e.target.value)}
  value={searchInputAddress}
/>
</div>
<Flex />
      {error && <div>{error}</div>}
      {msg && <div>{msg}</div>}
      <div className="rply bg-[black] flex justify-center">
      <Components.Form onSubmit={handleSubmit} className=' w-[40%]'>
      <Components.Select
  name="orderId"
  value={Tmsg.orderId}
  onChange={handleChange}
  placeholder="OrderId"
>
  <Components.Option value="">Select OrderId</Components.Option>
  {Mmsg.map((msg) => (
    <option key={msg._id} value={msg.orderId}>
      {msg.orderId}
    </option>
  ))}
</Components.Select>

        <Components.Input
          type="number"
          name="Price"
          value={Tmsg.Price}
          onChange={handleChange}
          placeholder="Enter Price"
        />

        <Components.Button type="submit">Add Reply</Components.Button>
      </Components.Form>
      </div>
      
<Flex1 />
      <div className="msg">
        <Components.Title className='text-center'>Orders from Manufacturer--</Components.Title>
        <Flex1/>
        <div className="tables w-[100%] flex justify-center ">
        <table className='border-collapse w-[80%] text-center'>
          <thead className='bg-black-rgba '>
            <tr className=''>
              <th>Order ID</th>
              <th>To</th>
              <th>From</th>
              <th>Quantity</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredmsgs.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.orderId}</td>
                <td>{msg.To}</td>
                <td>{msg.from}</td>
                <td>{msg.Quantity}</td>
                <td>{msg.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    
    </div>
  );
}

export default ProfileT;
