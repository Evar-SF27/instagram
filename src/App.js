import './styles/app.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Dashboard from './pages/dashboard'
import SignUp from './pages/signup';

const Login = lazy(() => import ('./pages/login'))
// const SignUp = lazy(() => import ('./pages/signup'))

function App() {
  return (
    
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>  
      </Suspense>
      {/* <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.SIGN_UP} element={SignUp} />
        </Routes>
      </Suspense> */}
      <Routes>
        <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />  
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </Router>
    
  );
}

export default App;
