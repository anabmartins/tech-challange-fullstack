import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
// redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginUser } from "../../redux/userSlicer";
// mui imports
import {
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff, ErrorOutline, Check } from "@mui/icons-material";

const SignIn = () => {
  // show and hide password feature
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // email and password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redux states
  const { loading, error } = useSelector((state: any) => state.user);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigate = useNavigate();

  const handleLoginEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };

    dispatch(loginUser(userCredentials)).then(
      (actionResult: { payload: any }) => {
        const result = actionResult.payload;
        if (result) {
          setEmail("");
          setPassword("");
          navigate("/manage");
        }
      }
    );
  };

  return (
    <>
      <section className="main login">
        <div className="card">
          <img src="/icon-park_car.svg" alt="car" className="img-icon" />
          <h1 className="title">Login</h1>
          <span className="line"></span>
          <form className="form" onSubmit={handleLoginEvent}>
            <div className="inputs">
              <FormControl
                sx={{ m: 1, width: "40ch" }}
                required
                variant="outlined"
              >
                <TextField
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "40ch" }}
                required
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
              {loading ? "Loading.." : "Login"}
            </Button>
            {error && (
              <div className="error-message">
              <Alert icon={<ErrorOutline fontSize="inherit" />} severity="error">
               {error}
              </Alert>
              </div>
            )}
            <span className="span">
              Não possui conta? <NavLink to="/signup">Cadastre-se</NavLink>
            </span>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default SignIn;
