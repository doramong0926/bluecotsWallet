import { DEFAULT_PAYMENT_OWNER_ADDRESS, DEFAULT_TOKEN_EXCHANGE_RATE } from './constants'

import HOTEL1_MAIN from './../cards/images/hotel1_main.jpg';
import HOTEL1_SUB1 from './../cards/images/hotel1_sub1.jpg';
import HOTEL1_SUB2 from './../cards/images/hotel1_sub2.jpg';
import HOTEL2_MAIN from './../cards/images/hotel2_main.jpg';
import HOTEL2_SUB1 from './../cards/images/hotel2_sub1.jpg';
import HOTEL2_SUB2 from './../cards/images/hotel2_sub2.jpg';
import HOTEL3_MAIN from './../cards/images/hotel3_main.jpg';
import HOTEL3_SUB1 from './../cards/images/hotel3_sub1.jpg';
import HOTEL3_SUB2 from './../cards/images/hotel3_sub2.jpg';
import HOTEL4_MAIN from './../cards/images/hotel4_main.jpg';
import HOTEL4_SUB1 from './../cards/images/hotel4_sub1.jpg';
import HOTEL4_SUB2 from './../cards/images/hotel4_sub2.jpg';
import HOTEL5_MAIN from './../cards/images/hotel5_main.jpg';
import HOTEL5_SUB1 from './../cards/images/hotel5_sub1.jpg';
import HOTEL5_SUB2 from './../cards/images/hotel5_sub2.jpg';
import HOTEL6_MAIN from './../cards/images/hotel6_main.jpg';
import HOTEL6_SUB1 from './../cards/images/hotel6_sub1.jpg';
import HOTEL6_SUB2 from './../cards/images/hotel6_sub2.jpg';

export const DEFAULT_CALENDAR_MARKED_DATES = {
    selectedCheckInDate: '',
    selectedCheckOutDate: '',
}

export const DEFAULT_PAYMENT_INFOMATION = {
    hotelName: '',
    orderNumber: 0,
    orderTime: 0,
    selectedRoomType: '',
    numOfPeople: {
        adult: 0,
        kid: 0,
        baby: 0,
    },
    tokenSymbol: 'BLC',
    addressFromSend: '',
    addressToSend: '',
    amountToSend: '',
    transactionId: '',
    transcationBlockHeight: 0,
    date: {
        checkIn: '',
        checkOut: '',
        nightsDays: 0,
    },
    tokenPrice: DEFAULT_TOKEN_EXCHANGE_RATE,
    totalPrice: 0,
};

export const DEFAULT_HOTEL_INFO = {
    id: 0,
    roomType: [
        {
            name: '',
            description: '',
            roomImage: [
                HOTEL1_SUB1,
            ],
            avaliableRoomCount: 0,
            price: {
                adult: 0,
                kid: 0,
                baby: 0,
            },
            avaliableService: {
                dryer: 0,
                parking: 0,
                internet: 0,
            },
            bedType: ''
        },
    ],        
    addressToSend: '',
    name: '',
    description: '',
    address: '',
    homepage: '',
    country: '',
    city: '',
    mainImage: null,
    detailMainImage: [
        null,
    ],
    detailSubImage : [
        null,
    ],
    starCount: 0,
    mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    mapMarker: {
        latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
        }
    },
}

