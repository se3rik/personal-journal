import styles from './Header.module.css';

import SelectUser from '../SelectUser/SelectUser';

function Header() {

	return (
		<>
			<img className={styles['logo']} src="/icons/LogoIcon.svg" alt="journal logotype" />
			<SelectUser/>
		</>
	);
}

export default Header;
