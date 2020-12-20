import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { rng } from '../utils/math.js';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 280 },
    { duration: '5m', target: 280 },
  ],
  thresholds: {
    errors: ['rate<0.01'],
    http_req_duration: ['p(90) < 500'],
  },
};

export default function () {
  const res = http.get(`http://localhost:3000/photos/${rng(1, 335000)}/00${rng(1, 3)}`);

  const result = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  errorRate.add(!result);

  sleep(1);
}
