'use client'

import { Button } from 'antd'

import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import {
	decrement,
	increment,
	selectCounterValue
} from '@/features/counter/model/counterSlice'

export const List = () => {
	const value = useAppSelector(selectCounterValue)
	const dispatch = useAppDispatch()

	return (
		<div>
			<div>Counter: {value}</div>
			<Button
				type='primary'
				onClick={() => dispatch(increment())}
			>
				+
			</Button>
			<Button
				type='primary'
				onClick={() => dispatch(decrement())}
			>
				-
			</Button>
		</div>
	)
}
