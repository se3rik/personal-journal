import { useState } from 'react';

import './JournalForm.css';

import Button from './../Button/Button';

function JournalForm({addJournalItem}) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});

	function onFormSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;

		if(!formProps.title.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}

		if(!formProps.post.trim().length) {
			setFormValidState(state => ({...state, post: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, post: true}));
		}

		if(!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}

		if (!isFormValid) {
			return;
		}
		addJournalItem(formProps);
	}
	
	return (
		<form className='journal-from' onSubmit={onFormSubmit}>
			<input type="text" name='title' style={{border: formValidState.title ? undefined : '1px solid red'}}/>
			<input type="date" name='date' style={{border: formValidState.date ? undefined : '1px solid red'}}/>
			<input type="text" name='tag' />
			<textarea name="post" style={{border: formValidState.post ? undefined : '1px solid red'}}/>
			<Button text="Сохранить"/>
		</form>
	);

}

export default JournalForm;
