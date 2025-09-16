import { useState } from 'react';

import styles from './App.module.css';

import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';

import { UserContextProvider } from './context/user.context';

import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

import { useLocalStorage } from './hoooks/useLocalStorage.hook.js';
import { mapItems } from './helpers/mapItems.js';

function App() {
	const [journalItems, setJournalItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	function addJournalItem(item) {
		if(!item.id) {
			setJournalItems([...mapItems(journalItems), {
				id: journalItems.length > 0 ? Math.max(...journalItems.map(i => i.id)) + 1 : 1,
				date: new Date(item.date),
				...item
			}]);
		} else {
			setJournalItems([...mapItems(journalItems).map(i => {
				return i.id === item.id ? { ...item } : i;
			})]);
		}
	}

	function deleteItem(id) {
		setJournalItems([...journalItems.filter(i => i.id !== id)]);
	}

	return (
		<UserContextProvider>
			<div className={styles['app']}>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(journalItems)} setItem={setSelectedItem}/>
				</LeftPanel>

				<Body>
					<JournalForm addJournalItem={addJournalItem} onDelete={deleteItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
