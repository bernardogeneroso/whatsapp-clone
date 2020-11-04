import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer } from "./styles";

import logoSignIn from "../../assets/logoSignIn.png";

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoSignIn} alt="Whatshapp-Clone" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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
