import { Router } from 'express'
import { VehicleService } from './vehicle.service'

export const vehicleRouter = Router()

vehicleRouter.get('/', VehicleService.getAllVehicles)
vehicleRouter.get('/:id', VehicleService.getVehicleById)
vehicleRouter.post('/', VehicleService.createVehicle)
vehicleRouter.patch('/:id', VehicleService.updateVehicle)
vehicleRouter.delete('/:id', VehicleService.deleteVehicle)
