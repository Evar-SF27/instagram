import './styles/app.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user';
import ProtectedRoute from './helpers/protectedRoutes';
import IsUserLoggedIn from './helpers/isUserLoggedIn';



const Login = lazy(() => import ('./pages/login'))
const SignUp = lazy(() => import ('./pages/signup'))
const Dashboard = lazy(() => import ('./pages/dashboard'))
const Profile = lazy(() => import ('./pages/profile'))
const NotFound = lazy(() => import('./pages/notFound'))


function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value ={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={
              <ProtectedRoute user={user} exact>
                <Dashboard />
                {/* {Dashboard} */}
              </ProtectedRoute>
            } />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.SIGN_UP} element={
              <IsUserLoggedIn user={user}><SignUp /></IsUserLoggedIn>
            } />
            <Route path={ROUTES.LOGIN} element={
              <IsUserLoggedIn user={user}><Login /></IsUserLoggedIn>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>  
        </Suspense>
      </Router>
    </UserContext.Provider> 
  );
}

export default App;
