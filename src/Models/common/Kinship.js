const KINSHIP_MAP = {
  SELF: {
    name: '本人',
    value: 'SELF',
  },
  PARENT: {
    name: '父母',
    value: 'PARENT',
  },
  CHILDREN: {
    name: '子女',
    value: 'CHILDREN',
  },
  SPOUSE: {
    name: '配偶',
    value: 'SPOUSE',
  },
  OTHER: {
    name: '其他',
    value: 'OTHER',
  }
};

const KINSHIPS = Object.values(KINSHIP_MAP);

const KINSHIP_DIRECTS = [KINSHIP_MAP.SELF, KINSHIP_MAP.PARENT, KINSHIP_MAP.CHILDREN, KINSHIP_MAP.SPOUSE];

export function kinshipFilter(kinship) {
  return KINSHIP_MAP[kinship]?.name;
}

export function kinshipIsSelf(kinship) {
  return kinship === KINSHIP_MAP.SELF.value;
}

export {
  KINSHIP_MAP,
  KINSHIPS,
  KINSHIP_DIRECTS,
};
