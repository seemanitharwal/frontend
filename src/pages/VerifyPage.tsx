import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Mail, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { apiService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const VerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [employeeData, setEmployeeData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('No verification token provided')
      return
    }

    verifyEmployee()
  }, [token])

  const verifyEmployee = async () => {
    try {
      // Extract employee ID from token (you might need to decode JWT or get from URL params)
      // For now, we'll assume the employee ID is also in the URL params
      const employeeId = searchParams.get('id')
      
      if (!employeeId) {
        throw new Error('Employee ID not provided')
      }

      const response = await apiService.verifyEmployee(parseInt(employeeId), token!)
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

  const handleContinue = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="card-body text-center">
            {status === 'loading' && (
              <>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LoadingSpinner size="lg" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Verifying Your Email
                </h1>
                <p className="text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Email Verified Successfully!
                </h1>
                <p className="text-gray-600 mb-6">
                  Welcome to Mercor Time Tracker, {employeeData?.name}! 
                  Your account has been activated and you can now start using the platform.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <h3 className="font-medium text-blue-900 mb-2">What's Next?</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                        <li>Access your employee dashboard</li>
                        <li>Download the desktop time tracking app</li>
                        <li>Start tracking time for your assigned projects</li>
                        <li>View your productivity reports</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleContinue}
                    className="btn-primary w-full"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button
                    onClick={() => navigate('/download')}
                    className="btn-outline w-full"
                  >
                    Download Desktop App
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-8 h-8 text-error-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Verification Failed
                </h1>
                <p className="text-gray-600 mb-6">
                  {errorMessage}
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="text-left">
                    <h3 className="font-medium text-yellow-900 mb-2">Common Issues:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                      <li>The verification link has expired</li>
                      <li>The link has already been used</li>
                      <li>The link was copied incorrectly</li>
                      <li>Your account may already be verified</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary w-full"
                  >
                    Request New Verification
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-outline w-full"
                  >
                    Try Dashboard Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help? Contact support at{' '}
            <a href="mailto:support@mercor.com" className="text-primary-600 hover:underline">
              support@mercor.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage