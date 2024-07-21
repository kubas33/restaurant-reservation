import bcrypt from 'bcrypt';
import { ICreateUser } from 'interfaces/user.interface';

export const userSeed : ICreateUser[] = [
  {
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Administrator',
  },
  {
    email: 'matteo@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Matteo',
  },
  {
    email: 'titus@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Titus',
  },
  {
    email: 'diamond@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Diamond',
  },
  {
    email: 'ivy@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Ivy',
  },
  {
    email: 'diana@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Dianna',
  },
  {
    email: 'gwen@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Gwen',
  },
  {
    email: 'emmalee@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Emmalee',
  },
  {
    email: 'angeline@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Angeline',
  },
  {
    email: 'josephine@gmail.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Josephine',
  },
];
