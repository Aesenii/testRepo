import React, { ChangeEvent, useState } from 'react';
import { googleLogin, register } from './usersThunk';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectRegisterError } from './usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterLogin.css';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newUser = {
        email: state.email,
        displayName: state.displayName,
        password: state.password,
        image: file ? file : null,
      };

      await dispatch(register(newUser)).unwrap();
      navigate('/');
    } catch {
      // nothing
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitFormHandler}>
        <div>
          <div>
            <h2 className="form-title">Sign up</h2>
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
              className="form-input"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('email')) && (
              <span className="field-error">{getFieldError('email')}</span>
            )}
            <input
              className="form-input"
              placeholder="Display name"
              name="displayName"
              value={state.displayName}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('displayName')) && (
              <span className="field-error">{getFieldError('displayName')}</span>
            )}
            <input
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              maxLength={10}
              value={state.password}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('password')) && (
              <span className="field-error">{getFieldError('password')}</span>
            )}
          </div>

          <input
            className="file-register-input"
            type="file"
            name="file"
            id="fileReg"
            onChange={onChange}
          />
          <label className="label-file-register" htmlFor="fileReg">
            {file ? (
              <img src={file ? URL.createObjectURL(file) : ''} alt="" />
            ) : (
              <div>
                <span>Upload</span>
                {Boolean(getFieldError('image')) && (
                  <p className="field-error">{getFieldError('image')}</p>
                )}
              </div>
            )}
          </label>
        </div>
        <div className="bottom-form">
          <button className="form-btn" type="submit">
            Send
          </button>
          <Link className="go-to-form-link" to={'/login'}>
            Sign on
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
