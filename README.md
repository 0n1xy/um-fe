# **User Management Frontend - React Vite**

## **Giới thiệu**

Đây là frontend của ứng dụng Quản Lý Người Dùng, được xây dựng bằng **ReactJS** sử dụng **Vite** để tăng tốc độ khởi động và tối ưu hóa hiệu suất.

---

## **1. Yêu cầu hệ thống**

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau trên hệ thống của mình:

- **Node.js** (>= 16.x): [Tải về tại đây](https://nodejs.org/)
- **Yarn** hoặc **npm** để quản lý package
- **Git** để clone repository

---

## **2. Cách cài đặt và chạy ứng dụng**

### **Bước 1: Clone repository**

```bash
git clone https://github.com/0n1xy/um-fe.git
cd um-fe
```

### **Bước 2: Cài đặt dependencies**

Nếu sử dụng **npm**:

```bash
npm install
```

Hoặc nếu sử dụng **yarn**:

```bash
yarn install
```

### **Bước 3: Chạy ứng dụng**

Nếu sử dụng **npm**:

```bash
npm run dev
```

Nếu sử dụng **yarn**:

```bash
yarn dev
```

Sau khi chạy, Vite sẽ hiển thị đường dẫn để truy cập ứng dụng, thông thường là:

```
http://localhost:5173/
```

---

## **3. Build ứng dụng**

Nếu bạn muốn build ứng dụng để deploy:

```bash
npm run build
```

Hoặc:

```bash
yarn build
```

Thư mục `dist/` sẽ chứa mã nguồn đã được build sẵn.

---

## **4. CI/CD với GitHub Actions**

Ứng dụng được triển khai tự động bằng **GitHub Actions**. Mỗi khi có thay đổi trên repository, GitHub Actions sẽ:

1. Kiểm tra code (lint, test, build).
2. Deploy lên Vercel.

Không cần thao tác thủ công, chỉ cần push code lên repository.

---

## **5. Công nghệ sử dụng**

- **ReactJS** - Thư viện UI chính
- **Vite** - Công cụ build nhanh và nhẹ
- **Tailwind CSS / Material UI** - Thiết kế giao diện
- **Axios** - Gọi API từ backend
- **React Router** - Điều hướng trang
- **GitHub Actions** - CI/CD tự động

---

## **6. Thông tin liên hệ**

Mọi thắc mắc vui lòng liên hệ:  
📧 Email: admin@example.com
