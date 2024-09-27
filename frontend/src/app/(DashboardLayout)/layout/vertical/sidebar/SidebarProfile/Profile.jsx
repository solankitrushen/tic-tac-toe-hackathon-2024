import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useUser } from '@/app/hooks/useUser';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const { user } = useUser();
  function capitalizeFirstLetter(str) {
    // Check if the input is a valid string
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const handleLogout = async () => {
    signOut();
    if (process.env.NEXT_PUBLIC_APP_DEPLOYED) {
      document.cookie = `userAuthToken=""; expires=${new Date(
        Date.now() - 15 * 24 * 60 * 60 * 1000,
      ).toUTCString()}; path=/; domain=.glitchastra.com; SameSite=None; Secure`;
    }
    document.cookie = `userAuthToken=""; expires=${new Date(
      Date.now() - 15 * 24 * 60 * 60 * 1000,
    ).toUTCString()}; path=/;`;
  };
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Profile Image"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/userProfileImages/${user?.profileImagePath}`}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{capitalizeFirstLetter(user.firstName)}</Typography>
            <Typography variant="caption">
              {user.lastName ? (
                capitalizeFirstLetter(user.lastName)
              ) : (
                <div className=" truncate w-[90px]">{user.email}</div>
              )}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/auth/login"
                aria-label="logout"
                size="small"
                onClick={handleLogout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
