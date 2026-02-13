import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Spin } from 'antd'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import { ReactQueryProvider, StoreProvider } from '@/core/providers'
import '@/core/styles/index.scss'
import { Header } from '@/widgets/header'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Spectra',
	description: 'Monitor and analyze your application logs'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<ReactQueryProvider>
					<StoreProvider>
						<AntdRegistry>
							<Header />
							<Suspense fallback={<Spin size='large' />}>
								<main className='main'>{children}</main>
							</Suspense>
						</AntdRegistry>
					</StoreProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}

export default RootLayout
