import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ChildCard from '../../../shared/ChildCard';
import { IconCake, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';

const IntroCard = ({ serviceProvider }) => {
  const [showContent, setShowContent] = useState(false);
  const formatDate = (dateString) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
  };
  if (!serviceProvider) return null;
  console.log(serviceProvider);
  return (
    <>
      <ChildCard>
        <Typography fontWeight={600} variant="h4" mb={2}>
          Introduction
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" mb={2}>
          {serviceProvider?.profile?.description != '' ? (
            <div className="relative">
              <div className={` ${showContent ? '' : ' max-h-[280px] overflow-hidden'}`}>
                <div dangerouslySetInnerHTML={{ __html: serviceProvider?.profile?.description }} />
                {/* <span className="absolute  bottom-6 left-0 w-full h-6 bg-gradient-to-t from-gray-800 to-transparent"></span> */}
              </div>
              <button
                onClick={() => {
                  setShowContent(!showContent);
                }}
                className="block mt-4 mx-auto  bg-transparent border border-blue-500 text-blue-500  font-semibold py-1 px-3 rounded hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
              >
                {showContent ? 'Show Less' : 'Show More'}
              </button>
            </div>
          ) : (
            <div>there is no Introduction add it from Complete your Profile </div>
          )}
        </Typography>
        <Typography fontWeight={600} variant="h4" mb={2}>
          Date of Birth
        </Typography>
        <Stack direction="row" gap={2} alignItems="center" mb={3}>
          <IconCake size="21" />
          <Typography variant="h6">{formatDate(serviceProvider?.dob)}</Typography>
        </Stack>
        {/* <Stack direction="row" gap={2} alignItems="center" mb={1}>
          <IconMapPin size="21" />
          <Typography variant="h6">Newyork, USA - 100001</Typography>
        </Stack> */}
      </ChildCard>
    </>
  );
};

export default IntroCard;
