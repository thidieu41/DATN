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
const AddNewBranchPage = Loader(
  lazy(() => import('src/content/pages/add_new_branch'))
);
const AddNewCategoryPage = Loader(
  lazy(() => import('src/content/pages/add_new_category'))
);
const AddNewPostPage = Loader(
  lazy(() => import('src/content/pages/add_new_post'))
);
const ProfilePage = Loader(lazy(() => import('src/content/pages/profile')));
const UpdateDoctorPage = Loader(
  lazy(() => import('src/content/pages/update_doctor'))
);
const LandingPage = Loader(
  lazy(() => import('src/content/pages/landing_page'))
);
const routes: RouteObject[] = [
  {
    path: 'authen',
    element: <AuthenticarionPage />
  },
  {
    path: '',
    element: <LandingPage />
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
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
        path: 'bac-si/cap-nhat/:id',
        element: <UpdateDoctorPage />
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
        path: 'danh-muc/tao-danh-muc',
        element: <AddNewCategoryPage />
      },
      {
        path: 'chi-nhanh',
        element: <BranchPage />
      },
      {
        path: 'chi-nhanh/tao-chi-nhanh',
        element: <AddNewBranchPage />
      },
      {
        path: 'bai-viet',
        element: <PostPage />
      },
      {
        path: 'bai-viet/tao-bai-viet',
        element: <AddNewPostPage />
      }
    ]
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'thong-tin-ca-nhan',
        element: <ProfilePage />
      }
    ]
  }
];

export default routes;
