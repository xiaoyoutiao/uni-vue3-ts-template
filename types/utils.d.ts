import type { ComputedRef, Ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicObject = Record<string, any>;

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};


