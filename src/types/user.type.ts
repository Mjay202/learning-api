
export type UserRecord = {
  id: string;
  email: string;
  user_type: 'Admin' | 'Teacher' | 'Student'; 
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserLoginCredentials = {
  id: string;
  email: string;
  user_type: 'Admin' | 'Teacher' | 'Student';
  password: string;
};