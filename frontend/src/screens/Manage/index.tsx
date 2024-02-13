import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import User from "/user.svg";
// mui imports
import {
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "../../models/userModel";

// set the user logged in localstorage
function getUser(): JwtPayload | any {
  let token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token) as JwtPayload;
    return decoded;
  }
  return null;
}

const Manage = () => {
  const [user, setUser] = useState<JwtPayload | any>(getUser());
  const navigate = useNavigate();

  // logout user
  const handleLogout = () => {
     localStorage.removeItem("token");
     setUser(null);
     navigate("/");
   };

  // modal for inputs
  const [isModal, setModal] = useState(false);
  const handleModal = () => {setModal(true)};
  const closeModal = () => {setModal(false)};

  // state of the vehicle
  const [name, setName] = useState("");

  return (
    <>
      <div className="main">
        <div className="user-sec">
          <p className="userName">
            Olá, {user?.name}
            <button className="logout" onClick={handleLogout}>
              sair
              <LogoutIcon />
            </button>
          </p>
          <img src={User} />
        </div>
      
        <div className="card">
          <img src="/icon-park_car.svg" className="icon" />
          <h1 className="title">Gerenciamento</h1>
          <div className="line"></div>
          <p className="add-sec" onClick={handleModal}>
            <img src="/plus.svg" />
            adicionar
          </p>
          <p className="subtitle">Lista de veículos</p>
          <div className="list"></div>
        </div>
        {isModal && (
          <>
            <div className="modal">
              <CloseIcon onClick={closeModal} className="close-icon" />
              <p className="subtitle sb-modal">Adicionar veículo</p>
              <form className="inputs">
                <FormControl
                  sx={{ m: 1, width: "40ch" }}
                  required
                  variant="outlined"
                >
                  <TextField
                    id="outlined-basic"
                    label="Nome do veículo"
                    variant="outlined"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Manage;