export const DEFAULT_HOTEL_INFO_LIST = [
    {
        id: 1,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is delustandardx',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],        
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'Marriott hotel Seoul',
        description: null,
        address: '176 Sinbanpo-ro, Seocho-gu, Gangnam, Seoul, South Korea',
        homepage: 'https://www.marriott.co.kr',
        country: 'South korea',
        city: 'Seoul',
        mainImage: HOTEL1_MAIN,
        detailMainImage: [
            HOTEL1_MAIN,
            HOTEL1_SUB1,
            HOTEL1_SUB2
        ],
        detailSubImage : [
            HOTEL1_SUB1,
            HOTEL1_SUB2,
        ],
        starCount: 5,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
    {
        id: 2,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is standard',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],   
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'The Shilla Jeju',
        description: null,
        address: '75, Jungmungwangwang-ro 72beon-gil, Seogwipo, South Korea',
        homepage: 'https://www.shillahotels.com',
        country: 'South korea',
        city: 'Jeju',
        mainImage: HOTEL2_MAIN,
        detailMainImage: [
            HOTEL2_MAIN,
            HOTEL2_SUB1,
            HOTEL2_SUB2
        ],
        detailSubImage : [
            HOTEL2_SUB1,
            HOTEL2_SUB2,
        ],
        starCount: 4,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
    {
        id: 3,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is standard',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],   
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'Paradise Hotel Busan ',
        description: null,
        address: '296, Haeundaehaebyeon-ro, Haeundae-gu, Busan, South Korea  ',
        homepage: 'https://www.busanparadisehotel.co.kr',
        country: 'South korea',
        city: 'Busan',
        mainImage: HOTEL3_MAIN,
        detailMainImage: [
            HOTEL3_MAIN,
            HOTEL3_SUB1,
            HOTEL3_SUB2
        ],
        detailSubImage : [
            HOTEL3_SUB1,
            HOTEL3_SUB2,
        ],
        starCount: 4.5,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
    {
        id: 4,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is standard',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],   
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'Marco Polo Plaza Cebu',
        description: null,
        address: 'Cebu Veterans Drive Nivel Hills Apas, Lahug, Cebu City, Philippines',
        homepage: 'http://www.marcopolohotels.com/',
        country: 'Philippines',
        city: 'Cebu',
        mainImage: HOTEL4_MAIN,
        detailMainImage: [
            HOTEL4_MAIN,
            HOTEL4_SUB1,
            HOTEL4_SUB2
        ],
        detailSubImage : [
            HOTEL4_SUB1,
            HOTEL4_SUB2,
        ],
        starCount: 3.5,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
    {
        id: 5,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is standard',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],   
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'The Salisbury Hotel YMCA of Hong Kong',
        description: null,
        address: '41 Salisbury Road, Tsim Sha Tsui, Hong Kong',
        homepage: 'http://www.ymcahk.org.hk/',
        country: 'Hong Kong',
        city: 'Tsim Sha Tsui',
        mainImage: HOTEL5_MAIN,
        detailMainImage: [
            HOTEL5_MAIN,
            HOTEL5_SUB1,
            HOTEL5_SUB2
        ],
        detailSubImage : [
            HOTEL5_SUB1,
            HOTEL5_SUB2,
        ],
        starCount: 4.5,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
    {
        id: 6,
        roomType: [
            {
                name: 'delux',
                description: 'This room type is delux',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 1,
                price: {
                    adult: 11,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'single'
            },
            {
                name: 'standard',
                description: 'This room type is standard',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 2,
                price: {
                    adult: 15,
                    kid: 5,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            {
                name: 'family',
                description: 'This room type is family',
                roomImage: [
                    HOTEL1_SUB1,
                    HOTEL1_SUB2,
                ],
                avaliableRoomCount: 3,
                price: {
                    adult: 20,
                    kid: 10,
                    baby: 5,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'king'
            },
        ],   
        addressToSend: DEFAULT_PAYMENT_OWNER_ADDRESS,
        name: 'Regal Airport Hotel',
        description: null,
        address: '9 Cheong Tat Road, Tung Chung New Town, Hong Kong',
        homepage: 'https://www.regalhotel.com/',
        country: 'Hong Kong',
        city: 'Tung Chung New Town',
        mainImage: HOTEL6_MAIN,
        detailMainImage: [
            HOTEL6_MAIN,
            HOTEL6_SUB1,
            HOTEL6_SUB2
        ],
        detailSubImage : [
            HOTEL6_SUB1,
            HOTEL6_SUB2,
        ],
        starCount: 3.5,
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        mapMarker: {
            latlng: {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        },
    },
];
