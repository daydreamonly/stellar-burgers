import { ConstructorPage, Feed, Login, Profile, Register } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { getFeed } from '../../services/feed/actions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { checkUserAuth } from '../../services/user/actions';
import { getUserSelector } from '../../services/user/slice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const user = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
    dispatch(getFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
