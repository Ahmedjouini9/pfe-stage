import React from 'react';
import { connect } from 'react-redux';
import { updateMyRental } from 'store/manage/actions';

import { Modal } from 'react-responsive-modal';
import UpdateRentalForm from 'components/forms/UpdateRentalForm';

const updateMyCompany = () => {
  const initialState = {
    title: "",
    description: "",
    adress : "",
    pay : "",
    domaine : "",
  };
  const [companyData, setCompanyData] = useState(initialState);
  const [ErrMsg, setErrMsg] = useState(null);
  const { error, userCompanys } = useSelector((state) => ({
    ...state.company,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description,adress,domaine,pay} = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleCompany = userCompanys.find((company) => company._id === id);
      console.log(singleCompany);
      setCompanyData({ ...singleCompany });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);



  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      const updatedCompanyData = { ...CompanyData, name: user?.result?.name };

      if (!id) {
        dispatch(createCompany({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateCompany({ id, updatedCompanyData, toast, navigate }));
      }
      handleClear();
    }
  };
  
  
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };
  return (
    <Modal
      focusTrapped={false}
      open={open}
      onClose={() => onCloseModal()}
      center
    >
      <div className='modal__header'>
        <h2>Update Rental</h2>
      </div>
      <div className='modal__body'>
        <UpdateRentalForm onSubmit={onUpdateRental} rentalToUpdate={rental} />
      </div>
    </Modal>
  );
};

const mapDispatchToProps = {
  updateMyRental,
};

export default updateMyCompany;
