export const HOUR_WIDTH = 350
export const EVENT_GAP = 10
export const EVENT_WIDTH = 400
export const MOBILE_HOUR_HEIGHT = 200

export const EVENT_TYPES = theme => ({
  main: { label: 'Main Events', colour: theme.colors.schedule.mainEventTag },
  minievents: { label: 'Activities', colour: theme.colors.schedule.activityTag },
  workshops: { label: 'Workshops', colour: theme.colors.schedule.workshopTag },
})
