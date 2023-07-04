import React, { ReactNode } from "react";
import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 100 },
//   { field: "fullname", headerName: "Full Name", width: 300 },
//   {
//     field: "paid",
//     headerName: "Payment Status",
//     width: 200,
//     renderCell: (params: GridValueGetterParams) => {
//       return params.row.paid ? (
//         <Chip color="success" label="Paid" variant="outlined" />
//       ) : (
//         <Chip color="error" label="Pending Payment" variant="outlined" />
//       );
//     },
//   },
//   {
//     field: "link",
//     headerName: "See Order Details",
//     width: 200,
//     sortable: false,
//     renderCell: (params: GridValueGetterParams) => {
//       return (
//         <NextLink href={`/orders/${params.row.id}}`} passHref>
//           <Link underline="always">Details</Link>
//         </NextLink>
//       );
//     },
//   },
// ];

// const rows = [
//   { id: 1, paid: true, fullname: "Carlos Gumucio", href: "/checkout/summary" },
//   {
//     id: 2,
//     paid: false,
//     fullname: "Constanza Sepulveda",
//     href: "/checkout/summary",
//   },
//   {
//     id: 3,
//     paid: false,
//     fullname: "Alejandro Munoz",
//     href: "/checkout/summary",
//   },
//   {
//     id: 4,
//     paid: false,
//     fullname: "Esteban Hernandez",
//     href: "/checkout/summary",
//   },
//   { id: 5, paid: true, fullname: "Maria Paz Labbe", href: "/checkout/summary" },
//   {
//     id: 6,
//     paid: true,
//     fullname: "Carlos Gumucio Larrondo",
//     href: "/checkout/summary",
//   },
// ];

const HistoryPage = () => {
  return <></>;
  // return (
  //   <ShopLayout
  //     title="Your orders history"
  //     pageDescription="Here you can check all your past orders"
  //   >
  //     <Typography variant="h1" component="h1">
  //       Order History
  //     </Typography>
  //     <Grid container>
  //       <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
  //         <DataGrid rows={rows} columns={columns} />
  //       </Grid>
  //     </Grid>
  //   </ShopLayout>
  // );
};

export default HistoryPage;
