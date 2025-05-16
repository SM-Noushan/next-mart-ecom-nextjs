"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { IProduct } from "@/types";
import { useRouter } from "next/navigation";
import { Edit, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import { deleteProduct } from "@/app/services/Product";
import NMTableHeader from "@/components/ui/core/NMTable/Header";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";

type TManageProductsProps = {
  products: IProduct[];
};

const ManageProducts = ({ products }: TManageProductsProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleView = (data: IProduct) => {
    console.log("Viewing product:", data);
  };

  const handleDelete = (data: IProduct) => {
    // console.log(data);
    setSelectedId(data._id);
    setSelectedItem(data?.name);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);
        // console.log(res);
        if (res.success) {
          toast.success(res.message);
          setSelectedId(null);
          setSelectedItem(null);
          setIsModalOpen(false);
        } else toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: () => <NMTableHeader label="Name" />,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <NMTableHeader label="Category" />,
      cell: ({ row }) => <span>{row.original.category?.name}</span>,
    },
    {
      accessorKey: "brand",
      header: () => <NMTableHeader label="Brand" />,
      cell: ({ row }) => <span>{row.original.brand?.name}</span>,
    },
    {
      accessorKey: "stock",
      header: () => <NMTableHeader label="Stock" />,
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: () => <NMTableHeader label="Price" />,
      cell: ({ row }) => <span>{row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: () => <NMTableHeader label="Offer Price" />,
      cell: ({ row }) => (
        <span>
          {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: () => <NMTableHeader label="Action" />,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(`/user/shop/product/update/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <Button onClick={() => router.push("/user/shop/product/add")}>
          Create Product
        </Button>
      </div>
      <NMTable data={products} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageProducts;
