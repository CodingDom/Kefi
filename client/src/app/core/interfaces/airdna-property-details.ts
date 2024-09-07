export interface AirdnaPropertyDetails {
    payload: AirdnaPropertyPayload
    status: Status
}

export interface AirdnaPropertyPayload {
    property_id: string
    details: Details
    location: Location
    metrics: Metrics
    platforms: Platforms
    amenities: Amenities
    market: Market
    professionally_managed: boolean
    property_manager: PropertyManager
    currency: string
}

export interface Details {
    title: string
    market_name: string
    accommodates: number
    bedrooms: number
    bathrooms: number
    reviews: number
    rating: number
    images: string[]
    price_tier: string
    property_type: string
    listing_type: string
    real_estate_type: string
}

export interface Location {
    lat: number
    lng: number
}

export interface Metrics {
    occupancy: number
    adr: number
    revenue: number
    revenue_potential: number
    days_available: number
}

export interface Platforms {
    airbnb_property_id: string
    vrbo_property_id: any
}

export interface Amenities {
    has_tv: boolean
    has_gym: boolean
    has_pool: boolean
    has_dryer: boolean
    has_aircon: boolean
    has_hottub: boolean
    has_washer: boolean
    has_doorman: boolean
    has_heating: boolean
    has_kitchen: boolean
    has_parking: boolean
    has_smoking: boolean
    has_cable_tv: boolean
    has_elevator: boolean
    has_ev_charger: boolean
    has_intercom: boolean
    has_internet: boolean
    has_breakfast: boolean
    has_guidebook: boolean
    has_pets_allowed: boolean
    has_family_friendly: boolean
    has_handicap_access: boolean
    has_indoor_fireplace: boolean
    has_wireless_internet: boolean
    has_suitable_for_events: boolean
}

export interface Market {
    id: string
    name: string
    market_type: any
    market_score: number
    country_code: string
}

export interface PropertyManager {
    property_manager_name: string
    property_count: number
    review_count: number
}

export interface Status {
    code: string
    message: string
    human: string
    type: string
}
