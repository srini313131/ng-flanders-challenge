export interface Owner {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  pets?: Pet[];
}

interface Pet {
  name: string;
  type: 'Cat' | 'Dog' | 'Fish';
}
