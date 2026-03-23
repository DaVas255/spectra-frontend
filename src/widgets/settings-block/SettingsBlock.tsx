import { RecentErrors } from '../recent-errors'

import styles from './SettingsBlock.module.scss'
import { ManageExtensionKey } from '@/features/manage-extension-key'
import { ManageTrackedSites } from '@/features/manage-tracked-sites'

export const SettingsBlock = () => {
	return (
		<>
			<div className={styles.settingsBlock}>
				<ManageExtensionKey />
				<ManageTrackedSites />
			</div>
			<RecentErrors />
		</>
	)
}
