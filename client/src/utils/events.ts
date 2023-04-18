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

export const convertToRomanNumber = (number) => {
  const romanMatrix: Array<Array<number|string>> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]

  
  if (number === 0) {
    return ''
  }
  for (let i = 0; i < romanMatrix.length; i++) {
    if (number >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRomanNumber(number - parseInt(<string>romanMatrix[i][0]))
    }
  }
}
