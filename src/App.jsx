import { useEffect, useState } from 'react';

import styles from './App.module.css';

import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';

import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
	const [journalItems, setJournalItems] = useState([]);

	function addJournalItem(newItem) {
		setJournalItems((prev) => [...prev, {
			id: prev.length > 0 ? Math.max(...prev.map(i => i.id)) + 1 : 1,
			title: newItem.title,
			post: newItem.post,
			date: new Date(newItem.date)
		}]);
	}

	useEffect(() => {
		const storedItems = JSON.parse(localStorage.getItem('data'));
		if (storedItems) {
			setJournalItems(storedItems.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(() => {
		if (journalItems.length) {
			localStorage.setItem('data', JSON.stringify(journalItems));
		}
	}, [journalItems]);

	return (
		<div className={styles['app']}>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={journalItems}/>
			</LeftPanel>

			<Body>
				<JournalForm addJournalItem={addJournalItem}/>
			</Body>
		</div>
	);
}

export default App;
