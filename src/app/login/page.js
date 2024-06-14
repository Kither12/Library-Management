'use client';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from '@/theme/css';

import Iconify from '@/components/iconify';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from './login-action';

const FormDataSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password length must be greater than 6' }).max(32, 'Password length must be less than 32'),
});

// ----------------------------------------------------------------------

export default function LoginView() {
	const theme = useTheme();

	const [showPassword, setShowPassword] = useState(false);

	const {
        register,
		handleSubmit,
        setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

	const processForm = async (data) => {
		const res = await login({
			usrname: data.email,
			password: data.password,
		});
        if(res === false){
            setError('password', { type: 'custom', message: 'User name or password are wrong' });
        }
	};

	const renderForm = (
		<form onSubmit={handleSubmit(processForm)}>
			<Stack spacing={3}>
				<TextField {...register('email')} error={errors.email?.message} helperText={errors.email?.message && errors.email.message} label='Email address' />

				<TextField
					{...register('password')}
					error={errors.password?.message}
					helperText={errors.password?.message && errors.password.message}
					label='Password'
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
									<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<LoadingButton fullWidth size='large' type='submit' variant='contained' color='inherit' sx={{ mt: 3 }}>
				Login
			</LoadingButton>
		</form>
	);

	return (
		<Box
			sx={{
				...bgGradient({
					color: alpha(theme.palette.background.default, 0.2),
					imgUrl: '/assets/background/Background.jpg',
				}),
				height: 1,
			}}
		>
			<Stack alignItems='center' justifyContent='center' sx={{ height: 1 }}>
				<Card
					sx={{
						p: 5,
						width: 1,
						maxWidth: 420,
					}}
				>
					<Typography variant='h4' sx={{ mb: 2 }}>
						Sign in to ELib
					</Typography>

					{/* <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
            Don't have an account? {' '}
            <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/register">
              Get started
            </Link>
          </Typography> */}

					{renderForm}
				</Card>
			</Stack>
		</Box>
	);
}
