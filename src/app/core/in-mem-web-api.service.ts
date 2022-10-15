import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';


export class InMemWebApiService implements InMemoryDbService {
  createDb() {
    const user: User[] = [
      {
        id: 1,
        userid: 'TestUser'
        }
    ];

    return {
      user,
    };
  }
}
