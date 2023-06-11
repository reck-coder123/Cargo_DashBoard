import './App.css';
import { Route, Routes } from "react-router-dom";
import Signup from './components/Registeration';
import Login from './components/Login';
import ProfileM from './components/ProfileM';
import ProfileT from './components/ProfileT';
import Navbar from './components/Navbar';
import Flex1 from './components/Flexbetween/Flex1';

function App() {
  const MToken = localStorage.getItem("Mtoken");
  const Ttoken= localStorage.getItem("Ttoken");
  return (
    <div >
      <Navbar />
      
<Routes>
      <Route path="/signup" exact element={<Signup />} />
      {< Route path="/" exact element={<Login />} />}
      {MToken && <Route path="/profile" element={<ProfileM />} />}
      {Ttoken && <Route path="/profile" element={<ProfileT />} />}
      { <Route path="/profile" element={<Login />} />}

    </Routes>
    <Flex1 />
    
    </div>
    
  );
}

export default App;
