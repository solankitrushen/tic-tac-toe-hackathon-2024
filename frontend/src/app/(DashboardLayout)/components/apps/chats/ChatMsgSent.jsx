import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import EmojiPicker, { EmojiStyle, EmojiClickData, Emoji } from 'emoji-picker-react';
import { IconMoodSmile, IconPaperclip, IconPhoto, IconSend } from '@tabler/icons-react';
import { sendMsg } from '@/store/apps/chat/ChatSlice';
import { EVENTS } from '@/store/websocket/socketEvents';

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState('');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = React.useState('');

  const onEmojiClick = (emojiData, event) => {
    setChosenEmoji(emojiData.unified);
    setMsg(emojiData.emoji);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = useSelector((state) => state.chatReducer.chatContent);
  const user = useSelector((state) => state.chatReducer.user);
  const currentChat = useSelector((state) => state.chatReducer.currentChat);

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const newMsg = { id, msg };

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newMessage = {
      chatId: id,
      senderId: user?.userId,
      receiverId: currentChat?.serviceProviderId,
      message: msg,
      createdAt: new Date().toISOString(),
      type: 'text',
    };

    dispatch(sendMsg(newMessage));

    const newNotification = {
      chatId: id,
      senderId: user?.userId,
      receiverId: currentChat?.serviceProviderId,
      message: msg,
      type: 'text',
    };

    setMsg('');
    socket.emit(EVENTS.SEND_NOTIFICATION, newNotification);
    socket.emit(EVENTS.SEND_MESSAGE, newMessage);
  };

  return (
    <Box p={2}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        {/* ------------------------------------------- */}
        {/* Emoji picker */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <IconMoodSmile />
        </IconButton>
        <Popover
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
          <Box p={2}>
            Selected:{' '}
            {chosenEmoji ? (
              <Emoji unified={chosenEmoji} emojiStyle={EmojiStyle.APPLE} size={22} />
            ) : (
              ''
            )}
          </Box>
        </Popover>
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(sendMsg(newMsg));
            setMsg('');
          }}
          disabled={!msg}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPhoto stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPaperclip stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
