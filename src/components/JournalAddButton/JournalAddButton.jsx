import CardButton from '../CardButton/CardButton';

import styles from './JournalAddButton.module.css';

function JournalAddButton({clearForm}) {

	return (
		<CardButton className={styles['journal-add']} onClick={clearForm}>
			<img src="/icons/PlusIcon.svg" alt="plus icon" />
			<span>Новое воспоминание</span>
		</CardButton>
	);
}

export default JournalAddButton;
