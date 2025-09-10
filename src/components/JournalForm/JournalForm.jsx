import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './JournalForm.module.css';

import Button from './../Button/Button';

const INITIAL_FORM_VALID_STATE = {
	title: true,
	post: true,
	date: true
};

function JournalForm({addJournalItem}) {
	const [formValidState, setFormValidState] = useState(INITIAL_FORM_VALID_STATE);

	useEffect(() => {
		let timerId;
		if (!formValidState.date || !formValidState.post || !formValidState.title) {
			timerId = setTimeout(() => {
				setFormValidState(INITIAL_FORM_VALID_STATE);
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

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
		<form className={styles['journal-form']} onSubmit={onFormSubmit}>
			<div>
				<input type="text" name='title' className={cn(styles['input-title'], {
					[styles['invalid']]: !formValidState.title
				})}/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/icons/CalendarIcon.svg" alt="calendar icon" />
					<span>Дата</span>
				</label>
				<input type="date" name='date' id='date' className={cn(styles['input'], {
					[styles['invalid']]: !formValidState.date
				})}/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/icons/FolderIcon.svg" alt="folder icon" />
					<span>Метки</span>
				</label>
				<input type="text" id='tag' name='tag' className={styles['input']} />
			</div>

			<textarea name="post" cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !formValidState.post
			})}/>
			<Button text="Сохранить"/>
		</form>
	);

}

export default JournalForm;
