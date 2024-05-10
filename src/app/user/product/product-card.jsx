import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Image from 'next/image';

import Label from '@/components/label';
// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
	const renderStatus = (
		<Label
			variant='filled'
			color={(product.status === 'sale' && 'error') || 'info'}
			sx={{
				zIndex: 9,
				top: 16,
				right: 16,
				position: 'absolute',
				textTransform: 'uppercase',
			}}
		>
			{product.status}
		</Label>
	);

	const renderImg = (
		<Box
			sx={{
				top: 0,
				width: 1,
				height: 1,
				objectFit: 'cover',
				position: 'absolute',
			}}
		>
			<Image alt={product.title} src={product.image_url} fill />
		</Box>
	);

	return (
		<Card>
			<Box sx={{ pt: '100%', position: 'relative' }}>
				{product.status && renderStatus}

				<Link href={`/user/product/edit/${product.id}`} color='inherit' underline='hover' variant='subtitle2' noWrap>
					{renderImg}
				</Link>
			</Box>

			<Stack spacing={2} sx={{ p: 3 }}>
				{/* <Chip label={product.availability ? 'Available' : 'Rented'} color={product.availability ? 'success' : 'error'} /> */}
				<Tooltip title={product.title}>
					<Link href={`/user/product/edit/${product.id}`} color='inherit' underline='hover' variant='subtitle2' noWrap>
						{product.title}
					</Link>
				</Tooltip>
                <Typography color="green">Available: 10</Typography>
			</Stack>    
		</Card>
	);
}

ShopProductCard.propTypes = {
	product: PropTypes.object,
};
