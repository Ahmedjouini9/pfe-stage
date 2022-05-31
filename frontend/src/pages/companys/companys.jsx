import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sideBar/sideBar'
import Feed from '../../components/feed/feed'
import './companys.css'
import { getRelatedCompanys, getCompany } from "../redux/features/companySlice";

export default function companys() {
  const dispatch = useDispatch();
  const { company} = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const domaine = company?.tags;
  const pay = company?.tags;
    
  useEffect(() => {
    domaine && dispatch(getRelatedCompanys(domaine));
    pay && dispatch(getRelatedCompanys(pay));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domaine,pay]);

  useEffect(() => {
    if (id) {
      dispatch(getCompany(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
       <Navbar />
       <div className='container'>

       <Sidebar />
       <Feed />
       </div>
    </div>
  )
}
