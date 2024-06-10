import React from 'react'

const Footer: React.FC = () => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="flex items-center justify-center text-tiny py-6 border-default-200 border-t-1">
      <div className="px-3 max-w-[1170px]">
        &copy; {year} CinemApp. All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
