'use client'

import ProtectedRoute from '@/components/Common/ProtectedRoute'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 min-h-48 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">You are logged in!</h2>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardPage
