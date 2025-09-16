import { useContext } from 'react';

import styles from './SelectUser.module.css';

import { UserContext } from '../../context/user.context';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);

	function onChangeUser(event) {
		setUserId(Number(event.target.value));
	}

	return (
		<select className={styles['select']} name="user" id="user" value={userId} onChange={onChangeUser}>
			<option value="1">Антон</option>
			<option value="2">Вася</option>
		</select>
	);
}

export default SelectUser;
