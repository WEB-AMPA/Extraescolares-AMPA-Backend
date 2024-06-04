export const codeGenerated = () => {
  const characters = "1234567890"
  let password = ""
  for (let i = 0; i <= 6; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}
