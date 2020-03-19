export interface Status {
    updated: Date;
    status: boolean; 
    error?: string;
    information?: { 
        website: boolean; 
        discord: string; 
        cloudflare: string; 
        github: string; }
}