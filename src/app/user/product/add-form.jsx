'use client';

import { TextField, Stack, Button, Typography, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { addBook } from './action/product-actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormDataSchema = z.object({
	title: z.string().min(1, { message: 'Title is required.' }),
	author: z.string().min(1, { message: 'Author is required.' }),
	total: z.coerce.number().int({ message: 'Value must be interger' }).gt(0, 'Value must be greater than 0'),
	genre: z.string(),
	description: z.string(),
});

export default function AddBook() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});

	const processForm = async (data) => {
		await addBook({
			title: data.title,
			author: data.author,
			total: data.total,
			description: data.description,
            genre: data.genre,
		});
	};

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Add book</Typography>
					<TextField {...register('title')} error={errors.title?.message} helperText={errors.title?.message && errors.title.message} label='Title' sx={{ width: '100%' }} />
					<TextField {...register('author')} error={errors.author?.message} helperText={errors.author?.message && errors.author.message} label='Author' sx={{ width: '100%' }} />
					<TextField  select {...register('genre')} error={errors.genre?.message} helperText={errors.genre?.message && errors.genre.message} label='Genre' sx={{ width: '100%' }} >
                        <MenuItem key="novel" value="novel">Novel</MenuItem>
                        <MenuItem key="fiction" value="fiction">Fiction</MenuItem>
                        <MenuItem key="manga" value="manga">Manga</MenuItem>
                    </TextField>
					<TextField
						{...register('description')}
						multiLine
						error={errors.description?.message}
						helperText={errors.description?.message && errors.description.message}
						label='Description'
						rows={5}
						sx={{ width: '100%' }}
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
