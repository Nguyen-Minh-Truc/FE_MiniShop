// ============================================================
// MiniShop – TypeScript Types (Next.js / TypeScript)
// Auto-generated from MiniShop.sql schema
// ============================================================

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export type ImportReceiptStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SUCCESS"
  | "CANCELED";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPING"
  | "SUCCESS"
  | "CANCELLED";

export type PromotionStatus = "CREATED" | "ACTIVE" | "CANCELLED";

export type PromotionType = "PERCENTAGE" | "FIXED_AMOUNT"; // extend nếu cần

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RoleName = "CUSTOMER" | "SELLER" | "ADMIN_SYSTEM" | "SUPER_ADMIN";

// ─────────────────────────────────────────────
// BASE ENTITIES (khớp với bảng DB)
// ─────────────────────────────────────────────

export interface Role {
  id: number;
  name: RoleName;
  description: string | null;
  createdAt: string | null; // ISO datetime
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface Permission {
  id: number;
  name: string;
  apiPath: string;
  method: HttpMethod;
  module: string;
  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  active: boolean;
  createdAt: string | null;
  role: Role | null;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  active: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  category: Category | null;
  seller: User | null; // seller_id → User
  images: ProductImage[];
}

export interface Promotion {
  id: number;
  name: string;
  code: string | null;
  type: PromotionType;
  discountValue: number;
  status: PromotionStatus;
  startAt: string | null;
  endAt: string | null;
  product: Product | null;
}

export interface Inventory {
  id: number;
  stock: number;
  reservedStock: number;
  product: Product | null;
}

export interface Supplier {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  active: boolean;
}

export interface ImportReceiptItem {
  id: number;
  quantity: number;
  costPrice: number;
  product: Product | null;
}

export interface ImportReceipt {
  id: number;
  status: ImportReceiptStatus;
  totalPrice: number;
  createdAt: string | null;
  createdBy: string | null;
  supplier: Supplier | null;
  items: ImportReceiptItem[];
}

export interface CartDetail {
  id: number;
  quantity: number;
  price: number;
  product: Product | null;
}

export interface Cart {
  id: number;
  totalPrice: number;
  userId: number;
  items: CartDetail[];
}

export interface OrderDetail {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  product: Product | null;
}

export interface Order {
  id: number;
  status: OrderStatus;
  methodPayment: string | null;
  shippingAddress: string | null;
  shippingPhone: string | null;
  totalPrice: number;
  createdAt: string | null;
  updatedAt: string | null;
  expiredAt: string | null;
  user: User | null;
  details: OrderDetail[];
}

// ─────────────────────────────────────────────
// REQUEST / DTO TYPES  (gửi lên API)
// ─────────────────────────────────────────────

// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

// User
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  active?: boolean;
  roleId?: number;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  roleId: number;
}

// Category
export interface CreateCategoryRequest {
  name: string;
  description: string;
  active?: boolean;
}
export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;

// Product
export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  active?: boolean;
}
export type UpdateProductRequest = Partial<CreateProductRequest>;

// Promotion
export interface CreatePromotionRequest {
  name: string;
  code?: string;
  type: PromotionType;
  discountValue: number;
  startAt?: string;
  endAt?: string;
  productId?: number;
}
export type UpdatePromotionRequest = Partial<CreatePromotionRequest>;

// Inventory
export interface CreateInventoryRequest {
  stock: number;
  reservedStock?: number;
  productId: number;
}
export interface UpdateInventoryRequest {
  stock?: number;
  reservedStock?: number;
}

// Supplier
export interface CreateSupplierRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
}
export type UpdateSupplierRequest = Partial<CreateSupplierRequest>;

// Import Receipt
export interface CreateImportReceiptRequest {
  supplierId: number;
  items: {
    productId: number;
    quantity: number;
    costPrice: number;
  }[];
  import_riept_item?: {
    productId: number;
    quantity: number;
    costPrice: number;
  }[];
}

// Cart
export interface AddCartItemRequest {
  productId: number;
  quantity: number;
}
export interface UpdateCartItemRequest {
  quantity: number;
}

// Order
export interface CheckoutOrderRequest {
  shippingAddress: string;
  shippingPhone: string;
  methodPayment: string;
}

// Role
export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissionIds: number[];
}
export type UpdateRoleRequest = Partial<CreateRoleRequest>;

// Permission
export interface CreatePermissionRequest {
  name: string;
  apiPath: string;
  method: HttpMethod;
  module: string;
}
export type UpdatePermissionRequest = Partial<CreatePermissionRequest>;

// ─────────────────────────────────────────────
// API RESPONSE WRAPPERS
// ─────────────────────────────────────────────

/** Wrapper chuẩn cho mọi response từ backend */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  error?: string;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pages: number;
  total: number;
}

/** Generic paginated list */
export interface PaginatedData<T> {
  result: T[];
  meta: PaginationMeta;
}

// Typed paginated responses
export type UserListResponse = ApiResponse<PaginatedData<User>>;
export type ProductListResponse = ApiResponse<PaginatedData<Product>>;
export type OrderListResponse = ApiResponse<PaginatedData<Order>>;
export type CategoryListResponse = ApiResponse<PaginatedData<Category>>;
export type SupplierListResponse = ApiResponse<PaginatedData<Supplier>>;
export type InventoryListResponse = ApiResponse<PaginatedData<Inventory>>;
export type PromotionListResponse = ApiResponse<PaginatedData<Promotion>>;
export type PermissionListResponse = ApiResponse<PaginatedData<Permission>>;
export type RoleListResponse = ApiResponse<PaginatedData<Role>>;
export type ImportReceiptListResponse = ApiResponse<
  PaginatedData<ImportReceipt>
>;

// ─────────────────────────────────────────────
// AUTH RESPONSE
// ─────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  // refreshToken thường được set qua HttpOnly cookie
}

export interface AccountInfo {
  id: number;
  username: string;
  email: string;
  role: Role | null;
}

export type LoginResponse = ApiResponse<AuthTokens>;
export type AccountResponse = ApiResponse<AccountInfo>;

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface OrderByStatusStat {
  status: OrderStatus;
  count: number;
}

export interface RevenueStat {
  label: string; // e.g. "2026-04" (month) or "2026-04-01" (day)
  revenue: number;
}

export type DashboardStatsResponse = ApiResponse<DashboardStats>;
export type OrderStatusStatsResponse = ApiResponse<OrderByStatusStat[]>;
export type RevenueStatsResponse = ApiResponse<RevenueStat[]>;

// ─────────────────────────────────────────────
// QUERY PARAMS (dùng cho react-query / fetch)
// ─────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ProductQueryParams extends PaginationParams {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
}

export interface OrderQueryParams extends PaginationParams {
  status?: OrderStatus;
  userId?: number;
}

export interface UserQueryParams extends PaginationParams {
  username?: string;
  email?: string;
  roleId?: number;
  active?: boolean;
}
