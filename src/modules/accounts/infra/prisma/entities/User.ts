

export class User {
  id?: string;
  name!: string;
  email!: string;
  password!: string;
  driver_license!: string;
  isAdmin?: boolean;
  avatar?: string | null; 
  created_at?: Date;

  constructor() {}
}
