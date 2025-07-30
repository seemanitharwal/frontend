import React, { useEffect, useState } from 'react'
import { apiService } from '../services/api'
import toast from 'react-hot-toast'

interface Project {
  id: number
  name: string
  description?: string
}
interface Task {
  id: number
  name: string
  project_id: number
}

interface Employee {
  id: number
  name: string
  email: string
}

const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Record<number, Task[]>>({})
  const [newProject, setNewProject] = useState({ name: '', description: '' })
  const [newTaskName, setNewTaskName] = useState<Record<number, string>>({})
  const [employees, setEmployees] = useState<Employee[]>([])
  const [assignments, setAssignments] = useState<Record<number, number[]>>({})

  const loadProjects = async () => {
    try {
      const data = await apiService.getProjects()
      setProjects(data)
      // fetch tasks for each project
      const tasksMap: Record<number, Task[]> = {}
      const assignMap: Record<number, number[]> = {}
      await Promise.all(
        data.map(async (p: any) => {
          const t = await apiService.getTasks({ project_id: p.id })
          tasksMap[p.id] = t

          // employees are embedded in ProjectWithEmployees
          assignMap[p.id] = (p.employees || []).map((e: any) => e.id)
        })
      )
      setTasks(tasksMap)
      setAssignments(assignMap)
    } catch (err) {
      toast.error('Failed to load projects')
    }
  }

  const loadEmployees = async () => {
    try {
      const data = await apiService.getEmployees()
      setEmployees(data)
    } catch {
      toast.error('Failed to load employees')
    }
  }

  useEffect(() => {
    loadProjects()
    loadEmployees()
  }, [])

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return
    try {
      await apiService.createProject({ name: newProject.name, description: newProject.description })
      toast.success('Project created')
      setNewProject({ name: '', description: '' })
      loadProjects()
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Create project failed')
    }
  }

  const handleCreateTask = async (projectId: number) => {
    const name = newTaskName[projectId]
    if (!name?.trim()) return
    try {
      await apiService.createTask({ name, project_id: projectId })
      toast.success('Task added')
      setNewTaskName((prev) => ({ ...prev, [projectId]: '' }))
      loadProjects()
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Create task failed')
    }
  }

  const handleAssignEmployees = async (projectId: number, selectedIds: number[]) => {
    try {
      await apiService.updateProject(projectId, { employee_ids: selectedIds })
      toast.success('Assignments updated')
      setAssignments((prev) => ({ ...prev, [projectId]: selectedIds }))
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Update failed')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Projects & Tasks Admin</h1>

      {/* Overview Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 text-center">
        <div className="card p-6">
          <h3 className="text-2xl font-semibold">{projects.length}</h3>
          <p className="text-gray-500 text-sm">Total Projects</p>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl font-semibold">{Object.values(tasks).flat().length}</h3>
          <p className="text-gray-500 text-sm">Tasks</p>
        </div>
        <div className="card p-6">
          <h3 className="text-2xl font-semibold">{employees.length}</h3>
          <p className="text-gray-500 text-sm">Employees</p>
        </div>
      </div>

      {/* Create Project */}
      <div className="card mb-12 max-w-xl mx-auto">
        <div className="card-header bg-primary-600 text-white rounded-t-xl">Create New Project</div>
        <div className="card-body space-y-4 bg-white rounded-b-xl">
          <input
            type="text"
            placeholder="Project name"
            className="input"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <textarea
            placeholder="Description (optional)"
            className="input h-24"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <button className="btn-primary self-start" onClick={handleCreateProject}>Create Project</button>
        </div>
      </div>

      {/* List projects */}
      {projects.map((project) => (
        <div key={project.id} className="card mb-10 shadow-sm">
          <div className="card-header flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 rounded-t-xl p-4">
            <div>
              <h3 className="text-xl font-semibold">{project.name}</h3>
              {project.description && <p className="text-sm text-gray-500 max-w-xl">{project.description}</p>}
            </div>
            <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
              { (assignments[project.id] || []).map(id => {
                  const emp = employees.find(e=>e.id===id)
                  return emp ? (
                    <span key={id} className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      {emp.name.split(' ')[0]}
                    </span>
                  ) : null
              })}
            </div>
          </div>
          <div className="card-body bg-white rounded-b-xl">
            <h4 className="font-medium mb-2">Tasks</h4>
            { (tasks[project.id] || []).length ? (
              <ul className="space-y-1 mb-4 pl-4 list-disc">
                {(tasks[project.id] || []).map(task => (
                  <li key={task.id}>{task.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 mb-4">No tasks yet.</p>
            ) }

            {/* Employee assignment */}
            <h4 className="font-medium mb-2">Assigned Employees</h4>
            <div className="space-y-1 mb-4">
              {employees.map(emp => {
                const isChecked = (assignments[project.id] || []).includes(emp.id)
                return (
                  <label key={emp.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const current = assignments[project.id] || []
                        const updated = e.target.checked
                          ? Array.from(new Set([...current, emp.id]))
                          : current.filter((id) => id !== emp.id)
                        handleAssignEmployees(project.id, updated)
                      }}
                    />
                    {emp.name}
                  </label>
                )
              })}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New task name"
                className="input flex-1"
                value={newTaskName[project.id] || ''}
                onChange={(e) => setNewTaskName({ ...newTaskName, [project.id]: e.target.value })}
              />
              <button className="btn-secondary" onClick={() => handleCreateTask(project.id)}>Add Task</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminProjectsPage 