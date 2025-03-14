import {
  ref,
 type Ref
} from 'vue'

interface UseCloseInteraface {
  modelValue: boolean
}
export default (
  props: UseCloseInteraface,

): { open: Ref<boolean> } => {
  // define props and emits

  const open = ref<boolean>(props.modelValue)

  return { open }
}
