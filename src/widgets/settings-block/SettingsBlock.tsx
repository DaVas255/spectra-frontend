import styles from './SettingsBlock.module.scss'
import { ManageExtensionKey } from '@/features/manage-extension-key'

export const SettingsBlock = () => {
	return (
		<div className={styles.settingsBlock}>
			<ManageExtensionKey />
		</div>
	)
}
