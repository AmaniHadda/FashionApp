
const Validations = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email  est obligatoire";
  }

  if (!values.password) {
    errors.password = "Mot de passe est obligatoire";
  } else if (values.password.length < 8) {
    errors.password = "Password must be more than 8 characters";
  }

  return errors;
};

export default Validations;

