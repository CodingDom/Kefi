export interface VrboPropertyDetails {
    listingReducer?: ListingReducer;
    reviewsReducer?: ReviewsReducer;
}

export interface ListingReducer {
    spaces?:                                Spaces;
    acceptsHomeAwayPayments?:               boolean;
    acceptsOfflinePayments?:                boolean;
    accomodationSummary?:                   null;
    address?:                               Address;
    availabilityUpdated?:                   Date;
    averageRating?:                         number;
    bedrooms?:                              number;
    canonicalLink?:                         string;
    contact?:                               Contact;
    description?:                           string;
    detailPageUrl?:                         string;
    featuredAmenities?:                     string[];
    geoCode?:                               GeoCode;
    geography?:                             Geography;
    propertyManagerProfile?:                null;
    headline?:                              string;
    houseRules?:                            HouseRules;
    cancellationPolicy?:                    ListingReducerCancellationPolicy;
    images?:                                ListingReducerImage[];
    instantBookable?:                       boolean;
    integratedPropertyManager?:             boolean;
    ipmGuaranteedPricingActive?:            boolean;
    isBasicListing?:                        boolean;
    isCrossSell?:                           boolean;
    isSubscription?:                        boolean;
    listingId?:                             string;
    listingNumber?:                         number;
    minStayRange?:                          MinStayRange;
    mobileThumbnailUrl?:                    string;
    multiUnitProperty?:                     boolean;
    onlineBookable?:                        boolean;
    ownerManaged?:                          boolean;
    ownersListingProfile?:                  OwnersListingProfile;
    payPerBooking?:                         boolean;
    petsAllowed?:                           boolean;
    priceSummary?:                          PriceSummary;
    propertyApiUrl?:                        string;
    propertyId?:                            string;
    propertyManagerMessaging?:              null;
    propertyName?:                          null;
    propertyNotes?:                         any[];
    propertyType?:                          string;
    propertyTypeKey?:                       string;
    rateDetails?:                           RateDetails;
    rateSummary?:                           RateSummary;
    recentlyAdded?:                         boolean;
    sleeps?:                                number;
    sleepsDisplay?:                         string;
    specialOffers?:                         any[];
    spu?:                                   string;
    status?:                                string;
    takesInquiries?:                        boolean;
    testListing?:                           boolean;
    thingsOfInterest?:                      ThingsOfInterest[];
    thumbnailUrl?:                          string;
    travelerFeeEligible?:                   boolean;
    unitApiUrl?:                            string;
    unitDescription?:                       null;
    unitName?:                              string;
    unitNumber?:                            number;
    videoUrls?:                             any[];
    virtualTours?:                          any[];
    categorizedAmenities?:                  CategorizedAmenity[];
    unitMetadata?:                          UnitMetadata;
    propertyContentItems?:                  any[];
    unitContentItems?:                      UnitContentItem[];
    bathrooms?:                             Bathrooms;
    availabilityCalendar?:                  AvailabilityCalendar;
    industryHealthAssociations?:            any[];
    regionalHealthGuidelines?:              any[];
    globalMessages?:                        GlobalMessages;
    impressum?:                             null;
    unitContentItemsSpaces?:                UnitContentItem[];
    spacesDiningRooms?:                     SpacesDiningRooms;
    allFeaturedAmenitiesRanked?:            string[];
    carousel?:                              Carousel;
    preferredLocation?:                     PreferredLocation;
    searchLandingPages?:                    SearchLandingPages;
    localizedPropertyDescriptionMap?:       LocalizedPropertyDescriptionMap;
    propertyMapThumbnailUrl?:               boolean;
    propertyMapThumbnailResponsiveOptions?: PropertyMapThumbnailResponsiveOptions;
    badges?:                                Badges;
    metadata?:                              Metadata;
}

export interface Address {
    city?:          string;
    country?:       string;
    postalCode?:    string;
    stateProvince?: string;
}

export interface AvailabilityCalendar {
    availability?: AvailabilityClass;
}

