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
import { IBrachProps } from 'src/interface/branchs';
import { useNavigate } from 'react-router';

interface Props {
  data: IBrachProps[];
  handleRemoveBranch: (id: string) => void;
}

const BranchTableRow = ({ data = [], handleRemoveBranch }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const onNavigationToDetails = (
    event: React.SyntheticEvent<EventTarget>,
    id: string
  ) => {
    event.stopPropagation();
    navigate(`/admin/chi-nhanh/cap-nhat-chi-nhanh/${id}`);
  };

  const onRemoveBranch = (
    event: React.SyntheticEvent<EventTarget>,
    id: string
  ) => {
    event.stopPropagation();
    handleRemoveBranch(id);
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
              <Typography noWrap>{item.id}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap>{item.phone}</Typography>
            </TableCell>
            <TableCell>
              <Typography color="text.primary" noWrap>
                {item.address}
              </Typography>
            </TableCell>

            <TableCell>
              <Typography color="text.primary" noWrap>
                P101 - P102 - P03
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Sửa" arrow>
                <IconButton
                  onClick={(e) => onNavigationToDetails(e, item.id)}
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <EditTwoToneIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xoá" arrow>
                <IconButton
                  onClick={(e) => onRemoveBranch(e, item.id)}
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

export default BranchTableRow;
