import React, { useEffect } from 'react';
import ManageNavigation from '../manage/ManageNavigation';
import MyCompanyItem from 'components/pages/my-rentals/MyRentalItem';
import { Spinner } from 'components/shared';
import { deleteCompany, getCompanysByUser } from "../redux/features/tourSlice";

const MyCompany = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userCompanys, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();


  useEffect(() => {
    if (userId) {
      dispatch(getCompanysByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  
  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteCompany({ id, toast }));
    }
  };

  return (
    <>
      <ManageNavigation />

      {userCompanys.length === 0 && (
        <h3>No tour available with the user: {user?.result?.name}</h3>
      )}
      <h2 className='manage__title'>My Rentals</h2>
      <div className='browseList'>
        {myRentals?.map((rental, index) => (
          <MyCompanyItem rental={rental} key={index} />
        ))}
        {onRender()}
      </div>
    </>
  );
};





export default MyCompany;
