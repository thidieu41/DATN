import {
  Box,
  IconButton,
  Popover,
  Stack,
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
import { useState } from 'react';

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

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [branchId, setBranchId] = useState('');

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setBranchId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setBranchId('');
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
          <TableRow hover key={item.id}>
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
              <Typography
                noWrap
                sx={{
                  maxWidth: 150,
                  textOverflow: 'ellipsis'
                }}
              >
                {item.address}
              </Typography>
            </TableCell>

            <TableCell>
              {item.branch_room.length === 0 ? (
                <Typography>Không có phòng</Typography>
              ) : (
                <Box>
                  <Typography
                    onMouseEnter={(e) => handlePopoverOpen(e, item.id)}
                    onMouseLeave={handlePopoverClose}
                  >
                    Danh sách phòng
                  </Typography>
                  <Popover
                    sx={{
                      pointerEvents: 'none'
                    }}
                    open={branchId === item.id}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handlePopoverClose}
                  >
                    <Stack
                      sx={{
                        maxHeight: 300,
                        overflow: 'scroll'
                      }}
                    >
                      {new Array(1000).fill(0).map((room, index) => (
                        <Typography key={index} sx={{ p: 1, minWidth: 100 }}>
                          {/* {room.name} */}
                          00000
                        </Typography>
                      ))}
                    </Stack>
                  </Popover>
                </Box>
              )}
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
