# Feature Creation Guide

Tài liệu này dùng làm mẫu khi tạo feature mới trong frontend. Mục tiêu là giữ cấu trúc đồng nhất với các feature hiện có như `users` và `products`, đồng thời tái sử dụng đúng schema từ `src/types/index.ts`.

## 1. Nguyên tắc chung

- `src/types/index.ts` là nguồn dữ liệu kiểu dùng chung cho toàn app.
- Feature mới nên có folder riêng trong `src/features/<feature-name>/`.
- UI cần giữ style hiện tại: `Sidebar`, `Header`, `Card`, `Dialog`, `Button`, `Badge`, `Input`, `Select`.
- Nếu feature có màn hình riêng, tạo route ở `app/<feature>/page.tsx` và export từ `src/features/<feature>/index.ts`.
- Mỗi feature nên tự chứa logic, types, data mock, table, form, dialog trong cùng folder.

## 2. Cấu trúc chuẩn của một feature

```txt
src/features/<feature-name>/
├── data.ts
├── types.ts
├── index.ts
├── <Feature>Page.tsx
├── <Feature>Table.tsx
├── <Feature>FormDialog.tsx
├── <Feature>DetailDialog.tsx
└── Delete<Feature>Dialog.tsx
```

### Vai trò từng file

- `types.ts`: định nghĩa `FeatureItem`, `FeatureFormValues`, và các type local khác.
- `data.ts`: mock data, default form values, option lists.
- `Page.tsx`: ghép layout, state, handlers, và các dialog/table.
- `Table.tsx`: hiển thị danh sách và action buttons.
- `FormDialog.tsx`: tạo/sửa item.
- `DetailDialog.tsx`: xem chi tiết item.
- `DeleteDialog.tsx`: xác nhận xóa.
- `index.ts`: export tất cả để import gọn từ route.

## 3. Cách đặt type

### Nguồn kiểu dữ liệu

Nếu backend đã có schema trong `src/types/index.ts`, hãy import từ đó thay vì khai báo lại.

Ví dụ:

```ts
import type { Product, Category } from "@/types";

export type ProductItem = Product;

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  active: boolean;
}
```

### Quy ước

- `Item` là kiểu dữ liệu hiển thị trong UI.
- `FormValues` là dữ liệu form, ưu tiên string cho input.
- Không đưa password, token, hoặc field nhạy cảm vào UI nếu API không trả về.

## 4. Cách dựng UI theo style hiện tại

- Page nên bọc bằng:

```tsx
<div className="flex min-h-screen bg-background">
  <Sidebar />
  <div className="ml-64 flex-1">
    <Header />
    <main className="pt-20 p-6 space-y-6">{/* content */}</main>
  </div>
</div>
```

- Bảng nên dùng `Card` + `table` + `Badge`.
- Form nên dùng `Dialog`, `Input`, `Label`, `Select`.
- Detail dialog nên hiển thị theo các row label/value rõ ràng.
- Action buttons nên dùng `Button variant="ghost" size="sm"`.

## 5. Các bước tạo feature mới

1. Tạo folder `src/features/<feature-name>/`.
2. Khai báo types trong `types.ts` bằng cách import schema từ `src/types/index.ts`.
3. Tạo `data.ts` cho default values và option lists.
4. Tạo `Table`, `FormDialog`, `DetailDialog`, `DeleteDialog`.
5. Tạo `Page.tsx` để ghép state và handlers.
6. Tạo `index.ts` để export toàn bộ feature.
7. Tạo route ở `app/<feature-name>/page.tsx`.
8. Nếu cần điều hướng, thêm route vào `src/app/router.tsx` và menu vào sidebar.

## 6. Mẫu route mới

```tsx
import { ProductsPage } from "@/features/products";

export default ProductsPage;
```

## 7. Mẫu router

```ts
export const routes = {
  dashboard: "/dashboard",
  analytics: "/analytics",
  products: "/products",
  users: "/users",
  settings: "/settings",
};
```

## 8. Mẫu sidebar item

```ts
{
  title: "Products",
  href: routes.products,
  icon: "Package",
}
```

## 9. Checklist trước khi coi là xong

- [ ] Feature dùng đúng schema từ `src/types/index.ts`.
- [ ] UI hiển thị đúng field nghiệp vụ.
- [ ] `index.ts` export đầy đủ.
- [ ] Route hoạt động từ `app/<feature>/page.tsx`.
- [ ] Nếu feature cần menu, đã thêm vào router và sidebar.
- [ ] Chạy `get_errors` không còn lỗi TypeScript trên file mới.

## 10. Ghi chú thực tế

