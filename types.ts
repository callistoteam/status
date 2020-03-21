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

export interface Issue {
    url: string,
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: Number;
    node_id: string;
    number: Number;
    title: string;
    user: {
      login: string;
      id: Number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string
      html_url: string
      followers_url: string,
      following_url: string,
      gists_url: string,
      starred_url: string,
      subscriptions_url: string,
      organizations_url: string,
      repos_url: string,
      events_url: string,
      received_events_url: string,
      type: string,
      site_admin: boolean
    },
    labels: any[],
    state: string,
    locked: boolean,
    assignee: any,
    assignees: [

    ],
    milestone: any,
    comment?: any[]
    comments: Number,
    created_at: Date,
    updated_at: Date,
    closed_at: any,
    author_association: string,
    body: string
  }

