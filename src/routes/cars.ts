import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', carController.getCarById);
router.post('/', authenticateKey, carController.createCar);
router.put('/:id', authenticateKey, carController.updateCar);
router.delete('/:id', authenticateKey, carController.deleteCar);

export default router;
