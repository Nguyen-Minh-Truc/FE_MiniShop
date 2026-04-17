// ============================================================
// MiniShop – Request Types (Next.js / TypeScript)
// Được generate từ các Java Request class của backend
// ============================================================


// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

/** LoginReq.java */
export interface LoginReq {
  username: string;
  password: string;
}

/** UserReqRegister.java */
export interface UserReqRegister {
  /** @NotBlank – Tên người dùng không được để trống */
  fullname: string;
  /** @NotBlank @UniqueEmail – Email không được để trống */
  email: string;
  /** @NotBlank – Mật khẩu không được để trống */
  password: string;
  /** @NotBlank – Nhập lại mật khẩu không được để trống */
  confirmPassword: string;
}

// ─────────────────────────────────────────────
// USER
// ─────────────────────────────────────────────

/** UserReqCreate.java */
export interface UserReqCreate {
  /** @NotBlank – Tên người dùng không được để trống */
  username: string;
  /** @NotBlank @UniqueEmail – Email không được để trống */
  email: string;
  /** @NotBlank – Mật khẩu không được để trống */
  password: string;
  /** @NotBlank – Địa chỉ không được để trống */
  address: string;
  /** @NotBlank – Số điện thoại không được để trống */
  phone: string;
  active?: boolean;
  roleId?: number;
}

/** UserReqUpdate.java */
export interface UserReqUpdate {
  /** @NotBlank – Tên người dùng không được để trống */
  username: string;
  /** @NotBlank – Email không được để trống */
  email: string;
  password?: string;
  address?: string;
  phone?: string;
  active?: boolean;
  roleId?: number;
}

// ─────────────────────────────────────────────
// CATEGORY
// ─────────────────────────────────────────────

/** CategoryReq.java */
export interface CategoryReq {
  /** @NotBlank – Tên loại không được để trống */
  name: string;
  /** @NotBlank – Mô tả loại không được để trống */
  description: string;
}

// ─────────────────────────────────────────────
// PRODUCT
// ─────────────────────────────────────────────

/** CreateProductReq.java */
export interface CreateProductReq {
  /** @NotBlank – Name is required */
  name: string;
  description?: string;
  /** @NotNull – Category is required */
  categoryId: number;
  imageUrls?: string[];
}

/** UpdateProductReq.java */
export interface UpdateProductReq {
  /** @NotBlank */
  name: string;
  description?: string;
  /** @NotNull @Positive */
  price: number;
  stock: number;
  /** @NotNull */
  categoryId: number;
}

// ─────────────────────────────────────────────
// INVENTORY
// ─────────────────────────────────────────────

/** InventoryReq.java */
export interface InventoryReq {
  /** @NotNull @Min(0) – Số lượng tồn kho không được để trống, phải >= 0 */
  stock: number;
  /** @NotNull @Min(0) – Số lượng giữ chỗ không được để trống, phải >= 0 */
  reservedStock: number;
  /** @NotNull @Min(1) – Mã sản phẩm không được để trống, phải > 0 */
  productId: number;
}

// ─────────────────────────────────────────────
// PROMOTION
// ─────────────────────────────────────────────

/** PromotionReq.java */
export interface PromotionReq {
  /** @NotBlank – Promotion name is required */
  name: string;
  /** @NotBlank – Promotion type is required */
  type: string;
  /** @NotNull – Discount value is required */
  discountValue: number;
  startAt?: string; // ISO datetime – LocalDateTime
  endAt?: string;   // ISO datetime – LocalDateTime
  status?: string;
  code?: string;
  productId?: number;
}

// ─────────────────────────────────────────────
// SUPPLIER
// ─────────────────────────────────────────────

/** SupplierReq.java */
export interface SupplierReq {
  /** @NotBlank – Tên nhà cung cấp không được để trống */
  name: string;
  /** @NotBlank – Số điện thoại nhà cung cấp không được để trống */
  phone: string;
  /** @NotBlank – Email nhà cung cấp không được để trống */
  email: string;
  /** @NotBlank – Địa chỉ nhà cung cấp không được để trống */
  address: string;
}

// ─────────────────────────────────────────────
// PURCHASE ORDER (Import Receipt)
// ─────────────────────────────────────────────

/** PurchaseOrderItemRequest.java */
export interface PurchaseOrderItemRequest {
  /** @NotNull – Id không được null */
  id: number;
  /** @NotNull – ProductId không được null */
  productId: number;
  /** @Min(1) – Số lượng phải lớn hơn 0 */
  quantity: number;
  /** @NotNull – Giá nhập không được null */
  costPrice: number;
}

/** PurchaseOrderRequest.java */
export interface PurchaseOrderRequest {
  /** @NotNull – Supplier không được null */
  supplierId: number;
  /** @NotEmpty – Danh sách sản phẩm không được rỗng */
  items: PurchaseOrderItemRequest[];
}

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────

/** AddCartItemReq.java */
export interface AddCartItemReq {
  /** @NotNull – Product không được null */
  productId: number;
  /** @NotNull @Min(1) – Số lượng phải lớn hơn 0 */
  quantity: number;
}

/** UpdateCartItemReq.java */
export interface UpdateCartItemReq {
  /** @NotNull @Min(1) – Số lượng phải lớn hơn 0 */
  quantity: number;
}

// ─────────────────────────────────────────────
// ORDER
// ─────────────────────────────────────────────

/** OrderPaymentReq.java */
export interface OrderPaymentReq {
  /** @NotBlank – Địa chỉ giao hàng không được để trống */
  shippingAddress: string;
  /** @NotBlank – Số điện thoại giao hàng không được để trống */
  shippingPhone: string;
  /** @NotBlank – Phương thức thanh toán không được để trống */
  paymentMethod: string;
}

// ─────────────────────────────────────────────
// ROLE & PERMISSION
// ─────────────────────────────────────────────

/** RoleReq.java */
export interface RoleReq {
  /** @NotBlank – Role name is required */
  name: string;
  /** @NotBlank – Role description is required */
  description: string;
  permissionIds?: number[];
}

/** PermissionReq.java */
export interface PermissionReq {
  /** @NotBlank – Permission name is required */
  name: string;
  /** @NotBlank – API path is required */
  apiPath: string;
  /** @NotBlank – Method is required */
  method: string;
  /** @NotBlank – Module is required */
  module: string;
}