import styles from './Body.module.css';

function Body({ children }) {

	return (
		<section className={styles['body']}>
			{children}
		</section>
	);
}

export default Body;
