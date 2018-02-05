import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';

Validator.setMessages('en', en);

export const validateData = (data, rules) => new Validator(data, rules);
