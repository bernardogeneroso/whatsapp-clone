import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/Toast";

import api from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

interface SigUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SigUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("The Name field is required"),
          email: Yup.string()
            .required("The E-mail field is required")
            .email("Write a valid email"),
          password: Yup.string().min(6, "At least 6 digits"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users/create", data);

        addToast({
          type: "success",
          title: "Registration completed",
          description: "You can now login to Whatshapp!",
        });

        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);

          formRef.current?.setErrors(erros);

          return;
        }

        addToast({
          type: "error",
          title: "Authentication error",
          description: err.response.data.message,
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Whatshapp-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Sign Up</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Go Back
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
