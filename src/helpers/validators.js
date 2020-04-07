const validators = {
    email: [{
        type: 'email',
        message: 'It does not look like the valid email'
    }],
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
    }],
    userName: [{
        type: 'string',
        min: 2,
        message: 'Your login must have at least 2 characters'
    }],
    repeatPassword: function (props) {
        return [...this.password, {
            validator: (rule, value, callback) => {
                const {
                    form
                } = props;
                if (value && value !== form.getFieldValue('password')) {
                    callback(true)
                } else {
                    callback()
                }
            },
            message: 'Password mismatch'
        }]
    }
}
export default validators