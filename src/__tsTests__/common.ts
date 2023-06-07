export type ValidateShape<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;

type StyleWithoutParams = {
  container: {
    backgroundColor: string;
    borderBottomColor: string;
  };
};

type StyleWithParams = {
  container: {
    backgroundColor: string;
    borderBottomColor: string;
  };
  bs: {
    page: {
      flex: number;
      backgroundColor: string;
    };
  };
};

export const checkStyle = <T extends StyleWithoutParams>(
  style: ValidateShape<
    T,
    {
      container: ValidateShape<
        T['container'],
        {
          backgroundColor: string;
          borderBottomColor: string;
        }
      >;
    }
  >,
) => {
  return style;
};

export const checkStyleWithBS = <T extends StyleWithParams>(
  style: ValidateShape<
    T,
    {
      container: ValidateShape<
        T['container'],
        {
          backgroundColor: string;
          borderBottomColor: string;
        }
      >;
      bs: ValidateShape<
        T['bs'],
        {
          page: ValidateShape<
            T['bs']['page'],
            {
              flex: number;
              backgroundColor: string;
            }
          >;
        }
      >;
    }
  >,
) => {
  return style;
};

export const themes = {
  light: {
    blue: 'blue',
  },
};

export const styleParams = {
  val: '#aaaaaa',
};

export type Themes = typeof themes;

/* CHECKS */

const checkStyleWrong1 = {
  container: {
    backgroundColor: 'blue',
  },
};
const checkStyleWrong2 = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
    flex: 1,
  },
};
const checkStyleCorrect = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
  },
};
// @ts-expect-error
checkStyle(checkStyleWrong1);
// @ts-expect-error
checkStyle(checkStyleWrong2);
checkStyle(checkStyleCorrect);

const checkStyleWithBSWrong1 = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
  },
  bs: {
    page: {
      flex: 1,
    },
  },
};
const checkStyleWithBSWrong2 = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
  },
  bs: {
    page: {
      flex: 1,
      backgroundColor: 'blue',
      borderBottomColor: 'blue',
    },
  },
};
const checkStyleWithBSWrong3 = {
  container: {
    backgroundColor: 'blue',
  },
  bs: {
    page: {
      flex: 1,
      backgroundColor: 'blue',
    },
  },
};
const checkStyleWithBSWrong4 = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
    flex: 1,
  },
  bs: {
    page: {
      flex: 1,
      backgroundColor: 'blue',
    },
  },
};
const checkStyleWithBSCorrect = {
  container: {
    backgroundColor: 'blue',
    borderBottomColor: 'blue',
  },
  bs: {
    page: {
      flex: 1,
      backgroundColor: 'blue',
    },
  },
};
// @ts-expect-error
checkStyleWithBS(checkStyleWithBSWrong1);
// @ts-expect-error
checkStyleWithBS(checkStyleWithBSWrong2);
// @ts-expect-error
checkStyleWithBS(checkStyleWithBSWrong3);
// @ts-expect-error
checkStyleWithBS(checkStyleWithBSWrong4);
checkStyleWithBS(checkStyleWithBSCorrect);
