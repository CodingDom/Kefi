export interface PropertyListQueryOptions {
    accommodates?: number;
    room_types?: string;
    currency?: Currency;
    start_date?: string;
    months?: number;
}

export enum Currency {
    USD = "usd",
    Native = "native"
}

export enum RoomTypes {
    any,
    entire_place,
    private_room,
    shared_room
}

export interface PropertyList {
    airbnb_property_id?:     number;
    rating?:                 number | null;
    property_type?:          PropertyType;
    bathrooms?:              number;
    title?:                  string;
    occ?:                    Occ;
    bedrooms?:               number;
    accommodates?:           number;
    adr?:                    number;
    img_cover?:              string;
    reviews?:                number;
    revenue?:                Occ;
    homeaway_property_id?:   null | string;
    longitude?:              number;
    latitude?:               number;
    m_homeaway_property_id?: null | string;
    days_available?:         number;
    id?:                     number;
    room_type?:              RoomType;
    platforms?:              Platforms;
}

export enum Occ {
    PermissionDenied = "permission_denied",
}

export interface Platforms {
    airbnb_property_id?:   number | null;
    homeaway_property_id?: null | string;
}

export enum PropertyType {
    Apartment = "Apartment",
    Bungalow = "Bungalow",
    CamperRV = "Camper/RV",
    Condo = "Condo",
    Condominium = "Condominium",
    FarmStay = "Farm stay",
    GuestSuite = "Guest suite",
    Guesthouse = "Guesthouse",
    Hotel = "Hotel",
    House = "House",
    Loft = "Loft",
    Place = "Place",
    Resort = "Resort",
    RoomInAparthotel = "Room in aparthotel",
    RoomInBoutiqueHotel = "Room in boutique hotel",
    RoomInHotel = "Room in hotel",
    ServicedApartment = "Serviced apartment",
    Studio = "Studio",
    TinyHouse = "Tiny house",
    Townhome = "Townhome",
    Townhouse = "Townhouse",
    Villa = "Villa",
}

export enum RoomType {
    EntireHomeApt = "Entire home/apt",
    PrivateRoom = "Private room",
}