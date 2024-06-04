
export const passwordGenerated = () => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&/?¡¿"
  let password = ""
  for (let i = 0; i <= 12; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}


