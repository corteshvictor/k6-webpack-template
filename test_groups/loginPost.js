import http from "k6/http";

export default function () {
  const url = "https://reqres.in/api/login";
  const params = {
    timeout: 1000000,
  };
  const body = {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  };

  const response = http.post(url, body, params);
  const duration = response.timings.duration;

  return { response, duration };
}
