import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];


export default function ColorPreview({ limit = 3, sx }) {
  const renderColors = PRODUCT_COLOR.slice(0, limit);

  const remainingColor = PRODUCT_COLOR.length - limit;

  return (
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
      {renderColors.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            bgcolor: color,
            borderRadius: '50%',
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
          }}
        />
      ))}

      {PRODUCT_COLOR.length > limit && (
        <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${remainingColor}`}</Box>
      )}
    </Stack>
  );
}

ColorPreview.propTypes = {
  limit: PropTypes.number,
  sx: PropTypes.object,
};
