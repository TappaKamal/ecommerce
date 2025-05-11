import React, { useEffect, useMemo, useState } from 'react'
import FilterIcon from '../../components/common/FilterIcon';
import content from '../../data/content.json';
import Categories from '../../components/Filters/Categories';
import PriceFilter from '../../components/Filters/PriceFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import SizeFilter from '../../components/Filters/SizeFilter';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../api/fetchProducts';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/common'
import Products from "../../data/product.json"
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
const categories = content?.categories;

const ProductListPage = ({categoryType}) => {
  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categoryType]);
  
  const productListItems = useMemo(() => {
    return content?.products?.filter((product) => product?.category_id === categoryContent?.id);
  }, [categoryContent]);

  const category = useMemo(() => {
    return categoryData?.find(element => element?.code === categoryType);
  }, [categoryData, categoryType]);

  useEffect(() => {
    dispatch(setLoading(true));
    getAllProducts(category?.id).then(res => {
      setProducts(res);
    }).catch(err => {
      
    }).finally(() => {
      dispatch(setLoading(false));
    })
    
  }, [category?.id, dispatch]);

  const addLocalStoreStorage = (p) => {
    // Step 1: Get existing products array from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Step 2: Add new product to the array
    products.push(p);
    
    // Step 3: Save updated array back to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    navigate("/cart-items")
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="pb-5 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{category?.description || 'Products'}</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse our collection of {category?.description?.toLowerCase() || 'products'}
          </p>
        </div>
        
        <div className="lg:flex">
          {/* Mobile filter dialog */}
          <button
            type="button"
            className="inline-flex items-center lg:hidden px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={toggleFilters}
          >
            <FilterIcon className="mr-2 h-5 w-5 text-gray-400" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 lg:mr-8`}>
            <div className="sticky top-20 bg-white shadow sm:rounded-lg overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  Filters
                  <FilterIcon className="h-5 w-5 text-gray-400" />
                </h3>
              </div>
              
              <div className="bg-white px-4 py-5 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900">Categories</h4>
                  <div className="mt-2">
                    <Categories types={categoryContent?.types} />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  {/* Price */}
                  <PriceFilter />
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  {/* Colors */}
                  <ColorsFilter colors={categoryContent?.meta_data?.colors} />
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  {/* Sizes */}
                  <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Products?.products.map((p, index) => (
                <Card 
                  key={index}
                  imagePath={p.images[0]} 
                  title={p.title} 
                  description={p.description}
                  onClick={() => addLocalStoreStorage(p)}
                />
              ))}
            </div>
            
            {/* Empty state */}
            {Products?.products.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later for new items.</p>
              </div>
            )}
            
            {/* Pagination placeholder */}
            {Products?.products.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">2</a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListPage