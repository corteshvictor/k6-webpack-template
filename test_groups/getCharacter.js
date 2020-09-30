import http from "k6/http";

export default function () {
  const url = "https://rickandmortyapi.com/api/character/2";
  const params = {
    timeout: 1000000,
  };
  const response = http.get(url, params);
  const duration = response.timings.duration;

  return { response, duration };
}
