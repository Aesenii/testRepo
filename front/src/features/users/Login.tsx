import React, { useState } from 'react';
import { LoginMutation } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Link, useNavigate } from 'react-router-dom';
import { selectLoginError } from './usersSlice';
import { googleLogin, login } from './usersThunk';
import './RegisterLogin.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(login(state)).unwrap();
      setState((prevState) => ({
        ...prevState,
        username: '',
        password: '',
      }));
      navigate('/');
    } catch {
      // nothing
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title">Sign on</h2>
        {error && <div className="field-error-div">{error.error}</div>}
        <div className="google-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <input
          required
          className="form-input"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={inputChangeHandler}
        />
        <input
          required
          className="form-input"
          placeholder="Password"
          type="password"
          name="password"
          maxLength={10}
          value={state.password}
          onChange={inputChangeHandler}
        />
        <div className="bottom-form">
          <button className="form-btn" type="submit">
            Send
          </button>
          <Link className="go-to-form-link" to={'/register'}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
