import { Backdrop, CircularProgress } from '@mui/material';

const Loading = () => {
  const { loading } = useSelector((state)=> ({...state.auth}));
  return (
    <Backdrop
      open={loading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  );
};

export default Loading;
