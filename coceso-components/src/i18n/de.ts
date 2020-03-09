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
      units: 'Einheiten bearbeiten'
    }
  },
  incident: {
    bo: 'BO',
    ao: 'AO',
    info: 'Info',
    blue: 'Sondersignal',
    priority: 'Priorisiert',
    caller: 'Berufer / Kontaktdaten',
    casusNr: 'Transport-/Casusnummer',
    type: {
      label: 'Typ',
      Task: 'Auftrag',
      Transport: 'Abtransport',
      Relocation: 'Verlegung',
      short: {
        Task: 'A',
        TaskBlue: 'E',
        Transport: 'T',
        Relocation: 'V',
        ToHome: 'Einr'
      }
    },
    state: {
      label: 'Status',
      Open: 'Offen',
      Demand: 'Nachforderung',
      Working: 'In Arbeit',
      Done: 'Abgeschlossen'
    }
  },
  unit: {
    call: 'Rufname',
    info: 'Info',
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
      Assigned: 'Zug.',
      ZBO: 'ZBO',
      ABO: 'ABO',
      ZAO: 'ZAO',
      AAO: 'AAO'
    }
  },
  radio: {
    send: 'Selektivruf senden'
  }
};
