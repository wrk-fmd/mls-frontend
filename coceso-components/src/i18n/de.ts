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
        showActive: 'Aktive Vorfälle',
        showDone: 'Abgeschlossene Vorfälle'
      },
      windows: {
        header: 'Fenster',
        showCustomJournal: 'Journaleinträge',
        addJournalEntry: 'Journaleintrag erstellen',
        showPatients: 'Patienten',
        showRadioCalls: 'Funk',
        edit: 'Ambulanz bearbeiten',
        dashboard: 'Dashboard',
        showJournal: 'Log'
      },
      filter: {
        header: 'Filter',
        none: 'Kein Filter'
      },
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
    type: {
      label: 'Typ',
      Task: 'Auftrag',
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
    state: {
      label: 'Status',
      Open: 'Offen',
      Demand: 'Nachforderung',
      Working: 'In Arbeit',
      Done: 'Abgeschlossen'
    },
    list: {
      openForm: 'Bearbeiten',
      addJournalEntry: 'Journaleintrag hinzufügen',
      openJournal: 'Protokoll'
    }
  },
  unit: {
    call: 'Rufname',
    info: 'Info',
    home: 'Zuhause',
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
  radio: {
    send: 'Selektivruf senden'
  },
  validation: {
    contact: {
      type: 'Kontakttyp muss ausgewählt werden'
    }
  }
};
