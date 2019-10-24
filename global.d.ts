declare module '*.css' {
   const exports: { [exportName: string]: string };
    export = exports;
  }

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}