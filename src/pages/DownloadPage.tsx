import React from 'react'
import { 
  Download, 
  Monitor, 
  Smartphone, 
  CheckCircle, 
  Shield,
  Clock,
  Camera,
  Wifi,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

const DownloadPage: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Precise Time Tracking',
      description: 'Start and stop time tracking with project selection and automatic session management'
    },
    {
      icon: Camera,
      title: 'Screenshot Monitoring',
      description: 'Configurable screenshot capture every 5 minutes with permission handling'
    },
    {
      icon: Shield,
      title: 'Device Security',
      description: 'MAC address and IP tracking for fraud prevention and security'
    },
    {
      icon: Wifi,
      title: 'Offline Support',
      description: 'Works offline with automatic sync when connection is restored'
    }
  ]

  const systemRequirements = {
    windows: {
      os: 'Windows 10 or later',
      processor: 'Intel Core i3 or AMD equivalent',
      memory: '4 GB RAM',
      storage: '500 MB available space'
    },
    mac: {
      os: 'macOS 10.14 or later',
      processor: 'Intel Core i3 or Apple Silicon',
      memory: '4 GB RAM',
      storage: '500 MB available space'
    },
    linux: {
      os: 'Ubuntu 18.04+ or equivalent',
      processor: 'Intel Core i3 or AMD equivalent',
      memory: '4 GB RAM',
      storage: '500 MB available space'
    }
  }

  // Base URL where installers are hosted. Configure via Vite env file (.env.local)
  const DOWNLOAD_BASE = import.meta.env.VITE_DOWNLOAD_BASE_URL || 'https://example.com/downloads'

  const downloadLinks: Record<string, string> = {
    windows: `${DOWNLOAD_BASE}/MercorTimeTrackerSetup.exe`,
    mac: 'https://github.com/seemanitharwal/frontend/releases/download/macDmg/Mercor.Time.Tracker-1.0.0.dmg',
    linux: `${DOWNLOAD_BASE}/MercorTimeTracker.AppImage`
  }

  const handleDownload = (platform: keyof typeof downloadLinks) => {
    const url = downloadLinks[platform]
    // Open download in new tab. The link must point to a hosted binary.
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Download Mercor Time Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional time tracking desktop application with screenshot monitoring, 
            device fingerprinting, and comprehensive productivity analytics.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Windows */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Windows</h3>
              <p className="text-gray-600 mb-4">Windows 10/11 compatible</p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p>{systemRequirements.windows.os}</p>
                <p>{systemRequirements.windows.processor}</p>
                <p>{systemRequirements.windows.memory}</p>
                <p>{systemRequirements.windows.storage}</p>
              </div>
              <button
                onClick={() => handleDownload('windows')}
                className="btn-primary w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download for Windows
              </button>
              <p className="text-xs text-gray-500 mt-2">Version 1.0.0 • 45 MB</p>
            </div>
          </div>

          {/* macOS */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">macOS</h3>
              <p className="text-gray-600 mb-4">Intel & Apple Silicon</p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p>{systemRequirements.mac.os}</p>
                <p>{systemRequirements.mac.processor}</p>
                <p>{systemRequirements.mac.memory}</p>
                <p>{systemRequirements.mac.storage}</p>
              </div>
              <button
                onClick={() => handleDownload('mac')}
                className="btn-primary w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download for macOS
              </button>
              <p className="text-xs text-gray-500 mt-2">Version 1.0.0 • 52 MB</p>
            </div>
          </div>

          {/* Linux */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Linux</h3>
              <p className="text-gray-600 mb-4">Ubuntu, Debian, CentOS</p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p>{systemRequirements.linux.os}</p>
                <p>{systemRequirements.linux.processor}</p>
                <p>{systemRequirements.linux.memory}</p>
                <p>{systemRequirements.linux.storage}</p>
              </div>
              <button
                onClick={() => handleDownload('linux')}
                className="btn-primary w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download for Linux
              </button>
              <p className="text-xs text-gray-500 mt-2">Version 1.0.0 • 48 MB</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Desktop App Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Installation Steps */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold text-gray-900">Installation Steps</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Download the installer</p>
                    <p className="text-sm text-gray-600">Choose your operating system and download the appropriate installer</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Run the installer</p>
                    <p className="text-sm text-gray-600">Double-click the downloaded file and follow the installation wizard</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Login with your credentials</p>
                    <p className="text-sm text-gray-600">Use your verified email address to authenticate</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Start tracking time</p>
                    <p className="text-sm text-gray-600">Select your project and task, then begin time tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold text-gray-900">Security & Privacy</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Encrypted Data Transfer</p>
                    <p className="text-sm text-gray-600">All communication uses HTTPS encryption</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Permission-Based Screenshots</p>
                    <p className="text-sm text-gray-600">Screenshots only taken with explicit user consent</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Local Data Storage</p>
                    <p className="text-sm text-gray-600">Sensitive data cached locally for offline functionality</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Device Fingerprinting</p>
                    <p className="text-sm text-gray-600">Secure device identification for fraud prevention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Important Notes</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• You must have a verified employee account before using the desktop app</li>
                <li>• Screenshots require explicit permission and can be disabled</li>
                <li>• The app runs in the system tray for continuous time tracking</li>
                <li>• Internet connection required for initial setup and periodic sync</li>
                <li>• Administrator privileges may be required for installation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <div className="card-body">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Help with Installation?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you get started with Mercor Time Tracker. 
                Check our documentation or contact support directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="btn-outline"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Documentation
                </a>
                <a
                  href="mailto:support@mercor.com"
                  className="btn-primary"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage
