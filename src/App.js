import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import MSM from "./assets/msm.png"
import './App.css';


// dont forget console.log 

function App() {

  const [ user, setUser ] = useState([]);
console.log({user});
  function handleCallbackResponse(response) {
    var token = response.credential
console.log({token});

    console.log("Encoded JWT ID Token: " + token);
    var userObject = jwt_decode(token);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    // change credentials 
    google.accounts.id.initialize({
      client_id: "749035568078-vusb1fvn9vutcfnrgllad36hmko8tvea.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, [])
  console.log({user});



  return (
    <>
    <div className="App">
    {
  Object.keys(user).length != 0 && 
  <>
<div className="App-Header">
  <div className="App-Header-Left">
    <div><img src={MSM}></img></div>
    <h1>SMS Göndəriş</h1>
    <h1> Hesabatlar</h1>
    <h1> Qruplar</h1>
    <h1> Hazır mesajlar</h1>
    <h1>Qara siyahı</h1>
    <h1> Admin</h1>
  </div>  
  <div className="App-Header-Right">
    
    {Object.keys(user).length != 0 && <>
      <h1>{user.name}</h1>
    <button onClick={ (e)  => handleSignOut(e)}>Çıxış</button>
    </>  }
    
  </div>
</div>
<div className="App-Footer">
  <div> <h1>MSMT LLC Mobile Solutions & Marketing</h1> <p>© 2023 - Bütün hüquqları qorunur.</p> </div>
  <div><h1>Kaveroçkin küç 127-129 m 8 AZ1007 Bakı</h1> <p>Telefon: (+994 12) 441 55 11</p> </div>
  <div><h1>info@msm.az</h1> <p>Texniki dəstək : (+994 12) 441 55 11</p> </div>
</div>



  </>
  }






{/* { 
  <button onClick={ (e)  => handleSignOut(e)}>Sign Out</button>
} */}

{/*

{ user &&
  <div >
    <img src={user.picture}></img>
    <h3>{user.name}</h3>
  </div>
} */}
</div>
<div id='signInDiv'></div>
</>
  );
}

export default App;
