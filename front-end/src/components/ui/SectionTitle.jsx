import React from 'react'
import Typography from '@mui/material/Typography'

export default function PageTitle({title}) {
  return (
    <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: '7px' }}>
      {title}
    </Typography>
  )
}