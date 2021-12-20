export interface TravelNews {
    category: TravelNewsLink;        
    headline: string;
    location: TravelNewsLink;
    thumbnail: TravelNewsThumbnail;   
    url: string;
}

export interface TravelNewsLink {
    title: string;
    url: string;    
}

export interface TravelNewsThumbnail {
    alt: string;
    src: string;
}