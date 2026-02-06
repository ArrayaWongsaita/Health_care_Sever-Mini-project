// route-builder.ts
type PathParams = Record<string, string | number>;

export const createRoute = (path: string) => {
  return {
    express: path,

    doc: path.replace(/:([A-Za-z]+)/g, '{$1}'),

    build: (params?: PathParams) => {
      if (!params) return path;

      return Object.entries(params).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
        path,
      );
    },
  };
};
