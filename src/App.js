import React from 'react'

import { Task } from './Task'
import { useTaskList } from './useTaskList'
import './styles.css'

const initialState = [
  { id: 0, title: 'First', status: 0, tags: [], parentId: null },
  { id: 1, title: 'Second', status: 0, tags: [], parentId: 0 },
  { id: 2, title: 'Third', status: 0, tags: [], parentId: 1 },
  { id: 3, title: 'Fourth', status: 0, tags: [], parentId: 1 },
  { id: 4, title: 'Fifth', status: 0, tags: [], parentId: null },
  { id: 5, title: 'Sixth', status: 0, tags: [], parentId: 3 },
]

export default function App() {
  const { taskList, actions } = useTaskList(initialState)

  const formattedTasks = React.useMemo(() => {
    const newTasks = [...taskList]
    const findChildren = (parentId) => {
      if (parentId !== null) {
        const task = newTasks.find((item) => parentId === item.id)
        const children = newTasks.filter((item) => item.parentId === parentId)

        if (children.length) {
          task.tasks = children.map((child) => findChildren(child.id))
        }
        return { tasks: [], tags: [], ...task }
      } else {
        const children = newTasks.filter((item) => item.parentId === null)
        return children.map(({ id }) => findChildren(id))
      }
    }
    return findChildren(null)
  }, [taskList])

  const serialized = JSON.stringify(taskList, null, 2)
  console.log(taskList)

  return (
    <>
      {formattedTasks.map((task) => (
        <Task key={task.id} task={task} actions={actions} />
      ))}
      <pre>{serialized}</pre>
    </>
  )
}
