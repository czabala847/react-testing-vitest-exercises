import AxiosMockAdapter from "axios-mock-adapter"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { giphyApi } from "../../api/giphy.api"
import { getGifsByQuery } from "../get-gifs-by-query.action"

describe("get-gifs-by-query.action", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  test("should return a list of gifs", async () => {
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

    const gifs = await getGifsByQuery("test");
    expect(gifs).toHaveLength(1);

    //others validations
    expect(gifs[0].id).toBe("123");
    expect(gifs[0].title).toBe("title");
    expect(gifs[0].url).toBe("url");
    expect(gifs[0].width).toBe(100);
    expect(gifs[0].height).toBe(100);
  });

  test("should return a empty list if query is empty", async () => {
    mock.restore();
    const gifs = await getGifsByQuery("");
    expect(gifs).toHaveLength(0);
  });

  test("should handle error when the API fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      data: {
        message: "bad request",
      },
    });

    const gifs = await getGifsByQuery("test");
    expect(gifs).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
