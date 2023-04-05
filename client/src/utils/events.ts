export const deleteDuplicateEvents = (studentEvents, teacherEvents) => {
	teacherEvents.forEach(event => {
		event.color = '#b4a696'
	})


	return [...studentEvents, ...teacherEvents].filter((value, index, self) =>
		index === self.findIndex((t) => (
			t._id === value._id
		))
	)
}
