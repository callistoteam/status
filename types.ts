export interface Status {
    updated: Date;
    status: boolean; 
    error?: string;
    information?: { 
        all: boolean;
        wonderbot: boolean;
        wbapi: boolean;
        parkbot: boolean;
        support: boolean; 
        wbweb: boolean; 
        web: boolean
        discord: string; 
        cloudflare: string; 
        github: string;
}
}
