import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, 
  Clock, 
  Download, 
  BarChart3, 
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

interface Employee {
  id: number
  name: string
  email: string
  is_active: boolean
  is_verified: boolean
  created_at: string
}

interface Project {
  id: number
  name: string
  description: string
  employees: Employee[]
}

interface TimeEntry {
  id: number
  start_time: string
  end_time: string | null
  duration_seconds: number | null
  employee_name: string
  project_name: string
  task_name: string
}

const DashboardPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [recentTimeEntries, setRecentTimeEntries] = useState<TimeEntry[]>([])
  const [activeEntries, setActiveEntries] = useState<TimeEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      const [employeesData, projectsData, timeEntriesData, activeData] = await Promise.all([
        apiService.getEmployees(),
        apiService.getProjects(),
        apiService.getTimeEntries({ limit: 10 }),
        apiService.getActiveTimeEntries()
      ])

      setEmployees(employeesData)
      setProjects(projectsData)
      setRecentTimeEntries(timeEntriesData)
      setActiveEntries(activeData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Time Tracking Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor employee productivity and manage time tracking for your organization
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{activeEntries.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {employees.filter(emp => emp.is_verified).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Employees */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Recent Employees</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {employees.slice(0, 5).map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {employee.is_verified ? (
                        <span className="badge-success">Verified</span>
                      ) : (
                        <span className="badge-warning">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
                {employees.length === 0 && (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No employees registered yet</p>
                    <Link to="/" className="text-primary-600 hover:underline text-sm">
                      Register first employee
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Time Sessions */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Active Sessions</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {activeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{entry.employee_name}</p>
                      <p className="text-sm text-gray-500">
                        {entry.project_name} • {entry.task_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Started at {formatTime(entry.start_time)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-success-600">Active</span>
                    </div>
                  </div>
                ))}
                {activeEntries.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No active time tracking sessions</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Time Entries */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Recent Time Entries</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentTimeEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{entry.employee_name}</p>
                      <p className="text-sm text-gray-500">
                        {entry.project_name} • {entry.task_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(entry.start_time)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatDuration(entry.duration_seconds)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {entry.end_time ? formatTime(entry.end_time) : 'In progress'}
                      </p>
                    </div>
                  </div>
                ))}
                {recentTimeEntries.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No time entries recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <Link
                  to="/"
                  className="flex items-center justify-between p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-primary-900">Register New Employee</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                </Link>

                <Link
                  to="/download"
                  className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-secondary-600" />
                    <span className="font-medium text-secondary-900">Download Desktop App</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-secondary-600" />
                </Link>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-900 mb-1">
                        Desktop App Required
                      </p>
                      <p className="text-sm text-yellow-800">
                        Employees need to download and install the desktop application to start time tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Overview */}
        {projects.length > 0 && (
          <div className="mt-8">
            <div className="card">
              <div className="card-header">
                <h2 className="text-xl font-semibold text-gray-900">Projects Overview</h2>
              </div>
              <div className="card-body">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {project.employees.length} employee{project.employees.length !== 1 ? 's' : ''}
                        </span>
                        <div className="flex -space-x-2">
                          {project.employees.slice(0, 3).map((employee) => (
                            <div
                              key={employee.id}
                              className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center border-2 border-white"
                              title={employee.name}
                            >
                              <span className="text-xs font-medium text-primary-600">
                                {employee.name.charAt(0)}
                              </span>
                            </div>
                          ))}
                          {project.employees.length > 3 && (
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-xs font-medium text-gray-600">
                                +{project.employees.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage