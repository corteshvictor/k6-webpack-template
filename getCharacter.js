import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 2 },
    { duration: '20s', target: 2 },
    { duration: '20s', target: 0 },
  ],
};

export default function() {
  let res = http.get('https://rickandmortyapi.com/api/character/2');
  check(res, { 'status was 200': r => r.status == 200 });
  sleep(1);
}