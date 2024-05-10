'use client';
import * as React from 'react';
import { TextField, Stack, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { editBook } from './action/product-actions';

const FormDataSchema = z.object({
	title: z.string().min(1, { message: 'Title is required.' }),
	author: z.string().min(1, { message: 'Author is required.' }),
	total: z.coerce.number().int({ message: 'Value must be interger' }).gt(0, 'Value must be greater than 0'),
	description: z.string(),
});

export default function EditBook({ id, title, author, total, description }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(FormDataSchema),
	});
    const editBookID = editBook.bind(null, id);
	const processForm = async (data) => {
		await editBookID({
			title: data.title,
			author: data.author,
			total: data.total,
			description: data.description,
		});
	};

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Add book</Typography>
					<TextField {...register('title')} error={errors.title?.message} helperText={errors.title?.message && errors.title.message} label='Title' sx={{ width: '100%' }} defaultValue={title}/>
					<TextField {...register('author')} error={errors.author?.message} helperText={errors.author?.message && errors.author.message} label='Author' sx={{ width: '100%' }} defaultValue={author}/>
					<TextField {...register('total')} error={errors.total?.message} helperText={errors.total?.message && errors.total.message} label='Total' sx={{ width: '100%' }} defaultValue={total}/>
					<TextField
						{...register('description')}
						multiline
						error={errors.description?.message}
						helperText={errors.description?.message && errors.description.message}
                        defaultValue={description}
						label='Description'
						rows={3}
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
