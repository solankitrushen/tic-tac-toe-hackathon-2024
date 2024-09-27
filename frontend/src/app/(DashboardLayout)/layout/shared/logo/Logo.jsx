import { useSelector } from 'react-redux';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Box } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '200px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === 'dark' ? (
          <Box sx={{ fontSize: '30px', mt: '25px', ml: '20px', fontWeight: 'bold' }}>
            <span className="text-blue-500">T</span>ri <span className="text-blue-500">O</span>rbiter
          </Box>
        ) : (
          <Image
            src={'/logos/logo.png'}
            alt="logo"
            height={customizer.TopbarHeight}
            width={190}
            className=" ml-3 "
            priority
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === 'dark' ? (
        <Image
          src="/logos/tri-orbiter.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={190}
          className=" ml-3 "
          priority
        />
      ) : (
        <Image
          src="/logos/tri-orbiter.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={190}
          className=" ml-3 "
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
