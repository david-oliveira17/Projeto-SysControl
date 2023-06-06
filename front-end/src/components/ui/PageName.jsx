import React from 'react'
import Typography from '@mui/material/Typography'

export default function PageName({title}) {
  return (
    <Typography variant="h4" component="h3" sx={{ textAlign: 'center', mb: '30px' }}>
      {title}
    </Typography>
  )
}