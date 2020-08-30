declare module 'vue-hooks' {
    type EffectCallback = () => (void | (() => void));
    type InputIdentityList = ReadonlyArray<any>;
    type DependencyList = ReadonlyArray<any>;

    interface MutableRefObject<T> {
        current: T;
    }

    interface RefObject<T> {
        readonly current: T | null;
    }

    export function hooks(vue: any): void;

    export function useState<T>(initial: T): [T, (newValue: any) => void];

    function useRef<T>(initialValue: T): MutableRefObject<T>;
    function useRef<T>(initialValue: T | null): RefObject<T>;
    function useRef<T = undefined>(): MutableRefObject<T | undefined>;

    function useEffect(effect: EffectCallback, deps?: DependencyList): void;

}



