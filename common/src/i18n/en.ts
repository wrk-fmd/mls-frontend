export default {
  form: {
    cancel: 'Cancel',
    ok: 'OK'
  },
  login: {
    username: 'Username',
    password: 'Password',
    submit: 'Login',
    errors: {
      credentials: 'Login failed: Credentials invalid',
      failed: 'Login failed'
    }
  },
  validation: {
    required: 'This field is required',
    length: 'Exactly {{requiredLength}} characters required',
    minlength: 'At least {{requiredLength}} characters required',
    maxlength: 'At most {{requiredLength}} characters allowed',
    min: 'The min allowed value is {{min}}',
    max: 'The max allowed value is {{max}}',
    pattern: 'The required pattern is: {{requiredPattern}}',
    phone: {
      prefix: 'The country prefix is required',
      numeric: 'Only numbers and delimiters allowed'
    }
  }
};
