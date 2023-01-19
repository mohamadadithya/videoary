export interface Video {
    source: string,
    poster: string | null,
    next: string | null,
    prev: string | null
}

export interface Subtitle {
    short: String,
    long: String,
    source: String
}