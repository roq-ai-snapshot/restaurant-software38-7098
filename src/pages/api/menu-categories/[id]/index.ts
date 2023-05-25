import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menuCategoriesValidationSchema } from 'validationSchema/menu-categories';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenuCategoriesById();
    case 'PUT':
      return updateMenuCategoriesById();
    case 'DELETE':
      return deleteMenuCategoriesById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenuCategoriesById() {
    const data = await prisma.menu_categories.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateMenuCategoriesById() {
    await menuCategoriesValidationSchema.validate(req.body);
    const data = await prisma.menu_categories.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMenuCategoriesById() {
    const data = await prisma.menu_categories.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
