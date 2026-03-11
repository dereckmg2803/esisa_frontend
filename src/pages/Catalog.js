import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const { t, getCategoryName, language } = useLanguage();

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = selectedCategory === 'all' 
          ? `${API}/products`
          : `${API}/products?category=${selectedCategory}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (value) => {
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const getCurrentCategory = () => {
    if (selectedCategory === 'all') return null;
    return categories.find(c => c.slug === selectedCategory);
  };

  const currentCategory = getCurrentCategory();

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="catalog-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm font-manrope">
            <Link to="/" className="text-stone-500 hover:text-[#D94E36]">{t('home')}</Link>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <span className="text-[#006D77] font-medium">{t('catalog')}</span>
            {currentCategory && (
              <>
                <ChevronRight className="w-4 h-4 text-stone-400" />
                <span className="text-[#D94E36] font-medium">{getCategoryName(currentCategory)}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#006D77] to-[#83C5BE] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <span className="font-caveat text-xl text-[#E9C46A]">
            🌴 {language === 'es' ? 'Nuestra Colección' : 'Our Collection'}
          </span>
          <h1 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            {currentCategory ? getCategoryName(currentCategory) : t('allProducts')}
          </h1>
          {currentCategory && (
            <p className="font-manrope text-white/80 mt-3 max-w-xl">
              {language === 'es' ? currentCategory.description_es : currentCategory.description_en}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-stone-500" />
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]" data-testid="category-filter">
                <SelectValue placeholder={t('categories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'es' ? 'Todas las Categorías' : 'All Categories'}</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {getCategoryName(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-manrope text-sm text-stone-500">
              {products.length} {language === 'es' ? 'productos' : 'products'}
            </span>
            <div className="flex border border-stone-200 rounded-lg overflow-hidden ml-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#006D77] text-white' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
                data-testid="grid-view-btn"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#006D77] text-white' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
                data-testid="list-view-btn"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full font-manrope text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#006D77] text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
            data-testid="category-pill-all"
          >
            {language === 'es' ? 'Todos' : 'All'}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full font-manrope text-sm font-medium transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#006D77] text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
              data-testid={`category-pill-${cat.slug}`}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-manrope text-stone-500 text-lg">
              {language === 'es' ? 'No hay productos en esta categoría' : 'No products in this category'}
            </p>
            <Button 
              onClick={() => handleCategoryChange('all')}
              className="btn-caribbean mt-4"
            >
              {language === 'es' ? 'Ver todos los productos' : 'View all products'}
            </Button>
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
