import { unref } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { getBookList } from '/@/api/book/book';

export const searchList = async (params) => {
  const { title, author,page = 1, pageSize = 20 }: any = params;
  let p: any = { page, pageSize };
  if (title) {
    p.title = title;
  } else {
    p.title = '';
  }

  if (author) {
    p.author = author;
  } else {
    p.author = '';
  }

  const { data, count} = await getBookList(p);

  const result: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    result.push({
      id: item.id,
      title: item.title,
      description: [item.categoryText, item.language],
      content: item.author,
      time: item.publisher,
      cover: item.cover,
    });
  }
  return {
    data:result,
    count
  };
};

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '图书名称',
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'author',
    component: 'Input',
    label: '图书作者',
    colProps: {
      span: 8,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log(e);
      },
    },
  },
];
