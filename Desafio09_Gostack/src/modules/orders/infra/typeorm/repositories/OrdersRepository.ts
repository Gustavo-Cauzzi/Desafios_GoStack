import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'], // 1
    });

    return order;
  }
}

export default OrdersRepository;

/*

  1 - Este relations vai trazer junto com o Order que buscamos, também todo os orders_products que estão relacionados com a
  order assim como o customer em questão.

  HÁ OUTRA FORMA DE FAZER ISTO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  -> eager: true

  D O C U M E N T A Ç Ã O: https://github.com/typeorm/typeorm/blob/master/docs/eager-and-lazy-relations.md#eager-relations

  O eager vai trazer todas as relações que a entity tem junto com ele automaticamente.
*/
