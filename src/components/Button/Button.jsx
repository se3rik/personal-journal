import styles from './Button.module.css';

function Button({ text }) {

	return (
		<button className={`${styles['button']} ${styles['accent']}`}>{text}</button>
	);
}

export default Button;
