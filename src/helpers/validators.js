import api from './api';
import delay from './debounce';

const validators = {
    email: [{
            type: 'email',
            message: 'It does not look like the valid email'
        },
        {
            validator: async (rule, value) => {
                return await debounceEmail(checkEmailAvailability, [value])
            },
        },
    ],
    password: [{
            type: 'string',
            min: 6,
            message: 'Password is to short, you need at least 6 characters'
        },
        {
            type: 'string',
            max: 32,
            message: 'Your password is strong enough, please calm down'
        },
        
    ],
    name: [{
            type: 'string',
            min: 2,
            message: 'Your name is not valid'
        },
        {
            required: true,
            message: 'Please input your name!'
        }
    ],
    userName: [{
            type: 'string',
            min: 2,
            message: 'Your login must have at least 2 characters'
        },
        {
            validator: async (rule, value, callback) => {
                return await debounceUsername(checkUsernmaeAvailability, [value])
            },
        },
    ],
    repeatPassword: function (props, fieldNameToCheck = 'password') {
        return [...this.password, {
            validator: (rule, value, callback) => {
                const {
                    form
                } = props;
                if (value && value !== form.getFieldValue(fieldNameToCheck)) {
                    callback(true)
                } else {
                    callback()
                }
            },
            message: 'Password mismatch'
        }]
    }
}


//helpers for custom validators
async function checkUsernmaeAvailability(value = '', callback, rule) {
    const result = await api.checkUsername(value);
    if (result.data.checkUsername === "exist") return Promise.reject('Username already taken');
    return Promise.resolve();
}
async function checkEmailAvailability(value = '', callback, rule) {
    const result = await api.checkEmail(value);
    if (result.data.checkEmail === "exist") return Promise.reject('Email already exist, maybe try to login?');
    return Promise.resolve();
}

const debounceEmail = delay(1000)
const debounceUsername = delay(1000);


export default validators;