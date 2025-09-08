import styles from './Header.module.css';

function Header() {

	return (
		<img className={styles.logo} src="/icons/LogoIcon.svg" alt="journal logotype" />
	);
}

export default Header;
