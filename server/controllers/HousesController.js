import { Auth0Provider } from "@bcwdev/auth0provider";
import { houseService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";



export class HousesController extends BaseController {

  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getCar)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .put('/:id', this.editHouse)
      .delete('/houseId', this.removeHouse)
  }
  async removeHouse(req, res, next) {
    try {
      await houseService.removeHouse(req.params.houseId, req.userInfo)
      res.send('removed house')
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await houseService.editHouse(req.body, req.userInfo)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }


  async createHouse(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const house = await houseService.createHouse(formData)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async getCar(req, res, next) {
    try {
      const house = await houseService.getHouse(req.params.houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async getHouses(req, res, next) {
    try {
      const houses = await houseService.getHouses()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }
}