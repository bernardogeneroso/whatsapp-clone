import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Whatshapp-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <Input name="email" icon={FiMail} type="text" placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Log In</Button>

            <Link to="/forgot-password">I forgot my password</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Create account
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
