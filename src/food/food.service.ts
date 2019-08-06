import { Food } from "./food";
import { Beef } from "../beef/beef";

export class FoodService {
    availableFoods: Function[] = [Beef];

    async hasFoodsAvailable(foods: Food[]) {
        return foods.every(food => {
            return this.availableFoods.some(availableFood => food.constructor.name === availableFood.name);
        });
    }
}