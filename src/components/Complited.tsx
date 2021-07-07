import React from 'react'
import { ComplitedProps } from '../Types/types'
import { Box, makeStyles, Paper, Grid } from '@material-ui/core'

import { Link } from 'react-router-dom'

import { subString } from '../utils/subString'

const useStyle = makeStyles((theme) => ({
  itemWrapper: { display: 'flex' },
  items: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    padding: 15,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop: 100,
    marginBottom: 100,
    display: 'flex',
    minHeight: 400,
    height: 'auto',
    justifyContent: 'space-around',
  },
  todo: {
    backgroundColor: '#6b7ff1',
    display: 'flex',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#a6b3fd',
    },
  },
  btnWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 },
  textTodoInp: { marginBottom: 20, marginTop: 20, width: 250 },
  textTodoBtn: { width: 100 },
}))

const Complited: React.FC<ComplitedProps> = ({ tasks, handleClickOpen, loading }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.itemWrapper} container>
      <Paper className={classes.items}>
        <Grid className={classes.item} item md={4}>
          <Box>
            <h2>Complited</h2>
          </Box>

          {tasks.map((task) => {
            if (task.complete) {
              return (
                <Link key={task.id} to={`/${task.id}`}>
                  <Box onClick={() => handleClickOpen(task.id)}>
                    <Paper className={classes.todo}>
                      {task.title.length >= 15 ? subString(task.title) : task.title}
                    </Paper>
                  </Box>
                </Link>
              )
            } else return null
          })}
        </Grid>
      </Paper>
    </Grid>
  )
}
export default Complited
