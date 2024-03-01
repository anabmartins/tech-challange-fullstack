export interface User {
  name: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  nameError: string;
  emailError: string;
  passwordError: string;
}

export const validateForm = (user: User & { emailExists: boolean }): ValidationErrors => {
  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const errors: ValidationErrors = {
    nameError: "",
    emailError: "",
    passwordError: "",
  };

  if (!user.name) {
    valid = false;
    errors.nameError = "Nome é obrigatório.";
  } else if (user.name.length < 3) {
    valid = false;
    errors.nameError = "Nome inválido.";
  }
  if (!user.email) {
    valid = false;
    errors.emailError = "Email é obrigatório.";
  }
  if (!emailRegex.test(user.email)) {
    valid = false;
    errors.emailError = "Email inválido.";
  } else if (user.emailExists) {
    valid = false;
    errors.emailError = "Este email já está em uso.";
  }
  if (!user.password) {
    valid = false;
    errors.passwordError = "Senha é obrigatória.";
  } else if (user.password.length < 6) {
    valid = false;
    errors.passwordError = "Senha deve conter no mínimo 6 caracteres.";
  } else if (!passwordRegex.test(user.password)) {
    valid = false;
    errors.passwordError =
      "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.";
  }
  return errors;
};
