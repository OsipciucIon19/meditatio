import { Event } from 'types/event'

export const deleteDuplicateEvents = (studentEvents: Array<Event>, teacherEvents: Array<Event>): Array<Event> => {
  teacherEvents.forEach(event => {
    event.color = '#b4a696'
  })


  return [...studentEvents, ...teacherEvents].filter((value, index, self) =>
      index === self.findIndex((t) => (
        t._id === value._id
      ))
  )
}
