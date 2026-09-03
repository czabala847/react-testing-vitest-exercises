import AxiosMockAdapter from "axios-mock-adapter"
import { describe, test } from "vitest"
import { herosDataMock } from "../../../test/hero-data-mock"
import { heroApi } from "../../api/hero.api"
import { getHeroesByPageAction } from "../get-heroes-by-page.action"

describe("get-heroes-by-page.action", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      heroes: herosDataMock,
      total: 0,
      pages: 0,
    });

    const response = await getHeroesByPageAction(1);
  });
});
