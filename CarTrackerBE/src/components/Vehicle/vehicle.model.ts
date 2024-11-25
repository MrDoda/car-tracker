import { Model, DataTypes } from 'sequelize'
import { Database } from '../../config/database'
import { isStringValidation } from '../../utils/isStringValidation'

class Vehicle extends Model {
  public id!: number
  public userId!: number
  public name!: string
  public licensePlate!: string
  public yearOfManufacture!: number
  public image!: Buffer | null
  public inspectionExpiry!: Date
}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [0, 255],
        isString: isStringValidation,
      },
    },
    licensePlate: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 50],
        isString: isStringValidation,
      },
    },
    yearOfManufacture: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1886, // Oldest cars
      },
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    inspectionExpiry: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    sequelize: Database.getInstance(),
    tableName: 'Vehicle',
    timestamps: false,
  }
)

export default Vehicle
