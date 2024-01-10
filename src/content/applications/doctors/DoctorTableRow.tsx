import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';
import { IDoctor } from 'src/interface/doctor';
import dayjs from 'dayjs';

interface Props {
  data: IDoctor[];
  handleSetPagination: (id: string) => void;
}

const DoctorTableRow = ({ data = [], handleSetPagination }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const onNavigationToDetails = (event, id: string) => {
    event.stopPropagation();
    navigate(`/admin/bac-si/cap-nhat/${id}`);
  };

  const handleRemoveDoctor = (event, id: string) => {
    event.stopPropagation();
    handleSetPagination(id);
  };
  return (
    <TableBody>
      {data.map((item) => {
        return (
          <TableRow hover key={item.id}>
            <TableCell>
              <Typography noWrap>{item.id}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  maxWidth: 150,
                  textOverflow: 'ellipsis'
                }}
              >
                {item.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" noWrap>
                {dayjs(item.DoB).format('DD/MM/YYYY')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.phone}</Typography>
            </TableCell>
            <TableCell>
              <Typography
                noWrap
                sx={{
                  maxWidth: 150,
                  textOverflow: 'ellipsis'
                }}
              >
                {item.email}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>0</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.position}</Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{
                  maxWidth: 150,
                  textOverflow: 'ellipsis'
                }}
                noWrap
              >
                {item.degree_infor || '____'}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Sửa" arrow>
                <IconButton
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                  onClick={(e) => onNavigationToDetails(e, item.id)}
                >
                  <EditTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xoá" arrow>
                <IconButton
                  onClick={(e) => handleRemoveDoctor(e, item.id)}
                  sx={{
                    '&:hover': { background: theme.colors.error.lighter },
                    color: theme.palette.error.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default DoctorTableRow;
