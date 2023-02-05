export interface Service {
  icon: string;
  name: string;
}

export interface GymComplex {
  code: string;
  name: string;
  address: string;
  telephone: string;
  website: string;
  services: Service[];
  explanation: string;
  score: number;
  rules: string;
}
