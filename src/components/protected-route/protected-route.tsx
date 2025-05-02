import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectUserState } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children?: React.ReactNode;
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyAuthorized
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { isAuthenticated, loading, isAuthChecked } =
    useSelector(selectUserState);

  if (loading || !isAuthChecked) {
    return <Preloader />;
  }

  if (onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (
    !loading &&
    isAuthChecked &&
    onlyAuthorized === false &&
    isAuthenticated
  ) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children ? <>{children}</> : <Outlet />;
};
