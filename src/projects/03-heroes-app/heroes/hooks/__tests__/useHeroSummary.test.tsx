import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { describe, expect, test, vi } from "vitest"
import { getSummaryAction } from "../../actions/get-summary.action"
import type { SummaryInformationResponse } from "../../types/summary-information.response"
import { useHeroSummary } from "../useHeroSummary"

vi.mock("../../actions/get-summary.action", () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroSummary", () => {
  test("should return the initial values", () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test("should return the data when the query is successful", async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: 1,
        name: "Hulk",
        slug: "hulk",
        alias: "Bruce Banner",
        powers: ["Super fuerza", "Super velocidad", "Super resistencia"],
        description: "El hombre más poderoso del universo",
        strength: 100,
        intelligence: 100,
        speed: 100,
        durability: 100,
        team: "Avengers",
        image: "hulk.jpg",
        firstAppearance: "Marvel Comics",
        status: "Activo",
        category: "Villano",
        universe: "Marvel",
      },
      smartestHero: {
        id: 2,
        name: "Iron Man",
        slug: "iron-man",
        alias: "Tony Stark",
        powers: ["Inteligencia superior", "Tecnología avanzada", "Vuelo"],
        description: "El hombre de hierro",
        strength: 85,
        intelligence: 100,
        speed: 100,
        durability: 100,
        team: "Avengers",
        image: "iron-man.jpg",
        firstAppearance: "Marvel Comics",
        status: "Activo",
        category: "Villano",
        universe: "Marvel",
      },
      heroCount: 5,
      villainCount: 5,
    } as unknown as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockSummaryData);
  });
});
