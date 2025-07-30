import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  Shield, 
  Users, 
  BarChart3, 
  Camera, 
  Globe,
  ArrowRight,
  CheckCircle,
  Mail
} from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await apiService.createEmployee({ name, email })
      console.log('Employee created:', response)
      setIsSubmitted(true)
      toast.success('Registration successful! Check your email for verification instructions.')
    } catch (error: any) {
      console.error('Registration error:', error)
      const message = error.response?.data?.detail || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We've sent a verification link to <strong>{email}</strong>. 
              Please check your email and click the verification link to activate your account.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-blue-900 mb-2">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                    <li>Check your email inbox (and spam folder)</li>
                    <li>Click the verification link in the email</li>
                    <li>Complete your profile setup</li>
                    <li>Download the desktop time tracking app</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/verify-email?demo=true" className="btn-primary">
                View Verification Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/download" className="btn-outline">
                Download Desktop App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-balance">
            Professional Time Tracking for 
            <span className="text-primary-600"> Remote Teams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
            Enterprise-grade productivity monitoring with screenshot tracking, 
            device fingerprinting, and comprehensive reporting. Built for modern remote work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Registration Form */}
          <div className="order-2 lg:order-1">
            <div className="card max-w-md mx-auto lg:mx-0">
              <div className="card-header">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Get Started Today
                </h2>
                <p className="text-gray-600 mt-2">
                  Create your employee account to begin time tracking
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="Enter your work email"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accurate Time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Precise start/stop tracking with automatic session management and duration calculation
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Screenshot Monitoring</h3>
                <p className="text-sm text-gray-600">
                  Configurable screenshot capture with permission handling and compressed storage
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fraud Prevention</h3>
                <p className="text-sm text-gray-600">
                  Device fingerprinting with MAC address and IP tracking for security
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-success-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Reports</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive analytics with project-wise time allocation and productivity metrics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Remote Team Management
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Management</h3>
              <p className="text-gray-600">
                Organize work by projects and tasks with employee assignments and real-time tracking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cross-Platform</h3>
              <p className="text-gray-600">
                Desktop applications for Windows, macOS, and Linux with system tray integration
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                Token-based authentication, encrypted data transfer, and comprehensive audit trails
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Remote Work?</h2>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of teams using Mercor Time Tracker for accurate productivity monitoring
            </p>
            <Link to="/download" className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Download Desktop App
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage