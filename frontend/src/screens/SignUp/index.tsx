import { useState } from "react";
import { NavLink } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// components
import Footer from "../../components/footer";
// material ui imports
import {
  Button,
  Box,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff, ErrorOutline } from "@mui/icons-material";
import { registerUser } from "../../redux/userSlicer";

const SignUp = () => {
  // show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // name, email and password states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redux states
  const { loading, error } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const handleRegisterEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userCredentials = {
      name,
      email,
      password,
    };
    dispatch(registerUser(userCredentials)).then(
      (actionResult: { payload: any }) => {
        const result = actionResult.payload;
        if (result) {
          setName("");
          setEmail("");
          setPassword("");
        }
      }
    );
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
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  // fullWidth
                  id="outlined-basic"
                  label="Nome completo"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <FormControl
                sx={{ m: 1, width: "40ch" }}
                // required
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              </FormControl>
            </div>
            <Button variant="contained" className="btn-login" type="submit">
            {loading?'Loading..':'Cadastrar'}
            </Button>
            {error && (
              <div className="error-message">
                <ErrorOutline /> {error}
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
