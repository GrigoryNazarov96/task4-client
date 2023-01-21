import React from 'react';
import { useState } from 'react';
import { Form, Card, Button, Container, FormControl } from 'react-bootstrap';
import { loginUser, signUpUser } from '../http/requests';

const Auth = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleClick = async () => {
    try {
      let data;
      if (isLogin) {
        data = await loginUser(email, password);
      } else {
        data = await signUpUser(name, email, password);
      }
      setUser(data);
    } catch (e) {
      setUser({});
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <Form className="d-flex flex-column">
          {!isLogin && (
            <FormControl
              className="mt-5"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Form.Control
            className="mt-4"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-4"
            placeholder="Password..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between mt-5">
            {isLogin ? (
              <div>
              <Button variant='primary' onClick={() => setIsLogin(false)}>Sign Up</Button>
              </div>
            ) : (
              <div>
              <Button variant='primary' onClick={() => setIsLogin(true)}>Log In</Button>
              </div>
            )}
            <Button variant='success' onClick={() => handleClick()}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
