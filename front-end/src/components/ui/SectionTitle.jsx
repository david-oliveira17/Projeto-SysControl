import React from 'react'
import Typography from '@mui/material/Typography'

export default function PageTitle({title}) {
  return (
    <Typography variant="h6" component="h3" sx={{ textAlign: 'left', mb: '7px' }}>
      {title}
    </Typography>
  )
}