export const transformColor = (name: string) => {
  return {
    admin: 'green.400',
    estudante: 'blue.400',
    professor: 'yellow.400',
    secretaria: 'red.400',
  }[name]
}
