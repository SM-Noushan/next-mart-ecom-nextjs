"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ICategory } from "@/types";
import { Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { NMTable } from "@/components/ui/core/NMTable";
import CreateCategoryModal from "./CreateCategoryModal";
import { deleteCategory } from "@/app/services/Category";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";

type TManageCategoriesProps = {
  categories: ICategory[];
};

const ManageCategories = ({ categories }: TManageCategoriesProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleDelete = (data: ICategory) => {
    // console.log(data);
    setSelectedId(data._id);
    setSelectedItem(data?.name);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        console.log(res);
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

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => (
        <span className="text-base font-medium">Category Name</span>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon}
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
      accessorKey: "isActive",
      header: () => <span className="text-base font-medium">isActive</span>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <span className="text-base font-medium">Action</span>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <NMTable data={categories} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategories;
