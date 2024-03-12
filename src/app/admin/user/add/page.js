'use client';
import * as React from 'react';
import { Box, Typography, TextField, Stack, Button, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';

export default function EditUserPage() {
	return (
		<React.Fragment>
			<Container maxWidth='sm'>
				<Stack spacing={2}>
					<TextField label='Name' sx={{ width: '100%' }} />
					<TextField label='Email' sx={{ width: '100%' }} />
					<Stack direction="row" spacing={2}>
						<TextField select label="Gender" sx={{width: "40%"}}>
							<MenuItem>Male</MenuItem>
							<MenuItem>Female</MenuItem>
						</TextField>
						<DatePicker label='Birthday' sx={{width: "100%"}}/>
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
