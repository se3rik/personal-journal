import styles from './JournalItem.module.css';

function JournalItem({title, post, date}) {

	const formatedDate = new Intl.DateTimeFormat('ru-Ru').format(date);

	return (
		<>
			<h2 className={styles['journal-item__header']}>{title}</h2>
			<h2 className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formatedDate}</div>
				<div className={styles['journal-item__text']}>{post}</div>
			</h2>
		</>
	);

}

export default JournalItem;
