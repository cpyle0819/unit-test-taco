import { Food } from "../food/food";
import { FoodService } from "../food/food.service";

export enum TacoShellType {
    hard = 'hard',
    soft = 'soft'
}

export class Taco extends Food {
    readonly fillings: Food[] = []; 

    constructor(
        private readonly foodService: FoodService,
        private readonly shell: TacoShellType = TacoShellType.hard
    ) {
        super();
        this.validateShell(this.shell);
    }

    async fillWith(food: Food) {
        if(!(food instanceof Food)) {
            throw new TypeError(`Expected "${food}" to be instance of Food.`);
        }

        if (!(await this.foodService.hasFoodsAvailable([food]))) {
            throw new Error(`Uh oh, the food service is all out of ${food.constructor.name}!`);
        }

        this.fillings.push(food);
    }

    private validateShell(shell: string) {
        if (shell && !TacoShellType[shell]) {
            throw new TypeError(`Value "${shell}" must be of type TacoShellType`)
        }
    }
}