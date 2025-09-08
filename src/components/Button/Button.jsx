import cn from 'classnames';

import styles from './Button.module.css';

function Button({ text }) {

	return (
		<button className={cn(styles['button'], styles['accent'])}>{text}</button>
	);
}

export default Button;
