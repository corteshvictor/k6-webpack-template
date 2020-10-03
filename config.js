export default {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "20s", target: 100 },
    { duration: "20s", target: 0 },
  ],
  thresholds: {
    trend: [{ threshold: "p(95) <= 30000" }],
    rate: [{ threshold: "rate <= 0.01" }],
  },
};
