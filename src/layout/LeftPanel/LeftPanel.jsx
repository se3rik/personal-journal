import styles from './LeftPanel.module.css';

function LeftPanel({children}) {

	return (
		<section className={styles['left-panel']}>{children}</section>
	);
}

export default LeftPanel;
