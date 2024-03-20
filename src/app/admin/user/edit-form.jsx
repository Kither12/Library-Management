'use client';
import * as React from 'react';
import { TextField, Stack, Button, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';
import dayjs from 'dayjs';

export default function EditUser({ name, email, isMale, birthday }) {
	return (
		<React.Fragment>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<TextField label='Name' sx={{ width: '100%' }} defaultValue={name || ''} />
					<TextField label='Email' sx={{ width: '100%' }} defaultValue={email || ''} />
					<Stack direction='row' spacing={2}>
						<TextField select label='Gender' sx={{ width: '40%' }} defaultValue={isMale}>
							<MenuItem value={true}>Male</MenuItem>
							<MenuItem value={false}>Female</MenuItem>
						</TextField>
						<DatePicker label='Birthday' sx={{ width: '100%' }} defaultValue={dayjs(birthday)} />
					</Stack>
					<Stack direction='row' spacing={2} justifyContent='end'>
						<Button variant='contained' color='success'>
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
		</React.Fragment>
	);
}
