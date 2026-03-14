import React from 'react'

const Loading = ({ height = '100vh' }) => {
  return (
    <div style={{ height, background: '#050A1A' }} className='flex items-center justify-center'>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid rgba(99,102,241,0.2)',
        borderTop: '3px solid #6366F1',
        animation: 'spin 0.8s linear infinite',
        boxShadow: '0 0 15px rgba(99,102,241,0.3)',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default Loading