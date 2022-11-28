import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CustomPagination() {
  return (
    <Stack spacing={2}>
        <Pagination count={10} shape="rounded" />
    </Stack>
  )
}

export default CustomPagination