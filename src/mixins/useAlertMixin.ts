import { type Ref, ref } from '@vue/runtime-dom'

interface AlertMixin {
  message: Ref<{
    type: string
    message: string | null
  }>
}
export default (alertType: string): AlertMixin => {
  return {
    message: ref({
      type: alertType,
      message: null
    })
  }
}
