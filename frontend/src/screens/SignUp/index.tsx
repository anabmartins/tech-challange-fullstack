import { useState } from "react";
import { NavLink } from "react-router-dom";

// components
import Footer from "../../components/footer";
// material ui imports
import {
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Alert,
  FormHelperText,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CheckCircleOutline,
} from "@mui/icons-material";
import { checkEmailExists, registerUser } from "../../redux/userSlicer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  validateForm,
  User,
  ValidationErrors,
} from "../../components/validateForm";

const SignUp = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  // name, email and password states
  const initialUserState = {
    name: "",
    email: "",
    password: "",
  };

  const initialErrorState = {
    nameError: "",
    emailError: "",
    passwordError: "",
  };

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] =
    useState<ValidationErrors>(initialErrorState);
  const [user, setUser] = useState<User>(initialUserState);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleRegisterEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userCredentials = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const checkEmailResult = await dispatch(checkEmailExists(user.email));
    const emailExists = checkEmailResult.payload;

    // set and update the user email value
    const updatedUser = { ...user, emailExists };
  
    const errors = validateForm(updatedUser);
    setErrorMessage(errors);

    if (Object.values(errors).every((error) => !error)) {
      dispatch(registerUser(userCredentials)).then(
        (actionResult: { payload: any }) => {
          const result = actionResult.payload;
          if (result) {
            setUser(initialUserState);
            setErrorMessage(initialErrorState);
            setMessage("Usuário cadastrado com sucesso!");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          }
        }
      );
    }
  };

  return (
    <>
      <section className="main login">
        <div className="card">
          <img src="/icon-park_car.svg" alt="car" className="img-icon" />
          <h1 className="title">Cadastro</h1>
          <span className="line"></span>
          <form className="form" onSubmit={handleRegisterEvent}>
            <div className="inputs">
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <TextField
                  // fullWidth
                  error={!!errorMessage.nameError}
                  helperText={errorMessage.nameError}
                  id="outlined-basic"
                  label="Nome completo"
                  variant="outlined"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <TextField
                  fullWidth
                  error={!!errorMessage.emailError}
                  helperText={errorMessage.emailError}
                  type="e-mail"
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  error={!!errorMessage.passwordError}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                <FormHelperText error>
                  {errorMessage.passwordError}
                </FormHelperText>
              </FormControl>
            </div>
            <Button variant="contained" className="btn-login" type="submit">
              Cadastrar
            </Button>
            {message && (
              <div className="message-register">
                <Alert
                  icon={<CheckCircleOutline fontSize="inherit" />}
                  severity="success"
                >
                  {message}
                </Alert>
              </div>
            )}
            <span className="span">
              Já possui conta? <NavLink to="/">Login</NavLink>
            </span>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default SignUp;
