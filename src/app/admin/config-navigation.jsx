import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'book',
    path: '/admin/product',
    icon: icon('ic_book'),
  },
  {
    title: 'rented',  
    path: '/admin/rent',
    icon: icon('ic_lock'),
  },
  {
    title: 'config',
    path: '/admin/config',
    icon: icon('ic_disabled'),
  },
  {
    title: 'fine',
    path: '/admin/fine',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
