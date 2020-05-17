export default {
  form: {
    cancel: 'Abbrechen',
    ok: 'OK',
    no: 'Nein',
    yes: 'Ja'
  },
  login: {
    username: 'Username',
    password: 'Passwort',
    submit: 'Einloggen',
    errors: {
      credentials: 'Login fehlgeschlagen: Ungültige Zugangsdaten',
      failed: 'Login fehlgeschlagen: {{message}}'
    }
  },
  validation: {
    required: 'Pflichtfeld',
    length: 'Genau {{requiredLength}} Zeichen erlaubt',
    minlength: 'Mindestens {{requiredLength}} Zeichen nötig',
    maxlength: 'Höchstens {{requiredLength}} Zeichen erlaubt',
    min: 'Der minimale zulässige Wert ist {{min}}',
    max: 'Der maximale zulässige Wert ist {{max}}',
    pattern: 'Das zulässige Format ist: {{requiredPattern}}',
    phone: {
      prefix: 'Die Ländervorwahl ist nötig',
      numeric: 'Nur Ziffern und Trennzeichen zulässig'
    }
  }
};