- Feature `users` là mẫu tốt cho entity có CRUD đầy đủ.
- Feature `products` là mẫu tốt cho entity có liên kết `category`, `seller`, và `images`.
- Khi tạo feature mới, giữ tên file nhất quán để dễ mở rộng và dễ tìm.

## 11. Reference Flow: Users UI -> Redux -> API

Đây là flow mẫu nên copy cho các feature CRUD sau này.

### 11.1. Cấu trúc file thực tế của Users

```txt
src/features/users/
├── api.ts
├── data.ts
├── types.ts
├── store.ts
├── index.ts
├── UsersPage.tsx
├── UsersTable.tsx
├── UserFormDialog.tsx
├── UserDetailDialog.tsx
└── DeleteUserDialog.tsx
```

### 11.2. Luồng dữ liệu

```txt
UI Event
  -> Page handler
  -> Redux thunk
  -> API client
  -> Backend
  -> Redux store update
  -> UI re-render
```

### 11.3. Vai trò từng lớp

- `types.ts`: chỉ giữ kiểu dùng cho feature, ưu tiên import schema gốc từ `src/types/index.ts`.
- `api.ts`: gọi backend bằng `fetch`, có base URL từ `NEXT_PUBLIC_API_URL`.
- `store.ts`: chứa `slice`, `async thunk`, `selectors`, và map dữ liệu form sang request.
- `UsersPage.tsx`: chỉ điều phối state UI, dispatch thunk, và mở/đóng dialog.
- `UsersTable.tsx`: render dữ liệu từ store.
- `UserFormDialog.tsx`: validate input trước khi dispatch create/update.
- `UserDetailDialog.tsx`: hiển thị detail read-only.
- `DeleteUserDialog.tsx`: confirm delete rồi dispatch thunk.

### 11.4. Pattern API client

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;
```

- Dùng `requestJson<T>()` để thống nhất xử lý lỗi và parse JSON.
- Nên unwrap response theo `ApiResponse<T>` từ `src/types/index.ts`.
- Endpoint danh sách trả về `PaginatedData<T>` thì lấy `response.data.result`.

### 11.4.1. Pattern danh sách có phân trang + tìm kiếm

- Backend nên trả về `ApiResponse<PaginatedData<T>>` với `meta.pageCurrent`, `meta.pageSize`, `meta.pages`, `meta.total`.
- API client nên nhận query params kiểu `page`, `pageSize`, `search`, và các filter nghiệp vụ như `active`, `status`, `categoryId`.
- Nếu feature dùng server-side pagination, page component chỉ giữ `page`, `pageSize`, `search`, filter state và dispatch refetch khi chúng thay đổi.
- Với UI style hiện tại, đặt bộ lọc trong `Card`, bảng trong `Card`, và pagination control ở footer bên dưới bảng.
- Nếu cần tìm kiếm nhiều thuộc tính, ưu tiên chuẩn hóa ở frontend bằng một input search chung, rồi để backend xử lý match theo contract đã thống nhất.
- Khi CRUD xong, refetch danh sách theo query hiện tại để giữ lại trang, search, và filter.

### 11.5. Pattern Redux Toolkit

```ts
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await usersApi.getUsers();
});
```

- `initialState` nên có `items`, `status`, `error`.
- Dùng `pending/fulfilled/rejected` để quản lý loading và lỗi.
- Sau `create/update/delete`, cập nhật `items` ngay trong slice để UI tự re-render.

### 11.6. Pattern form values

- `User` là dữ liệu từ API.
- `UserFormValues` là dữ liệu của form, nên dùng string cho input.
- Trường nhạy cảm như `password` chỉ xuất hiện ở form create/update, không render trong table/detail.

Ví dụ:

```ts
export interface UserFormValues {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  active: boolean;
  roleName: RoleName | "";
}
```

### 11.7. Pattern submit

1. Form validate dữ liệu cơ bản.
2. Page handler nhận `FormValues`.
3. Dispatch thunk `createUser` hoặc `updateUser`.
4. Thunk map form sang request DTO.
5. API client gọi backend.
6. Slice cập nhật state.
7. Table và dialogs tự render lại.

### 11.8. Provider setup

- Redux store được bọc ở `app/layout.tsx` qua `StoreProvider`.
- Các feature sau nếu dùng Redux cũng nên theo pattern này thay vì tự tạo store riêng cho từng page.

### 11.9. Checklist cho feature CRUD mới

- [ ] Có `api.ts` cho calls thật.
- [ ] Có `store.ts` với `slice` và `async thunk`.
- [ ] Có `types.ts` tách `Item` và `FormValues`.
- [ ] Page đọc dữ liệu bằng selector, không giữ mock state lâu dài.
- [ ] Form đóng sau khi dispatch thành công.
- [ ] Table, detail, delete dialog chỉ render dữ liệu từ store.
- [ ] Nếu feature có list lớn, đã có phân trang + tìm kiếm + filter theo đúng contract backend.
- [ ] `get_errors` sạch trên các file mới.

## 12. Reference Flow: Products UI -> Redux -> API

Đây là flow mẫu cho feature Product. Cấu trúc gần như Users, nhưng form và detail có thêm `category`, `seller`, `price`, và `images`.

### 12.1. Cấu trúc file thực tế của Products

```txt
src/features/products/
├── api.ts
├── data.ts
├── types.ts
├── store.ts
├── index.ts
├── ProductsPage.tsx
├── ProductsTable.tsx
├── ProductFormDialog.tsx
├── ProductDetailDialog.tsx
└── DeleteProductDialog.tsx
```

### 12.2. Luồng dữ liệu

```txt
UI Event
  -> Page handler
  -> Redux thunk
  -> API client
  -> Backend
  -> Redux store update
  -> UI re-render
