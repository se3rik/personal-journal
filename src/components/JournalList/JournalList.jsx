import { useContext } from 'react';

import styles from './JournalList.module.css';

import { UserContext } from '../../context/user.context';

import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);

	function sortJournalItems(a, b) {
		return a.date < b.date ? 1 : -1;
	}

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return(
		<section className={styles['journal-list']}>
			{items
				.filter(el => el.userId === userId)
				.sort(sortJournalItems)
				.map((el) => (
					<CardButton key={el.id} onClick={() => setItem(el)}>
						<JournalItem 
							title={el.title}
							post={el.post}
							date={el.date}
						/>
					</CardButton>
				))}
		</section>
	);
}

export default JournalList;
