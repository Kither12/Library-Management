'use client';

import { TextField, Stack, Button, Typography, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addConfig } from './config-action';
import Notiflix from 'notiflix';

import LoadingProgress from '@/components/loading';
import useConfig from '@/app/hook/useConfig';

const FormDataSchema = z
	.object({
		ageMin: z.coerce.number().int({ message: 'Value must be interger' }).gte(0, 'Value must be greater than or equal 0'),
		ageMax: z.coerce.number().int({ message: 'Value must be interger' }).gte(0, 'Value must be greater than or equal 0'),
		dayMax: z.coerce.number().int({ message: 'Value must be interger' }).gte(0, 'Value must be greater than or equal 0'),
	})
	.refine((data) => data.ageMin <= data.ageMax, {
		message: 'ageMin must be greater than or equal ageMax',
		path: ['ageMin'],
	});

export default function ConfigView() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

	const processForm = async (data) => {
		await addConfig({
			ageMax: data.ageMax,
			ageMin: data.ageMin,
			dayMax: data.dayMax,
		});
		Notiflix.Notify.success('Change config successfully');
	};

	const {data, isLoading, isError} = useConfig();

	if (isLoading) {
		return <LoadingProgress></LoadingProgress>;
	}

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Library config</Typography>
					<Stack direction='row' justifyContent='space-between' spacing={2}>
						<TextField defaultValue={data.ageMin} {...register('ageMin')} error={errors.ageMin?.message} helperText={errors.ageMin?.message && errors.ageMin.message} label='Age min' sx={{ width: '100%' }} />
						<TextField defaultValue={data.ageMax} {...register('ageMax')} error={errors.ageMax?.message} helperText={errors.ageMax?.message && errors.ageMax.message} label='Age max' sx={{ width: '100%' }} />
					</Stack>
					<TextField defaultValue={data.dayMax} {...register('dayMax')} error={errors.dayMax?.message} helperText={errors.dayMax?.message && errors.dayMax.message} label='Day max' sx={{ width: '100%' }} />
					<Stack direction='row' spacing={2} justifyContent='end'>
						<Button type='submit' variant='contained' color='success'>
							Confirm
						</Button>
						<Button variant='contained' color='error'>
							Reset
						</Button>
					</Stack>
				</Stack>
			</Container>
		</form>
	);
}
