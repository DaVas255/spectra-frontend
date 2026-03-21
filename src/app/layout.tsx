import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Spin } from 'antd'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import {
	AuthProvider,
	ReactQueryProvider,
	StoreProvider
} from '@/core/providers'
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
							<Suspense fallback={<Spin size='large' />}>
								<AuthProvider>
									<Header />
									<main className='main'>
										<div className='container'>{children}</div>
									</main>
								</AuthProvider>
							</Suspense>
						</AntdRegistry>
					</StoreProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}

export default RootLayout
