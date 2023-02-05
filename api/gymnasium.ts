export interface Service {
  icon: string;
  name: string;
}

export interface Gymnasium {
  name: string;
  score: number;
  minCost: number;
  dimensions: string
  players_number: number
  limitations: string
  options: string[]
  services: Service[]
  rules: string[]
}
