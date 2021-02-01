import { FieldDefine } from '../../components/dynamic-binder';
/**
 * 属性Map接口
 */
export interface PropertiesMap<T> {
  [key: string]: T;
}

/**
 * 组属性（属性分组）
 */
export interface GroupProperties {
  name?: string;
  icon?: string;
  properties: PropertiesMap<FieldDefine>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const modules = import.meta.glob('./modules/*.tsx');
const getBpmnGroupPropertisConfig = () => {
  const BpmnGroupPropertisConfig: PropertiesMap<Array<GroupProperties>> = {};
  for (const path in modules) {
    modules[path]().then((mod: any) => {
      const moduleDefuatlExport = mod.default;
      for (const moduleKey in moduleDefuatlExport) {
        BpmnGroupPropertisConfig[moduleKey] = moduleDefuatlExport[moduleKey];
      }
    });
  }
  return BpmnGroupPropertisConfig;
};

export default getBpmnGroupPropertisConfig();
