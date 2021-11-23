export default {
  data: {
    name: {
      label: 'Name',
    },
    info: {
      label: 'Info',
    },
    section: {
      label: 'Abschnitt',
      list: 'Abschnitte',
      none: 'Keine Filterung'
    },
  },
  list: {
    open: 'Aktive Ambulanzen',
    closed: 'Abgeschlossene Ambulanzen'
  },
  actions: {
    create: {
      header: 'Ambulanz erstellen',
      submit: 'Erstellen',
      error: 'Fehler beim Erstellen der Ambulanz',
    },
    edit: {
      header: 'Ambulanz bearbeiten',
      submit: 'Änderungen speichern',
      error: 'Fehler beim Speichern der Ambulanz',
    },
    sections: {
      add: {
        error: 'Fehler beim Hinzufügen des Abschnitts',
      },
      remove: {
        error: 'Fehler beim Entfernen des Abschnitts',
      },
    },
    close: {
      label: 'Ambulanz abschließen',
      error: 'Fehler beim Abschließen der Ambulanz',
    },
    open: {
      label: 'Ambulanz öffnen',
      error: 'Fehler beim Öffnen der Ambulanz',
    },
  },
};
