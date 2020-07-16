import React from 'react'

export function Task({ task, actions }) {
  const { id, title, status, tags, tasks } = task
  const realStatus = tasks.length ? status === tasks.length : status === 1

  return (
    <div>
      <label>
        <input
          type="checkbox"
          defaultChecked={realStatus}
          onChange={() => actions.edit(id, { status: Number(realStatus) })}
        />
        {title}
      </label>
      <button onClick={() => actions.add('New', id)}>Add</button>
      <button onClick={() => actions.remove(id)}>Remove</button>
      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {tasks.length > 0 && (
        <blockquote>
          {tasks.map((childTask) => (
            <Task key={childTask.id} task={childTask} actions={actions} />
          ))}
        </blockquote>
      )}
    </div>
  )
}
