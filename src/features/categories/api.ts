import type {
  ApiResponse,
  Category,
  CategoryListResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/types";

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

    // ❌ server trả lỗi HTTP (404/500)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${raw}`);
    }

    // ❌ server không trả JSON (HTML login / error page)
    if (!contentType.includes("application/json")) {
      throw new Error("Server not running or returned HTML instead of JSON");
    }
    
    return JSON.parse(raw) as T;

  } catch (err: any) {
    // 💥 bắt lỗi mạng: server chết / không connect được
    if (err instanceof TypeError) {
      throw new Error("❌ Cannot connect to server (server may be down)");
    }

    throw err;
  }
};

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

export const categoriesApi = {
  async getCategories(): Promise<Category[]> {
    const response = await requestJson<CategoryListResponse>("/categories");
    return unwrapApiData(response).result;
  },

  async createCategory(payload: CreateCategoryRequest): Promise<Category> {
    const response = await requestJson<ApiResponse<Category>>("/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return unwrapApiData(response);
  },

  async updateCategory(
    id: number,
    payload: UpdateCategoryRequest,
  ): Promise<Category> {
    const response = await requestJson<ApiResponse<Category>>(
      `/categories/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
    );

    return unwrapApiData(response);
  },

  async deleteCategory(id: number): Promise<void> {
    await requestJson<ApiResponse<null>>(`/categories/${id}`, {
      method: "DELETE",
    });
  },
};
