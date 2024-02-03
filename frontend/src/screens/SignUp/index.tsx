import { NavLink } from "react-router-dom";
import Footer from "../../components/footer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SignUp = () => {
  return (
    <>
      <section className="main login">
        <div className="card">
          <img src="/icon-park_car.svg" alt="car" className="img-icon" />
          <h1 className="title">Cadastro</h1>
          <span className="line"></span>
          <form action="" className="form">
            <div className="inputs">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "24ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Nome completo"
                  variant="outlined"
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "24ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "24ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Senha"
                  variant="outlined"
                />
              </Box>
            </div>
            <Button variant="contained" className="btn-login">
              Cadastrar
            </Button>
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
