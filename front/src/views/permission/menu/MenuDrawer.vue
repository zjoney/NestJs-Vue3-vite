<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="getTitle" width="50%" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './menu.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { useMessage } from '/@/hooks/web/useMessage';
import { getMenuList } from '/@/api/demo/system';
import { createMenu, updateMenu } from '/@/api/sys/menu';

export default defineComponent({
  name: 'MenuDrawer',
  components: { BasicDrawer, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    let menuList;
    const { createMessage } = useMessage();
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: { lg: 12, md: 24 },
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record,
        });
      }
      const treeData = await getMenuList();
      menuList = treeData;
      updateSchema({
        field: 'parentMenu',
        componentProps: { treeData },
      });
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
    // 判断主菜单关闭，所以子菜单也关闭
    function checkAllChildrenMenuDisabled(updateMenu) {

      const id = updateMenu.id;
      let isAllClosed = true;
      // 查询二级菜单
      const subMenu = menuList.filter((item) => item.pid === id);
      subMenu.forEach((menu) => {
        if (+menu.active == 1) {
          isAllClosed = false;
          return;
        }
      });
      if (!isAllClosed) {
        return false;
      }
      // 查询三级菜单
      subMenu.forEach((menu) => {
        isAllClosed = checkAllChildrenMenuDisabled(menu)
        if (!isAllClosed) {
          return;
        }
      });
      return isAllClosed;
    }
    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        console.log(values, 'values +values');
        if (values.parentMenu) {
          values.pid = values.parentMenu
        } else {
          values.pid = 0
        }
        values.active = +values.active;// 重要
        delete values.parentMenu

        const isUpdateForm = unref(isUpdate)
        if (isUpdateForm) {
          const menu = menuList.find(item => item.name == values.name);
          values.id = menu.id
          const res = checkAllChildrenMenuDisabled(values)
          if (res) {
            try {
              await updateMenu({ data: values })
              createMessage.success('更新菜单成功')
            } catch (e) {
              console.log(e)
            }
          } else {
            createMessage.error('请禁用所有子菜单后，再禁用子菜单')
          }

        } else {
          try {
            await createMenu({ data: values })
            createMessage.success('新建菜单成功')
          } catch (e) {
            console.log(e)
          }
        }
        closeDrawer();
        emit('success');

      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return { registerDrawer, registerForm, getTitle, handleSubmit };
  },
});
</script>
