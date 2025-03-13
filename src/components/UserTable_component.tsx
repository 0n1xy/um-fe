// import {
//   MagnifyingGlassIcon,
//   ChevronUpDownIcon,
//   PencilIcon,
//   UserPlusIcon,
// } from "@heroicons/react/24/outline";
// import {
//   Card,
//   CardHeader,
//   Input,
//   Typography,
//   Button,
//   CardBody,
//   Chip,
//   CardFooter,
//   Avatar,
//   IconButton,
//   Tooltip,
// } from "@material-tailwind/react";
// import { useState } from "react";

// // Dữ liệu nhân viên
// const employeesData = [
//   {
//     id: 1,
//     name: "User 1",
//     email: "user1@example.com",
//     dateOfBirth: "2004-05-26",
//     isAdmin: true,
//     emailVerifiedAt: null,
//     createdAt: "2025-03-10 07:03:06",
//   },
//   {
//     id: 2,
//     name: "User 2",
//     email: "user2@example.com",
//     dateOfBirth: "2013-09-15",
//     isAdmin: false,
//     emailVerifiedAt: "2022-09-17 07:03:06",
//     createdAt: "2025-03-10 07:03:06",
//   },
//   {
//     id: 3,
//     name: "User 3",
//     email: "user3@example.com",
//     dateOfBirth: "2010-02-06",
//     isAdmin: true,
//     emailVerifiedAt: "2022-06-24 07:03:06",
//     createdAt: "2025-03-10 07:03:06",
//   },
//   {
//     id: 4,
//     name: "User 4",
//     email: "user4@example.com",
//     dateOfBirth: "2013-05-02",
//     isAdmin: false,
//     emailVerifiedAt: null,
//     createdAt: "2025-03-10 07:03:06",
//   },
// ];

// // Các tiêu đề của bảng
// const TABLE_HEAD = [
//   "ID",
//   "Họ và Tên",
//   "Email",
//   "Ngày Sinh",
//   "Vai Trò",
//   "Trạng Thái",
//   "Thao Tác",
// ];

// export function UserTable() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Lọc danh sách theo từ khóa tìm kiếm
//   const filteredEmployees = employeesData.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Card
//       className="h-full w-full"
//       onPointerEnterCapture={() => {}}
//       onPointerLeaveCapture={() => {}}
//     >
//       <CardHeader
//         floated={false}
//         shadow={false}
//         className="rounded-none"
//         onPointerEnterCapture={() => {}}
//         onPointerLeaveCapture={() => {}}
//       >
//         <div className="mb-6 flex items-center justify-between gap-6">
//           <div>
//             <Typography
//               variant="h5"
//               color="blue-gray"
//               onPointerEnterCapture={() => {}}
//               onPointerLeaveCapture={() => {}}
//             >
//               Danh sách nhân viên
//             </Typography>
//             <Typography
//               color="gray"
//               className="mt-1 font-normal"
//               onPointerEnterCapture={() => {}}
//               onPointerLeaveCapture={() => {}}
//             >
//               Quản lý thông tin nhân viên trong hệ thống
//             </Typography>
//           </div>
//           <Button
//             className="flex items-center gap-3"
//             size="sm"
//             onPointerEnterCapture={() => {}}
//             onPointerLeaveCapture={() => {}}
//           >
//             <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm nhân viên
//           </Button>
//         </div>

//         {/* Ô tìm kiếm */}
//         <div className="w-full md:w-72">
//           <Input
//             label="Tìm kiếm nhân viên"
//             placeholder=""
//             icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onPointerEnterCapture={() => {}}
//             onPointerLeaveCapture={() => {}}
//             crossOrigin=""
//           />
//         </div>
//       </CardHeader>

//       {/* Bảng hiển thị danh sách nhân viên */}
//       <CardBody
//         className="overflow-scroll px-0"
//         onPointerEnterCapture={() => {}}
//         onPointerLeaveCapture={() => {}}
//       >
//         <table className="mt-4 w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head, index) => (
//                 <th
//                   key={index}
//                   className="border-y border-blue-gray-100 bg-blue-gray-50 p-4"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center gap-2 font-normal opacity-70"
//                     onPointerEnterCapture={() => {}}
//                     onPointerLeaveCapture={() => {}}
//                   >
//                     {head}
//                     {index !== TABLE_HEAD.length - 1 && (
//                       <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
//                     )}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map((user, index) => {
//               const isLast = index === filteredEmployees.length - 1;
//               const classes = isLast
//                 ? "p-4"
//                 : "p-4 border-b border-blue-gray-50";

//               return (
//                 <tr key={user.id}>
//                   <td className={classes}>
//                     <Typography variant="small" color="blue-gray">
//                       {user.id}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <div className="flex items-center gap-3">
//                       <Avatar
//                         src="https://via.placeholder.com/40"
//                         alt={user.name}
//                         size="sm"
//                         onPointerEnterCapture={() => {}}
//                         onPointerLeaveCapture={() => {}}
//                       />
//                       <Typography variant="small" color="blue-gray">
//                         {user.name}
//                       </Typography>
//                     </div>
//                   </td>
//                   <td className={classes}>
//                     <Typography variant="small" color="blue-gray">
//                       {user.email}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography variant="small" color="blue-gray">
//                       {user.dateOfBirth}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Chip
//                       variant="ghost"
//                       size="sm"
//                       value={user.isAdmin ? "Admin" : "Nhân viên"}
//                       color={user.isAdmin ? "green" : "blue-gray"}
//                     />
//                   </td>
//                   <td className={classes}>
//                     <Chip
//                       variant="ghost"
//                       size="sm"
//                       value={
//                         user.emailVerifiedAt ? "Đã xác minh" : "Chưa xác minh"
//                       }
//                       color={user.emailVerifiedAt ? "green" : "red"}
//                     />
//                   </td>
//                   <td className={classes}>
//                     <Tooltip content="Chỉnh sửa nhân viên">
//                       <IconButton variant="text">
//                         <PencilIcon className="h-4 w-4" />
//                       </IconButton>
//                     </Tooltip>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </CardBody>

//       {/* Phân trang */}
//       <CardFooter
//         className="flex items-center justify-between border-t border-blue-gray-50 p-4"
//         onPointerEnterCapture={() => {}}
//         onPointerLeaveCapture={() => {}}
//       >
//         <Typography variant="small" color="blue-gray">
//           Trang 1 của 1
//         </Typography>
//         <div className="flex gap-2">
//           <Button variant="outlined" size="sm">
//             Trước
//           </Button>
//           <Button variant="outlined" size="sm">
//             Sau
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// export default UserTable;
