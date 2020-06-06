import { Request, Response } from 'express';
import knex from '../database/connection';

const PointsController = {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const insertedIds = await trx('points').insert({
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const point_id = insertedIds[0]

    const point_items = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx('point_items').insert(point_items);
    await trx.commit()

    return response.json({ success: true });
  },
};

export default PointsController;
