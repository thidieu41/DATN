import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { ICustomerProps } from './constant';
import dayjs from 'dayjs';

interface Props {
  data: ICustomerProps[];
}

const CustomerTableRow = ({ data = [] }: Props) => {
  return (
    <TableBody>
      {data.map((item) => {
        return (
          <TableRow hover key={item.id}>
            <TableCell>
              <Typography noWrap>{item.id}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.name || '___'}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" noWrap>
                {dayjs(item.date).format('DD/MM/YYYY')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.phone}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.email}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CustomerTableRow;
