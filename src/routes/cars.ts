import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createCarZSchema}  from '../models/cars';
import { updateCarZSchema } from '../models/cars';
import { carParamsSchema } from '../models/cars';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', validate(carParamsSchema), carController.getCarById);
router.post('/', validate(createCarZSchema), carController.createCar);
router.put('/:id', authenticateKey, validate(updateCarZSchema),carController.updateCar);
router.delete('/:id', authenticateKey, validate(carParamsSchema), carController.deleteCar);

export default router;
