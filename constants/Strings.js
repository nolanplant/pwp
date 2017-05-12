export default Strings = {
    NAPA: 'Napa',
    SONOMA_COUNTY: 'Sonoma County',
    AND_LIVERMORE: '& Livermore',
    MONTEREY_COUNTY: 'Monterey County',
    BAY_AREA: 'Bay Area',
    CENTRAL_COAST: 'Central Coast',
    SANTA_BARBARA_PASO_ROBLES: 'Santa Barbara & Paso Robles',
    SOUTHERN_CALIFORNIA: 'Southern California',
    TEMECULA_ROMONA_SAN_DIEGO: 'Temecula & Ramona & San Diego',
    LODI: 'Lodi Area',
    MENDOCINO: 'Mendocino',
    AND_LAKE_COUNTY: '& Lake County',
    SOUTH_SF_BAY: 'South SF Bay',
    SANTA_CRUZ_BONNY_DOON: 'Santa Cruz & Bonny Doon',
    SIERRAS: 'Sierras',
    AND_FOOTHILLS: '& Foothills',
    NIAGRA_WINE_REGION: 'Niagra Wine Region',
    AND_ONTARIO: '& Ontario',
    ILLINOIS: 'Illinois',
    AND_MICHIGAN: '& Michigan',
    CENTRAL_VALLEY: 'Central Valley',
    DINING: 'DINING',
    HOTELS: 'HOTELS',
    TRANSPORTATION: 'TRANSPORTATION',
    HOW_IT_WORKS: 'How It Works',
    MY_ACCOUNT: 'My Account',
    CONCIERGE: 'Concierge',
    BLOG: 'Blog',
    FAQ: 'FAQ',
    BUY_RENEW: 'Buy/Renew',
    LOGIN: 'LOGIN',
    VIEW_LOCATION_DETAIL: 'View Location Detail',
    FAVORITE: 'Favorite',
    ALL: 'All',
    FAVORITES: 'Favorites',
    WINERY: 'Winery',
    SWIPE_LEFT_TO_FAVORITE: 'Swipe Left To Favorite',
    USERNAME: 'Username/Email',
    PASSWORD: 'Password',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    INVALID_LOGIN: 'Invalid Username or Password',
    DIRECTIONS: 'Directions',
    ABOUT_PRIORITY_WINEPASS_MESSAGE: 'Priority Wine Pass is a membership program that gets you discounts and elevated experiences at some of the best wineries in California. Learn more at:',
    GET_USER_WELCOME_MESSAGE(username){
        return username ? `Welcome back ${username}!` : 'Welcome back!';
    }
}
