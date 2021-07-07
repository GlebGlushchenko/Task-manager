import React from 'react'

import { Box, makeStyles, Paper, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
      backgroundColor: '#eeeeee',
    },
  },
  btnWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 },
  textTodoInp: { marginBottom: 20, marginTop: 20, width: 250 },
  textTodoBtn: { width: 100 },
}))

const InProgress = () => {
  const classes = useStyle()
  return (
    <Grid className={classes.itemWrapper} container>
      <Paper className={classes.items}>
        <Grid className={classes.item} item md={4}>
          <Box>
            <h2>InProgress</h2>
          </Box>
          <Box>
            <Paper className={classes.todo}>Todo Title</Paper>
          </Box>
          <Box>
            <Paper className={classes.todo}>Todo Title</Paper>
          </Box>
          <Box>
            <Paper className={classes.todo}>Todo Title</Paper>
          </Box>
          <Box>
            <Paper className={classes.todo}>Todo Title</Paper>
          </Box>

          <Box className={classes.btnWrapper}>
            <TextField className={classes.textTodoInp} type="text" />
            <Button className={classes.textTodoBtn} variant="contained" color="primary">
              SEND
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  )
}
export default InProgress