```

### 12.3. Vai trò từng lớp

- `types.ts`: giữ `ProductItem`, `ProductFormValues`, và các type local khác.
- `api.ts`: gọi backend bằng `fetch`, dùng `NEXT_PUBLIC_API_URL`.
- `store.ts`: chứa `slice`, `async thunk`, `selectors`, và map form sang request DTO.
- `ProductsPage.tsx`: chỉ điều phối state UI, dispatch thunk, và mở/đóng dialog.
- `ProductsTable.tsx`: render danh sách product từ store.
- `ProductFormDialog.tsx`: validate input trước khi dispatch create/update.
- `ProductDetailDialog.tsx`: hiển thị chi tiết read-only.
- `DeleteProductDialog.tsx`: confirm delete rồi dispatch thunk.

### 12.4. Schema nên dùng

Luôn import schema gốc từ `src/types/index.ts`:

```ts
import type { Category, Product, User } from "@/types";

export type ProductItem = Product;
```

### 12.5. Product form values

- `Product` là dữ liệu từ API.
- `ProductFormValues` là dữ liệu form, nên dùng string cho các input số hoặc select.
- Tránh đưa object lồng nhau trực tiếp vào form; chỉ giữ id.

Ví dụ form values:

```ts
export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  sellerId: string;
  active: boolean;
  imageUrls: string[];
}
```

### 12.6. Mapping từ form sang request

- `price` nên parse sang number trước khi gọi API.
- `categoryId` và `sellerId` nên parse sang number.
- Nếu `imageUrls` rỗng thì gửi `[]` hoặc bỏ field tùy backend.

Ví dụ:

```ts
const toCreateProductRequest = (values: ProductFormValues) => ({
  name: values.name.trim(),
  description: values.description.trim()
    ? values.description.trim()
    : undefined,
  price: Number(values.price),
  categoryId: Number(values.categoryId),
  sellerId: Number(values.sellerId),
  active: values.active,
  imageUrls: values.imageUrls,
});
```

### 12.7. Pattern API client

```ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;
```

- `GET /products` nên trả về `PaginatedData<Product>` nếu có phân trang.
- `POST /products` tạo mới.
- `PUT /products/:id` cập nhật.
- `DELETE /products/:id` xóa.

### 12.8. Pattern Redux Toolkit

- `initialState` nên có `items`, `status`, `error`.
- `fetchProducts` chạy khi page mount.
- `createProduct`, `updateProduct`, `deleteProduct` cập nhật `items` ngay trong slice.
- Nếu API trả dữ liệu lồng sâu, normalize trước khi set vào store.

### 12.9. Pattern submit

1. Form validate tên, giá, category, seller.
2. Page handler nhận `FormValues`.
3. Dispatch thunk `createProduct` hoặc `updateProduct`.
4. Thunk map form sang request DTO.
5. API client gọi backend.
6. Slice cập nhật state.
7. Table và dialogs render lại.

### 12.10. Pattern UI hiển thị

- Bảng nên hiển thị `name`, `category.name`, `seller.username`, `price`, `active`, `createdAt`.
- Detail nên hiển thị `description`, `images.length`, `updatedAt`.
- Form nên dùng `Input`, `Select`, `Badge`, `Dialog`, `Button` giống Users.

### 12.11. Checklist cho feature Product CRUD

- [ ] Có `api.ts` cho calls thật.
- [ ] Có `store.ts` với `slice` và `async thunk`.
- [ ] Có `types.ts` tách `Item` và `FormValues`.
- [ ] Page đọc dữ liệu bằng selector, không giữ mock state lâu dài.
- [ ] Form đóng sau khi dispatch thành công.
- [ ] Table, detail, delete dialog chỉ render dữ liệu từ store.
- [ ] `get_errors` sạch trên các file mới.
