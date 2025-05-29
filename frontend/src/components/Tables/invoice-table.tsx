// import { TrashIcon } from "@/assets/icons";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { cn } from "@/lib/utils";
// import { PreviewIcon } from "@/components/Tables/icons"; // Sesuaikan path ikon jika perlu

// export async function TaskTable({ tasks }) {
//   return (
//     <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
//       <Table>
//         <TableHeader>
//           <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
//             <TableHead className="min-w-[155px] xl:pl-7.5">Task</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {tasks.map((task, index) => (
//             <TableRow key={index} className="border-[#eee] dark:border-dark-3">
//               <TableCell className="min-w-[155px] xl:pl-7.5">
//                 <h5 className="text-dark dark:text-white">{task.name}</h5>
//                 <p className="mt-[3px] text-body-sm font-medium">{task.dueDate}</p>
//               </TableCell>

//               <TableCell>
//                 <div
//                   className={cn(
//                     "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
//                     {
//                       "bg-[#219653]/[0.08] text-[#219653]": task.status === "Completed",
//                       "bg-[#D34053]/[0.08] text-[#D34053]": task.status === "Pending",
//                       "bg-[#FFA70B]/[0.08] text-[#FFA70B]": task.status === "In Progress",
//                     },
//                   )}
//                 >
//                   {task.status}
//                 </div>
//               </TableCell>

//               <TableCell className="xl:pr-7.5">
//                 <div className="flex items-center justify-end gap-x-3.5">
//                   <button className="hover:text-primary" onClick={() => viewTask(task.id)}>
//                     <span className="sr-only">View Task</span>
//                     <PreviewIcon />
//                   </button>

//                   <button className="hover:text-primary" onClick={() => deleteTask(task.id)}>
//                     <span className="sr-only">Delete Task</span>
//                     <TrashIcon />
//                   </button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
