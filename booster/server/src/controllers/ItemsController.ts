import { Request, Response } from 'express';
import knex from '../database/connection';

const ItemsController = {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.105:3333/${item.image}`,
      };
    })

    return response.json(serializedItems);
  },
};

export default ItemsController;
