import type {
  ApiResponse,
  CreatePromotionRequest,
  Promotion,
  PromotionListResponse,
  UpdatePromotionRequest,
} from "@/types";

import type { PromotionItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const requestJson = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(buildUrl(path), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const contentType = response.headers.get("content-type") || "";
    const raw = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${raw}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error("Server not running or returned HTML instead of JSON");
    }

    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if (err instanceof TypeError) {
      throw new Error("Cannot connect to server (server may be down)");
    }

    throw err;
  }
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const normalizePromotion = (promotion: Promotion): PromotionItem => ({
  ...promotion,
  discountValue: Number(promotion.discountValue ?? 0),
});

export const promotionsApi = {
  async getPromotions(): Promise<PromotionItem[]> {
    const response = await requestJson<PromotionListResponse>("/promotions");
    return unwrapApiData(response).result.map(normalizePromotion);
  },

  async createPromotion(
    payload: CreatePromotionRequest,
  ): Promise<PromotionItem> {
    const response = await requestJson<ApiResponse<Promotion>>("/promotions", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizePromotion(unwrapApiData(response));
  },

  async updatePromotion(
    id: number,
    payload: UpdatePromotionRequest,
  ): Promise<PromotionItem> {
    const response = await requestJson<ApiResponse<Promotion>>(
      `/promotions/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
    );

    return normalizePromotion(unwrapApiData(response));
  },

  async deletePromotion(id: number): Promise<void> {
    await requestJson<ApiResponse<null>>(`/promotions/${id}`, {
      method: "DELETE",
    });
  },
};
