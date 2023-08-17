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

export type UserRole = "ADMIN" | "USER";
