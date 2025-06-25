import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Enter a valid email address"),
  password: Yup.string().required("Password is required"),
});
