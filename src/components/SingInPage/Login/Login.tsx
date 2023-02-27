import {ChangeEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {IRegisterFormErrors} from '../../Helper/Interfaces';
import {validateField} from '../../Helper/Validator';
import {API_URL} from '../../Api/ApiHelper';
import {ILogin} from '../../Api/Interface';
import {Alert, Box, Button, FormControl, TextField} from '@mui/material';
import {useCookies} from 'react-cookie'
import s from './Login.module.css';

interface ILoginProps {
  toSingPage: () => void;
}

export const Login = ({ toSingPage }: ILoginProps) => {
  const { t } = useTranslation('common');
  const [cookies, setCookie] = useCookies(['access_token']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const initialErrors = {
    email: '',
    password: '',
    server: '',
  };

  const [errors, setErrors] = useState<IRegisterFormErrors>(initialErrors);

  const onSubmit = () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    setErrors({
      email: emailError,
      password: passwordError,
      server: '',
    });

    if (!emailError && !passwordError) {
      const login: ILogin = {
        password,
        email,
      };
      fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors({ ...errors, server: data.error });
          } else {
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + parseInt(data.expire));
            setCookie('access_token', data.token, { path: '/', expires: expireDate });
            localStorage.setItem('user', JSON.stringify(data));
            toSingPage();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

    return (
        <div className={s.wrapper}>
            <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            background: 'white',
            width: 'fit-content',
            padding: 2,
            flexDirection: 'column',
            borderRadius: '25px',
            height: '300px'
        }}>
            <h1>{t('login.title')}</h1>
            <FormControl>
                <TextField id="outlined-basic" label={t('register.email')}
                           error={!!errors.email} variant="outlined" type="email"
                           name="fName" value={email} onChange={onChangeEmail}
                           helperText={errors.email ? t(errors.email) : ''}
                           sx={{mb: 2, minWidth: '500px'}}
                />
                <TextField id="outlined-basic" label={t('register.password')}
                           error={!!errors.password} variant="outlined" type="password"
                           name="fName" value={password} onChange={onChangePassword}
                           helperText={errors.password ? t(errors.password) : ''}
                           sx={{mb: 2, minWidth: '500px'}}
                />
                {errors.server && <Alert severity="error">{t(errors.server)}</Alert>}
                <button className={s.button} onClick={onSubmit}>{t('login.button')}</button>
            </FormControl>
        </Box>
        </div>
    );
}