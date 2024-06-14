'use client';

import { TextField, Stack, Button, Typography, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { notFound } from 'next/navigation';
import { rentProduct } from '../../action/product-actions';
import { title } from 'process';
import Notiflix from 'notiflix';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

const FormDataSchema = z.object({
	id: z
		.string()
		.min(1, { message: 'Id is required.' })
		.refine(
			async (val) => {
				const res = await fetch(`http://localhost:3001/api/readers/${val}`);
				try {
					await res.json();
				} catch {
					return false;
				}
				return true;
			},
			{ message: 'User id is invalid.' }
		),
	deadline: z.any()
});

export default function ProductView({ id, title }) {
    const [deadline, setDeadline] = useState(dayjs());
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

	const processForm = async (data) => {
		await rentProduct({
			book_id: id,
			title: title,
			user_id: data.id,
			dead_line: deadline,
			add_date: dayjs(),
		});
		Notiflix.Notify.success('Rent succesfully');
	};
	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Rent book</Typography>
					<TextField {...register('id')} error={errors.id?.message} helperText={errors.id?.message && errors.id.message} label='User Id' sx={{ width: '100%' }} />
					<DatePicker
						sx={{ width: '100%' }}
						error={errors.deadline?.message}
						slotProps={{
							textField: {
								helperText: errors.deadline?.message && errors.deadline.message,
							},
						}}
						label='Deadline'
                        onChange={(value) => {
							setDeadline(value);
						}}
						value={deadline}
					/>
					<Stack direction='row' spacing={2} justifyContent='end'>
						<Button type='submit' variant='contained' color='success'>
							Confirm
						</Button>
						<Link href='/admin/product'>
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
