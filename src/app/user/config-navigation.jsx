import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Book',
    path: '/user/product',
    icon: icon('ic_book'),
  },
  {
    title: 'Rented book',
    path: '/user/rented',
    icon: icon('ic_book'),
  },
];

export default navConfig;
