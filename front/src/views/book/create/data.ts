import axios from 'axios';
import { FormSchema } from '/@/components/Form';
import { useGlobSetting } from '/@/hooks/setting';
import { getToken } from '/@/utils/auth';

const basicOptions: LabelValueOptions = [
  {
    label: 'EN',
    value: '1',
  },
  {
    label: 'CN',
    value: 'cn',
  },
];
const CategoryOptions: LabelValueOptions = [
  {
    label: 'Biomedicine',
    value: '12',
  },
  {
    label: 'BusinessandManagement',
    value: '13',
  },
  {
    label: 'EarthSciences',
    value: '14',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '书名',
    required: true,
  },
  {
    field: 'author',
    component: 'Input',
    label: '作者',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'publisher',
    component: 'Input',
    label: '出版社',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'language',
    component: 'Select',
    label: '语言',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 'categoryText',
    component: 'Select',
    label: '类别',
    required: true,
    componentProps: {
      options: CategoryOptions,
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'fileName',
    component: 'Input',
    label: '文件路径',
    componentProps: {
      disabled: true,
    },
    // required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'cover',
    component: 'Input',
    label: '封面路径',
    componentProps: {
      disabled: true,
    },
    // required: true,
    // colProps: {
    //   offset: 2,
    // },
  },

  {
    field: 'rootFile',
    component: 'Input',
    label: '根文件',
    componentProps: {
      disabled: true,
    },
    // required: true,
    colProps: {
      offset: 2,
    },
  },
];
export const taskSchemas = ({ setFieldsValue, contentData }): FormSchema[] => {
  return [
    {
      field: 'book',
      component: 'Upload',
      label: '电子书',
      required: true,
      componentProps: {
        maxSize: 5,
        maxNumber: 1,
        accept: ['epub'],
        api: (data) => {
          const formData = new FormData();
          formData.append('file', data.file);
          const globalSetting = useGlobSetting();
          const { apiUrl } = globalSetting;
          const requestUrl = `${apiUrl}/book/upload`;
          // console.log(data, apiUrl);
          return axios.post('http://localhost:3000/book/upload', formData, {
            headers: {
              'Content-Type': data.file.type,
              Authorization: `Bearer ${getToken()}`,
            },
          });
        },
        onChange(files) {
          console.log('11', files);
          // 获取解析后的数据格式
          if (!files || files.length < 1) {
            return;
          }
          console.log(files, 'filesfilesfilesfilesfilesfiles');
          const [file] = files;
          const { originalname } = file;
          const fileData = file.data;
          if (!fileData) {
            return;
          }
          const { title, creator, language, publisher, rootFile, cover, content } = fileData;
          setFieldsValue({
            title,
            author: creator,
            language,
            publisher,
            rootFile,
            cover,
            fileName: originalname,
          });
          contentData.value = content;
          console.log(contentData.value)
        },
      },
    },
  ];
};
