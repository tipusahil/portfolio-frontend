export interface IBlog {
  id: number
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  tags: Array<string>
  view: number
  createdAt: string
  updatedAt: string
  authorId: number
  author: {
    id: number
    name: string
    email: string
    picture : string
    isVerified : boolean
  }
};


export interface IProject  {
  id: number
  title: string
  description: string
  thumbnail: string
  link: string
  createdAt: string
  updatedAt: string
}

