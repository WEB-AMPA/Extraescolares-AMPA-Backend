
export const passwordGenerated = () => {
  const characters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&/?¡¿"
  let password = ""
  for (let i = 0; i <= 12; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}