'use client'

import { useState } from 'react'
import { ChevronDown, X, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface FilterState {
  counties: string[]
  priceRanges: string[]
  selectedPrice: string | null
  propertyTypes: string[]
  bedrooms: string | null
}

const COUNTIES = ['Hamilton', 'Butler', 'Warren', 'Franklin', 'Cuyahoga']
const PRICE_RANGES = [
  'Any Price',
  '<$50k',
  '$50k-$150k',
  '$150k-$250k',
  '$250k-$350k',
  '>$350k'
]
const PROPERTY_TYPES = ['Any Type', 'Residential', 'Multi-Family', 'Commercial', 'Land']
const BEDROOM_OPTIONS = ['Any', '1', '2', '3', '4', '5+']

export default function FilterOptions() {
  const [filters, setFilters] = useState<FilterState>({
    counties: ['Hamilton', 'Butler', 'Warren'],
    priceRanges: [],
    selectedPrice: '$50k-$150k',
    propertyTypes: ['Multi-Family'],
    bedrooms: 'Any'
  })

  const [expandedSections, setExpandedSections] = useState({
    county: false,
    price: false,
    propertyType: false,
    bedrooms: false
  })

  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false)

  // County handlers
  const addCounty = (county: string) => {
    setFilters(prev => ({
      ...prev,
      counties: [...prev.counties, county]
    }))
  }

  const removeCounty = (county: string) => {
    setFilters(prev => ({
      ...prev,
      counties: prev.counties.filter(c => c !== county)
    }))
  }

  // Price range handlers
  const selectPrice = (price: string) => {
    setFilters(prev => ({
      ...prev,
      selectedPrice: price
    }))
    setPriceDropdownOpen(false)
  }

  const togglePriceRange = (range: string) => {
    setFilters(prev => {
      const newRanges = prev.priceRanges.includes(range)
        ? prev.priceRanges.filter(p => p !== range)
        : [...prev.priceRanges, range]
      return { ...prev, priceRanges: newRanges }
    })
  }

  const clearPriceRanges = () => {
    setFilters(prev => ({
      ...prev,
      priceRanges: []
    }))
  }

  // Property type handlers
  const setPropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: [type]
    }))
  }

  // Bedroom handlers
  const setBedroom = (bedroom: string) => {
    setFilters(prev => ({
      ...prev,
      bedrooms: bedroom
    }))
  }

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleApplyFilters = () => {
    console.log('Applied filters:', filters)
    // Here you would typically call an API or update parent state
  }

  const handleClearAllFilters = () => {
    setFilters({
      counties: [],
      priceRanges: [],
      selectedPrice: null,
      propertyTypes: [],
      bedrooms: null
    })
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-[#E0E3E5] bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
        <Settings className="h-5 w-5 text-gray-600" />
      </div>

      {/* County Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div
          className="mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('county')}
        >
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            County
          </label>
          <motion.div
            animate={{ rotate: expandedSections.county ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-600" />
          </motion.div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {filters.counties.map(county => (
              <motion.div
                key={county}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1"
              >
                <span className="text-sm text-blue-900">{county}</span>
                <button
                  onClick={() => removeCounty(county)}
                  className="text-blue-900 hover:text-blue-700 transition-colors"
                  aria-label={`Remove ${county}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {expandedSections.county && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 flex flex-wrap gap-2 overflow-hidden"
            >
              {COUNTIES.filter(c => !filters.counties.includes(c)).map((county, index) => (
                <motion.button
                  key={county}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                  onClick={() => addCounty(county)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  + {county}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <label className="mb-3 block text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Price
        </label>

        {/* Price Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
            className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 hover:border-gray-400 transition-colors"
          >
            <span>{filters.selectedPrice || 'Select Price'}</span>
            <motion.div
              animate={{ rotate: priceDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </motion.div>
          </button>

          <AnimatePresence>
            {priceDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                <div className="max-h-64 overflow-y-auto">
                  {PRICE_RANGES.map((range, index) => (
                    <motion.button
                      key={range}
                      onClick={() => selectPrice(range)}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.1 }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        filters.selectedPrice === range
                          ? 'bg-blue-50 text-blue-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected price tag */}
        {filters.selectedPrice && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1"
          >
            <span className="text-sm text-blue-900">{filters.selectedPrice}</span>
            <button
              onClick={() => setFilters(prev => ({
                ...prev,
                selectedPrice: null
              }))}
              className="text-blue-900 hover:text-blue-700 transition-colors"
              aria-label="Clear price filter"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Property Type Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div
          className="mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('propertyType')}
        >
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Property type
          </label>
          <motion.div
            animate={{ rotate: expandedSections.propertyType ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-600" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expandedSections.propertyType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 overflow-hidden"
            >
              {PROPERTY_TYPES.map((type, index) => (
                <motion.label
                  key={type}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="propertyType"
                    checked={filters.propertyTypes.includes(type)}
                    onChange={() => setPropertyType(type)}
                    className="h-4 w-4 border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </motion.label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!expandedSections.propertyType && filters.propertyTypes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-sm text-gray-600"
            >
              {filters.propertyTypes[0]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bedrooms Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div
          className="mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('bedrooms')}
        >
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Bedrooms
          </label>
          <motion.div
            animate={{ rotate: expandedSections.bedrooms ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-gray-600" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expandedSections.bedrooms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2 overflow-hidden"
            >
              {BEDROOM_OPTIONS.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                  onClick={() => setBedroom(option)}
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    filters.bedrooms === option
                      ? 'bg-blue-900 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!expandedSections.bedrooms && filters.bedrooms && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-sm text-gray-600"
            >
              {filters.bedrooms}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplyFilters}
          className="w-full rounded-full bg-blue-900 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          Apply filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClearAllFilters}
          className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          Clear All Filters
        </motion.button>
      </div>
    </div>
  )
}
