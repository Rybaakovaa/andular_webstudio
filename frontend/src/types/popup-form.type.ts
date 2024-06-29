export type PopupFormType = {
  title: string,
  comboBox?: {
    items: string[],
    active: string
  }
  inputs?: {
    type: string,
    placeholder: string
  }[],
  button: {
    text: string,
    type: string
  }
}
