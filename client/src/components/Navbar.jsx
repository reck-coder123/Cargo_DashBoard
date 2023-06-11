import axios from 'axios';
import React from 'react';
import Flex1 from './Flexbetween/Flex1';
const isLocalstorageempty = () => {
  if (localStorage.getItem('Mtoken') === null && localStorage.getItem('Ttoken') === null) {
    return true;
  }
  return false;
};


const windowlocation = () => {
  if (window.location.pathname === '/') {
    return true;
  }
  return false;
};

const handlelogout = async () => {
  try {
    if (localStorage.getItem('Mtoken') !== null) {
      await axios.delete('http://localhost:8080/api/logout/manufacturer');
    } else if (localStorage.getItem('Ttoken') !== null) {
      await axios.delete('http://localhost:8080/api/logout/transporter');
    }

    localStorage.clear();
    window.location='/';
  } catch (error) {
    console.log(error);
  }
};

function Navbar() {
  const buttonStyle = 'border-[2px] rounded-[10px] bg-[#c2fbd7] border-[#c2fbd7] text-black px-[25px] py-[7px]';
  
  return (
    <div className='bg-black text-white top-0 fixed z-[9999] w-[100%]'>
      {isLocalstorageempty() ? (
        <div className="navbar flex justify-between items-center w-[100%] ">
          <img className='w-[150px] h-[98px] cursor-pointer bg-[bisque]' src="https://img.freepik.com/premium-vector/global-freight-transportation-logo-design-international-trade-logistic-vector-design_569344-316.jpg?w=2000" alt="logo" />
          <h3>Welcome to Cargo Dashboard</h3>
          {windowlocation() ? (
            <a href="/signup"><button className={'mr-[35px] hover:bg-[green] hover:text-white hover:scale-110 hover:transition-all ' + buttonStyle}>Sign up</button></a>
          ) : (
            <a href="/"><button className={'mr-[35px] hover:bg-[green] hover:text-white hover:scale-110 hover:transition-all ' + buttonStyle}>Sign in</button></a>
          )}
        </div>
      ) : (
        <div className="navbar flex justify-between items-center w-[100%] ">
          <img className='w-[150px] h-[98px] cursor-pointer bg-[bisque]' src="https://img.freepik.com/premium-vector/global-freight-transportation-logo-design-international-trade-logistic-vector-design_569344-316.jpg?w=2000" alt="logo" />
          <h3>Welcome to Cargo Dashboard</h3>
          <button onClick={handlelogout} className={'mr-[35px] hover:bg-[red] hover:text-white hover:scale-110 hover:transition-all ' + buttonStyle}>log out</button>

          </div>
      )}
      <Flex1 />
      
      
    </div>

    
  );
}

export default Navbar;
