import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getStaffMembersById();
    case 'PUT':
      return updateStaffMembersById();
    case 'DELETE':
      return deleteStaffMembersById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStaffMembersById() {
    const data = await prisma.staff_members.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateStaffMembersById() {
    await staffMembersValidationSchema.validate(req.body);
    const data = await prisma.staff_members.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteStaffMembersById() {
    const data = await prisma.staff_members.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
