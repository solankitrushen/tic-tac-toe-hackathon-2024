import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { useUser } from '@/app/hooks/useUser';

const validationSchema = Yup.object({
  bookName: Yup.string().required('Book Name is required'),
  bookDesc: Yup.string().required('Description is required'),
  isbn: Yup.string().required('ISBN is required'),
  author: Yup.string().required('Author is required'),
  publicationDate: Yup.date().nullable(),
  publisher: Yup.string(),
  genre: Yup.string(),
  language: Yup.string(),
  pageCount: Yup.number().min(1, 'Page Count must be at least 1').nullable(),
  price: Yup.number().min(0, 'Price cannot be negative').nullable(),
});

const AddBookForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [pdfFile, setPdfFile] = useState(null);
const {user} = useUser();
  const initialValues = {
    bookName: '',
    bookDesc: '',
    isbn: '',
    author: '',
    publicationDate: '',
    publisher: '',
    genre: '',
    language: 'English',
    pageCount: '',
    price: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!pdfFile) {
      setSnackbarMessage('Please upload a PDF file.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setSubmitting(false);
      return;
    }

    try {
      // Step 1: Upload the PDF file to S3
      const formData = new FormData();
      formData.append('bookFile', pdfFile);

      const uploadResponse = await axios.post('/uploadBooksToS3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const pdfUrl = uploadResponse.data.pdfUrl;

      // Step 2: Add the book details
      const payload = {
        ...values,
        bookUrl: pdfUrl,
        bookUserId: user.userId,
      };

      await axios.post('/addbooks', payload);

      setSnackbarMessage('Book added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      resetForm();
      setPdfFile(null);
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Error adding book');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }

    setSubmitting(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      setSnackbarMessage('Please upload a valid PDF file.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '700px',
        margin: 'auto',
        bgcolor: '#121212',
        color: '#e0e0e0',
      }}
    >
      <Paper elevation={4} sx={{ padding: '30px', borderRadius: '12px', bgcolor: '#1e1e1e' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#4caf50' }}>
          Add Book to Marketplace
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CustomFormLabel htmlFor="bookName">Book Name</CustomFormLabel>
              <Field
                id="bookName"
                name="bookName"
                as={CustomTextField}
                variant="outlined"
                fullWidth
                sx={{ bgcolor: '#2c2c2c', color: '#e0e0e0' }}
              />
              <ErrorMessage name="bookName" component="div" />

              <CustomFormLabel htmlFor="bookDesc">Description</CustomFormLabel>
              <Field
                id="bookDesc"
                name="bookDesc"
                as={CustomTextField}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ bgcolor: '#2c2c2c', color: '#e0e0e0' }}
              />
              <ErrorMessage name="bookDesc" component="div" />

              <CustomFormLabel htmlFor="isbn">ISBN</CustomFormLabel>
              <Field
                id="isbn"
                name="isbn"
                as={CustomTextField}
                variant="outlined"
                fullWidth
                sx={{ bgcolor: '#2c2c2c', color: '#e0e0e0' }}
              />
              <ErrorMessage name="isbn" component="div" />

              <CustomFormLabel htmlFor="author">Author</CustomFormLabel>
              <Field
                id="author"
                name="author"
                as={CustomTextField}
                variant="outlined"
                fullWidth
                sx={{ bgcolor: '#2c2c2c', color: '#e0e0e0' }}
              />
              <ErrorMessage name="author" component="div" />

              <CustomFormLabel htmlFor="publicationDate">Publication Date</CustomFormLabel>
              <Field
                id="publicationDate"
                name="publicationDate"
                type="date"
                as={CustomTextField}
                variant="outlined"
                fullWidth
                sx={{ bgcolor: '#2c2c2c', color: '#e0e0e0' }}
              />
              <ErrorMessage name="publicationDate" component="div" />

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    bgcolor: '#4caf50',
                    color: '#fff',
                    '&:hover': { bgcolor: '#388e3c' },
                    marginTop: '20px',
                  }}
                >
                  Upload PDF
                </Button>
              </label>

              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  sx={{
                    bgcolor: '#4caf50',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    marginTop: '10px',
                    width: '100%',
                    maxWidth: '700px',
                    '&:hover': {
                      bgcolor: '#388e3c',
                    },
                  }}
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar} //@ts-ignore
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AddBookForm;
