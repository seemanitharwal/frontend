import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      // Redirect to login or show auth error
    }
    return Promise.reject(error)
  }
)

// Employee APIs
export const apiService = {
  // Employee Management
  async createEmployee(data: { name: string; email: string }) {
    const response = await apiClient.post('/employees', data)
    return response.data
  },

  async getEmployees(params?: { skip?: number; limit?: number }) {
    const response = await apiClient.get('/employees', { params })
    return response.data
  },

  async getEmployee(id: number) {
    const response = await apiClient.get(`/employees/${id}`)
    return response.data
  },

  async verifyEmployee(id: number, token: string) {
    const response = await apiClient.post(`/employees/${id}/verify`, { token })
    return response.data
  },

  async updateEmployee(id: number, data: any) {
    const response = await apiClient.patch(`/employees/${id}`, data)
    return response.data
  },

  async deactivateEmployee(id: number) {
    const response = await apiClient.delete(`/employees/${id}`)
    return response.data
  },

  // Project Management
  async createProject(data: { name: string; description?: string; employee_ids?: number[] }) {
    const response = await apiClient.post('/projects/', data)
    return response.data
  },

  async getProjects(params?: { skip?: number; limit?: number }) {
    const response = await apiClient.get('/projects/', { params })
    return response.data
  },

  async getProject(id: number) {
    const response = await apiClient.get(`/projects/${id}`)
    return response.data
  },

  async updateProject(id: number, data: any) {
    const response = await apiClient.patch(`/projects/${id}`, data)
    return response.data
  },

  async deactivateProject(id: number) {
    const response = await apiClient.delete(`/projects/${id}`)
    return response.data
  },

  // Task Management
  async createTask(data: { name: string; description?: string; project_id: number }) {
    const response = await apiClient.post(`/projects/${data.project_id}/tasks/`, data)
    return response.data
  },

  async getTasks(params?: { project_id?: number; skip?: number; limit?: number }) {
    const response = await apiClient.get('/tasks/', { params })
    return response.data
  },

  async getTask(id: number) {
    const response = await apiClient.get(`/tasks/${id}`)
    return response.data
  },

  async updateTask(id: number, data: any) {
    const response = await apiClient.patch(`/tasks/${id}`, data)
    return response.data
  },

  async deactivateTask(id: number) {
    const response = await apiClient.delete(`/tasks/${id}`)
    return response.data
  },

  // Time Tracking
  async startTimeTracking(data: {
    employee_id: number
    project_id: number
    task_id: number
    ip_address?: string
    mac_address?: string
    device_info?: string
  }) {
    const response = await apiClient.post('/time-entries/start', data)
    return response.data
  },

  async stopTimeTracking(data: { employee_id: number }) {
    const response = await apiClient.post('/time-entries/stop', data)
    return response.data
  },

  async getTimeEntries(params?: {
    employee_id?: number
    project_id?: number
    start_date?: string
    end_date?: string
    skip?: number
    limit?: number
  }) {
    const response = await apiClient.get('/time-entries', { params })
    return response.data
  },

  async getEmployeeTimeEntries(employeeId: number, params?: {
    start_date?: string
    end_date?: string
    skip?: number
    limit?: number
  }) {
    const response = await apiClient.get(`/time-entries/employee/${employeeId}`, { params })
    return response.data
  },

  async getActiveTimeEntries() {
    const response = await apiClient.get('/time-entries/active')
    return response.data
  },

  async getTimeEntry(id: number) {
    const response = await apiClient.get(`/time-entries/${id}`)
    return response.data
  },

  // Screenshots
  async uploadScreenshot(formData: FormData) {
    const response = await apiClient.post('/screenshots/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async getEmployeeScreenshots(employeeId: number, params?: {
    start_date?: string
    end_date?: string
    permission_granted?: boolean
    skip?: number
    limit?: number
  }) {
    const response = await apiClient.get(`/screenshots/employee/${employeeId}`, { params })
    return response.data
  },

  async getScreenshot(id: number) {
    const response = await apiClient.get(`/screenshots/${id}`)
    return response.data
  },

  async downloadScreenshot(id: number) {
    const response = await apiClient.get(`/screenshots/${id}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  async deleteScreenshot(id: number) {
    const response = await apiClient.delete(`/screenshots/${id}`)
    return response.data
  },

  // Health Check
  async healthCheck() {
    const response = await apiClient.get('/../health')
    return response.data
  },
}

export default apiService