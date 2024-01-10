import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, branchSchema } from './schema';
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  styled
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import { IBranchsParamsProps } from 'src/interface/branchs';
import { toast } from 'react-toastify';
import BackDropComponent from 'src/components/BackDrop';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClientAPI } from 'src/api';
import Label from 'src/components/Label';
import { IDoctor } from 'src/interface/doctor';

const LableInput = styled(Typography)(() => `margin-bottom: 10px;`);
const GridItem = styled(Grid)(() => `gap: 10px`);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

interface IProps {
  branchId: string;
  doctorList: IDoctor[];
}
interface IRoomProps {
  id: number;
  name: string;
}

const CreateNewBranch = ({ branchId, doctorList }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listRoom, setListRoom] = useState<IRoomProps[]>([]);
  const [roomName, setRoomName] = useState('');
  const [errorsText, setErrorsText] = useState('');
  const [personName, setPersonName] = useState<string[]>([]);
  const [doctorSelectedList, setDoctorSelectedList] = useState<{
    [key: string]: IDoctor;
  }>();
  const [listIdDoctor, setListIdDoctor] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IBranchsParamsProps, IBranchsParamsProps>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(branchSchema) as any
  });

  const handleAddNewRoom = () => {
    if (!roomName) {
      setErrorsText('Không được để trống tên phòng');
      return;
    } else {
      setRoomName('');
      setErrorsText('');
      const data = {
        id: listRoom.length,
        name: roomName
      };
      setListRoom([...listRoom, data]);
    }
  };

  const handleSelectedDoctor = (data: IDoctor) => {
    const isduplicate = listIdDoctor.some((id) => id === data.id);
    if (isduplicate) {
      delete doctorSelectedList[data.id];
      const reNewListId = listIdDoctor.filter((id) => id !== data.id);
      setListIdDoctor(reNewListId);
    } else {
      setListIdDoctor([...listIdDoctor, data.id]);
      setDoctorSelectedList({
        ...doctorSelectedList,
        [data.id]: data
      });
    }
  };

  const handleSubmission = async (data: IBranchsParamsProps) => {
    if (listRoom.length === 0) {
      setErrorsText('Không được để trống danh sách phòng');
    } else {
      setIsLoading(true);
      try {
        const roomList = listRoom.map((item) => {
          return {
            name: item.name
          };
        });
        const params = {
          ...data,
          branch_room: roomList
        };
        if (branchId) {
          await ClientAPI.update(`/dental/branches/${branchId}/`, params);
        } else {
          await ClientAPI.add(`/dental/branches/`, params);
        }
        toast.success(
          branchId
            ? 'Cập nhật chi nhánh thành công!'
            : 'Thêm chi nhánh thành công!'
        );
        navigate('/admin/chi-nhanh/');
      } catch (error) {
        toast.error(
          branchId ? 'Lỗi cập nhật chi nhánh!' : 'Lỗi thêm chi nhánh!'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGetDetails = async () => {
    try {
      const res = await ClientAPI.getDetails(`/dental/branches/${branchId}/`);
      const { name, phone, address } = res.data;
      setValue('address', address);
      setValue('name', name);
      setValue('phone', phone);
    } catch (error) {
      toast.error('Lỗi lấy thông tin chi nhánh chi tiết!');
    }
  };

  useEffect(() => {
    if (branchId) {
      handleGetDetails();
    }
  }, [branchId]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={2}>
          <GridItem item xs={12} sm={6}>
            <LableInput>Tên chi nhánh</LableInput>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập tên chi nhánh"
                  error={!!errors.name}
                  helperText={errors.name?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem
            item
            xs={12}
            sm={6}
            sx={{
              gap: '10px'
            }}
          >
            <LableInput>Số điện thoại</LableInput>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập số điện thoại"
                  error={!!errors.phone}
                  helperText={errors.phone?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem item xs={12} sm={6}>
            <LableInput>Chọn bác sĩ</LableInput>
            <FormControl sx={{ width: '100%' }}>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {doctorList.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                    onClick={() => handleSelectedDoctor(item)}
                  >
                    <Checkbox checked={personName.indexOf(item.name) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem item xs={12} sm={6}>
            <LableInput>Địa chỉ</LableInput>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập địa chỉ"
                  error={!!errors.address}
                  helperText={errors.address?.message || ''}
                />
              )}
            />
          </GridItem>

          <GridItem item xs={12}>
            <LableInput>Danh sách phòng</LableInput>
            <Stack
              direction={'row'}
              sx={{
                flexWrap: 'wrap',
                mb: 1
              }}
            >
              {listRoom.map((item, key) => (
                <Box
                  key={key}
                  sx={{
                    maxWidth: 200,
                    my: 1,
                    mx: 0.5
                  }}
                >
                  <Label color={'primary'}>{item.name}</Label>
                </Box>
              ))}
            </Stack>
            <Stack
              direction={'row'}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              spacing={2}
            >
              <TextField
                fullWidth
                placeholder="Nhập tên phòng"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Button
                sx={{
                  width: 200
                }}
                type="button"
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<AddIcon />}
                onClick={() => handleAddNewRoom()}
              >
                <Typography noWrap>Thêm phòng</Typography>
              </Button>
            </Stack>
            {errorsText && (
              <Typography
                sx={{
                  color: 'red',
                  fontSize: 13,
                  mt: 1
                }}
              >
                <b>{errorsText}</b>
              </Typography>
            )}
          </GridItem>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              maxWidth: '60%',
              margin: 'auto',
              padding: '10px',
              marginTop: 3
            }}
          >
            Lưu thông tin
          </Button>
        </Grid>
      </form>
      <BackDropComponent open={isLoading} />
    </>
  );
};

export default CreateNewBranch;
