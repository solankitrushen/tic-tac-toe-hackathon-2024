'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, Typography, Box, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';

import axios from 'axios';
import { useUser } from '@/app/hooks/useUser';

function EditProfile({ showEditProfilePic, setShowEditProfilePic }) {
  const [profileImage, setProfileImage] = useState(null); // State to store the selected profile image
  const { user, updateUser } = useUser();

  const onDrop = (acceptedFiles) => {
    setProfileImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!profileImage) {
      console.log('No profile image selected.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      const response = await axios.post('/user/upload-userProfile-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          userId: user.userId,
        },
      });
      updateUser({ profileImagePath: response.data.data.path });
      console.log('Image uploaded successfully:', response.data);
      setShowEditProfilePic(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const ProfileImage = ({ children }) => (
    <Box
      sx={{
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '4px solid #fff',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          cursor: 'pointer',
        },
        backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
      }}
    >
      {children}
    </Box>
  );

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={showEditProfilePic}
        onClose={() => setShowEditProfilePic(false)}
        fullWidth
      >
        <DialogTitle>Edit Your Profile Pic</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <ProfileImage>
              <Avatar
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/user/userProfileImages/${user?.profileImagePath}`
                }
                alt="profile image"
                sx={{
                  width: '190px',
                  height: '190px',
                  border: '4px solid #fff',
                  borderRadius: '50%',
                }}
              />
            </ProfileImage>
            <Paper
              {...getRootProps()}
              elevation={3}
              sx={{
                width: '100%',
                p: 4,
                mt: 2,
                textAlign: 'center',
                border: '2px dashed #cccccc',
                borderRadius: '8px',
                bgcolor: isDragActive ? 'primary.light' : 'background.paper',
                color: isDragActive ? 'primary.dark' : 'text.secondary',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 50, mb: 2 }} />
              {profileImage ? (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {profileImage.name}
                </Typography>
              ) : (
                <Typography variant="body1">
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Drag and drop image here, or click to select'}
                </Typography>
              )}
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditProfilePic(false)}>Close</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
            }}
          >
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProfile;
