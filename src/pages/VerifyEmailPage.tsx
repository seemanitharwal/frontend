import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, XCircle, Download, ArrowRight, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const token = searchParams.get('token')
  const employeeId = searchParams.get('id')

  useEffect(() => {
    if (!token || !employeeId) {
      setStatus('error')
      setErrorMessage('Invalid verification link. Token or employee ID missing.')
      return
    }

    verifyEmployee()
  }, [token, employeeId])

  const verifyEmployee = async () => {
    try {
      // Add demo mode for testing
      if (searchParams.get('demo') === 'true') {
        setEmployeeData({ name: 'Demo User', email: 'demo@example.com' })
        setStatus('success')
        return
      }
      
      const response = await apiService.verifyEmployee(parseInt(employeeId!), token!)
      setEmployeeData(response)
      setStatus('success')
      toast.success('Email verified successfully! Welcome to Mercor Time Tracker.')
    } catch (error: any) {
      console.error('Verification error:', error)
      setStatus('error')
      setErrorMessage(
        error.response?.data?.detail || 
        'Verification failed. The link may be expired or invalid.'
      )
      toast.error('Email verification failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="card">
          <div className="card-body text-center">
            {status === 'loading' && (
              <>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LoadingSpinner size="lg" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Verifying Your Email
                </h1>
                <p className="text-lg text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-success-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Email Verified Successfully!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Welcome to Mercor Time Tracker, <strong>{employeeData?.name}</strong>! 
                  Your account has been activated and you're ready to start tracking time.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Ready to Get Started?</h3>
                      <p className="text-blue-800 mb-4">
                        Download the Mercor Time Tracker desktop application to begin tracking your work hours, 
                        manage projects, and monitor productivity.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Accurate time tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Screenshot monitoring</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Project management</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Productivity reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/download"
                    className="btn-primary w-full text-lg py-4"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Download Desktop App
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Link>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      to="/dashboard"
                      className="btn-outline"
                    >
                      View Dashboard
                    </Link>
                    <button
                      onClick={() => navigate('/')}
                      className="btn-outline"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>Verified: {employeeData?.email}</span>
                  </div>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <XCircle className="w-10 h-10 text-error-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Verification Failed
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  {errorMessage}
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                  <div className="text-left">
                    <h3 className="font-semibold text-yellow-900 mb-3">Common Issues:</h3>
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>The verification link has expired (links are valid for 24 hours)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>The link has already been used to verify this account</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>The link was copied incorrectly or is incomplete</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Your account may already be verified</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary w-full"
                  >
                    Request New Verification
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      to="/dashboard"
                      className="btn-outline"
                    >
                      Try Dashboard
                    </Link>
                    <Link
                      to="/download"
                      className="btn-outline"
                    >
                      Download App
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you continue to experience issues with email verification, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:support@mercor.com" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Contact Support
              </a>
              <span className="hidden sm:inline text-gray-300">•</span>
              <a 
                href="#" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage