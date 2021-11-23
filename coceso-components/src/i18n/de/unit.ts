export default {
  data: {
    call: {
      label: 'Rufname',
    },
    info: {
      label: 'Info',
    },
    home: {
      label: 'Zuhause',
    },
    position: {
      label: 'Standort',
    },
    portable: {
      label: 'Disponierbar',
    },
    properties: {
      label: 'Eigenschaften',
    },
    state: {
      values: {
        READY: 'Einsatzbereit',
        NOT_READY: 'Nicht einsatzbereit',
        OFF_DUTY: 'Außer Dienst',
      },
    },
    type: {
      label: 'Typ',
      values: {
        Portable: 'Mobileinheit',
        Officer: 'Führungskraft',
        Triage: 'Triage',
        Treatment: 'Behandlung',
        Postprocessing: 'Nachbearbeitung',
        Info: 'Information',
      },
    },
    crew: {
      label: 'Mannschaft',
      add: 'Mannschaft hinzufügen'
    },
    incidents: {
      label: 'Vorfälle',
    },
  },
  views: {
    header: 'Einheiten',
    overview: 'Überblick',
    hierarchy: 'Hierarchische Struktur',
    alarm: 'Zu alarmieren',
    available: 'Verfügbare Einheiten',
    waiting: 'Wartende Einheiten',
  },
  form: {
    create: {
      label: 'Einheit erstellen',
      error: 'Fehler beim Erstellen der Einheit',
    },
    edit: {
      label: 'Einheit bearbeiten',
      error: 'Fehler beim Speichern der Einheit',
    },
  },
  actions: {
    label: 'Aktionen',
    edit: {
      header: 'Einheiten bearbeiten',
    },
    state: {
      set: 'Status setzen',
      error: 'Fehler beim Setzen des Status',
    },
    task: {
      sendHome: 'Einrücken',
      standby: 'Bereitschaft',
      holdPosition: 'Standort halten',
      error: 'Fehler beim Erstellen des Auftrags',
    },
  },
  hierarchy: {
    actions: {
      header: 'Hierarchie bearbeiten',
      unassigned: 'Nicht zugeordnete Einheiten',
      error: 'Fehler beim Speichern der Hierarchie',
    },
  },
};
