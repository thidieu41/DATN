import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Authen
const AuthenticarionPage = Loader(lazy(() => import('src/content/authen')));
// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

// page
const DoctorPage = Loader(lazy(() => import('src/content/pages/doctors')));
const ScheduleAppoimentPage = Loader(
  lazy(() => import('src/content/pages/schedule_appoinment'))
);
const AddNewScheduleAppoimentPage = Loader(
  lazy(() => import('src/content/pages/add_new_schedule_appoinment'))
);
const CustomerPage = Loader(lazy(() => import('src/content/pages/customers')));
const CategoryPage = Loader(lazy(() => import('src/content/pages/category')));
const BranchPage = Loader(lazy(() => import('src/content/pages/branch')));
const PostPage = Loader(lazy(() => import('src/content/pages/post')));

const routes: RouteObject[] = [
  {
    path: 'authen',
    element: <AuthenticarionPage />
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="authen" replace />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="bac-si" replace />
      },
      {
        path: 'bac-si',
        element: <DoctorPage />
      },
      {
        path: 'lich-kham',
        element: <ScheduleAppoimentPage />
      },
      {
        path: 'lich-kham/tao-lich',
        element: <AddNewScheduleAppoimentPage />
      },
      {
        path: 'khach-hang',
        element: <CustomerPage />
      },
      {
        path: 'danh-muc',
        element: <CategoryPage />
      },
      {
        path: 'chi-nhanh',
        element: <BranchPage />
      },
      { path: 'bai-viet', element: <PostPage /> }
    ]
  }
];

export default routes;