export interface AvailabilityClass {
    dateRange?:                     DateRange;
    sameDayCheckinAvailable?:       boolean;
    availabilityDefault?:           string;
    changeOverDefault?:             string;
    maxStayDefault?:                number;
    minPriorNotifyDefault?:         number;
    minStayDefault?:                number;
    stayIncrementDefault?:          string;
    unitAvailabilityConfiguration?: UnitAvailabilityConfiguration;
}

export interface DateRange {
    endDate?:   Date;
    beginDate?: Date;
}

export interface UnitAvailabilityConfiguration {
    availability?:        string;
    changeOver?:          string;
    maxStay?:             string;
    minPriorNotify?:      string;
    minStay?:             string;
    stayIncrement?:       string;
    checkInAvailability?: string;
}

export interface Badges {
    rankedBadges?:      RankedBadge[];
    pricingBadges?:     any[];
    superlativeBadges?: any[];
    webRatingBadges?:   any[];
}

export interface RankedBadge {
    id?:       string;
    name?:     string;
    helpText?: null;
}

export interface Bathrooms {
    full?:       number;
    half?:       number;
    toiletOnly?: number;
}

export interface ListingReducerCancellationPolicy {
    cancellationPolicyPeriods?:   CancellationPolicyPeriod[];
    cancellationPolicyLabel?:     CancellationPolicyLabel;
    cancellationTimelinePeriods?: CancellationTimelinePeriod[];
    policyType?:                  string;
}

export interface CancellationPolicyLabel {
    label?:              string;
    date?:               string;
    isFullRefundWindow?: boolean;
}

export interface CancellationPolicyPeriod {
    label?: string;
}

export interface CancellationTimelinePeriod {
    timelineLabel?:      string;
    refundPercent?:      number;
    refundWindowLabel?:  string;
    shortDateLocalized?: null;
    isPast?:             boolean;
    isActive?:           boolean;
    iconCode?:           null | string;
}

export interface Carousel {
    thumbnailUrl?:               string;
    images?:                     CarouselImage[];
    virtualTourUrl?:             null;
    virtualTourId?:              null;
    virtualTourViewerVersion?:   null;
    virtualTourHeroImage?:       null;
    renderedLowResCountPerSide?: number;
}

export interface CarouselImage {
    altText?:            null;
    caption?:            null;
    lowResSrc?:          string;
    thumbnailLowResSrc?: string;
    thumbnailSrc?:       string;
    mediaType?:          MediaType;
    mediaUuid?:          string;
    src?:                string;
    mab?:                null;
    width?:              number;
    height?:             number;
}

export enum MediaType {
    Image = "image",
}

export interface CategorizedAmenity {
    name?:         string;
    contentItems?: ContentItem[];
}

export interface ContentItem {
    amenityName?:           string;
    amenity?:               ContentItemAmenity;
    availability?:          AvailabilityEnum;
    stringAttributeValues?: StringAttributeValue[];
}

export interface ContentItemAmenity {
    amenityName?: string;
    displayName?: string;
}

export enum AvailabilityEnum {
    Unknown = "UNKNOWN",
    Yes = "YES",
}

export interface StringAttributeValue {
    attributeName?:  AttributeName;
    attributeValue?: string;
}

export enum AttributeName {
    Description = "description",
    Instructions = "instructions",
    Location = "location",
}

export interface Contact {
    hascEnabled?:       boolean;
    hasEmail?:          boolean;
    hasPhoneNumber?:    boolean;
    languagesSpoken?:   string[];
    memberSince?:       string;
    name?:              string;
    ownerProfilePhoto?: null;
}

export interface GeoCode {
    exact?:     boolean;
    latitude?:  number;
    longitude?: number;
}

export interface Geography {
    description?:        string;
    ids?:                ID[];
    name?:               string;
    relatedGeographies?: null;
    types?:              string[];
    location?:           Tion;
}

export interface ID {
    type?:  string;
    value?: string;
}

export interface Tion {
    lat?: number;
    lng?: number;
}

