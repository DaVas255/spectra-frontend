'use client'

import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Switch } from 'antd'
import { useEffect } from 'react'

import type { CreateTrackedSite } from '../model/types'
import { useManageTrackedSites } from '../model/useManageTrackedSites'

import type { TrackedSite } from '@/entities/tracked-site'

interface SiteModalProps {
	isOpen: boolean
	onClose: () => void
	site?: TrackedSite | null
}

export const SiteModal = ({ isOpen, onClose, site }: SiteModalProps) => {
	const { createTrackedSite, updateTrackedSite, isCreating, isUpdating } =
		useManageTrackedSites()

	const [form] = Form.useForm<CreateTrackedSite>()
	const isEditing = !!site

	useEffect(() => {
		if (!isOpen) {
			form.resetFields()
			return
		}

		form.setFieldsValue({
			url: site?.url || '',
			urlPattern: site?.urlPattern || '',
			name: site?.name || '',
			isActive: site?.isActive ?? true
		})
	}, [form, isOpen, site])

	const handleSubmit = async (values: CreateTrackedSite) => {
		if (isEditing && site) {
			await updateTrackedSite({ id: site.id, ...values })
		} else {
			await createTrackedSite(values)
		}

		form.resetFields()
		onClose()
	}

	return (
		<Modal
			title={
				isEditing ? (
					<>
						<EditOutlined style={{ marginRight: 8 }} />
						Редактировать сайт
					</>
				) : (
					<>
						<PlusOutlined style={{ marginRight: 8 }} />
						Добавить отслеживаемый сайт
					</>
				)
			}
			open={isOpen}
			onCancel={onClose}
			onOk={() => form.submit()}
			confirmLoading={isCreating || isUpdating}
			okText={isEditing ? 'Сохранить' : 'Добавить'}
			cancelText='Отмена'
			width={620}
			destroyOnHidden
			forceRender
		>
			<Form
				form={form}
				layout='vertical'
				onFinish={handleSubmit}
			>
				<Form.Item
					name='name'
					label='Название'
					rules={[
						{ required: true, message: 'Пожалуйста, введите название сайта' }
					]}
				>
					<Input placeholder='Название сайта' />
				</Form.Item>

				<Form.Item
					name='url'
					label='URL сайта'
					rules={[
						{ required: true, message: 'Пожалуйста, введите URL сайта' },
						{
							type: 'url' as const,
							message: 'Пожалуйста, введите корректный URL'
						}
					]}
				>
					<Input placeholder='https://example.com' />
				</Form.Item>

				<Form.Item
					name='urlPattern'
					label='Паттерн URL'
					rules={[
						{ required: true, message: 'Пожалуйста, введите паттерн URL' }
					]}
				>
					<Input placeholder='https://example.com/*' />
				</Form.Item>

				<Form.Item
					name='isActive'
					label='Активен'
					valuePropName='checked'
				>
					<Switch />
				</Form.Item>
			</Form>
		</Modal>
	)
}
