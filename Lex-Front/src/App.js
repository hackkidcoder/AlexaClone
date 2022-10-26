import './App.css';
import {Alex} from './modules/Alex';
import {User} from './modules/user/User';
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Alex />}/>
          <Route path="/user" element={<User />} />
        
      </Routes>
      </>
  );
 
}
export default App;

