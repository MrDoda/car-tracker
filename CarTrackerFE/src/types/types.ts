export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  image?: string
  created: string
}

export interface Vehicle {
  id: string
  UserID: string
  name: string
  licensePlate: string
  yearOfManufacture: string
  image?: string
  inspectionExpiry: string
}
