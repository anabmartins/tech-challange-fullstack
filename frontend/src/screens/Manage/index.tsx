import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import User from "/user.svg";
// mui imports
import { Button, FormControl, TextField, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../models/userModel";
import {
  createVehicle,
  deleteVehicle,
  editVehicle,
  fetchVehicle,
} from "../../redux/vehicleSlicer";
import { RootState } from "../../models/vehicleModel";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Check } from "@mui/icons-material";

// set the user logged in localstorage

const Manage = () => {
  // verify if the user is logged
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  
  function getUser(): JwtPayload | any {
    let token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as JwtPayload;
      return decoded;
    }
    return null;
  }
  // state of the vehicle
  const vehicleValues = {
    id: "",
    name: "",
    plate: "",
    modelName: "",
    year: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const vehicles = useSelector((state: RootState) => state.vehicle);
  const [vehicle, setVehicle] = useState(vehicleValues);
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("Adicionar novo");

  useEffect(() => {
    dispatch(fetchVehicle());
    const interval = setInterval(() => {
      dispatch(fetchVehicle());
    }, 1000); // Atualiza a lista de veículos a cada 1 segundo
    return () => clearInterval(interval);
  }, [dispatch]);

  const [user, setUser] = useState<JwtPayload | any>(getUser());
  if(user && user.name){
    var username = user.name
    var nameParts = username.split(" ");
    var firstName = nameParts[0] 
  }

  // logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleEditModal = async (vehicleToEdit: any) => {
    handleModal();
    setTitle("Editar");
    setVehicle(vehicleToEdit);
  };

  const handleEdit = async (vehicle: any) => {
      try {
        await dispatch(editVehicle(vehicle));
        setVehicle(vehicleValues);
        setSuccessMessage("Veículo editado com sucesso!")
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Failed to edit vehicle: ", error);
      }
  }
  
  const handleDeleteVehicle = async (vehicleId: number) => {
    try {
      await dispatch(deleteVehicle(vehicleId));
    } catch (error) {
      console.error("Failed to delete vehicle: ", error);
    }
  };

  // modal for inputs
  const [isModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(true);
    setTitle("Adicionar novo");
    setVehicle(vehicleValues);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleVehicleEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newVehicle = {
      name: vehicle.name,
      plate: vehicle.plate,
      modelName: vehicle.modelName,
      year: vehicle.year,
    };

    dispatch(createVehicle(newVehicle)).then(
      (actionResult: { payload: any }) => {
        const result = actionResult.payload;
        if (result) {
          setVehicle((prevVehicle) => ({
            ...prevVehicle,
            name: "",
            plate: "",
            modelName: "",
            year: "",
          }));
        }
      }
    );
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };  

  return (
    <>
      <div className="main">
        <div className="user-sec">
          <p className="userName">
            Olá, {firstName}
            <button className="logout" onClick={handleLogout}>
              sair
              <LogoutIcon />
            </button>
          </p>
          <img src={User} />
        </div>

        <div className="card manage">
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
                <img src="/compass.png" className="car-placeholder" />
                <span className="card-title">{vehicle.name}</span>
                <span className="card-sub">{vehicle.plate}</span>
                <span className="card-text">
                  {vehicle.modelName}, {vehicle.year}
                </span>
                <div className="icons">
                  <span onClick={() => handleEditModal(vehicle)}>
                    <img src="/edit.svg" />
                    Editar
                  </span>
                  <span onClick={() => handleDeleteVehicle(vehicle.id)}>
                    <img src="/trash.svg" />
                    Excluir
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isModal && (
          <>
            <div className="modal">
            {successMessage && (
              <div className="error-message">
              <Alert icon={<Check fontSize="inherit" />} severity="success">
               {successMessage}
              </Alert>
              </div>
            )}
              <CloseIcon onClick={closeModal} className="close-icon" />
              <p className="subtitle sb-modal">{title} veículo</p>
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
                      name="name"
                      value={vehicle.name}
                      onChange={handleChange}
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
                      name="plate"
                      value={vehicle.plate.toUpperCase()}
                      onChange={handleChange}
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
                      name="modelName"
                      value={vehicle.modelName}
                      onChange={handleChange}
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
                      name="year"
                      value={vehicle.year}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>
                {vehicle.id ? (
                  <Button 
                    variant="contained"
                    className="btn-vehicle"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Editar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="btn-vehicle"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Manage;
