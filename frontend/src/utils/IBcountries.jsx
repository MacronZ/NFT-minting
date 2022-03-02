const countries = [
  {
    countryName: 'Albania',
    countryCode: 'AL',
  },
  {
    countryName: 'Andorra',
    countryCode: 'AD',
  },
  {
    countryName: 'Antigua and Barbuda',
    countryCode: 'AG',
  },
  {
    countryName: 'Argentina',
    countryCode: 'AR',
  },
  {
    countryName: 'Armenia',
    countryCode: 'AM',
  },
  {
    countryName: 'Aruba',
    countryCode: 'AW',
  },
  {
    countryName: 'Australia',
    countryCode: 'AU',
  },
  {
    countryName: 'Azerbaijan',
    countryCode: 'AZ',
  },
  {
    countryName: 'Bahrain',
    countryCode: 'BH',
  },
  {
    countryName: 'Bangladesh',
    countryCode: 'BD',
  },
  {
    countryName: 'Belize',
    countryCode: 'BZ',
  },
  {
    countryName: 'Bermuda',
    countryCode: 'BM',
  },
  {
    countryName: 'Bosnia-Herzegovina',
    countryCode: 'BA',
  },
  {
    countryName: 'Brazil',
    countryCode: 'BR',
  },
  {
    countryName: 'Cayman Islands',
    countryCode: 'KY',
  },
  {
    countryName: 'Chile',
    countryCode: 'CL',
  },
  {
    countryName: 'China',
    countryCode: 'CN',
  },
  {
    countryName: 'Colombia',
    countryCode: 'CO',
  },
  {
    countryName: 'Cook Islands',
    countryCode: 'CK',
  },
  {
    countryName: 'Costa Rica',
    countryCode: 'CR',
  },
  {
    countryName: 'Dominican Republic',
    countryCode: 'DO',
  },
  {
    countryName: 'Ecuador',
    countryCode: 'EC',
  },
  {
    countryName: 'Egypt',
    countryCode: 'EG',
  },
  {
    countryName: 'El Salvador',
    countryCode: 'SV',
  },
  {
    countryName: 'Gambia',
    countryCode: 'GM',
  },
  {
    countryName: 'Georgia',
    countryCode: 'GE',
  },
  {
    countryName: 'Ghana',
    countryCode: 'GH',
  },
  {
    countryName: 'Grenada',
    countryCode: 'GD',
  },
  {
    countryName: 'Guatemala',
    countryCode: 'GT',
  },
  {
    countryName: 'Guyana',
    countryCode: 'GY',
  },
  {
    countryName: 'Honduras',
    countryCode: 'HN',
  },
  {
    countryName: 'Hong Kong Sar, China',
    countryCode: 'HK',
  },
  {
    countryName: 'Iceland',
    countryCode: 'IS',
  },
  {
    countryName: 'India',
    countryCode: 'IN',
  },
  {
    countryName: 'Indonesia',
    countryCode: 'ID',
  },
  {
    countryName: 'Israel',
    countryCode: 'IL',
  },
  {
    countryName: 'Japan',
    countryCode: 'JP',
  },
  {
    countryName: 'Jordan',
    countryCode: 'JO',
  },
  {
    countryName: 'Kazakhstan',
    countryCode: 'KZ',
  },
  {
    countryName: 'Kenya',
    countryCode: 'KE',
  },
  {
    countryName: 'Korea, South',
    countryCode: 'KR',
  },
  {
    countryName: 'Lebanon',
    countryCode: 'LB',
  },
  {
    countryName: 'Macao Sar, China',
    countryCode: 'MO',
  },
  {
    countryName: 'Macedonia North*',
    countryCode: 'MK',
  },
  {
    countryName: 'Malaysia',
    countryCode: 'MY',
  },
  {
    countryName: 'Marshall Islands',
    countryCode: 'MH',
  },
  {
    countryName: 'Mauritius',
    countryCode: 'MU',
  },
  {
    countryName: 'Mexico',
    countryCode: 'MX',
  },
  {
    countryName: 'Moldova',
    countryCode: 'MD',
  },
  {
    countryName: 'Montenegro',
    countryCode: 'ME',
  },
  {
    countryName: 'New Zealand',
    countryCode: 'NZ',
  },
  {
    countryName: 'Nigeria',
    countryCode: 'NG',
  },
  {
    countryName: 'Norway',
    countryCode: 'NO',
  },
  {
    countryName: 'Pakistan',
    countryCode: 'PK',
  },
  {
    countryName: 'Panama',
    countryCode: 'PA',
  },
  {
    countryName: 'Paraguay',
    countryCode: 'PY',
  },
  {
    countryName: 'Peru',
    countryCode: 'PE',
  },
  {
    countryName: 'Philippines',
    countryCode: 'PH',
  },
  {
    countryName: 'Qatar',
    countryCode: 'QA',
  },
  {
    countryName: 'Russia',
    countryCode: 'RU',
  },
  {
    countryName: 'Saudi Arabia',
    countryCode: 'SA',
  },
  {
    countryName: 'Serbia',
    countryCode: 'RS',
  },
  {
    countryName: 'Seychelles',
    countryCode: 'SC',
  },
  {
    countryName: 'Singapore',
    countryCode: 'SG',
  },
  {
    countryName: 'South Africa',
    countryCode: 'ZA',
  },
  {
    countryName: 'St. Lucia',
    countryCode: 'LC',
  },
  {
    countryName: 'St. Vincent and The Grenadines',
    countryCode: 'VC',
  },
  {
    countryName: 'Switzerland',
    countryCode: 'CH',
  },
  {
    countryName: 'Taiwan, China',
    countryCode: 'TW',
  },
  {
    countryName: 'Thailand',
    countryCode: 'TH',
  },
  {
    countryName: 'Trinidad and Tobago',
    countryCode: 'TT',
  },
  {
    countryName: 'Tunisia',
    countryCode: 'TN',
  },
  {
    countryName: 'Turkey',
    countryCode: 'TR',
  },
  {
    countryName: 'Turks and Caicos Islands',
    countryCode: 'TC',
  },
  {
    countryName: 'Ukraine',
    countryCode: 'UA',
  },
  {
    countryName: 'United Arab Emirates',
    countryCode: 'AE',
  },
  {
    countryName: 'Uruguay',
    countryCode: 'UY',
  },
  {
    countryName: 'Uzbekistan',
    countryCode: 'UZ',
  },
  {
    countryName: 'Venezuela',
    countryCode: 'VE',
  },
  {
    countryName: 'Vietnam',
    countryCode: 'VN',
  },
];

export { countries as default };
