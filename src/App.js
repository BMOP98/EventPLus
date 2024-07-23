import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Usrheader from './UI/Components/Usrheader';
import Usrindex from './UI/Components/Usrindex';
import Usrfooter from './UI/Components/Usrfooter';
import Usrhalls from './UI/Components/Usrhalls';
import Usrregister from './UI/Components/Usrregister';
import Usrlogin from './UI/Components/UsrLogin';

// Clients
import Clsindex from './UI/Client/Clsindex';
import Clsheader from './UI/Client/Clsheader';
import Clshalls from './UI/Client/Clshalls';
import Clshall from './UI/Client/Clshall';

// Admin
import Admheader from './UI/Admin/Admheader';
import Admindex from './UI/Admin/Admindex';
import Admhalls from './UI/Admin/Admhalls';
import Admnewhall from './UI/Admin/Admnewhall';
import Admedithall from './UI/Admin/Admedithall';
import Admrent from './UI/Admin/Admrent';
import Admnewrent from './UI/Admin/Admnewrent';
import Admeditrent from './UI/Admin/Admeditrent';
import Admservices from './UI/Admin/Admservices';
import Admnewservice from './UI/Admin/Admnewservice';
import Admeditservice from './UI/Admin/Admeditservice';


function App() {
  var item_varRoll = sessionStorage.getItem("item_rol");

  const Client = () => {
    return <Router>
      <div>  
        <Routes>
          <Route path="/Client" element={<><Clsheader/><Clsindex /></> } />
          <Route path="/Clshalls" element={<><Clsheader/><Clshalls /></>} />
          <Route path="/Clshall/:idhalls/:idclients" component={Clshall} element={<><Clsheader/><Clshall/></>}/>
        </Routes>
      </div>
    </Router>
  }

  const Admin = () => {
    return <Router>
      <div>
        
        <Routes>
          <Route path="/Admin" element={<><Admheader/><Admindex /></> } />
          <Route path="/Admhalls" element={<><Admheader/><Admhalls /></>} />
          <Route path="/Newhall" element={<><Admheader/><Admnewhall /></>} />
          <Route path="/Admedithall/:idhalls" component={Admedithall} element={<><Admheader/><Admedithall /></>} />
          <Route path="/Admrent" element={<><Admheader/><Admrent /></>} />
          <Route path="/Newrent" element={<><Admheader/><Admnewrent /></>} />
          <Route path="/Admeditrent/:idrents" component={Admeditrent} element={<><Admheader/><Admeditrent /></>} />
          <Route path="/Admservices" element={<><Admheader/><Admservices /></>} />
          <Route path="/Newservice" element={<><Admheader/><Admnewservice /></>} />
          <Route path="/Admeditservice/:idservices" component={Admeditservice} element={<><Admheader/><Admeditservice /></>} />
        </Routes>
      </div>
    </Router>
  }

  const User = () => {
    return <Router>
      <div>
        
        <Routes>
          <Route path="/Home" element={<><Usrheader/><Usrindex /></>} />
          <Route exact path="/" element={<><Usrheader/><Usrindex /></>} />
          <Route exact path="/Halls" element={<><Usrheader/><Usrhalls /></>} />
          <Route exact path="/Register" element={<><Usrheader/><Usrregister /></>} />
          <Route exact path="/Login" element={<><Usrheader/><Usrlogin /></>} />
        </Routes>
      </div>
    </Router>
  }

  return (
    <>
      {item_varRoll === "admin" ? <Admin /> : item_varRoll === "client" ? <Client /> : null}
      <User />
      <Usrfooter /> 
    </>
  );
}

export default App;
