import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { petrolStationValidationSchema } from 'validationSchema/petrol-stations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.petrol_station
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPetrolStationById();
    case 'PUT':
      return updatePetrolStationById();
    case 'DELETE':
      return deletePetrolStationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPetrolStationById() {
    const data = await prisma.petrol_station.findFirst(convertQueryToPrismaUtil(req.query, 'petrol_station'));
    return res.status(200).json(data);
  }

  async function updatePetrolStationById() {
    await petrolStationValidationSchema.validate(req.body);
    const data = await prisma.petrol_station.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePetrolStationById() {
    const data = await prisma.petrol_station.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
