import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { locationValidationSchema } from 'validationSchema/locations';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getLocations();
    case 'POST':
      return createLocation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLocations() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.location
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'location'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createLocation() {
    await locationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.petrol_station?.length > 0) {
      const create_petrol_station = body.petrol_station;
      body.petrol_station = {
        create: create_petrol_station,
      };
    } else {
      delete body.petrol_station;
    }
    if (body?.restaurant?.length > 0) {
      const create_restaurant = body.restaurant;
      body.restaurant = {
        create: create_restaurant,
      };
    } else {
      delete body.restaurant;
    }
    if (body?.traffic?.length > 0) {
      const create_traffic = body.traffic;
      body.traffic = {
        create: create_traffic,
      };
    } else {
      delete body.traffic;
    }
    if (body?.vehicle?.length > 0) {
      const create_vehicle = body.vehicle;
      body.vehicle = {
        create: create_vehicle,
      };
    } else {
      delete body.vehicle;
    }
    const data = await prisma.location.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
