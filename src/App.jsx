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

	function addJournalItem(newItem) {
		setJournalItems([...mapItems(journalItems), {
			id: journalItems.length > 0 ? Math.max(...journalItems.map(i => i.id)) + 1 : 1,
			date: new Date(newItem.date),
			...newItem
		}]);
	}

	return (
		<UserContextProvider>
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
		</UserContextProvider>
	);
}

export default App;
