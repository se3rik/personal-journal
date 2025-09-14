import { useState } from 'react';
import styles from './App.module.css';

import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';

import { UserContext } from './context/user.context.js';

import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

import { useLocalStorage } from './hoooks/useLocalStorage.hook.js';
import { mapItems } from './helpers/mapItems.js';

function App() {
	const [journalItems, setJournalItems] = useLocalStorage('data');
	const [userId, setUserId] = useState(1);

	function addJournalItem(newItem) {
		setJournalItems([...mapItems(journalItems), {
			id: journalItems.length > 0 ? Math.max(...journalItems.map(i => i.id)) + 1 : 1,
			title: newItem.title,
			post: newItem.post,
			date: new Date(newItem.date)
		}]);
	}

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			<div className={styles['app']}>
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList items={mapItems(journalItems)}/>
				</LeftPanel>

				<Body>
					<JournalForm addJournalItem={addJournalItem}/>
				</Body>
			</div>
		</UserContext.Provider>
	);
}

export default App;
