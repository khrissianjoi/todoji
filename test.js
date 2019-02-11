const due_date = new Date('2019-01-12T12:30:00Z') 

const editing_date = due_date.toISOString()
const new_due_date = editing_date.toISOString().slice(0, 19).replace('T', ' ');