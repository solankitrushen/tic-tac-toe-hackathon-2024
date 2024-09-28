import { useSelector } from 'react-redux';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

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
          <Image
            src="/logos/Karymitra b.png"
            alt="logo"
            height={customizer.TopbarHeight}
            width={190}
            className="mt-2 ml-3 "
            priority
          />
        ) : (
          <Image
            src={'/logos/Karymitra b.png'}
            alt="logo"
            height={customizer.TopbarHeight}
            width={190}
            className="mt-2 ml-3 "
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
          src="/logos/Karymitra b.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={190}
          className="mt-2 ml-3 "
          priority
        />
      ) : (
        <Image
          src="/logos/Karymitra b.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={190}
          className="mt-2 ml-3 "
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
