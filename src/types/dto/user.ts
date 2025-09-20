import { User } from '@/generated/prisma'

export type UserDTO = Omit<User, 'password'>
