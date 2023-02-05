export interface Complex {
  img: any;
  code: string;
  name: string;
  address: string;
}

export interface Service {
  icon: string;
  name: string;
}

export interface Athlete {
  name: string;
  birth: string;
  gender: string;
  address: string;
  phone: string;
  favoriteSports: Service[];
  image: string;
  bookmarks: Complex[];
}
