'use client';
import * as React from 'react';
import { TextField, Stack, Button, Typography, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { editBook } from './action/product-actions';
import Notiflix from 'notiflix';

const FormDataSchema = z.object({
	title: z.string().min(1, { message: 'Title is required.' }),
	author: z.string().min(1, { message: 'Author is required.' }),
    publisher: z.string().min(1, { message: 'Publisher is required.' }),
	description: z.string(),
    genre: z.string(),
});

export default function EditBook({ id, title, author, genre, description, publisher }) {
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
			publisher: data.publisher,
            genre: data.genre,
			description: data.description,
            added_date: dayjs().format("YYYY-MM-DD")
		});
        Notiflix.Notify.success("Edit book successfully");
	};

	return (
		<form onSubmit={handleSubmit(processForm)}>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<Typography variant='h4'>Add book</Typography>
					<TextField {...register('title')} error={errors.title?.message} helperText={errors.title?.message && errors.title.message} label='Title' sx={{ width: '100%' }} defaultValue={title}/>
					<TextField {...register('author')} error={errors.author?.message} helperText={errors.author?.message && errors.author.message} label='Author' sx={{ width: '100%' }} defaultValue={author}/>
					<TextField {...register('publisher')} error={errors.publisher?.message} helperText={errors.publisher?.message && errors.publisher.message} label='Publisher' sx={{ width: '100%' }} defaultValue={publisher}/>
					<TextField  select {...register('genre')} error={errors.genre?.message} helperText={errors.genre?.message && errors.genre.message} defaultValue={genre} label='Genre' sx={{ width: '100%' }} >
                        <MenuItem key="novel" value="novel">Novel</MenuItem>
                        <MenuItem key="fiction" value="fiction">Fiction</MenuItem>
                        <MenuItem key="manga" value="manga">Manga</MenuItem>
                    </TextField>
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
