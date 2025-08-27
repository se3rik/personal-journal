import './JournalForm.css';

import Button from './../Button/Button';

function JournalForm({addJournalItem}) {
	function onFormSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		addJournalItem(formProps);
	}
	
	return (
		<form className='journal-from' onSubmit={onFormSubmit}>
			<input type="text" name='title' />
			<input type="date" name='date' />
			<input type="text" name='tag' />
			<textarea name="text" />
			<Button text="Сохранить"/>
		</form>
	);

}

export default JournalForm;
