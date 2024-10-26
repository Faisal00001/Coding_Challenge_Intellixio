"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  // Effect to restore selected product from localStorage
  useEffect(() => {
    if (paginatedProducts.length > 0) {
      const storedId = localStorage.getItem("selectedProduct");
      if (storedId) {
        const selectedItem = paginatedProducts.find(
          (product) => product.id == storedId
        );
        if (selectedItem) {
          setSelectedProduct(selectedItem);
        }
      }
    }
  }, [paginatedProducts]);

  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", product.id.toString()); // Store selected product ID
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    localStorage.removeItem("selectedProduct"); // Clear selected product ID
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
