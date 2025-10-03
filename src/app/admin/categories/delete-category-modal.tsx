"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/store/auth/hooks";
import { deleteCategory } from "@/lib/store/category/category-slice";
import { ICategoryData } from "@/lib/store/category/category-slice-type";

export default function DeleteCategoryModal({
  categoryToDelete,
  isOpen,
  onClose,
}: {
  categoryToDelete: ICategoryData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();

  // Confirm deletion
  const confirmDelete = async () => {
    if (!categoryToDelete?.id) return;
    try {
      await dispatch(deleteCategory(categoryToDelete.id));
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  if (!isOpen || !categoryToDelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-xl rounded-lg p-6 w-96 border border-red-800 pointer-events-auto">
        <h2 className="text-lg font-semibold mb-3 text-white">Confirm Deletion</h2>
        <p className="text-sm text-red-100 mb-5">
          Are you sure you want to delete{" "}
          <strong className="text-white">{categoryToDelete.categoryName}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-white text-red-700 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm bg-yellow-400 text-red-900 font-semibold rounded-md hover:bg-yellow-300 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
