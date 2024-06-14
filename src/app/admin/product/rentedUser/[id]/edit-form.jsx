'use client';
import * as React from 'react';
import { TextField, Stack, Button, MenuItem, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from 'dayjs';
import { editUser } from './action/user-actions';
import Notiflix from 'notiflix';

const FormDataSchema = z.object({
	name: z.string().min(1, { message: 'Name is required.' }),
	email: z.string().email({ message: 'Invalid email address' }),
	address: z.string().min(1, { message: 'Address is required.' }),
	phoneNumber: z.coerce.number({ message: 'Phone number must be number.' }),
	birthday: z.any(),
	readerType: z.any(),
});

export default function EditUser({ id, name, email, address, phoneNumber, bday, readerType }) {
	const [birthday, setBirthday] = React.useState(dayjs(bday));
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
	const editUserID = editUser.bind(null, id);
	const processForm = async (data) => {
		await editUserID({
			name: data.name,
			dateOfBirth: dayjs(birthday),
			readerTypeId: data.readerType,
			address: data.address,
			email: data.email,
			phoneNumber: data.phoneNumber,
		});
        Notiflix.Notify.success("Edit user succesfully");
	};

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Edit user</Typography>
					<TextField
						{...register('name')}
						error={errors.name?.message}
						helperText={errors.name?.message && errors.name.message}
						label='Name'
						sx={{ width: '100%' }}
						defaultValue={name || ''}
					/>
					<TextField
						{...register('email')}
						error={errors.email?.message}
						helperText={errors.email?.message && errors.email.message}
						label='Email'
						sx={{ width: '100%' }}
						defaultValue={email || ''}
					/>
					<TextField
						{...register('address')}
						error={errors.address?.message}
						helperText={errors.address?.message && errors.address.message}
						label='Address'
						sx={{ width: '100%' }}
						defaultValue={address || ''}
					/>

					<TextField
						{...register('phoneNumber')}
						error={errors.phoneNumber?.message}
						helperText={errors.phoneNumber?.message && errors.phoneNumber.message}
						label='Phone Number'
						sx={{ width: '100%' }}
						defaultValue={phoneNumber || ''}
					/>
					<TextField
						select
						{...register('readerType')}
						error={errors.readerType?.message}
						helperText={errors.readerType?.message && errors.readerType.message}
						label='Reader Type'
						sx={{ width: '100%' }}
						defaultValue={readerType}
					>
						<MenuItem key={1} value={1}>
							A
						</MenuItem>
						<MenuItem key={2} value={2}>
							B
						</MenuItem>
						<MenuItem key={3} value={3}>
							C
						</MenuItem>
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
