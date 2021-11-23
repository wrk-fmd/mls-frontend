export default {
  data: {
    bo: {
      label: 'BO',
      none: 'Kein BO',
    },
    ao: {
      label: 'AO',
    },
    info: {
      label: 'Info',
    },
    blue: {
      label: 'Sondersignal',
    },
    priority: {
      label: 'Priorisiert',
    },
    caller: {
      label: 'Berufer / Kontaktdaten',
      short: 'Berufer',
    },
    casus: {
      label: 'Transport-/Casusnummer',
    },
    patient: {
      label: 'Patient',
    },
    created: {
      label: 'Erstellt',
    },
    arrival: {
      label: 'Eingetroffen',
    },
    ended: {
      label: 'Ende',
    },
    type: {
      label: 'Typ',
      values: {
        Task: 'Auftrag',
        TaskBlue: 'Einsatz',
        Transport: 'Abtransport',
        Position: 'Standort',
      },
      short: {
        Task: 'A',
        TaskBlue: 'E',
        Transport: 'T',
        Relocation: 'V',
        Position: 'S',
        ToHome: 'Einr'
      },
    },
    closed: {
      label: 'Status',
      values: {
        Active: 'Aktiv',
        Closed: 'Abgeschlossen',
        Cancelled: 'Storno',
        NoPatient: 'Kein Patient',
        NoTransport: 'Kein Transport',
      },
    },
  },
  filter: {
    label: 'Filter',
  },
  views: {
    header: 'Vorfälle',
    all: 'Alle Vorfälle',
    activeTasks: 'Aktive Aufträge',
    activePositions: 'Aktive Standorte',
    highlightedIncidents: 'Offene Vorfälle',
    done: 'Abgeschlossene Vorfälle',
    allTransports: 'Alle Abtransporte',
    highlightedTransports: 'Offene Abtransporte',
  },
  form: {
    create: {
      incident: 'Vorfall erstellen',
      position: 'Standort erstellen',
      relocation: 'Verlegung erstellen',
      report: 'Meldet Vorfall',
      error: 'Fehler beim Erstellen des Vorfalls',
    },
    edit: {
      label: 'Bearbeiten',
      incident: 'Vorfall bearbeiten',
      position: 'Standort bearbeiten',
      error: 'Fehler beim Speichern des Vorfalls',
    },
  },
  message: {
    title: {
      default: 'Nachricht senden',
      ALARM: 'Alarmieren',
      CASUS: 'Casus senden',
    },
    mode: {
      ALL: 'Alle',
      UNSENT: 'Nicht gesendete',
    },
    sent: {
      ALARM: 'Alarm gesendet',
      CASUS: 'Casus gesendet',
    },
  },
};
