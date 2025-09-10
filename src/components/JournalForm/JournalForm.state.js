export const INITIAL_FORM_STATE = {
	isValid: {
		post: true,
		title: true,
		date: true
	},
	values: {
		post: '',
		title: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch(action.type) {
	case 'RESET_VALIDITY': {
		return {...state, isValid: INITIAL_FORM_STATE.isValid};
	}
	case 'SUBMIT': {
		const postValidity = action.payload.post.trim().length;
		const titleValidity = action.payload.title.trim().length;
		const dateValidity = action.payload.date;
		return {
			isValid: {
				post: postValidity,
				title: titleValidity,
				date: dateValidity
			},
			values: action.payload,
			isFormReadyToSubmit: postValidity && titleValidity && dateValidity
		};
	}
	}
}