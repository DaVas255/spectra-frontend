import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

export default function Loading() {
	return (
		<Flex
			align='center'
			justify='center'
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: '#f9fafb'
			}}
		>
			<Spin
				indicator={
					<LoadingOutlined
						style={{ fontSize: 85, color: '#667eea' }}
						spin
					/>
				}
			/>
		</Flex>
	)
}
