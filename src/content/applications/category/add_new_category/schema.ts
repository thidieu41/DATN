// ...

import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
  branch: Yup.string().required('Không được để trống chi nhánh')
});

export const defaultValues = {
  name: 'Chỉnh Nha',
  type: 'Niêng răng vô hình invisalign',
  branch: ''
};

export interface IFormValue {
  name: string;
  type: string;
  branch: string;
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
