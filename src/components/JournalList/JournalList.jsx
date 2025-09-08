import styles from './JournalList.module.css';

import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({items}) {

	function sortJournalItems(a, b) {
		return a.date < b.date ? 1 : -1;
	}

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return(
		<section className={styles['journal-list']}>
			{items.sort(sortJournalItems).map((el) => (
				<CardButton key={el.id}>
					<JournalItem 
						title={el.title}
						text={el.text}
						date={el.date}
					/>
				</CardButton>
			))}
		</section>
	);
}

export default JournalList;
