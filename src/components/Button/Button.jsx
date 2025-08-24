import './Button.css';

function Button({ children }) {

	return (
		<button className='button accent'>{children ?? 'Button'}</button>
	);
}

export default Button;
