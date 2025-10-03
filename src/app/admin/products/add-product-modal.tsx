"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/auth/hooks";
import { fetchAllCategories } from "@/lib/store/category/category-slice";
import { addProduct, fetchProducts } from "@/lib/store/products/product-slice";
import { IProductData } from "@/lib/store/products/product-slice-type";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface AddProductModalProps {
  onClose: () => void;
}

export default function AddProductModal({ onClose }: AddProductModalProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);

  const [productData, setProductData] = useState<IProductData & { categoryId?: number | string }>({
    id: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    oldPrice: "",
    productTotalStock: 0,
    productDiscount: 0,
    productImage: undefined,
    categoryId: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setProductData((prev) => ({
      ...prev,
      //@ts-ignore
      [name]: name === "productImage" ? files?.[0] : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addProduct(productData));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Product Name */}
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productData.productName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Description */}
          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={productData.productDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Price */}
          <div className="flex gap-2">
            <input
              type="text"
              name="productPrice"
              placeholder="Price"
              value={productData.productPrice}
              onChange={handleChange}
              className="flex-1 min-w-0 border p-2 rounded"
              required
            />
            <input
              type="text"
              name="oldPrice"
              placeholder="Old Price"
              value={productData.oldPrice}
              onChange={handleChange}
              className="flex-1 min-w-0 border p-2 rounded"
            />
          </div>

          {/* Stock & Discount */}
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label className="text-sm mb-1">Stock</label>
              <input
                type="number"
                name="productTotalStock"
                placeholder="Stock"
                value={productData.productTotalStock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-sm mb-1">Discount (%)</label>
              <input
                type="number"
                name="productDiscount"
                placeholder="Discount (%)"
                value={productData.productDiscount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Category</label>
            <select
              name="categoryId"
              value={productData.categoryId?.toString() || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories
                .filter((cat) => cat.id !== undefined)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
            </select>
          </div>

          {/* Image */}
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
