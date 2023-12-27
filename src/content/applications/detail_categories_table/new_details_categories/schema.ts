// ...

import dayjs from 'dayjs';
import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  branch: Yup.string().required('Không được để trống chi nhánh'),
  name_category: Yup.string().required('Không được để trống tên danh mục'),
  category: Yup.string().required('Không được để trống thể loại'),
  name: Yup.string().required('Không được để trống tên danh sách'),
  price: Yup.string().required('Không được để trống giá'),
  sale_price: Yup.string().required('Không được để trống giá khuyến mãi')
});

export const defaultValues = {
  name_category: '',
  category: '',
  branch: '',
  name: '',
  fromdate: dayjs(new Date()).format('DD/MM/YYYY'),
  todate: dayjs(new Date()).format('DD/MM/YYYY'),
  price: '',
  sale_price: ''
};

export interface IFormValue {
  name_category: string;
  category: string;
  branch: string;
  name: string;
  fromdate: string;
  todate: string;
  price: string;
  sale_price: string;
}

export const CategoryData = {
  'Chỉnh Nha': {
    listType: [
      { name: 'Niêng răng vô hình invisalign' },
      { name: 'Mắc cài sứ tự buộc' },
      { name: 'Mắc cài pha lê' },
      { name: 'Mắc cài thép tự buộc' },
      { name: 'Mắc cài thép 6 cánh' }
    ]
  },
  'Răng Sứ': {
    listType: [
      { name: 'Răng sứ Lava 3M' },
      { name: 'Răng sứ Ceramill' },
      { name: 'Răng sứ Cercon' },
      { name: 'Răng sứ Katana' },
      { name: 'Răng sứ Zirconia' },
      { name: 'Răng sứ Emax' },
      { name: 'Răng sứ Venus' },
      { name: 'Răng sứ Veneer' }
    ]
  },
  Implant: {
    listType: [
      { name: 'Implant Thuỵ Sĩ' },
      { name: 'Implant Pháp' },
      { name: 'Implant Hàn Quốc' }
    ]
  },
  'Bệnh lý': {
    listType: [
      { name: 'Nhổ răng khôn' },
      { name: 'Cắt phanh môi/lưỡi' },
      { name: 'Loạn năng khớp thái dương hàm' },
      { name: 'Điều trị viêm lợi' },
      { name: 'Điều trị tuỷ răng' },
      { name: 'Hàn răng sâu' },
      { name: 'Tẩy trắng răng' },
      { name: 'Trám răng' }
    ]
  }
};
