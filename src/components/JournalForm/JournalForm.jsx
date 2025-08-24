import './JournalForm.css';

import Button from './../Button/Button';

function JournalForm() {
	
	function onFormSubmit(event) {
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		event.preventDefault();
		console.log(formProps);
	}
	
	return (
		<form className='journal-from' onSubmit={onFormSubmit}>
			<input type="text" name='title' />
			<input type="date" name='date' />
			<input type="text" name='tag' />
			<textarea name="post" id=""></textarea>
			<Button text="Сохранить"/>
		</form>
	);

}

export default JournalForm;
