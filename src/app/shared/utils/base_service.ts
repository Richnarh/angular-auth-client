export interface ResponseObj<T> {
    data: T
    success: boolean
    message: string
    errors: any[]
  }