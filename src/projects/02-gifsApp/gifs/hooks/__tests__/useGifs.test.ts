import { act, renderHook } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import * as getGifsByQuery from '../../actions/get-gifs-by-query.action'
import { useGifs } from "../useGifs"

describe("useGifs", () => {
  test("should return default values", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toEqual([]);
    expect(result.current.previousTerms).toEqual([]);
    expect(typeof result.current.handleSearch).toBe("function");
    expect(typeof result.current.handleTermClicked).toBe("function");
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());
    vi.spyOn(getGifsByQuery, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
        await result.current.handleSearch("test");
    })
    await act(async () => {
        await result.current.handleSearch("test1");
    })
    await act(async () => {
        await result.current.handleSearch("test2");
    })
    await act(async () => {
        await result.current.handleSearch("test3");
    })
    await act(async () => {
        await result.current.handleSearch("test4");
    })
    await act(async () => {
        await result.current.handleSearch("test5");
    })
    await act(async () => {
        await result.current.handleSearch("test6");
    })
    await act(async () => {
        await result.current.handleSearch("test7");
    })
    await act(async () => {
        await result.current.handleSearch("test8");
    })

    expect(result.current.previousTerms.length).toBeLessThanOrEqual(8);
    expect(result.current.previousTerms).toEqual([
      "test8", "test7", "test6", "test5", "test4", "test3", "test2", "test1",
    ]);
  });
});
