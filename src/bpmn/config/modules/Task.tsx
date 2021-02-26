import {
  CommonGroupProperties,
  FormGroupProperties,
  DocumentGroupProperties,
  ExtensionGroupProperties,
  getElementTypeListenerProperties,
} from '../common';
import { GroupProperties } from '../index';
import PrefixLabelSelect from '../../../components/prefix-label-select';
import { ElOption } from 'element-plus';
import { ModdleElement } from '../../type';

const TASK_EVENT_OPTIONS = [
  { label: '创建', value: 'create' },
  { label: '签收', value: 'assignment' },
  { label: '完成', value: 'complete' },
  { label: '删除', value: 'delete' },
  { label: '全部', value: 'all' },
];

const TaskListenerProperties = getElementTypeListenerProperties({
  name: '任务监听器',
  eventOptions: TASK_EVENT_OPTIONS,
});

const USER_OPTIONS = [
  { label: '张三', value: '1' },
  { label: '李四', value: '2' },
  { label: '王五', value: '3' },
];
/**
 * 用户任务属性配置
 */
export const BpmnUserGroupProperties: GroupProperties = {
  name: '人员设置',
  icon: 'el-icon-user-solid',
  properties: {
    assignee: {
      component: PrefixLabelSelect,
      prefixTitle: '处理人',
      vSlots: {
        default: (): JSX.Element => {
          return USER_OPTIONS.map((item) => {
            return <ElOption {...item} />;
          });
        },
      },
    },
    candidateUsers: {
      component: PrefixLabelSelect,
      prefixTitle: '候选人',
      multiple: true,
      vSlots: {
        default: (): JSX.Element => {
          return USER_OPTIONS.map((item) => {
            return <ElOption {...item} />;
          });
        },
      },
    },
  },
};

const LOOP_OPTIONS = [
  { label: '无', value: 'Null' },
  { label: '并行多重事件', value: 'Parallel' },
  { label: '时序多重事件', value: 'Sequential' },
  { label: '循环事件', value: 'StandardLoop' },
];
/**
 * 任务的基本属性配置
 */
const BaseTaskProperties = {
  ...CommonGroupProperties,
  properties: {
    ...CommonGroupProperties.properties,
    loopCharacteristics: {
      component: PrefixLabelSelect,
      prefixTitle: '回路特性',
      vSlots: {
        default: (): JSX.Element => {
          return LOOP_OPTIONS.map((item) => {
            return <ElOption {...item} />;
          });
        },
      },
      getValue(businessObject: ModdleElement): string {
        const loopCharacteristics = businessObject.loopCharacteristics;
        if (!loopCharacteristics) {
          return 'Null';
        }

        if (loopCharacteristics.$type === 'bpmn:MultiInstanceLoopCharacteristics') {
          return loopCharacteristics.isSequential ? 'Sequential' : 'Parallel';
        } else {
          return 'StandardLoop';
        }
      },
    },
  },
};

const CommonGroupPropertiesArray = [
  BaseTaskProperties,
  FormGroupProperties,
  TaskListenerProperties,
  ExtensionGroupProperties,
  DocumentGroupProperties,
];

export default {
  //普通任务
  'bpmn:Task': CommonGroupPropertiesArray,
  //用户任务
  'bpmn:UserTask': [
    CommonGroupProperties,
    BpmnUserGroupProperties,
    TaskListenerProperties,
    FormGroupProperties,
    ExtensionGroupProperties,
    DocumentGroupProperties,
  ],
  //接收任务
  'bpmn:ReceiveTask': CommonGroupPropertiesArray,
  //发送任务
  'bpmn:SendTask': CommonGroupPropertiesArray,
  //手工任务
  'bpmn:ManualTask': CommonGroupPropertiesArray,
  //业务规则任务
  'bpmn:BusinessRuleTask': CommonGroupPropertiesArray,
  //服务任务
  'bpmn:ServiceTask': CommonGroupPropertiesArray,
  //脚本任务
  'bpmn:ScriptTask': CommonGroupPropertiesArray,
  //调用任务
  'bpmn:CallActivity': CommonGroupPropertiesArray,
};
