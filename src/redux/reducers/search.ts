export type SearchTravelClass = "business" | "economy"

export interface SearchRoutePoint {
  name: string
  code: string
  type?: "airplane" | "train" | "bus"
}

export interface SearchRoute {
  departurePoint: SearchRoutePoint | null
  arrivalPoint: SearchRoutePoint | null

  departureDate: Date | null
  returnDate: Date | null
}

export interface SearchDetails {
  hasReturnDate: boolean
  travelClass: SearchTravelClass
  routes: SearchRoute[]
  passengers: {
    adults: number
    children: number
    babies: number
  }
}

const initialState: SearchDetails = {
  hasReturnDate: false,
  travelClass: "economy",
  routes: [{ arrivalPoint: null, departurePoint: null, departureDate: new Date, returnDate: null }],
  passengers: {
    adults: 1,
    children: 0,
    babies: 0
  }
}

type Action =
  { type: "SEARCH_UPDATE" | "SEARCH_ROUTES_ADD" | "SEARCH_PASSENGERS_UPDATE", payload: typeof initialState }
  | { type: "SEARCH_ROUTES_UPDATE", payload: { index: number; route: SearchRoute } }

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "SEARCH_UPDATE":
      return { ...state, ...action.payload }

    case "SEARCH_ROUTES_ADD":
      return { ...state, routes: [...state.routes, ...action.payload.routes] }

    case "SEARCH_ROUTES_UPDATE":
      state.routes[action.payload.index] = {
        ...state.routes[action.payload.index],
        ...action.payload.route
      }

      return { ...state, routes: state.routes }

    case "SEARCH_PASSENGERS_UPDATE":
      return { ...state, passengers: { ...state.passengers, ...action.payload.passengers } }

    default:
      return state
  }
}


export const updateSearchHasReturnDate = (hasReturnDate: SearchDetails["hasReturnDate"]) => ({
  type: "SEARCH_UPDATE",
  payload: { hasReturnDate }
})

export const updateSearchTravelClass = (travelClass: SearchTravelClass) => ({
  type: "SEARCH_UPDATE",
  payload: { travelClass }
})

export const addSearchRoutes = (...routes: SearchRoute[]) => ({
  type: "SEARCH_ROUTES_ADD",
  payload: { routes }
})

export const updateSearchRoute = (index: number, route: Partial<SearchRoute>) => ({
  type: "SEARCH_ROUTES_UPDATE",
  payload: { index, route }
})

export const updateSearchPassengers = (passengers: Partial<SearchDetails["passengers"]>) => ({
  type: "SEARCH_PASSENGERS_UPDATE",
  payload: { passengers }
})
