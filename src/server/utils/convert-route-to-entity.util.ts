const mapping: Record<string, string> = {
  locations: 'location',
  'petrol-stations': 'petrol_station',
  restaurants: 'restaurant',
  startups: 'startup',
  traffic: 'traffic',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
