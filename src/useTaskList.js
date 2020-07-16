import React from 'react'

let startId

export const useTaskList = (initialState) => {
  startId = startId ?? Math.max(...initialState.map(({ id }) => id))

  const addTask = (state, task) =>
    console.log({ startId }) || [
      ...state,
      { status: 0, tags: [], ...task, id: ++startId },
    ]

  const editTask = (state, id, value = {}) => {
    const taskIndex = state.findIndex((item) => id === item.id)
    const task = state[taskIndex]
    return [
      ...state.slice(0, taskIndex),
      { ...task, ...value },
      ...state.slice(taskIndex + 1),
    ]
  }

  const removeTask = (state, id) => {
    const indexToRemove = state.findIndex((item) => id === item.id)
    return [...state.slice(0, indexToRemove), ...state.slice(indexToRemove + 1)]
  }

  const moveTask = (state, id, parentId) => editTask(state, id, { parentId })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return addTask(state, action.task)
      case 'edit':
        return editTask(state, action.id, action.value)
      case 'remove':
        return removeTask(state, action.id)
      case 'move':
        return moveTask(state, action.id, action.parentId)
      default:
        return state
    }
  }

  const [taskList, dispatch] = React.useReducer(reducer, initialState)

  const add = (title, parentId = null) =>
    dispatch({ type: 'add', task: { title, parentId } })
  const edit = (id, value) => dispatch({ type: 'edit', id, value })
  const remove = (id) => dispatch({ type: 'remove', id })
  const move = (id, parentId) => dispatch({ type: 'move', id, parentId })

  const actions = { add, edit, remove, move }

  return { taskList, actions }
}
