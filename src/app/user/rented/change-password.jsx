'use client';
import * as React from 'react';
import { TextField, Stack, Typography, Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sha3_512 } from 'js-sha3';
import Link from 'next/link';
import { changePassword } from './action/product-actions';

const FormDataSchema = z.object({
	password: z.any(),
	new_password: z.string().min(6, { message: 'Password length must be greater than 6' }).max(32, 'Password length must be less than 32'),
});

export default function ChangePasswordUser({ id }) {
	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

    const changePasswordWithID = changePassword.bind(null, id);

	const processForm = async (data) => {
		await changePasswordWithID({
			password: sha3_512(data.password),
			new_password: sha3_512(data.new_password),
		});
	};
	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Change password</Typography>
					<TextField {...register('password')} error={errors.password?.message} helperText={errors.password?.message && errors.password.message} label='Old password' sx={{ width: '100%' }} type='password' />
					<TextField {...register('new_password')} error={errors.new_password?.message} helperText={errors.new_password?.message && errors.new_password.message} label='New password' sx={{ width: '100%' }} typo='password' />
					<Stack direction='row' spacing={2} justifyContent='end'>
						<Button type="submit" variant='contained' color='success'>
							Confirm
						</Button>
						<Link href='/admin/user'>
							<Button variant='contained' color='error'>
								Cancel
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Container>
		</form>
	);
}
