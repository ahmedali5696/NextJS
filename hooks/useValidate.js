import { useState } from "react"

export default function useValidate() {
  // const [emptyFild, setEmptyFild] = useState('')
  // const [theEmptyField, setTheEmptyField] = useState('')
  const [emptyFieldMsg, setEmptyFieldMsg] = useState('')


  function validateForm(form) {
    for (const input of form) {
      if (input.value === '') {
        return input.name.split('-').join(' ')
      }
    }
  }

  function checkEmptyFields(form) {
    if (validateForm(form) !== '') {
      const fieldName = validateForm(form)
      setEmptyFieldMsg('The ' + fieldName + ' field is required');

      return true
    } else {
      if (emptyFieldMsg !== '') {
        setEmptyFieldMsg('')
      }

      return false
    }
  }

  function clearForm(form) {
    const myForm = form

    for (const input of myForm) {
      if (input.value !== '') {
        input.value = ''
      }
    }
  }

  return [emptyFieldMsg, checkEmptyFields, clearForm]
}