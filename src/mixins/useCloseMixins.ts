import {
  ref,
  watch,
  defineProps,
  defineEmits,
  withDefaults,
  toRefs,
  Ref
} from 'vue'

interface UseCloseInteraface {
  modelValue: boolean
}
export default (
  props: UseCloseInteraface,
  emit: (id: string, payload: boolean) => void
): { open: Ref<boolean> } => {
  // define props and emits

  const open = ref<boolean>(props.modelValue)

  return { open }
}
