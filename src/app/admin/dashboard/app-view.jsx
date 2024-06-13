'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentBook from './app-current-visits';
import AppWebsiteVisits from './app-website-visits';
import AppWidgetSummary from './app-widget-summary';
import { isError } from 'lodash';
import useUser from '@/app/hook/useUser';
import LoadingProgress from '@/components/loading';
import useBook, { useRent } from '@/app/hook/useBook';

// ----------------------------------------------------------------------

export default function AppView() {
	const { users, isLoading: isLoading1, isError: isError1 } = useUser();
    
    const { books, isLoading: isLoading2, isError: isError2 } = useBook();

    const { rents, isLoading: isLoading3, isError: isError3 } = useRent();
    if (isLoading1 || isLoading2 || isLoading3) {
		return <LoadingProgress></LoadingProgress>;
	}

	return (
		<Container maxWidth='xl'>
			<Typography variant='h4' sx={{ mb: 5 }}>
				Hi, Welcome back 👋
			</Typography>

			<Grid container spacing={3}>
				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary title='Books' total={books.length} color='success' icon={<img alt='icon' src='/assets/icons/glass/book.png' />} />
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary title='Users' total={users.length} color='info' icon={<img alt='icon' src='/assets/icons/glass/ic_glass_users.png' />} />
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary title='Books Rented' total={rents.length} color='warning' icon={<img alt='icon' src='/assets/icons/glass/ic_glass_buy.png' />} />
				</Grid>

				<Grid xs={12} md={6} lg={8}>
					<AppWebsiteVisits
						title='Book Rented'
						subheader='(+43%) than last year'
						chart={{
							labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
							series: [
								{
									name: 'Novel',
									type: 'area',
									fill: 'gradient',
									data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
								},
								{
									name: 'Fiction',
									type: 'area',
									fill: 'gradient',
									data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
								},
								{
									name: 'Manga',
									type: 'area',
									fill: 'gradient',
									data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
								},
							],
						}}
					/>
				</Grid>

				<Grid xs={12} md={6} lg={4}>
					<AppCurrentBook
						title='Current Book'
						chart={{
							series: [
								{ label: 'Novel', value: 4344 },
								{ label: 'Fiction', value: 5435 },
								{ label: 'Manga', value: 1443 },
							],
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
}
