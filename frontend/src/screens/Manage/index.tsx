import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import User from "/user.svg";
// mui imports
import { Button, FormControl, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../models/userModel";
import { createVehicle, fetchVehicle } from "../../redux/vehicleSlicer";
import { RootState, initialState } from "../../models/vehicleModel";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

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
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const vehicles = useSelector((state: RootState) => state.vehicles);

  useEffect(() => {
  dispatch(fetchVehicle());
  }, [dispatch]);

  // verify if the user is logged
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  const [user, setUser] = useState<JwtPayload | any>(getUser());

  // logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // modal for inputs
  const [isModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  // state of the vehicle
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleVehicleEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newVehicle = {
      name,
      plate,
      model,
      year
    };

    dispatch(createVehicle(newVehicle)).then(
      (actionResult: { payload: any }) => {
        const result = actionResult.payload;
        if (result) {
          setName("");
          setPlate("");
          setModel("");
          setYear("");
        }
      }
    );
  };

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
          <div className="list">
            {vehicles?.map((vehicle, index) => (
              <div key={index} className="vehicleCard">
                <span className="card-title">{vehicle.name}</span>
                <span className="card-sub">{vehicle.plate}</span>
                <span className="card-text">{vehicle.model}</span>
              </div>
            ))}
          </div>
        </div>
        {isModal && (
          <>
            <div className="modal">
              <CloseIcon onClick={closeModal} className="close-icon" />
              <p className="subtitle sb-modal">Adicionar novo veículo</p>
              <form className="form-vehicle" onSubmit={handleVehicleEvent}>
                <div className="inputs">
                  <FormControl
                    sx={{ m: 1, width: "40ch" }}
                    required
                    variant="outlined"
                  >
                    <span>Nome</span>
                    <TextField
                      id="outlined-basic"
                      label="Nome do veículo"
                      variant="outlined"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ m: 1, width: "40ch" }}
                    required
                    variant="outlined"
                  >
                    <span>Placa</span>
                    <TextField
                      id="outlined-basic"
                      label="Placa do veículo"
                      variant="outlined"
                      required
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ m: 1, width: "40ch" }}
                    required
                    variant="outlined"
                  >
                    <span>Modelo</span>
                    <TextField
                      id="outlined-basic"
                      label="Modelo do veículo"
                      variant="outlined"
                      required
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ m: 1, width: "40ch" }}
                    required
                    variant="outlined"
                  >
                    <span>Ano</span>
                    <TextField
                      id="outlined-basic"
                      label="Ano do veículo"
                      variant="outlined"
                      type="number"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </FormControl>
                </div>
                <Button
                  variant="contained"
                  className="btn-vehicle"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Manage;
