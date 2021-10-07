import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 6,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#8256FF',
  },
}))(LinearProgress)

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

export interface ProgressBarProps {
  value: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  )
}
