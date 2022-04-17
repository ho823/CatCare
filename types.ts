export interface IAnimal {
  id: number,
  name: string,
  age: number,
  weight: number,
  sex: string,
  race: string,
  animalId: number
}

export interface IVaccine {
  id: number,
  name: string,
  description: string,
  date: string,
  animalId: number
}

export interface IMeds {
  id: number,
  name: string,
  duration: number,
  date: string,
  animalId: number
}

export interface IHistorical {
  id: number,
  date: string,
  description: string,
  animalId: number
}