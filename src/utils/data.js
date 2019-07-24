const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/v3/trader"
    : "https://api-wexer.herokuapp.com/v3/trader";

export { apiUrl };
