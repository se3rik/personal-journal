import { forwardRef } from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

const Input = forwardRef(function Input({ className, isValid, appearence, ...props }, ref) {

	return (
		<input
			{...props}
			ref={ref}
			className={cn(className, styles['input'], {
				[styles['invalid']]: !isValid,
				[styles['input-title']]: appearence === 'title'
			})}
		/>
	);
});

export default Input;