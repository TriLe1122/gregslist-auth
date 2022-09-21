import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class HousesService {
  async removeHouse(id, userInfo) {
    const house = await this.getHouse(id)
    if (!house) {
      throw new BadRequest('invalid id')
    }

    if (userInfo.id != house.sellerId.toString()) {
      throw new Forbidden('this is not your house')
    }
    await dbContext.Houses.findByIdAndDelete(id)
    return house
  }
  async editHouse(houseData, userInfo) {
    const house = await this.getHouse(houseData.id)

    if (userInfo.id != house.sellerId.toString()) {
      throw new Forbidden('this isnt your pad')
    }

    house.bedrooms = houseData.bedrooms || house.bedrooms
    house.bathrooms = houseData.bathrooms || house.bathrooms
    house.levels = houseData.levels || house.levels
    house.imgUrl = houseData.imgUrl || house.imgUrl
    house.year = houseData.year || house.year
    house.price = houseData.price || house.price

    await house.save()

    return house

  }

  async createHouse(formData) {
    const house = await dbContext.Houses.create(formData)
    return house
  }

  async getHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('seller', 'name picture')
    if (!house) {
      throw new BadRequest('invalid house id')
    }
    return house
  }

  async getHouses() {
    const houses = await dbContext.Houses.find()

    return houses
  }

}

export const houseService = new HousesService()