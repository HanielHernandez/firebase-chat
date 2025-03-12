export default (defaultValue: boolean) => {
  return {
    type: Boolean,
    default: () => defaultValue
  }
}
