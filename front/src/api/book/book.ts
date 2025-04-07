import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetBookList = '/book',
  // GetAllMenu = '/menu',
  // GetActiveMenu = '/menu/active',
  // CreateMenu = '/menu',
  // UpdateMenu = '/menu',
}

export const getBookList = (params) => {
  return defHttp.get({ url: Api.GetBookList, params });
};

// export const getAllMenu = ()=>{
//   return defHttp.get({url: Api.GetAllMenu});
// }
// export const getActiveMenu = ()=>{
//   return defHttp.get({url: Api.GetActiveMenu});
// }

// export const createMenu = (data)=>{
//   return defHttp.post({url: Api.CreateMenu, data});
// }

// export const updateMenu = (data)=>{
//   return defHttp.put({url: Api.UpdateMenu, data});
// }