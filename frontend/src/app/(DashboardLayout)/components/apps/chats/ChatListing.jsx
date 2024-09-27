import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '../../custom-scroll/Scrollbar';
import { SelectChat, SearchChat, getChats, newMsgUpdated } from '@/store/apps/chat/ChatSlice';
import { last } from 'lodash';
import { formatDistanceToNowStrict } from 'date-fns';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import useAuth from '@/app/hooks/useAuth';
import { useUser } from '@/app/hooks/useUser';
import axios from 'axios';
import CustomToast from '../../forms/theme-elements/CustomToast';
import { CLIENT_EVENTS, EVENTS } from '@/store/websocket/socketEvents';

const ChatListing = () => {
  useAuth();
  const { user } = useUser();
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const dispatch = useDispatch();
  const [unreadMessages, setUnreadMessages] = useState({});
  const activeChat = useSelector((state) => state.chatReducer.chatContent);
  let chats = useSelector((state) => state.chatReducer.chats);

  const fetchChats = async () => {
    try {
      const getChats = await axios.get(`/chat/fetchChats`);
      console.log('chats:', getChats.data);
      const serviceProviderIdArr = await getChats.data.map((c) => {
        return c.serviceProviderId;
      });
      return { chats: getChats.data, serviceProviderIdArr };
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServiceProviders = async (body) => {
    try {
      const serviceProviders = await axios.post(
        `/serviceProvider/fetchServiceProviders?verificationStatus=approved`,
        body,
      );
      console.log('service providers:', serviceProviders.data);

      return serviceProviders.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        socket.emit('set-user-id', user.userId);
        const { chats, serviceProviderIdArr } = await fetchChats();

        const body = {
          selectData: {
            serviceProviderId: 1,
            firstName: 1,
            lastName: 1,
            'profile.profileImage': 1,
          },
          serviceProviderIdArr,
        };

        const serviceProviders = await fetchServiceProviders(body);

        if (serviceProviders) {
          const mergedArray = chats.map((chat) => {
            const serviceProvider = serviceProviders.find(
              (provider) => provider.serviceProviderId === chat.serviceProviderId,
            );
            if (serviceProvider) {
              return { ...chat, serviceProvider };
            }
            return chat;
          });
          dispatch(getChats(mergedArray));

          CustomToast({
            message: 'Chats fetched successfully!!',
            status: 'success',
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 404) {
          CustomToast({
            message: 'Communications were not found!!',
            status: 'error',
          });
        }
        if (error.response?.status === 400) {
          CustomToast({
            message: 'Communications were not fetched successfully!!',
            status: 'error',
          });
        }

        if (error.response?.status === 500) {
          CustomToast({ message: 'Some internal server error!', status: 'error' });
        }
      }
    };
    if (user.userId) {
      fetchSidebarData();
    }
  }, [user]);

  const lastActivity = (chat) => last(chat.messages)?.createdAt;

  const filterChats = (chats, cSearch) => {
    if (chats) {
      // Filter chats based on search criteria
      let filteredChats = chats.filter((t) =>
        t.serviceProvider?.firstName.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
      );
      console.log('chat inside the filter(SP)', filteredChats);

      filteredChats = filteredChats.filter((t) => {
        if (!t.isChatClosed) {
          return t;
        }
      });
      console.log('chat inside the filter(closed)', filteredChats);

      // Sort filtered chats based on the timestamp of the last message
      filteredChats.sort((chat1, chat2) => {
        const lastActivityChat1 = lastActivity(chat1);
        const lastActivityChat2 = lastActivity(chat2);

        // Sort in descending order (latest message first)
        if (lastActivityChat1 && lastActivityChat2) {
          return new Date(lastActivityChat2) - new Date(lastActivityChat1);
        } else if (lastActivityChat1) {
          return 1; // chat1 has a message, so it comes first
        } else if (lastActivityChat2) {
          return -1; // chat2 has a message, so it comes first
        } else {
          return 0; // both chats have no messages, maintain the order
        }
      });
      console.log('chat inside the filter(sorted)', filteredChats);

      return filteredChats;
    }
  };
  console.log('final chat:', chats);

  chats = useSelector((state) => filterChats(chats, state.chatReducer.chatSearch));
  console.log('final chat1:', chats);
  const newMsg = useSelector((state) => state.chatReducer.newMsgUpdated);

  useEffect(() => {
    setUnreadMessages((prevState) => ({
      ...prevState,
      [newMsg.chatId]: newMsg.hasUnreadMsg,
    }));
  }, [newMsg]);

  const getDetails = (conversation) => {
    let displayText = '';

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderUserId === conversation.userId ? 'You: ' : '';
      const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.message;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* Profile */}
      {/* ------------------------------------------- */}
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          overlap="circular"
          color="success"
        >
          <Avatar
            alt="Remy Sharp"
            src="/images/profile/user-1.jpg"
            sx={{ width: 54, height: 54 }}
          />
        </Badge>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            {user.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2">{user.mobileNo ? user.mobileNo : user.email}</Typography>
        </Box>
      </Box>
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => dispatch(SearchChat(e.target.value))}
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Contact List */}
      {/* ------------------------------------------- */}
      <List sx={{ px: 0 }}>
        <Box px={2.5} pb={1}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Recent Chats <IconChevronDown size="16" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
            <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
          </Menu>
        </Box>
        <Scrollbar
          sx={{
            height: { lg: 'calc(100vh - 100px)', md: '100vh' },
            maxHeight: '600px',
          }}
        >
          {chats && chats.length ? (
            chats.map((chat) => (
              <ListItemButton
                key={chat.serviceProviderId}
                onClick={() => {
                  dispatch(SelectChat(chat.chatId));
                  socket.emit(EVENTS.SET_COMMUNICATION_ID, chat.chatId);
                  socket.emit(CLIENT_EVENTS.RECEIVE_MESSAGE, chat.chatId);
                  dispatch(newMsgUpdated({ chatId: chat.chatId, hasUnreadMsg: false }));
                }}
                sx={{
                  mb: 0.5,
                  py: 2,
                  px: 3,
                  alignItems: 'start',
                }}
                selected={activeChat === chat.serviceProviderId}
              >
                <ListItemAvatar>
                  <Badge
                    color={
                      chat?.status === 'online'
                        ? 'success'
                        : chat?.status === 'busy'
                        ? 'error'
                        : chat?.status === 'away'
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
                      alt={`${chat.serviceProvider?.firstName}${chat.serviceProvider?.lastName}`}
                      src={
                        chat?.serviceProvider?.profile?.profileImage
                          ? `${chat?.serviceProvider?.profile?.profileImage}`
                          : `/images/profile/user-${Math.floor(Math.random() * 10)}.jpg`
                      }
                      sx={{ width: 42, height: 42 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {chat.serviceProvider?.firstName} {chat.serviceProvider?.lastName}
                    </Typography>
                  }
                  secondary={getDetails(chat)}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{ my: 0 }}
                />
                <Box sx={{ flexShrink: '0' }} mt={0.5}>
                  <Typography variant="body2">
                    {formatDistanceToNowStrict(new Date(lastActivity(chat)), {
                      addSuffix: false,
                    })}
                  </Typography>
                  {/* Render green dot if unread messages exist for this chat */}
                  {unreadMessages[chat.chatId] && activeChat !== chat.serviceProviderId && (
                    <Badge
                      variant="dot"
                      color="success"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      overlap="circular"
                    />
                  )}
                </Box>
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                No Contacts Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
