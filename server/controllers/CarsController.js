import { Auth0Provider } from "@bcwdev/auth0provider"
import { carsService } from "../services/CarsService.js"
import BaseController from "../utils/BaseController.js"

export class CarsController extends BaseController {

  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCar)
      // NO KNIGHT GETS BELOW THIS LINE WITHOUT GOING THROUGH THIS CHECKPOINT
      .use(Auth0Provider.getAuthorizedUserInfo) // MIDDLEWARE are you logged in
      .post('', this.manufactureCar)
      .put('/:id', this.editCar)
      .delete('/:carId', this.removeCar)
    // http://localhost:3000/api/cars/:carId
    // http://localhost:3000/api/cars/pokemon
  }


  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCar(req, res, next) {
    try {
      const car = await carsService.getCar(req.params.carId)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async manufactureCar(knightInShiningArmor, res, next) {
    try {
      const formData = knightInShiningArmor.body

      // REVIEW SUPER IMPORTANT
      // NEVER TRUST THE USER KNIGHT FORMDATA FOR THE OWNER/CREATOR/SELLER/WHATEVER ID
      // GET IT FROM AUTH0 INSTEAD

      formData.sellerId = knightInShiningArmor.userInfo.id

      const car = await carsService.manufactureCar(formData)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(req.body, req.userInfo)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async removeCar(req, res, next) {
    try {
      await carsService.removeCar(req.params.carId, req.userInfo)
      res.send('delete car')
    } catch (error) {
      next(error)
    }
  }

}
