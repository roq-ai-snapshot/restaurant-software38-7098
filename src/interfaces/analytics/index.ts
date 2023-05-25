import { RestaurantsInterface } from 'interfaces/restaurants';

export interface AnalyticsInterface {
  id?: string;
  restaurant_id?: string;
  report_type: string;
  data: string;

  restaurants?: RestaurantsInterface;
}
