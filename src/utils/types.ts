interface Source {
    url: string,
    resolution: string
}

export interface Video {
    source: string,
    poster: string | null
}

export interface Subtitle {
    short: String,
    long: String,
    source: String
}