import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import CourtCard from '../components/CourtCard';
import { courts, COURT_TYPES } from '../data/seedData';

const COURT_TYPE_LABELS = {
  padel: 'Pádel',
  tenis: 'Tenis',
  beach_tenis: 'Beach Tennis',
  futsal: 'Futsal',
  cesped: 'Césped'
};

const CourtsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const filteredCourts = useMemo(() => {
    let result = [...courts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(court => 
        court.name.toLowerCase().includes(query) ||
        court.description.toLowerCase().includes(query) ||
        COURT_TYPE_LABELS[court.type].toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter(court => selectedTypes.includes(court.type));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedTypes, sortBy]);

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSortBy('name');
  };

  const hasActiveFilters = searchQuery || selectedTypes.length > 0 || sortBy !== 'name';

  return (
    <div className="min-h-screen bg-[#050505] pt-20" data-testid="courts-page">
      {/* Header */}
      <div className="bg-surface/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-neon" />
            <span className="font-oswald text-neon text-sm tracking-[0.3em]">
              NUESTRAS CANCHAS
            </span>
          </div>
          <h1 className="font-oswald text-4xl lg:text-5xl tracking-wider mb-4">
            ELIGE TU CANCHA
          </h1>
          <p className="text-white/60 font-manrope max-w-2xl">
            {courts.length} canchas disponibles para reservar. Pádel, tenis, beach tennis, 
            futsal y césped natural. Encuentra la perfecta para tu próximo partido.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                type="text"
                placeholder="Buscar cancha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-white/10 focus:border-neon"
                data-testid="search-input"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-white/20 hover:border-neon"
                    data-testid="type-filter-btn"
                  >
                    <Filter size={16} />
                    Tipo
                    {selectedTypes.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 bg-neon text-black text-xs font-bold">
                        {selectedTypes.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-surface border-white/10">
                  {Object.entries(COURT_TYPE_LABELS).map(([type, label]) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                      className="cursor-pointer"
                      data-testid={`filter-type-${type}`}
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger 
                  className="w-44 bg-surface border-white/20 focus:border-neon"
                  data-testid="sort-select"
                >
                  <SlidersHorizontal size={16} className="mr-2" />
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-white/10">
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Valoradas</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden lg:flex items-center gap-1 border border-white/20 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-neon text-black' : 'text-white/50 hover:text-white'}`}
                  data-testid="view-grid-btn"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-neon text-black' : 'text-white/50 hover:text-white'}`}
                  data-testid="view-list-btn"
                >
                  <List size={18} />
                </button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="text-neon hover:text-neon/80"
                  data-testid="clear-filters-btn"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Tags */}
          {selectedTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className="px-3 py-1 bg-neon/20 text-neon text-sm flex items-center gap-2 hover:bg-neon/30 transition-colors"
                >
                  {COURT_TYPE_LABELS[type]}
                  <span className="text-lg leading-none">×</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-white/50 font-manrope">
            {filteredCourts.length} {filteredCourts.length === 1 ? 'cancha encontrada' : 'canchas encontradas'}
          </p>
        </div>

        {/* Courts Grid/List */}
        {filteredCourts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredCourts.map((court) => (
              <CourtCard 
                key={court.id} 
                court={court} 
                variant={viewMode === 'list' ? 'list' : 'default'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" data-testid="no-results">
            <div className="w-16 h-16 mx-auto mb-6 bg-surface flex items-center justify-center">
              <Search size={24} className="text-white/30" />
            </div>
            <h3 className="font-oswald text-xl tracking-wider mb-2">
              NO SE ENCONTRARON CANCHAS
            </h3>
            <p className="text-white/50 font-manrope mb-6">
              Prueba ajustando los filtros de búsqueda
            </p>
            <Button 
              onClick={clearFilters}
              className="btn-neon"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtsPage;
