export const userFeatureKey = 'user'

export interface User {
  name      : string | null,
  last_name : string | null,
  accesibility_config?: {
    id: string | null,
  }
}

export interface UserState {
  access_token : string | null,
  user_data: User
}

export const userInitialState: UserState = {
  access_token: null,
  user_data: {
    name: null,
    last_name: null,
    accesibility_config: {
      id: null,
    }
  }
}
