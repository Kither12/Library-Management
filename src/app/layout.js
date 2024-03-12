import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeProvider from '../theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<UserProvider>
				<AppRouterCacheProvider>
					<ThemeProvider>
						<body className={inter.className}>{children}</body>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</UserProvider>
		</html>
	);
}
