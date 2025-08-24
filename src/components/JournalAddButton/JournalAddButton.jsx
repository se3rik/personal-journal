import CardButton from '../CardButton/CardButton';

import './JournalAddButton.css';

function JournalAddButton() {

	return (
		<CardButton className="journal-add">
			<img src="/icons/PlusIcon.svg" alt="plus icon" />
			<span>Новое воспоминание</span>
		</CardButton>
	);
}

export default JournalAddButton;
