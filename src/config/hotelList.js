import { DEFAULT_TOKEN_CONTRACT_ADDRESS } from './constants'
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

export const defaultHotelInfo = {
    id: null,
    roomType: {
        deluxRoom : {
            avaliableRoom: null,
            price: {
                adult: null,
                kid: null,
                baby: null,
            },
            avaliableService: {
                dryer: null,
                parking: null,
                internet: null,
            },
            bedType: null,
        },
        familyRoom : {
            avaliableRoom: null,
            price: {
                adult: null,
                kid: null,
                baby: null,
            },
            avaliableService: {
                dryer: null,
                parking: null,
                internet: null,
            },
            bedType: null,
        },
    },        
    addressToSend: null,
    name: null,
    description: null,
    address: null,
    homepage: null,
    country: null,
    city: null,
    mainImage: null,
    detailMainImage: [
        null,
    ],
    detailSubImage : [
        null,
    ],
    starCount: null,
}

export const defaultHotelInfoList = [
    {
        id: 1,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },        
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
    {
        id: 2,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
    {
        id: 3,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
    {
        id: 4,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
    {
        id: 5,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
    {
        id: 6,
        roomType: {
            deluxRoom : {
                avaliableRoom: 1,
                price: {
                    adult: 11,
                    kid: 6,
                    baby: 3,
                },
                avaliableService: {
                    dryer: 1,
                    parking: 1,
                    internet: 1,
                },
                bedType: 'double'
            },
            familyRoom : {
                avaliableRoom: 3,
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
                bedType: 'double'
            },
        },
        addressToSend: DEFAULT_TOKEN_CONTRACT_ADDRESS,
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
    },
];
