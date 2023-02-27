import {ChangeEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {IRegisterFormErrors} from '../../Helper/Interfaces';
import {validateField} from '../../Helper/Validator';
import {API_URL} from '../../Api/ApiHelper';
import {IUser} from '../../Api/Interface';
import {Alert, Box, Button, FormControl, TextField} from '@mui/material';
import s from './Register.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IRegisterProps {
    toLogin: () => void,
}

export const Register = ({toLogin}: IRegisterProps) => {
    const {t} = useTranslation('common');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const initialErrors = {
        email: '',
        fName: '',
        lName: '',
        password: '',
        repeatPassword: '',
        server: ''
    };

  const [errors, setErrors] = useState<IRegisterFormErrors>(initialErrors);

  const onSubmit = () => {
    const emailError = validateField('email', email);
    const fNameError = validateField('fName', fName);
    const lNameError = validateField('lName', lName);
    const passwordError = validateField('password', password);
    const repeatPasswordError =
      repeatPassword !== password || repeatPassword.length === 0 ? 'errors.passwordNoMuch' : '';

    setErrors({
      email: emailError,
      fName: fNameError,
      lName: lNameError,
      password: passwordError,
      repeatPassword: repeatPasswordError,
      server: '',
    });

    if (!fNameError && !lNameError && !emailError && !passwordError && !repeatPasswordError) {
      const user: IUser = {
        first_name: fName,
        last_name: lName,
        password,
        email,
      };
      fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrors({ ...errors, server: data.error });
          } else {
            toLogin();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onChangeFName = (event: ChangeEvent<HTMLInputElement>) => {
    setFName(event.target.value);
  };

  const onChangeLName = (event: ChangeEvent<HTMLInputElement>) => {
    setLName(event.target.value);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

    return (
        <div className={s.wrapper}>
            <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            background: '#e3e3e3',
            width: 'fit-content',
            padding: 2,
            flexDirection: 'column',
            borderRadius: '25px'
        }}>
            <h1>{t('register.title')}</h1>
            <FormControl>
                <TextField id="outlined-basic" label={t('register.firstName')}
                           error={!!errors.fName} variant="outlined" type="text"
                           name="fName" value={fName} onChange={onChangeFName}
                           helperText={errors.fName ? t(errors.fName) : ''}
                           sx={{mb: 2, minWidth: '500px'}}
                />
                <TextField id="outlined-basic" label={t('register.lastName')}
                           error={!!errors.lName} variant="outlined" type="text"
                           name="fName" value={lName} onChange={onChangeLName}
                           helperText={errors.lName ? t(errors.lName) : ''}
                           sx={{mb: 2, minWidth: '500px'}}
                />
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
                <TextField id="outlined-basic" label={t('register.repeatPassword')}
                           error={!!errors.repeatPassword} variant="outlined" type="password"
                           name="fName" value={repeatPassword} onChange={onChangeRepeatPassword}
                           helperText={errors.repeatPassword ? t(errors.repeatPassword) : ''}
                           sx={{mb: 2, minWidth: '500px', color: '#e3e3e3'}}
                />
                {errors.server && <Alert severity="error">{t(errors.server)}</Alert>}
                <button className={s.button} onClick={onSubmit}>{t('register.button')}</button>
            </FormControl>
        </Box>
        </div>
        
    );
}
