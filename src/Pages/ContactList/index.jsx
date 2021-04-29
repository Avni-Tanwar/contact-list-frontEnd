/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as ContactActions from '../../Redux/Actions/Contacts';
import * as CommentActions from '../../Redux/Actions/Comments';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '89vh',

  },
  container: {
    maxHeight: 800,
  },
  button: {
    margin: '10px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'auto',
  },
});

const ContactList = ({ Contacts, getContacts, search, Auth, Comments, editComments, deleteComments, createComments, getComments }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState('');
  const [contactId, setContactId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    console.log("useffect", Auth);
    // const uuid = Auth?.value?.data?.uuid;
    const token = Auth?.value?.data?.token;
    // const page = 1;
    getContacts({ token });
    setIsLoading(Contacts?.loading);

  }, [Auth]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage)
    const token = Auth?.value?.data?.token;
    getContacts({ token, contactId, newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCommentChange = (event) => {
    setAddComment(event.target.value);
  }

  const handleCommentSubmit = () => {
    const token = Auth?.value?.data?.token;
    createComments({ token, comment: addComment, contactId })
    handleClose();
  }

  const handleComment = (cid) => {
    setShowComments(true);
    const token = Auth?.value?.data?.token;
    getComments({ token, contactId: cid });
  };

  const handleCommentDelete = (cmid) => {
    console.log(commentId);
    const token = Auth?.value?.data?.token;
    deleteComments({ token, commentId: cmid })
    handleClose();
  }

  const handleCommentEdit = (comment, cmid) => {
    console.log(commentId);
    setCommentId(cmid);
    setEditComment(comment);
  }

  const handleEditCommentChange = (event) => {
    console.log(editComment);
    setEditComment(event.target.value);
  }

  const handleCommentEditSubmit = (cmid) => {
    const token = Auth?.value?.data?.token;
    editComments({ token, comment: editComment, commentId: cmid });
    console.log(commentId);
    handleClose();
  }

  const handleClose = () => {
    setShowComments(false);
    setCommentId(null);
    setAddComment('');
    setEditComment('');
  };

  const contactsList = Contacts?.data;

  const items = contactsList?.filter((result) => {
    if (search === null) {
      return result;
    }
    return result?.name?.toLowerCase().includes(search.toLowerCase()) || result?.email?.toLowerCase().includes(search.toLowerCase()) || result?.phone?.includes(search);
  }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((result) => (
    <TableRow hover role="checkbox" tabIndex={-1} key={result.cid}>
      <TableCell scope="row" align="justify">
        <Typography style={{ display: 'inline-block' }} color="textSecondary">
          {result.name}
        </Typography>
      </TableCell>
      <TableCell scope="row" align="justify">
        <Typography style={{ display: 'inline-block' }} color="textSecondary">
          {result.email}
        </Typography>
      </TableCell>
      <TableCell scope="row" align="justify">
        <Typography style={{ display: 'inline-block' }} color="textSecondary">
          {result.phone}
        </Typography>
      </TableCell>
      <TableCell scope="row" align="justify">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => {
            setContactId(result.cid);
            handleComment(result.cid);
          }}
        >
          Comment
        </Button>
      </TableCell>
    </TableRow>
  ));

  const commentList = Comments?.data;
  let commentItems = commentList?.map((result) => (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {
        commentId === result.cmid ? <>

          <TableCell scope="row" align="justify">
            <Typography style={{ display: 'inline-block' }} color="textSecondary">
              <TextField
                key={result.cmid}
                id="outlined-secondary"
                label="comment"
                variant="outlined"
                color="primary"
                value={editComment}
                onChange={handleEditCommentChange}
              />
            </Typography>
          </TableCell>
          <TableCell scope="row" align="justify">
            <Typography style={{ display: 'inline-block' }} color="textSecondary">
              <Button
                variant="contained"
                color="primary"
                size="small"
                value="EDIT"
                onClick={() => {
                  handleCommentEditSubmit(result.cmid);
                }}>SUBMIT</Button>
            </Typography>
          </TableCell>
        </>
          :
          <>
            <TableCell scope="row" align="justify">
              <Typography style={{ display: 'inline-block' }} color="textSecondary">
                {result.comment}
              </Typography></TableCell>

            <TableCell scope="row" align="justify">
              <Typography style={{ display: 'inline-block' }} color="textSecondary">
                <Button
                  variant="contained"
                  color=""
                  size="small"
                  value="EDIT"
                  onClick={() => {
                    handleCommentEdit(result.comment, result.cmid);
                  }}>EDIT</Button>
              </Typography>
            </TableCell>
          </>
      }
      <TableCell scope="row" align="justify">
        <Typography style={{ display: 'inline-block' }} color="textSecondary">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              handleCommentDelete(result.cmid);
            }}> DELETE </Button>
        </Typography>
      </TableCell>
      <br /><br />
    </TableRow>
  ));
  // let commentItems;

  return (
    <>
      { isLoading
        ? <div><CircularProgress /></div>
        : <><Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead style={{ display: 'table-header-group' }}>
                <TableRow>
                  <TableCell align="justify" style={{ minWidth: '75px' }}>Name</TableCell>
                  <TableCell align="justify" style={{ minWidth: '75px' }}>Email</TableCell>
                  <TableCell align="justify" style={{ minWidth: '75px' }}>Phone Number</TableCell>
                  <TableCell align="justify" style={{ minWidth: '50px' }}> Comment </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 15, 25, 100]}
            component="div"
            count={contactsList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
          <div>
            {showComments && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showComments}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={showComments}>
                  <div className={classes.paper} style={{ margin: "20px", background: 'white' }}>
                    <h2 id="transition-modal-title">Showing list of comments</h2>

                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{ display: 'table-header-group' }}>
                          <TableRow>
                            <TableCell align="justify" style={{ minWidth: '50px' }}>Comment</TableCell>
                            <TableCell align="justify" style={{ minWidth: '50px' }}>MODIFY</TableCell>
                            <TableCell align="justify" style={{ minWidth: '50px' }}>DELETE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {commentItems}
                        </TableBody>
                      </Table>
                    </TableContainer>


                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell scope="row" align="justify">
                        <Typography style={{ display: 'inline-block' }} color="textSecondary">
                          <FormControl variant="outlined">
                            <TextField
                              id="outlined-secondary"
                              label="comment"
                              variant="outlined"
                              color="primary"
                              value={addComment}
                              onChange={handleCommentChange}
                            />
                          </FormControl>
                        </Typography>
                      </TableCell>
                      <TableCell scope="row" align="justify">
                        <Typography style={{ display: 'inline-block' }} color="textSecondary">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            onClick={() => { handleCommentSubmit(); setAddComment('') }}
                          >
                            Add Comment
                          </Button>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </div>
                </Fade>
              </Modal>
            )}
          </div>
        </>
      }
    </>
  );
};

export default connect(
  ({ Contacts, Comments, Auth }) => ({
    Contacts,
    Comments,
    Auth,
  }),
  {
    getContacts: ContactActions.getContacts,
    getComments: CommentActions.getComments,
    createComments: CommentActions.createComments,
    deleteComments: CommentActions.deleteComments,
    editComments: CommentActions.editComments,
  },
)(ContactList);
