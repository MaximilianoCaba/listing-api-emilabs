export interface User {
  subsidiaryId: number
}

export interface UserAuth {
  user: User
  authorities: string[]
}