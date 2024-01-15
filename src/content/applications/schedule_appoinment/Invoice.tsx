import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Transition } from 'src/components/Transition';
import { IScheduleProps } from 'src/interface/booking';
import { Divider, Stack, Typography } from '@mui/material';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

interface IProps {
  open: boolean;
  detailsInvoice: IScheduleProps;
  handleClose: () => void;
}

const ScheduleAppoinmentInvoice = ({
  open,
  handleClose,
  detailsInvoice
}: IProps) => {
  const handleDownloadInvoice = () => {
    const source = window.document.getElementsByClassName('invoice') as any;
    toPng(source[0]).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      const pdf = new jsPDF('l', 'px', 'a3');
      pdf.addImage(dataUrl, 'SVG', 0, 0);
      pdf.save(`${detailsInvoice?.booking_name || 'invoice'}.pdf`);
      handleClose();
    });
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="invoice">
        <DialogTitle>Hoá đơn Nha khoa Thanh Sơn</DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              minWidth: 300
            }}
          >
            <Stack>
              <Typography>
                Chi Nhánh : {detailsInvoice?.room?.branch?.name}
              </Typography>
              <Typography>
                Địa chỉ : {detailsInvoice?.room?.branch?.address}
              </Typography>
            </Stack>
            <Divider />
            <Stack>
              <Typography>
                Tên người : {detailsInvoice?.booking_name}{' '}
              </Typography>
              <Typography>Số điện thoại : {detailsInvoice?.phone} </Typography>
            </Stack>
            <Stack>
              <Typography>
                Tên dịch vụ : {detailsInvoice?.item?.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600
                }}
              >
                Tiền dịch vụ : {detailsInvoice?.item?.price || 0} (VND)
              </Typography>
            </Stack>
            <Divider />
            <Stack>
              <Typography>Tổng người : {detailsInvoice?.quantity}</Typography>
              <Typography
                sx={{
                  fontWeight: 600
                }}
              >
                Tổng tiền :{' '}
                {Number(detailsInvoice?.item?.price || 0) *
                  Number(detailsInvoice?.quantity || 0)}
                (VND)
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      </div>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleDownloadInvoice}>Xuất hoá đơn</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleAppoinmentInvoice;
