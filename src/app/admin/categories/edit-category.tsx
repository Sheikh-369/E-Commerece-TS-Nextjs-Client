"use client";
import { useAppDispatch } from "@/lib/store/auth/hooks";
import { updateCategory } from "@/lib/store/category/category-slice";
import { ICategoryData } from "@/lib/store/category/category-slice-type";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ICategoryData | null; // data to edit
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  category,
}: EditCategoryModalProps) {
  const dispatch = useAppDispatch();

  const [categoryData, setCategoryData] = useState<ICategoryData>({
    id:"", // default (will be overridden by category prop)
    categoryName: "",
    categoryDescription: "",
  });

  // when modal opens, sync state with category prop
  useEffect(() => {
    if (category) {
      setCategoryData({
        id: category.id,
        categoryName: category.categoryName,
        categoryDescription: category.categoryDescription,
      });
    }
  }, [category]);

  const handleDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleDataSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCategory(categoryData,categoryData.id!));
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
        <form onSubmit={handleDataSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={categoryData.categoryName}
              onChange={handleDataChange}
              required
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="categoryDescription"
              value={categoryData.categoryDescription}
              onChange={handleDataChange}
              required
              className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
