import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Anasayfa from "./pages/Anasayfa";
import About from "./pages/About";
import MessageDetail from "./pages/MessageDetail";
import Messages from "./pages/Messages";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Anasayfa />} />
        <Route path="about/:id" element={<About />} />
        <Route path="/messages/:id" element={<Messages/>}/> 
        <Route path="/detail/:messageId" element={<MessageDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
