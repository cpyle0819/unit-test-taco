import { Beef } from '../beef/beef';
import { FoodService } from '../food/food.service';
import { Sandwich } from '../sandwich/sandwich';

import { Taco, TacoShellType } from './taco';

describe('Taco', () => {
    let foodService: FoodService;
    let taco: Taco;

    beforeEach(() => {
        foodService = new FoodService();
        taco = new Taco(foodService);
    });

    it('should be easy to make', () => {
        expect(taco instanceof Taco).toBeTruthy();
    });

    it('should not be a sandwich', () => {
        expect(taco instanceof Sandwich).toBeFalsy();
    });

    it('should have a hard shell by default', () => {
        expect(taco).toHaveProperty('shell', 'hard');
    });

    it('can also be made with a soft shell', () => {
        taco = new Taco(foodService, TacoShellType.soft);
        
        expect(taco).toHaveProperty('shell', 'soft');
    });

    it('cannot be made with anything but a "hard" or "soft" shell', () => {
        expect(() => new Taco(foodService, 'pizza' as any)).toThrowError();
    });

    it('must be fillable', async () => {
        const beef = new Beef();

        await taco.fillWith(beef);

        expect(taco.fillings).toContain(beef);
    });

    it('should only be fillable with food', async () => {
        const beef = new Beef();
        const nails: any = 'nails';

        await expect(taco.fillWith(beef)).resolves.toBeUndefined();
        await expect(taco.fillWith(nails)).rejects.toBeInstanceOf(TypeError);
    });

    it('cannot be filled if a desired filling is depleted', async () => {
        const sandwich = new Sandwich();
        foodService.availableFoods = [];

        await expect(taco.fillWith(sandwich)).rejects.toBeDefined();
    });
});