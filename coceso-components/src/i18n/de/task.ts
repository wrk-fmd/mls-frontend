export default {
  state: {
    current: 'Aktueller Status',
    values: {
      Assigned: 'Zugewiesen',
      ZBO: 'ZBO',
      ABO: 'ABO',
      ZAO: 'ZAO',
      AAO: 'AAO',
      Detached: 'Entzogen',
    },
    short: {
      Assigned: 'Zug.',
      ZBO: 'ZBO',
      ABO: 'ABO',
      ZAO: 'ZAO',
      AAO: 'AAO',
      Detached: 'Entz.',
    },
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
    },
    error: 'Fehler beim Speichern des Status',
  },
};
