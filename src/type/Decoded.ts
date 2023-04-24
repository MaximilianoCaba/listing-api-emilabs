export interface User {
  subsidiaryId: number
}

export interface Decoded {
  user: User
  authorities: string[]
}