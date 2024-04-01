const GENDER_MAP = {
  MALE: {
    text: '男',
    value: 'MALE',
  },
  FEMALE: {
    text: '女',
    value: 'FEMALE',
  },
};

const GENDERS = Object.values(GENDER_MAP);

export function genderFilter(gender) {
  return GENDER_MAP[gender]?.text;
}

export {
  GENDER_MAP,
  GENDERS,
};

export default GENDERS;
