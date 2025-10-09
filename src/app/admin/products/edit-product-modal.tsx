"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks/hooks";
import { updateProduct } from "@/lib/store/products/product-slice";
import { IProductData } from "@/lib/store/products/product-slice-type";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Props {
  product: IProductData;
  closeModal: () => void;
}

const EditProductModal: React.FC<Props> = ({ product, closeModal }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((store) => store.categories);

  const [productData, setProductData] = useState<IProductData>({
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    oldPrice: product.oldPrice,
    productTotalStock: product.productTotalStock,
    productDiscount: product.productDiscount,
    productImage: product.productImage,
    category: product.category
      ? { categoryName: product.category.categoryName }
      : undefined,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "productImage" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setProductData({
        ...productData,
        productImage: e.target.files[0], // File upload
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleEditProductDataSubmissison = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProduct(productData, productData.id));
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

          <form
            onSubmit={handleEditProductDataSubmissison}
            className="space-y-3"
          >
            {/* Product Name */}
            <input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
              required
            />

            {/* Description */}
            <textarea
              name="productDescription"
              value={productData.productDescription}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full border p-2 rounded"
            />

            {/* Price */}
            <div className="flex gap-2">
              <input
                type="text"
                value={productData.productPrice}
                onChange={handleChange}
                name="productPrice"
                placeholder="Price"
                className="flex-1 min-w-0 border p-2 rounded"
                required
              />
              <input
                type="text"
                name="oldPrice"
                value={productData.oldPrice}
                onChange={handleChange}
                placeholder="Old Price"
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
                  value={productData.productTotalStock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-sm mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="productDiscount"
                  value={productData.productDiscount}
                  onChange={handleChange}
                  placeholder="Discount (%)"
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <select
              name="categoryId"
              className="w-full border p-2 rounded"
              required
              value={productData.categoryId || ""}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  categoryId: e.target.value, // send only ID to backend
                }));
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>

            {/* Image */}
            <input
              type="file"
              name="productImage"
              accept="image/*"
              className="w-full"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setProductData((prev) => ({
                  ...prev,
                  productImage: file,
                }));
              }}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={closeModal}
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
