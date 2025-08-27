import { useState } from 'react';

import './App.css';

import LeftPanel from './layout/LeftPanel/LeftPanel';
import Body from './layout/Body/Body';

import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalItem from './components/JournalItem/JournalItem';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import CardButton from './components/CardButton/CardButton';

const INITIAL_DATA = [{
	title: 'Подготовка к обновлению курсов',
	text: 'Думал, что очень много времени',
	date: new Date()
},
{
	title: 'Поход в горы',
	text: 'Горные походы открывают удивительные природные ландшафт',
	date: new Date()
}];

function App() {
	const [journalItems, setJournalItems] = useState(INITIAL_DATA);

	function addJournalItem(newItem) {
		setJournalItems((prev) => [...prev, {
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
				<JournalList>
					{journalItems.map((el) => (
						<CardButton key={el.title}>
							<JournalItem 
								title={el.title}
								text={el.text}
								date={el.date}
							/>
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>

			<Body>
				<JournalForm addJournalItem={addJournalItem}/>
			</Body>
		</div>
	);
}

export default App;
