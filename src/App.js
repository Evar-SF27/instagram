import './styles/app.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import Dashboard from './pages/dashboard'

const Login = lazy(() => import ('./pages/login'))

function App() {
  return (
    
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={Login} />
        </Routes>  
      </Suspense>
      <Routes>
        <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </Router>
    
  );
}

export default App;
