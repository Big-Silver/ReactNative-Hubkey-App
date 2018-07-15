import validation from 'validate.js'

export default function validator(fieldName, value) {
	const constraints = {
		email: {
			presence: {
				message: "is required",
				allowEmpty: false
			},
			email: {
				message: "doesn't look like a valid email"
			}
		},
		password: {
	    presence: {
				message: "is required",
				allowEmpty: false
			},
	    length: {
	        minimum: 6,
	        message: 'requires minimum 6 length',
			}
		},
		name: {
			presence: {
				message: "is required",
				allowEmpty: false
			},
		},
		phone: {
			presence: {
				message: "is required",
				allowEmpty: false
			},
			format: {
				pattern: "[0-9]+",
				flags: "i",
				message: "can only contain 0-9"
			}
		}
	};

	let formValues = {};
	formValues[fieldName] = value;
	
	let formFields = {};
	formFields[fieldName] = constraints[fieldName];

	const result = validation(formValues, formFields);

	if (result) {
		return result[fieldName][0];
	}

	return null;
}