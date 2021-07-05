import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { ModalPorps } from '../../Types/types'
import { Box, makeStyles, Paper, Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { handlerKeyPress } from '../../utils/keyCodeHandler'

const useStyle = makeStyles((theme) => ({
  titleWrapper: { padding: 20, margin: 20 },
  discWrapper: { padding: 20 },
  titleInput: { width: 300, margin: 20, padding: 20 },
  discInput: { width: 200, margin: 20, padding: 20 },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 20,
  },
  btn: { margin: 10 },

  box: { display: 'flex', justifyContent: 'center' },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
}))

const Modal: React.FC<ModalPorps> = ({
  handlerComplited,
  handlerRemove,
  description,
  title,
  open,
  handleClose,
  editTaskTitle,
  editTaskDisc,
  id,
  setOpen,
  date,
}) => {
  const classes = useStyle()
  const [editTitle, setEditTitle] = React.useState(false)
  console.log(open)
  const handlerEditModTitle = () => {
    setEditTitle(!editTitle)
  }

  const [editDisc, setEditDisc] = React.useState(false)
  const [disc, setDisc] = React.useState(description)

  const handlerEditModDisc = () => {
    setEditDisc(!editDisc)
  }

  const [modalTitle, setModalTitle] = React.useState(title)

  const handlerChangeTitle = (e: any) => {
    setModalTitle(e.currentTarget.value)
  }

  const handlerChangeDisc = (e: any) => {
    setDisc(e.currentTarget.value)
  }

  const helperChangeTitle = () => {
    if (title) {
      handlerEditModTitle()
      editTaskTitle(id, modalTitle)
    } else alert('Enter title text!')
  }

  const helperChangeDisc = () => {
    if (disc) {
      handlerEditModDisc()
      editTaskDisc(id, disc)
    } else alert('Enter disc text!')
  }
  // React.useEffect(() => {
  //   setOpen(true)
  // }, [loc.key])

  return (
    <Dialog aria-labelledby="form-dialog-title" open={open} onClose={handleClose}>
      <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpen(false)}>
        <CloseIcon />
      </IconButton>

      <Box className={classes.box}>
        {!editTitle ? (
          <Box className={classes.titleWrapper}>
            <DialogTitle
              id="form-dialog-title"
              className={'modal__title'}
              onDoubleClick={handlerEditModTitle}>
              {title}
            </DialogTitle>
          </Box>
        ) : (
          <Box>
            <TextField
              className={classes.titleInput}
              type="text"
              autoFocus
              margin="dense"
              fullWidth
              onBlur={() => helperChangeTitle()}
              onChange={handlerChangeTitle}
              value={modalTitle}
              onKeyPress={(e) => {
                handlerKeyPress(e, helperChangeTitle)
              }}
            />
          </Box>
        )}
      </Box>

      <DialogContent className={classes.box}>
        <Box>
          {!editDisc ? (
            <Box className={classes.discWrapper}>
              <DialogContentText onDoubleClick={handlerEditModDisc} id="alert-dialog-description">
                {description}
              </DialogContentText>
            </Box>
          ) : (
            <Box>
              <TextField
                className={classes.discInput}
                type="text"
                autoFocus
                fullWidth
                onBlur={() => helperChangeDisc()}
                onChange={handlerChangeDisc}
                value={disc}
                onKeyPress={(e) => {
                  handlerKeyPress(e, helperChangeDisc)
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <Box className={classes.date}>
        <h4>Дней до окончания: {date} &#x23F1;</h4>
      </Box>

      <Box className={classes.btnWrapper}>
        <Button className={classes.btn} color="primary" onClick={handleClose}>
          Close
        </Button>
        <Button
          onClick={() => handlerRemove(id)}
          className={classes.btn}
          variant="contained"
          color="secondary">
          Delete
        </Button>
        <Button
          onClick={() => handlerComplited(id)}
          className={classes.btn}
          variant="contained"
          color="primary">
          Complited
        </Button>
      </Box>
    </Dialog>
  )
}
export default Modal
