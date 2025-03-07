import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { LOG_IN, PALLETE } from '../../config/config';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      await login();
      navigate("/tabsComponent")
    } catch (err: any) {
      console.log(err);
      if (err.response?.status == 404) {
        navigate("/signup")
        alert("signup")
        //swal("please sign-Up before you login");
      }
      else
        alert("err")
      //swal("you have a error", `${err}`, "error");}
    }
  }

  const login = async () => {
    const res = await axios.get(`${LOG_IN}/${email}/${password}`);// {
    //   withCredentials: false,
    console.log(res.data);

    // }
    localStorage.setItem("token", res.data)
    navigate("/")
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '600px', height: '400px' }}>
        <p style={{ marginTop: '0px' }}>Log in to your account</p>
        <h4>Enter your email and password</h4>
        <div style={{ marginBottom: '10px' }}>
          <TextField id="email" label="Email address" variant="outlined" sx={{ marginBottom: '10px', width: '300px' }}
            onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>
          <FormControl sx={{ marginBottom: '10px', width: '300px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => { setPassword(e.target.value) }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <Button
              type='submit'
              variant="contained"
              sx={{
                backgroundColor: `${PALLETE.YELLOW} !important`,
                bottom: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '65%',
                borderRadius: '15px'
              }}
              onClick={handleSubmit}>
              Sign Up
            </Button>
            {err && <p>{err}</p>}
          </FormControl>
        </div>

      </Paper>
    </Box>
  );
};

export default Login;