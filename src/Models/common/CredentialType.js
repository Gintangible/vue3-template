const CREDENTIAL_TYPE_MAP = {
  HONGKONG_MACAO_RETURN_PERMIT: {
    text: '港澳通行证',
    value: 'HONGKONG_MACAO_RETURN_PERMIT',
  },
  TAIWAN_RETURN_PERMIT: {
    text: '台湾通行证',
    value: 'TAIWAN_RETURN_PERMIT',
  },
  HONGKONG_MACAO_TAIWAN_RESIDENCE_PERMIT: {
    text: '港澳台居民居住证',
    value: 'HONGKONG_MACAO_TAIWAN_RESIDENCE_PERMIT',
  },
  FOREIGNER_PERMANENT_RESIDENCE_PERMIT: {
    text: '外国人永久居住证',
    value: 'FOREIGNER_PERMANENT_RESIDENCE_PERMIT',
  },
  PASSPORT: {
    text: '护照',
    value: 'PASSPORT',
  },
  IDENTITY_CARD: {
    text: '身份证',
    value: 'IDENTITY_CARD',
  },
};

const CREDENTIAL_TYPES = Object.values(CREDENTIAL_TYPE_MAP);

const DEFAULT_CREDENTIAL_TYPE = CREDENTIAL_TYPE_MAP.IDENTITY_CARD;

export function credentialTypeFilter(type) {
  return CREDENTIAL_TYPE_MAP[type]?.name;
}

export {
  CREDENTIAL_TYPE_MAP,
  DEFAULT_CREDENTIAL_TYPE,
  CREDENTIAL_TYPES,
};
