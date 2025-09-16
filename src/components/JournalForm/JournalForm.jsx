import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';

import styles from './JournalForm.module.css';

import Button from './../Button/Button';
import Input from '../Input/Input';

import { formReducer, INITIAL_FORM_STATE } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ addJournalItem, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_FORM_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	function onFormSubmit(event) {
		event.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	}

	function onValuesChange(event) {
		dispatchForm({ type: 'CHANGE_VALUE', payload: { [event.target.name]: event.target.value }});
	}

	function focusError(isValid) {
		switch(true) {
		case(!isValid.title): 
			titleRef.current.focus();
			break;
		case(!isValid.date): 
			dateRef.current.focus();
			break;
		case(!isValid.post): 
			postRef.current.focus();
			break;
		}
	}

	function deleteJournalItem() {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR_FORM' });
		dispatchForm({ type: 'CHANGE_VALUE', payload: { userId }});
	}

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
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
			dispatchForm({ type: 'CHANGE_VALUE', payload: { userId }});
		}
	}, [isFormReadyToSubmit, values, addJournalItem, userId]);

	useEffect(() => {
		dispatchForm({ type: 'CHANGE_VALUE', payload: { userId }});
	}, [userId]);

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR_FORM' });
			dispatchForm({ type: 'CHANGE_VALUE', payload: { userId }});
		}
		dispatchForm({ type: 'CHANGE_VALUE', payload: { ...data }});

	}, [data]);
	
	return (
		<form className={styles['journal-form']} onSubmit={onFormSubmit}>
			<div className={styles['form-row']}>
				<Input
					placeholder="Название поста"
					type="text"
					appearence="title" 
					name='title' 
					ref={titleRef} 
					isValid={isValid.title} 
					value={values.title} 
					onChange={onValuesChange}
				/>
				{ data?.id && (
					<button className={styles['delete-btn']} type='button' onClick={deleteJournalItem}>
						<img src="/icons/ArchiveIcon.svg" alt="delete-icon" />
					</button>
				)}
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/icons/CalendarIcon.svg" alt="calendar icon" />
					<span>Дата</span>
				</label>
				<Input 
					type="date" 
					name='date' 
					ref={dateRef} 
					isValid={isValid.date} 
					id='date' 
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} 
					onChange={onValuesChange} 
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/icons/FolderIcon.svg" alt="folder icon" />
					<span>Метки</span>
				</label>
				<Input 
					placeholder='Укажите метку'
					type="text" 
					id='tag' 
					name='tag'
					isValid={true}
					value={values.tag} 
					onChange={onValuesChange} 
				/>
			</div>

			<textarea 
				placeholder='Напишите текст для поста...'
				name="post" 
				cols="30" 
				rows="10" 
				ref={postRef} 
				value={values.post} 
				onChange={onValuesChange} 
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}
			/>

			<Button text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
