import React, { useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { formatDistanceToNowStrict } from 'date-fns';
import ChatInsideSidebar from './ChatInsideSidebar';
import Image from 'next/image';
import { useUser } from '@/app/hooks/useUser';
import { currentChat, recMsg } from '@/store/apps/chat/ChatSlice';
import { Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChatContent = ({ toggleChatSidebar }) => {
  const [open, setOpen] = React.useState(true);
  const [action, setAction] = React.useState({});
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { user } = useUser();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // const chatDetails = useSelector(
  //   (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1],
  // );

  const chatDetails = useSelector((state) => {
    // Find the chat object that matches state.chatReducer.chatContent
    const matchedChat = state.chatReducer.chats.find((chat) => {
      return chat.chatId === state.chatReducer.chatContent;
    });

    dispatch(currentChat(matchedChat));
    return matchedChat ? matchedChat : {};
  });
  const activeChat = useSelector((state) => state.chatReducer.chatContent);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const body = { selectData: { isServiceProviderApproved: 1 } };
        const getAction = await axios.get(`/action/fetchActions?chatId=${activeChat}`, body);
        // console.log('getAction', getAction.data.data.actions[0]);
        setAction(getAction.data.fetchedAction[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAction();
  }, [activeChat]);

  useEffect(() => {
    // Scroll to the bottom of the chat when component mounts or messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [chatDetails.messages]);

  const handleFinalAccept = async () => {
    try {
      console.log('final accept');
      const actionBody = {
        chatId: activeChat,
        isUserApproved: true,
      };
      const action = await axios.post('/action/updateAction', actionBody);
      const communicationBody = {
        chatId: activeChat,
        isChatClosed: true,
      };
      const communicationClosed = await axios.post('/chat/updateChat', communicationBody);
      if (communicationClosed.status === 200) {
        if (action.data.actionId) {
          router.push(`/WorkSessions/${action.data.actionId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {chatDetails && Object?.keys(chatDetails).length !== 0 ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={chatDetails.serviceProviderId} dense disableGutters>
                <ListItemAvatar>
                  <Badge
                    color={
                      chatDetails?.status === 'online'
                        ? 'success'
                        : chatDetails?.status === 'busy'
                        ? 'error'
                        : chatDetails?.status === 'away'
                        ? 'warning'
                        : 'secondary'
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <Avatar
                      alt={`${chatDetails.serviceProvider?.firstName} ${chatDetails.serviceProvider?.lastName}`}
                      src={
                        chatDetails?.serviceProvider?.profile?.profileImage
                          ? `${chatDetails?.serviceProvider?.profile?.profileImage}`
                          : `/images/profile/user-${Math.floor(Math.random() * 10)}.jpg`
                      }
                      sx={{ width: 40, height: 40 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h5">
                      {' '}
                      {chatDetails.serviceProvider?.firstName}{' '}
                      {chatDetails.serviceProvider?.lastName}
                    </Typography>
                  }
                  secondary={chatDetails?.status}
                />
              </ListItem>
              <Stack direction={'row'}>
                <IconButton aria-label="phone">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="video">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton aria-label="sidebar" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
            {action?.isServiceProviderApproved ? (
              <Box
                className="flex flex-col gap-2 sm:flex-row justify-center items-center py-2"
                sx={{
                  bgcolor: (theme) => theme.palette.info.light,
                }}
              >
                <Typography variant="body" sx={{ color: (theme) => theme.palette.info.main }}>
                  Has your deal been finalized?
                </Typography>
                <Box display="flex" gap="15px" justifyContent="center" alignItems="center">
                  <Box>
                    <Button
                      sx={{
                        bgcolor: (theme) => theme.palette.success.main,
                        color: 'black',
                        borderRadius: '5px',
                        ':hover': {
                          bgcolor: (theme) => theme.palette.secondary.dark,
                        },
                        marginLeft: '10px',
                        padding: '2px', // Adjust padding to make it smaller
                        fontSize: '0.75rem', // Adjust font size to make it smaller
                        fontStyle: 'bold',
                      }}
                      size="small"
                      fullWidth
                      onClick={handleFinalAccept}
                    >
                      Final Accept
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      sx={{
                        bgcolor: (theme) => theme.palette.warning.main,
                        color: 'black',
                        borderRadius: '5px',
                        ':hover': {
                          bgcolor: (theme) => theme.palette.secondary.dark,
                        },

                        padding: '2px', // Adjust padding to make it smaller
                        fontSize: '0.75rem', // Adjust font size to make it smaller
                      }}
                      size="small"
                      fullWidth
                    >
                      Reject
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              ''
            )}
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box display="flex">
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Box
                sx={{
                  height: '650px',
                  overflow: 'auto',
                  maxHeight: '800px',
                }}
              >
                <Box p={3}>
                  {chatDetails.messages?.map((chat) => {
                    return (
                      <Box key={chat._id + chat.createdAt}>
                        {chatDetails.serviceProviderId === chat.senderId ? (
                          <Box display="flex">
                            <ListItemAvatar>
                              <Avatar
                                alt={`${chatDetails.serviceProvider?.firstName} ${chatDetails.serviceProvider?.lastName}`}
                                src={
                                  chatDetails.serviceProvider?.profile?.profileImage
                                    ? `${chatDetails.serviceProvider?.profile?.profileImage}`
                                    : `/images/profile/user-${Math.floor(Math.random() * 10)}.jpg`
                                }
                                sx={{ width: 40, height: 40 }}
                              />
                            </ListItemAvatar>
                            <Box>
                              {chat.createdAt ? (
                                <Typography variant="body2" color="grey.400" mb={1}>
                                  {`${chatDetails.serviceProvider?.firstName} ${
                                    chatDetails.serviceProvider?.lastName
                                      ? chatDetails.serviceProvider?.lastName
                                      : ''
                                  }`}
                                  ,{' '}
                                  {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                    addSuffix: false,
                                  })}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'grey.100',
                                    mr: 'auto',
                                    maxWidth: '320px',
                                  }}
                                >
                                  {chat.message}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    overflow: 'hidden',
                                    lineHeight: '0px',
                                  }}
                                >
                                  <Image src={chat.message} alt="attach" width="150" height="150" />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                          >
                            <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                              {chat.createdAt ? (
                                <Typography variant="body2" color="grey.400" mb={1}>
                                  {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                    addSuffix: false,
                                  })}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  mb={1}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '320px',
                                  }}
                                >
                                  {chat.message}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                                  <Image src={chat.message} alt="attach" width="250" height="165" />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                  {/* Dummy element for auto-scrolling */}
                  <div ref={messagesEndRef} />
                </Box>
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {open ? (
              <Box flexShrink={0}>
                <ChatInsideSidebar isInSidebar={lgUp ? !open : !open} chat={chatDetails} />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              mr: '10px',
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
