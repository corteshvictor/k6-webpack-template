import { group, check, fail } from "k6";
import { Trend, Rate } from "k6/metrics";

import loginPost from "./test_groups/loginPost.js";
import getCharacter from "./test_groups/getCharacter.js";
import config from "./config.js";

export let rateErrors500 = new Rate("500 errors rate");
export let resTimeLoginPost = new Trend("Response time - Login Post");
export let rateErrorsLoginPost = new Rate("Errors rate - Login Post");
export let resTimeGetCharacter = new Trend("Response time - GET Character");
export let rateErrorsGetCharacter = new Rate("Errors rate - GET Character");

const {
  stages,
  thresholds: { trend, rate },
} = config;

export let options = {
  stages,
  thresholds: {
    "Response time - Login Post": trend,
    "Errors rate - Login Post": rate,
    "Response time - GET Character": trend,
    "Errors rate - GET Character": rate,
  },
};

export default function () {
  let token;

  group("1. Login Post", () => {
    const { response, duration } = loginPost();
    const testingIsGoingNice = response.status === 200;
    const body = response.body && JSON.parse(response.body);
    token = body && body.token;

    check(response, {
      "1. Login Post": () => testingIsGoingNice,
    });

    rateErrors500.add(response.status >= 500 && response.status <= 599);
    resTimeLoginPost.add(duration);
    rateErrorsLoginPost.add(!testingIsGoingNice);
  });

  if (token) {
    group("2. Get Character", () => {
      const { response, duration } = getCharacter();
      const testingIsGoingNice = (response.status = 200);

      check(response, {
        "2. Get Character": () => testingIsGoingNice,
      });

      rateErrors500.add(response.status >= 500 && response.status <= 599);
      resTimeGetCharacter.add(duration);
      rateErrorsGetCharacter.add(!testingIsGoingNice);
    });
  } else fail("Login failed");
}