export interface GlobalMessages {
    alert?:            null;
    banner?:           Banner;
    hasUserDismissed?: boolean;
}

export interface Banner {
    body?:     Body;
    id?:       string;
    severity?: string;
    title?:    Title;
}

export interface Body {
    text?: Title;
    link?: Link;
}

export interface Link {
    href?: string;
    text?: Title;
}

export interface Title {
    value?: string;
}

export interface HouseRules {
    children?:      Children;
    events?:        Children;
    smoking?:       Children;
    pets?:          Children;
    unitUrl?:       string;
    checkInTime?:   string;
    checkOutTime?:  string;
    minimumAge?:    MaxOccupancy;
    maxOccupancy?:  MaxOccupancy;
    standardRules?: StandardRule[];
    customRules?:   CustomRule[];
    label?:         string;
    checkInRule?:   CheckRule;
    checkOutRule?:  CheckRule;
    childrenRule?:  Rule;
    petsRule?:      Rule;
    eventsRule?:    EventsRule;
    smokingRule?:   SmokingRule;
}

export interface CheckRule {
    label?: string;
    time?:  string;
}

export interface Children {
    label?:   string;
    note?:    null | string;
    allowed?: boolean;
}

export interface Rule {
    displayText?:            null;
    allowed?:                boolean;
    childrenNotAllowedNote?: null;
    note?:                   string;
}

export interface CustomRule {
    note?: string;
}

export interface EventsRule {
    displayText?:            string;
    allowed?:                boolean;
    maxEventAttendeesLabel?: null;
    allowedEventsNote?:      null;
    note?:                   null;
}

export interface MaxOccupancy {
    guests?:      number;
    label?:       string;
    note?:        string;
    displayText?: string;
    minimumAge?:  number;
}

export interface SmokingRule {
    displayText?: null;
    allowed?:     boolean;
    outside?:     null;
    inside?:      null;
    note?:        string;
}

export interface StandardRule {
    key?:   string;
    label?: string;
    note?:  null | string;
}

export interface ListingReducerImage {
    caption?:    null;
    height?:     number;
    note?:       null;
    uri?:        string;
    width?:      number;
    imageFiles?: ImageFile[];
    mab?:        null;
    altText?:    null;
}

export interface ImageFile {
    height?: number;
    uri?:    string;
    width?:  number;
}

export interface LocalizedPropertyDescriptionMap {
    English?: string;
}

export interface Metadata {
    indexed?: boolean;
}

export interface MinStayRange {
    minStayHigh?: number;
    minStayLow?:  number;
}

export interface OwnersListingProfile {
    aboutYou?:       null;
    storyPhoto?:     null;
    uniqueBenefits?: null;
    whyHere?:        null;
    yearPurchased?:  null;
}

export interface PreferredLocation {
    uuid?: string;
    name?: Name;
}

export interface Name {
    simple?: string;
    full?:   string;
}

export interface PriceSummary {
    amount?:                 number;
    currency?:               string;
    formattedAmount?:        string;
    pricePeriodDescription?: string;
    currencySymbol?:         string;
}

export interface PropertyMapThumbnailResponsiveOptions {
    mobile?:  string;
    wide?:    string;
    desktop?: string;
}

export interface RateDetails {
    cancellationPolicy?: RateDetailsCancellationPolicy;
    notes?:              any[];
    rateSections?:       RateSection[];
    unitRentalPolicy?:   null;
}

export interface RateDetailsCancellationPolicy {
    active?:                 boolean;
    cancellationPolicyText?: null;
    minDaysCancellable?:     number;
    refundPercent?:          number;
}

export interface RateSection {
    endDate?:   Date;
    minStay?:   number;
    rateInfos?: RateInfo[];
    rateNotes?: any[];
    startDate?: Date;
    subtitle?:  null;
    title?:     string;
}

export interface RateInfo {
    details?:  string;
    subtitle?: null | string;
    title?:    string;
}

