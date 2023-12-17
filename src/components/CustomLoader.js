import React from 'react'

function CustomLoader() {
  return (
    <>
    <div className="flex items-center justify-center py-2">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-16 w-16"></div>
    </div>
    </>
  )
}

export default CustomLoader