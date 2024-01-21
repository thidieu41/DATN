import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import UserProfilePage from './content/pages/user_profile';

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
const ListUserScheduleAppoimentPage = Loader(
  lazy(() => import('src/content/pages/user_schedule_list'))
);
const CustomerPage = Loader(lazy(() => import('src/content/pages/customers')));
const CategoryPage = Loader(lazy(() => import('src/content/pages/category')));
const BranchPage = Loader(lazy(() => import('src/content/pages/branch')));
const PostPage = Loader(lazy(() => import('src/content/pages/post')));
const AddNewBranchPage = Loader(
  lazy(() => import('src/content/pages/add_new_branch'))
);
const AddNewPostPage = Loader(
  lazy(() => import('src/content/pages/add_new_post'))
);
const ProfilePage = Loader(lazy(() => import('src/content/pages/profile')));
const DoctorFormPage = Loader(
  lazy(() => import('src/content/pages/add_update_doctor'))
);
const LandingPage = Loader(
  lazy(() => import('src/content/pages/landing_page'))
);
const NewUserScheduleAppoimentPage = Loader(
  lazy(() => import('src/content/pages/new_user_schedule_appoinment'))
);
const ServiceDetailsPage = Loader(
  lazy(() => import('src/content/pages/service_details'))
);
const PostCategoriesPage = Loader(
  lazy(() => import('src/content/pages/post_categories'))
);
const DetailsCategoriesPage = Loader(
  lazy(() => import('src/content/pages/details_categories'))
);

const user = JSON.parse(localStorage.getItem('profile') || '{}');

const routes: RouteObject[] = [
  {
    path: '',
    element:
    Number(user?.role?.name) === 2 ? (
      <BaseLayout />
      ) : (
    <Navigate to="/status/404" replace />
    ),
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'danh-sach-lich-kham',
        element: <ListUserScheduleAppoimentPage />
      },
      {
        path: 'dat-lich-kham',
        element: <NewUserScheduleAppoimentPage />
      },
      {
        path: 'dich-vu/:id',
        element: <ServiceDetailsPage />
      },
      {
        path: 'thong-tin-ca-nhan',
        element: <UserProfilePage />
      }
    ]
  },
  {
    path: 'authen',
    element: <AuthenticarionPage />
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
    path: 'admin',
    element:
      Number(user?.role?.name) === 1 ? (
        <SidebarLayout />
      ) : (
        <Navigate to="/" replace />
      ),
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
        element: <DoctorFormPage />
      },
      {
        path: 'bac-si/tao-moi',
        element: <DoctorFormPage />
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
        path: 'lich-kham/cap-nhat/:id',
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
        path: 'danh-muc/chi-tiet-danh-muc/:name/:id',
        element: <DetailsCategoriesPage />
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
        path: 'chi-nhanh/cap-nhat-chi-nhanh/:id',
        element: <AddNewBranchPage />
      },
      {
        path: 'danh-muc-bai-dang',
        element: <PostCategoriesPage />
      },
      {
        path: 'bai-viet',
        element: <PostPage />
      },
      {
        path: 'bai-viet/tao-bai-viet',
        element: <AddNewPostPage />
      },
      {
        path: 'bai-viet/cap-nhat-bai-viet/:id',
        element: <AddNewPostPage />
      },
      {
        path: 'thong-tin-ca-nhan',
        element: <ProfilePage />
      }
    ]
  }
];
export default routes;
