import { useEffect, useReducer } from 'react';
import cn from 'classnames';

import styles from './JournalForm.module.css';

import Button from './../Button/Button';

import { formReducer, INITIAL_FORM_STATE } from './JournalForm.state';

function JournalForm({addJournalItem}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	function onFormSubmit(event) {
		event.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	}

	function onValuesChange(event) {
		dispatchForm({ type: 'CHANGE_VALUE', payload: { [event.target.name]: event.target.value }});
	}

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			addJournalItem(values);
			dispatchForm({ type: 'CLEAR_FORM' });
		}
	}, [isFormReadyToSubmit]);

	
	return (
		<form className={styles['journal-form']} onSubmit={onFormSubmit}>
			<div>
				<input type="text" name='title' value={values.title} onChange={onValuesChange} className={cn(styles['input-title'], {
					[styles['invalid']]: !isValid.title
				})}/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/icons/CalendarIcon.svg" alt="calendar icon" />
					<span>Дата</span>
				</label>
				<input type="date" name='date' id='date' value={values.date} onChange={onValuesChange} className={cn(styles['input'], {
					[styles['invalid']]: !isValid.date
				})}/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/icons/FolderIcon.svg" alt="folder icon" />
					<span>Метки</span>
				</label>
				<input type="text" id='tag' name='tag' value={values.tag} onChange={onValuesChange} className={styles['input']} />
			</div>

			<textarea name="post" cols="30" rows="10" value={values.post} onChange={onValuesChange} className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})}/>
			<Button text="Сохранить"/>
		</form>
	);

}

export default JournalForm;
