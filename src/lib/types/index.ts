export interface ProjectFrontMatter {
  title: string;
  tags: string[];
  preview: string;
  intro: string;
  links?: {
    source?: string;
    live?: string;
  };
  meta?: {
    description?: string;
  };
}

export interface PostFrontMatter {
  title: string;
  preview: {
    description: string;
    imageUrl: string;
  };
  meta?: {
    description?: string;
  };
}

export interface PostData extends PostFrontMatter {
  url: string;
}
