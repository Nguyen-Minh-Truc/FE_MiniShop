import type {
  ApiResponse,
  Category,
  CategoryListResponse,
  CreateCategoryRequest,
  CategoryQueryParams,
  PaginatedData,
  UpdateCategoryRequest,
} from "@/types";

import axiosInstance from "@/lib/axiosInstance";
import type { CategoryDetailItem } from "./types";

const unwrapApiData = <T>(response: ApiResponse<T>) => response.data;

const buildQueryString = (params?: CategoryQueryParams) => {
  const searchParams = new URLSearchParams();

  if (typeof params?.page === "number") {
    searchParams.set("page", String(params.page));
  }

  if (typeof params?.pageSize === "number") {
    searchParams.set("pageSize", String(params.pageSize));
  }

  if (typeof params?.search === "string" && params.search.trim().length > 0) {
    searchParams.set("search", params.search.trim());
  }

  if (typeof params?.active === "boolean") {
    searchParams.set("active", String(params.active));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const categoriesApi = {
  async getCategoryById(id: number): Promise<CategoryDetailItem> {
    const response = await axiosInstance.get<ApiResponse<CategoryDetailItem>>(
      `/categories/${id}`,
    );

    return unwrapApiData(response.data);
  },

  async getCategories(
    params?: CategoryQueryParams,
  ): Promise<PaginatedData<Category>> {
    const response = await axiosInstance.get<CategoryListResponse>(
      `/categories${buildQueryString(params)}`,
    );

    return unwrapApiData(response.data);
  },

  async createCategory(payload: CreateCategoryRequest): Promise<Category> {
    const response = await axiosInstance.post<ApiResponse<Category>>(
      "/categories",
      payload,
    );

    return unwrapApiData(response.data);
  },

  async updateCategory(
    id: number,
    payload: UpdateCategoryRequest,
  ): Promise<Category> {
    const response = await axiosInstance.put<ApiResponse<Category>>(
      `/categories/${id}`,
      payload,
    );

    return unwrapApiData(response.data);
  },

  async deleteCategory(id: number): Promise<void> {
    await axiosInstance.delete<ApiResponse<null>>(`/categories/${id}`);
  },
};
