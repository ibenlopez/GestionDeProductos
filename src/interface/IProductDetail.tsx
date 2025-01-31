export interface ProductDetail {
  id: number
  name: string
  description: string
  price: number
  img: string
  updated_at: string
  created_at: string
  reviews: Review[]
  img_url: string
}

export interface Review {
  id: number
  username: string
  rating: string
  comment: string
  id_product: number
  updated_at: string
  created_at: string
}
