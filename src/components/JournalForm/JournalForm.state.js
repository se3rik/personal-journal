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
		const postValidity = state.values.post.trim().length;
		const titleValidity = state.values.title.trim().length;
		const dateValidity = state.values.date;
		return {
			...state,
			isValid: {
				post: postValidity,
				title: titleValidity,
				date: dateValidity
			},
			isFormReadyToSubmit: postValidity && titleValidity && dateValidity
		};
	}
	case 'CHANGE_VALUE': {
		return {...state, values: {...state.values, ...action.payload}};
	}
	case 'CLEAR_FORM': {
		return INITIAL_FORM_STATE;
	}
	}
}