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

interface Props {
  data: ICustomerProps[];
}

const CustomerTableRow = ({ data = [] }: Props) => {
  const theme = useTheme();

  const onNavigationToDetails = (event, id: string) => {
    event.stopPropagation();
    console.log(id);
  };
  return (
    <TableBody>
      {data.map((item) => {
        return (
          <TableRow
            hover
            key={item.id}
            onClick={(e) => onNavigationToDetails(e, item.id)}
            sx={{
              cursor: 'pointer'
            }}
          >
            <TableCell>
              <Typography noWrap>{item.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                noWrap
              >
                <Typography variant="body2" noWrap>
                  {/* {format(item.date, 'MMMM dd yyyy')} */}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.phone}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography noWrap>{/* {item.role} */}</Typography>
            </TableCell>
            <TableCell align="right">{/* {item.degree} */}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CustomerTableRow;
