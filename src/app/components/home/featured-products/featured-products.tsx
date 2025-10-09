'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { fetchFeaturedProducts } from '@/lib/store/products/product-slice';
import Link from 'next/link';
import AddToCartButton from '../../common/add-to-cart-buutton';

export default function FeaturedProducts() {
  const dispatch = useAppDispatch();
  const { featured, status } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center py-10 text-gray-600 text-sm">
        Loading featured products...
      </div>
    );
  }

  if (featured.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-sm">
        No featured products available.
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <section
          id="FeaturedProducts"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl text-xs"
            >
              {product.productDiscount > 0 && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded z-10">
                  -{product.productDiscount}%
                </div>
              )}

              <Link href={`/product-detail/${product.id}`} passHref>
                <img
                  src={
                    typeof product.productImage === 'string'
                      ? product.productImage
                      : 'https://via.placeholder.com/150'
                  }
                  alt={product.productName}
                  className="h-24 w-full object-cover rounded-t-lg"
                />
                <div className="px-2 py-2">
                  <p className="text-xs font-bold text-black capitalize mb-1">
                    {product.productName}
                  </p>
                  <p className="text-[10px] text-gray-600 line-clamp-2 h-[24px]">
                    {product.productDescription || 'No description'}
                  </p>

                  <div className="flex items-center mt-2">
                    <p className="text-xs font-semibold text-black">
                      Rs. {product.productPrice}
                    </p>
                    {product.oldPrice && (
                      <del className="ml-1 text-[10px] text-gray-600">
                        Rs. {product.oldPrice}
                      </del>
                    )}
                    <AddToCartButton product={product} />
                  </div>

                  <div className="mt-1">
                    {product.productTotalStock > 10 ? (
                      <p className="text-[10px] text-green-600 font-medium">
                        In Stock
                      </p>
                    ) : product.productTotalStock > 0 ? (
                      <p className="text-[10px] text-yellow-600 font-medium">
                        Only {product.productTotalStock} left!
                      </p>
                    ) : (
                      <p className="text-[10px] text-red-600 font-medium">
                        Out of Stock
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
