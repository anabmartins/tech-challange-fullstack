import { useState } from "react";
import { useNavigate } from "react-router-dom";

// set the user logged in localstorage
function getUser() {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user); else user = null;
  console.log(user);
  return user;
}

const Manage = () => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  
  // logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/')
  };

  return (
    <>
      <div className="main">
        <div className="card">
          <img src="/icon-park_car.svg" className="icon" alt="" />
          <h1 className="title">Gerenciamento</h1>
          <div className="line"></div>

          {user && (
            <>
              <p className="userName">Olá, {user.name}</p>
              <button className="logout" onClick={handleLogout}>
                sair
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Manage;
