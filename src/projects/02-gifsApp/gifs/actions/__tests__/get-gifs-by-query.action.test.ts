import AxiosMockAdapter from "axios-mock-adapter"
import { describe, expect, test } from "vitest"
import { giphyApi } from "../../api/giphy.api"
import { getGifsByQuery } from "../get-gifs-by-query.action"

describe("get-gifs-by-query.action", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  mock.onGet("/search").reply(200, {
    data: [
      {
        id: "123",
        title: "title",
        images: {
          original: {
            url: "url",
            width: "100",
            height: "100",
          },
        },
      },
    ],
  });

  test("should return a list of gifs", async () => {
    const gifs = await getGifsByQuery("test");
    expect(gifs).toHaveLength(1)

    //others validations
    expect(gifs[0].id).toBe("123");
    expect(gifs[0].title).toBe("title");
    expect(gifs[0].url).toBe("url");
    expect(gifs[0].width).toBe(100);
    expect(gifs[0].height).toBe(100);
  });
});
