export default {
  coceso: {
    header: 'CoCeSo'
  },
  main: {
    filter: 'Filter',
    nav: {
      units: {
        header: 'Einheiten',
        overview: 'Überblick',
        hierarchy: 'Hierarchische Struktur',
        alarm: 'Zu alarmieren',
        available: 'Verfügbare Einheiten',
        free: 'Freie Einheiten'
      },
      incidents: {
        header: 'Vorfälle',
        createIncident: 'Neuer Vorfall',
        createRelocation: 'Neuer Standortwechsel',
        showAll: 'Alle Vorfälle',
        showActiveTasks: 'Aktive Aufträge',
        showActivePositions: 'Aktive Standorte',
        showHighlightedIncidents: 'Offene Vorfälle',
        showDone: 'Abgeschlossene Vorfälle',
        showAllTransports: 'Alle Abtransporte',
        showHighlightedTransports: 'Offene Abtransporte'
      },
      windows: {
        header: 'Fenster',
        showCustomJournal: 'Journaleinträge',
        addJournalEntry: 'Journaleintrag erstellen',
        showPatients: 'Patienten',
        showMessages: 'Funk',
        edit: 'Ambulanz bearbeiten',
        dashboard: 'Dashboard',
        showJournal: 'Log'
      },
      filter: {
        header: 'Filter',
        none: 'Kein Filter'
      },
      connected: 'Verbindungsstatus',
      quit: 'Beenden'
    }
  },
  concern: {
    name: 'Name',
    info: 'Info',
    section: 'Abschnitt',
    links: {
      overview: 'Zurück zur Übersicht',
      main: 'Ambulanz starten',
      edit: 'Ambulanz bearbeiten',
      switch: 'Ambulanz wechseln'
    },
    list: {
      open: 'Aktive Ambulanzen',
      closed: 'Abgeschlossene Ambulanzen'
    },
    overview: {
      close: 'Ambulanz abschließen',
      reopen: 'Ambulanz öffnen',
      reports: 'Berichte exportieren'
    },
    create: {
      header: 'Ambulanz erstellen',
      submit: 'Erstellen'
    },
    edit: {
      header: 'Ambulanz bearbeiten',
      submit: 'Änderungen speichern',
      sections: 'Abschnitte',
      units: 'Einheiten bearbeiten',
      containers: 'Hierarchie bearbeiten'
    }
  },
  incident: {
    bo: 'BO',
    boMissing: 'Kein BO',
    ao: 'AO',
    info: 'Info',
    blue: 'Sondersignal',
    priority: 'Priorisiert',
    caller: 'Berufer / Kontaktdaten',
    callerShort: 'Berufer',
    casus: 'Transport-/Casusnummer',
    patient: 'Patient',
    created: 'Erstellt',
    arrival: 'Eingetroffen',
    ended: 'Ende',
    type: {
      label: 'Typ',
      Task: 'Auftrag',
      TaskBlue: 'Einsatz',
      Transport: 'Abtransport',
      Position: 'Standort',
      short: {
        Task: 'A',
        TaskBlue: 'E',
        Transport: 'T',
        Relocation: 'V',
        Position: 'S',
        ToHome: 'Einr'
      }
    },
    closed: {
      label: 'Status',
      Active: 'Aktiv',
      Closed: 'Abgeschlossen',
      Cancelled: 'Storno',
      NoPatient: 'Kein Patient',
      NoTransport: 'Kein Transport'
    },
    list: {
      openForm: 'Bearbeiten',
      addJournalEntry: 'Journaleintrag hinzufügen',
      openJournal: 'Protokoll'
    },
    message: {
      title: {
        default: 'Nachricht senden',
        ALARM: 'Alarmieren',
        CASUS: 'Casus senden'
      },
      mode: {
        ALL: 'Alle',
        UNSENT: 'Nicht gesendete'
      },
      sent: {
        ALARM: 'Alarm gesendet',
        CASUS: 'Casus gesendet'
      }
    }
  },
  unit: {
    call: 'Rufname',
    info: 'Info',
    home: 'Zuhause',
    position: 'Standort',
    portable: 'Disponierbar',
    properties: 'Eigenschaften',
    state: {
      set: 'Status setzen',
      READY: 'Einsatzbereit',
      NOT_READY: 'Nicht einsatzbereit',
      OFF_DUTY: 'Außer Dienst'
    },
    type: {
      label: 'Typ',
      Portable: 'Mobileinheit',
      Officer: 'Führungskraft'
    },
    crew: {
      label: 'Mannschaft',
      add: 'Mannschaft hinzufügen'
    },
    incidents: 'Vorfälle',
    message: {
      title: 'Nachricht senden'
    },
    form: {
      add: 'Einheit erstellen',
      edit: 'Einheit bearbeiten'
    },
    actions: {
      label: 'Aktionen',
      sendHome: 'Einrücken',
      standby: 'Bereitschaft',
      holdPosition: 'Standort halten',
      createIncident: 'Vorfall erstellen',
      createRelocation: 'Verlegung erstellen',
      reportIncident: 'Meldet Vorfall',
      addJournalEntry: 'Journaleintrag hinzufügen',
      showDetails: 'Details anzeigen',
      editUnit: 'Einheit bearbeiten',
      showJournal: 'Journaleinträge anzeigen'
    },
  },
  task: {
    state: {
      current: 'Aktueller Status',
      Assigned: 'Zug.',
      ZBO: 'ZBO',
      ABO: 'ABO',
      ZAO: 'ZAO',
      AAO: 'AAO',
      Detached: 'Entz.'
    },
    dialog: {
      next: 'Status weiterschalten?',
      isHome: 'Eingerückt',
      standby: {
        send: 'Einheit auf Bereitschaft setzen?',
        end: 'Bereitschaft der Einheit beenden?'
      },
      position: {
        send: 'Einheit auf "Standort halten" setzen?',
        end: 'Standort nicht weiter halten?'
      }
    }
  },
  container: {
    unassigned: 'Nicht zugeordnete Einheiten'
  },
  contact: {
    label: 'Kontakte',
    add: 'Kontakt hinzufügen',
    type: {
      label: 'Kontakttyp',
      phone: 'Telefon',
      kenwood: 'Kenwood',
      tetra: 'Tetra'
    }
  },
  staff: {
    lastname: 'Nachname',
    firstname: 'Vorname',
    info: 'Info',
    personnelId: 'Dienstnummer',
    link: 'Personal',
    header: 'Personal verwalten',
    back: 'Zurück zur Übersicht',
    actions: {
      filter: 'Personal filtern',
      addStaff: 'Mitarbeiter_in erstellen',
      editStaff: 'Mitarbeiter_in bearbeiten'
    }
  },
  message: {
    text: 'Text',
    recipients: {
      label: 'Empfänger',
      none: 'Keine Empfänger verfügbar'
    },
    received: {
      channels: {
        label: 'Kanäle',
        all: 'Alle Kanäle'
      },
      last: 'Letzte Nachricht',
      details: 'Einheit anzeigen',
      all: 'Alle Nachrichten'
    }
  },
  validation: {
    contact: {
      type: 'Kontakttyp muss ausgewählt werden'
    }
  }
};
