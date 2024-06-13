'use client';

import { TextField, Stack, Button, MenuItem, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';
import { addUser } from './action/user-actions';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sha3_512 } from 'js-sha3';
import dayjs from 'dayjs';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { signup } from '@/app/login/login-action';

const FormDataSchema = z.object({
	name: z.string().min(1, { message: 'Name is required.' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password length must be greater than 6' }).max(32, 'Password length must be less than 32'),
	address: z.string().min(1, { message: 'Address is required.' }),
	phoneNumber: z.coerce.number({ message: 'Phone number must be number.' }),
	readerType: z.any(),
	birthday: z.any(),
});

export default function AddUser() {
	const [birthday, setBirthday] = useState(dayjs());
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

	const processForm = async (data) => {
		await addUser({
            id: data.email, 
			name: data.name,
			fullName: data.name,
			readerTypeId: data.readerType,
			dateOfBirth: dayjs(birthday),
			phoneNumber: data.phoneNumber,
			address: data.address,
			email: data.email,
			status: '',
		});
        await signup({
            email: data.email,
            password: data.password,
        })
        Notiflix.Notify.success("Add user succesfully");
	};

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Add user</Typography>
					<TextField {...register('name')} error={errors.name?.message} helperText={errors.name?.message && errors.name.message} label='Name' sx={{ width: '100%' }} />
					<TextField {...register('email')} error={errors.email?.message} helperText={errors.email?.message && errors.email.message} label='Email' sx={{ width: '100%' }} />
					<TextField
						{...register('password')}
						error={errors.password?.message}
						helperText={errors.password?.message && errors.password.message}
						label='Password'
						sx={{ width: '100%' }}
						type='password'
					/>
					<TextField {...register('address')} error={errors.address?.message} helperText={errors.address?.message && errors.address.message} label='Address' sx={{ width: '100%' }} />
					<TextField
						{...register('phoneNumber')}
						error={errors.phoneNumber?.message}
						helperText={errors.phoneNumber?.message && errors.phoneNumber.message}
						label='Phone Number'
						sx={{ width: '100%' }}
					/>
					<TextField
						select
						{...register('readerType')}
						error={errors.readerType?.message}
						helperText={errors.readerType?.message && errors.readerType.message}
						label='Reader Type'
						sx={{ width: '100%' }}
					>
						<MenuItem key={1} value={1}>A</MenuItem>
						<MenuItem key={2} value={2}>B</MenuItem>
						<MenuItem key={3} value={3}>C</MenuItem>
					</TextField>
					<DatePicker
						sx={{ width: '100%' }}
						error={errors.birthday?.message}
						slotProps={{
							textField: {
								helperText: errors.birthday?.message && errors.birthday.message,
							},
						}}
						label='Birthday'
						onChange={(value) => {
							setBirthday(value);
						}}
						value={birthday}
					/>
					<input type='hidden' {...register('birthday')} value={dayjs(birthday).format('YYYY-MM-DD')} />
					<Stack direction='row' spacing={2} justifyContent='end'>
						<Button type='submit' variant='contained' color='success'>
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
