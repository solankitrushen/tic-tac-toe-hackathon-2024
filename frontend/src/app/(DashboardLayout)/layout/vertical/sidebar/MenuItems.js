import { uniqueId } from 'lodash';

import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
  IconPasswordUser,
  IconUserHeart,
  IconUserShare,
  IconCpu2,
} from '@tabler/icons-react';
const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Home',
    icon: IconCpu2,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Books',
    icon: IconLayout,
    href: '',
    children: [
      {
        id: uniqueId(),
        title: 'addBooks',
        icon: IconPoint,
        href: '/addbooks',
      }
    ],
  },

  // {
  //   id: uniqueId(),
  //   title: 'Widgets',
  //   icon: IconLayout,
  //   href: '/widgets/cards',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Cards',
  //       icon: IconPoint,
  //       href: '/widgets/cards',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Banners',
  //       icon: IconPoint,
  //       href: '/widgets/banners',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Charts',
  //       icon: IconPoint,
  //       href: '/widgets/charts',
  //     },
  //   ],
  // },
  
];

export default Menuitems;
