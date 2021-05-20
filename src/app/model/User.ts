import {News} from './News';

export class User{
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  favList: News[];

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = 'user';
    this.favList = [];
  }
}
