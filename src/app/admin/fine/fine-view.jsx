'use client';

import { TextField, Stack, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addFine } from './fine-action';
import Notiflix from 'notiflix';

const FormDataSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	total: z.coerce.number().int({ message: 'Value must be interger' }).gte(0, 'Value must be greater than or equal 0'),
    note: z.string()
});

export default function FineView() {
	const {
		register,
		handleSubmit,
        reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

	const processForm = async (data) => {
		await addFine({
			total: data.total,
		});
        Notiflix.Notify.success('Charge fine successfully');
        reset();
	};
	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Add fine</Typography>
					<TextField {...register('name')} error={errors.name?.message} helperText={errors.name?.message && errors.name.message} label='Name' sx={{ width: '100%' }} />
					<TextField {...register('total')} error={errors.total?.message} helperText={errors.total?.message && errors.total.message} label='Amount of money' sx={{ width: '100%' }} />
					<TextField multiline rows={3} {...register('note')} error={errors.note?.message} helperText={errors.note?.message && errors.note.message} label='Note' sx={{ width: '100%' }} />
					<Button type='submit' variant='contained' color='success'>
						Confirm
					</Button>
				</Stack>
			</Container>
		</form>
	);
}
