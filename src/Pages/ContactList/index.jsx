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

const ContactList = ({ Contacts, getContacts, search, Auth, Comments, getComments }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showComments, setShowComments] = useState(false);
  

  useEffect(() => {
    const uuid = Auth?.value?.data?.uuid;
    const token = Auth?.value?.data?.token;
    const page = 1;
    getContacts({ uuid: uuid, page: page, token: token });
    setIsLoading(Contacts?.loading);
    
  }, [Auth]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleComment = (event) => {
    setShowComments(true);
    //const token = Auth?.value?.data?.token;
    // call comments api
    // getComments({ token: token });
    // display comments when loaded in modal 
  };

  const handleClose = () => {
    setShowComments(false);
  };

  const contactsList = Contacts?.data;

  const items = contactsList?.filter((result) => {
    if (search === null) {
      return result;
    }
    return result?.name?.toLowerCase().includes(search.toLowerCase()) || result?.email?.toLowerCase().includes(search.toLowerCase()) || result?.phone?.includes(search);
  }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((result) => (
    <TableRow hover role="checkbox" tabIndex={-1}>
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
        <Typography style={{ display: 'inline-block' }} color="textSecondary">
          {result.accid}
        </Typography>
      </TableCell>
      <TableCell scope="row" align="justify">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => { handleComment(); }}
        >
          Comment
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      { isLoading
        ? <div><CircularProgress /></div>
        : <><Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{ display: 'table-header-group' }}>
                  <TableRow>
                    <TableCell align="justify" style={{ minWidth: '50px' }}>Name</TableCell>
                    <TableCell align="justify" style={{ minWidth: '50px' }}>Email</TableCell>
                    <TableCell align="justify" style={{ minWidth: '50px' }}>Phone Number</TableCell>
                    <TableCell align="justify" style={{ minWidth: '50px' }}>Account ID</TableCell>
                    <TableCell align="justify" style={{ minWidth: '50px' }}> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 15, 25, 100]}
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
                  <div className={classes.paper} style={{ margin:"20px" }}>
                    <h2 id="transition-modal-title">showing list of comments</h2>
                    <FormControl variant="outlined">
                      <TextField
                        id="outlined-secondary"
                        label="comment"
                        variant="outlined"
                        color="primary"
                        value={''}
                        onChange={''}
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      onClick={() => { handleComment(); }}
                    >
                      Add Comment
                    </Button>
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
  },
)(ContactList);