export interface RateSummary {
    accurateRate?:            boolean;
    beginDate?:               Date;
    currency?:                string;
    travelerCurrency?:        string;
    endDate?:                 Date;
    flatFees?:                FlatFee[];
    percentageFees?:          null;
    refundableDamageDeposit?: null;
    flatDiscounts?:           any[];
    percentageDiscounts?:     PercentageDiscount[];
    rentNights?:              number[];
    rentNightsConverted?:     string;
    scale?:                   number;
    stayCollectedFeeSummary?: null;
}

export interface FlatFee {
    type?:               string;
    appliesPer?:         string;
    description?:        string;
    minAmount?:          number;
    maxAmount?:          number;
    minAmountConverted?: number;
    maxAmountConverted?: number;
}

export interface PercentageDiscount {
    type?:        string;
    appliesPer?:  string;
    description?: string;
    minAmount?:   number;
    maxAmount?:   number;
}

export interface SearchLandingPages {
    breadcrumbs?: Breadcrumb[];
}

export interface Breadcrumb {
    name?:  string;
    path?:  string;
    url?:   string;
    types?: string[];
    lbsId?: string;
}

export interface Spaces {
    bedrooms?:      Room[];
    spacesSummary?: SpacesSummary;
    bathrooms?:     Room[];
    diningRooms?:   Room[];
}

export interface Room {
    contentItems?: any[];
    name?:         null;
    note?:         null;
    type?:         string;
    capacity?:     null;
}

export interface SpacesSummary {
    area?:                         Area;
    bathroomCombinedCountDisplay?: string;
    bathroomCount?:                number;
    bathroomCountDisplay?:         string;
    bedCountDisplay?:              null;
    bedroomCount?:                 number;
    bedroomCountDisplay?:          string;
    bedroomDetails?:               null;
    toiletOnlyCount?:              number;
    toiletOnlyCountDisplay?:       null;
    bathroomDetails?:              null;
}

export interface Area {
    areaDisplay?: null;
}

export interface SpacesDiningRooms {
    diningRooms?: DiningRoom[];
}

export interface DiningRoom {
    capacity?: null;
}

export interface ThingsOfInterest {
    uuid?:       string;
    source?:     Source;
    category?:   Category;
    categories?: null;
    score?:      number;
    name?:       string;
    position?:   Tion;
    distance?:   string;
    rank?:       number;
}

export enum Category {
    Landmark = "Landmark",
}

export enum Source {
    Gaia = "gaia",
}

export interface UnitContentItem {
    amenity?:               UnitContentItemAmenity;
    availability?:          AvailabilityEnum;
    amenityName?:           string;
    stringAttributeValues?: StringAttributeValue[];
}

export interface UnitContentItemAmenity {
    tags?:        string[];
    displayName?: string;
}

export interface UnitMetadata {
    featuresDescription?: null;
}

export interface ReviewsReducer {
    reviewCount?:                 number;
    averageRating?:               number;
    ownershipTransferred?:        boolean;
    reviews?:                     Review[];
    isFetching?:                  boolean;
    isFetchingTranslatedReviews?: boolean;
    previewCount?:                number;
    reviewId?:                    string;
    scrollTop?:                   boolean;
    pageIndex?:                   number;
    prevPageIndex?:               number;
    errorFetchingReviews?:        boolean;
    errorTranslatingReviews?:     boolean;
    translatedReviewsByUuid?:     TranslatedReviewsByUUID;
    isTranslationToggleOn?:       boolean;
}

export interface Review {
    uuid?:                    string;
    headline?:                string;
    rating?:                  number;
    body?:                    string;
    arrivalDate?:             string;
    datePublished?:           Date;
    ownershipTransferred?:    boolean;
    voteCount?:               number;
    reviewLanguage?:          string;
    reviewer?:                Reviewer;
    response?:                null;
    source?:                  string;
    isNonSiteLanguageReview?: boolean;
    createdDate?:             string;
}

export interface Reviewer {
    location?:        null | string;
    nickname?:        string;
    profileUrl?:      string;
    profilePhotoUrl?: string;
    profileImage?:    string;
}

export interface TranslatedReviewsByUUID {
}
