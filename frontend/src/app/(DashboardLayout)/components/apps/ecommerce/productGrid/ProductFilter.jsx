import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';


import { IconCheck } from '@tabler/icons-react';
import {
  IconHanger,
  IconCircles,
  IconNotebook,
  IconMoodSmile,
  IconDeviceLaptop,
  IconSortAscending2,
  IconSortDescending2,
  IconAd2,
} from '@tabler/icons-react';
import { Stack } from '@mui/system';

const ProductFilter = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.ecommerceReducer.products);
  const active = useSelector((state) => state.ecommerceReducer.filters);
  const checkactive = useSelector((state) => state.ecommerceReducer.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    if (attr === 'colors') {
      newVal = newVal.flat();
    }

    return (newVal = ['All', ...Array.from(new Set(newVal))]);
  };

  const filterCategory = [
    {
      id: 1,
      filterbyTitle: 'Filter by Category',
    },
    {
      id: 2,
      name: 'All',
      sort: 'All',
      icon: IconCircles,
    },
    {
      id: 3,
      name: 'Carpenter',
      sort: 'carpenter',
      icon: IconHanger,
    },
    {
      id: 9,
      name: 'Electrician',
      sort: 'electrician',
      icon: IconNotebook,
    },
    {
      id: 10,
      name: 'Plumber',
      sort: 'plumber',
      icon: IconMoodSmile,
    },
    // {
    //   id: 11,
    //   name: 'Electronics',
    //   sort: 'electronics',
    //   icon: IconDeviceLaptop,
    // },
    {
      id: 6,
      devider: true,
    },
  ];
  const filterbySort = [
    {
      id: 1,
      value: 5,
      label: <Rating className="mt-2" name="read-only" size="small" value="5" readOnly />,
      icon: IconAd2,
    },
    {
      id: 2,
      value: 4,
      label: <Rating className="mt-2" name="read-only" size="small" value="4" readOnly />,
      icon: IconSortAscending2,
    },
    {
      id: 3,
      value: 3,
      label: <Rating className="mt-2" name="read-only" size="small" value="3" readOnly />,
      icon: IconSortDescending2,
    },
  ];
  const filterByExp = [
    {
      id: 0,
      label: '20 + Years',
      value: '20+',
    },
    {
      id: 1,
      label: '15 - 20 Years',
      value: '15-20',
    },
    {
      id: 3,
      label: '10 - 15 Years',
      value: '10-15',
    },
    {
      id: 4,
      label: '5 - 10 Years',
      value: '5-10',
    },
    {
      id: 5,
      label: 'Less 5 Years',
      value: '0-5',
    },
  ];

  const handlerExpFilter = (value) => {
    if (value.target.checked) {
      dispatch(sortByExp({ exp: value.target.value }));
    }
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.devider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={active.category === `${filter.sort}`}
              onClick={() => dispatch(filterProducts({ category: `${filter.sort}` }))}
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* ------------------------------------------- */}
        {/* Sort by */}
        {/* ------------------------------------------- */}
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          Sort By Rating
        </Typography>
        {filterbySort.map((filter) => {
          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={checkactive === `${filter.value}`}
              onClick={() => dispatch(sortByProducts(`${filter.value}`))}
              key={filter.id + filter.label + filter.value}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size={19} />
              </ListItemIcon>
              <ListItemText>{filter.label}</ListItemText>
            </ListItemButton>
          );
        })}
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Filter By Gender */}
        {/* ------------------------------------------- */}
        {/* <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            By Gender
          </Typography>
          <br />
          <FormGroup>
            {filterbyGender.map((gen) => (
              <FormControlLabel
                key={gen}
                control={
                  <Radio
                    value={gen}
                    checked={active.gender === gen}
                    onChange={handlerGenderFilter}
                  />
                }
                label={gen}
              />
            ))}
          </FormGroup>
        </Box> */}
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Filter By Pricing */}
        {/* ------------------------------------------- */}
        <Typography variant="h6" px={3} mt={3} pb={2}>
          By Experience
        </Typography>
        <Box p={3} pt={0}>
          <FormGroup>
            {filterByExp.map((exp) => (
              <FormControlLabel
                key={exp.label}
                control={
                  <Radio
                    value={exp.value}
                    checked={active.exp === exp.value}
                    onChange={handlerExpFilter}
                  />
                }
                label={exp.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider></Divider>
        {/* <Typography variant="h6" px={3} mt={3} pb={2}>
          By Colors
        </Typography> */}
        {/* ------------------------------------------- */}
        {/* Filter By colors */}
        {/* ------------------------------------------- */}
        {/* <Box p={3} pt={0}>
          <Stack direction={'row'} flexWrap="wrap" gap={1}>
            {filterbyColors.map((curColor) => {
              if (curColor !== 'All') {
                return (
                  <Avatar
                    sx={{
                      backgroundColor: curColor,
                      width: 24,
                      height: 24,
                      cursor: 'pointer',
                    }}
                    aria-label={curColor}
                    key={curColor}
                    onClick={
                      active.color === curColor
                        ? () => dispatch(sortByColor({ color: 'All' }))
                        : () => dispatch(sortByColor({ color: curColor }))
                    }
                  >
                    {active.color === curColor ? <IconCheck size="13" /> : ''}
                  </Avatar>
                );
              } else {
                return <Box key={curColor} sx={{ display: 'none' }}></Box>;
              }
            })}
          </Stack>
        </Box> */}
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => dispatch(filterReset())} fullWidth>
            Reset Filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
