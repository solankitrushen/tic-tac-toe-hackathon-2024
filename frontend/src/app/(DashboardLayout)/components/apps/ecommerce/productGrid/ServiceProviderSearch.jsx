// material
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { IconSearch } from '@tabler/icons-react';

// redux
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------
export default function ServiceProviderSearch() {
  const dispatch = useDispatch();

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sort Button */}
      {/* ------------------------------------------- */}
      <TextField
        id="outlined-search"
        placeholder="Search Service Provider"
        size="large"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="14" />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={(e) => dispatch(SearchProduct(e.target.value))}
      />
    </>
  );
}
