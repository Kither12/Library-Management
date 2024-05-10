'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Paper, Stack, Typography, TextField } from '@mui/material';

export default function BookDetail({ book }) {
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Stack spacing={5}>
			<Stack direction='row' spacing={5} justifyContent='space-between'>
				<Paper sx={{ p: 2, minWidth: 'fit-content' }} elevation={3}>
					<Image src={book.image_url} width={300} height={400}></Image>
				</Paper>
				<Stack spacing={5} sx={{ height: 440 }}>
					<Paper sx={{ p: 2 }} elevation={3}>
						<Typography variant='h4' minWidth={600}>
							{book.title}
						</Typography>
						<Typography variant='h6'>Author: {book.author}</Typography>
					</Paper>
					<Paper sx={{ p: 2, height: '100%' }} elevation={3}>
						<Typography variant='h5' minWidth={600}>
							Description
						</Typography>
						<Typography variant='h7'>{book.description}</Typography>
						{/* <Typography variant='h5' minWidth={600}>
							Renting
						</Typography> */}
						<Stack direction='row' sx={{ mt: 2 }} spacing={2}>
							{/* <TextField label='Number of days renting' variant='outlined' /> */}
							<Button variant='contained' size="large">Rent</Button>
						</Stack>
					</Paper>
				</Stack>
			</Stack>
		</Stack>
	);
}
