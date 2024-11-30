import { Op } from 'sequelize'
import { differenceInDays } from 'date-fns'
import Vehicle from './vehicle.model'
import { ResultPromise } from '../../types/common.types'
import type Express from 'express'
import { getErrorMessageFromSequelize } from '../../utils/getErrorMessageFromSequelize'
import { ValidationError } from 'sequelize'
import { ERROR_PREFIXES } from '../../constants/errorPrefixes'


export const VehicleService = {
  getAllVehicles: async (req: Express.Request, res: Express.Response) => {
    try {
      const vehicles = await Vehicle.findAll()
      return res.send(vehicles)
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.getAllVehicles', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error fetching vehicles`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },

  getVehicleById: async (req: Express.Request, res: Express.Response) => {
    try {
      const { id } = req.params
      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return res
          .status(404)
          .send({ message: `${ERROR_PREFIXES.VEHICLE} Vehicle not found` })
      }

      return res.send(vehicle)
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.getVehicleById', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error fetching vehicle`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },

  createVehicle: async (req: Express.Request, res: Express.Response) => {
    try {
      const newVehicle = req.body
      const createdVehicle = await Vehicle.create(newVehicle)
      return res.status(201).send(createdVehicle)
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.createVehicle', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error creating vehicle`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },

  updateVehicle: async (req: Express.Request, res: Express.Response) => {
    try {
      const { id } = req.params
      const updates = req.body

      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return res
          .status(404)
          .send({ message: `${ERROR_PREFIXES.VEHICLE} Vehicle not found` })
      }

      await vehicle.update(updates)
      return res.send(vehicle)
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.updateVehicle', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error updating vehicle`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },

  deleteVehicle: async (req: Express.Request, res: Express.Response) => {
    try {
      const { id } = req.params

      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return res
          .status(404)
          .send({ message: `${ERROR_PREFIXES.VEHICLE} Vehicle not found` })
      }

      await vehicle.destroy()
      return res.status(204).send({ message: `Succesfully deleted.` })
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.deleteVehicle', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error deleting vehicle`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },

  getInspectionDays: async (req: Express.Request, res: Express.Response) => {
    try {
      const { id } = req.params
      const vehicle = await Vehicle.findByPk(id)

      if (!vehicle) {
        return res.status(404).send({ message: `${ERROR_PREFIXES.VEHICLE} Vehicle not found` })
      }

      const inspectionExpiry = vehicle.getDataValue('inspectionExpiry')
      if (!inspectionExpiry) {
        return res.status(400).send({ message: `${ERROR_PREFIXES.VEHICLE} Inspection expiry date not found` })
      }

      const today = new Date()
      const expiryDate = new Date(inspectionExpiry)
      const daysDifference = differenceInDays(expiryDate, today)

      let message
      if (daysDifference >= 0) {
        message = `There are ${daysDifference} days left until the inspection expires`
      } else {
        message = `The inspection expired ${Math.abs(daysDifference)} days ago`
      }

      return res.send({ message, daysDifference })
    } catch (error: ValidationError | any) {
      console.error('[VEHICLE_ERROR]VehicleService.getInspectionDays', error)
      return res
        .status(400)
        .send(
          getErrorMessageFromSequelize(
            error,
            `Error fetching inspection days`,
            ERROR_PREFIXES.VEHICLE
          )
        )
    }
  },
}
