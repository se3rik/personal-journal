import { useState } from 'react';

import './App.css';

import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';

import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

const INITIAL_DATA = [{
	id: 1,
	title: 'Подготовка к обновлению курсов',
	text: 'Думал, что очень много времени',
	date: new Date()
},
{
	id: 2,
	title: 'Поход в горы',
	text: 'Горные походы открывают удивительные природные ландшафт',
	date: new Date()
}];

function App() {
	const [journalItems, setJournalItems] = useState(INITIAL_DATA);

	function addJournalItem(newItem) {
		setJournalItems((prev) => [...prev, {
			id: Math.max(...prev.map(i => i.id)) + 1,
			title: newItem.title,
			text: newItem.text,
			date: new Date(newItem.date)
		}]);
	}

	return (
		<div className='app'>
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
