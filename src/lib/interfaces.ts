export interface Issue {
  id: string;
  title: string;
  body: string;
  status: string;
  userId: string;
  imageUrl: string;
  videoUrl: string;
  serviceId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  status: string;
  userId: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
