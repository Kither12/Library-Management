import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'product',
    path: '/user/product',
    icon: icon('ic_book'),
  },
];

export default navConfig;
