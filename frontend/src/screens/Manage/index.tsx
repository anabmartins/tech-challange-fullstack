import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import User from "/user.svg";

// set the user logged in localstorage
function getUser() {
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  else user = null;
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
    navigate("/");
  };

  return (
    <>
      {/* {user && ( */}
      {/* <> */}
      <div className="main">
        <div className="user-sec">
          <p className="userName">
            Olá, User
            <button className="logout" onClick={handleLogout}>
              sair
              <LogoutIcon />
            </button>
          </p>
          <img src={User} />
        </div>
        {/* </> */}
        {/* )} */}
        <div className="card">
          <img src="/icon-park_car.svg" className="icon" alt="" />
          <h1 className="title">Gerenciamento</h1>
          <div className="line"></div>
          <p className="add-sec">
            <img src="/plus.svg" />
            adicionar
          </p>
          <p className="subtitle">Lista de veículos</p>
          <div className="list"></div>
        </div>
      </div>
    </>
  );
};

export default Manage;
