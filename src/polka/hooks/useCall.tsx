// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Codec} from '@polkadot/types/types';
import {CallOptions, CallParam, CallParams} from './types';
import {isNull, isUndefined} from '@polkadot/util';

import useIsMountedRef from './useIsMountedRef';
import ApiPromise from '@polkadot/api/promise';
import useApiState from '@/polka/hooks/useApiState';
import useApi from '@/polka/hooks/useApi';
import {ref, Ref, watchEffect, onBeforeUnmount} from '@vue/composition-api';
import {HasDefined} from '@vue/composition-api/dist/types/basic';

type TrackFnCallback = (value: Codec) => void;

type TrackFnResult = Promise<() => void>;

interface TrackFn {
    (a: CallParam, b: CallParam, c: CallParam, cb: TrackFnCallback): TrackFnResult;

    (a: CallParam, b: CallParam, cb: TrackFnCallback): TrackFnResult;

    (a: CallParam, cb: TrackFnCallback): TrackFnResult;

    (cb: TrackFnCallback): TrackFnResult;

    meta?: {
        type: {
            isDoubleMap: boolean;
        };
    };
}

interface Tracker {
    isActive: boolean;
    count: number;
    serialized: string | null;
    subscriber: TrackFnResult | null;
}


// the default transform, just returns what we have
function transformIdentity(value: any): any {
    return value;
}

// extract the serialized and mapped params, all ready for use in our call
function extractParams(fn: any, params: readonly any[], paramMap: (params: readonly any[]) => any): [string, CallParams | null] {
    return [
        JSON.stringify({f: fn?.name, p: params}),
        params.length === 0 || !params.some((param): boolean => isNull(param) || isUndefined(null))
            ? paramMap(params)
            : null,
    ];
}

// unsubscribe and remove from  the tracker
function unsubscribe(tracker: Ref<Tracker>): void {
    tracker.value.isActive = false;

    if (tracker.value.subscriber) {
        tracker.value.subscriber.then((unsubFn): void => unsubFn());
        tracker.value.subscriber = null;
    }
}

// subscribe, tyring to play nice with the browser threads
function subscribe<T>(
    mounted: Ref<boolean>,
    tracker: Ref<Tracker>,
    fn: TrackFn | undefined,
    params: CallParams,
    data: Ref<T | undefined>,
    {isSingle, transform = transformIdentity}: CallOptions<T>,
): void {
    const validParams = params.filter((p): boolean => !isUndefined(p));

    unsubscribe(tracker);

    setTimeout((): void => {
        if (mounted.value) {
            if (fn && (!fn.meta || !fn.meta.type?.isDoubleMap || validParams.length === 2)) {
                // swap to acive mode and reset our count
                tracker.value.isActive = true;
                tracker.value.count = 0;
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore We tried to get the typings right, close but no cigar...
                    tracker.value.subscriber = fn(...params, (value: any): void => {
                        // when we don't have an active sub, or single-shot, ignore (we use the isActive flag here
                        // since .subscriber may not be set on immeditae callback)
                        if (mounted.value && tracker.value.isActive && (!isSingle || !tracker.value.count)) {
                            tracker.value.count++;
                            data.value = transform(value);
                        }
                    });
                } catch (e) {
                    console.log('错误', e);
                }
            } else {
                tracker.value.subscriber = null;
            }
        }
    }, 0);
}

// tracks a stream, typically an api.* call (derive, rpc, query) that
//  - returns a promise with an unsubscribe function
//  - has a callback to set the value
// FIXME The typings here need some serious TLC
export default function useCall<T>(
    getFn: (api: ApiPromise) => TrackFn | undefined | null,
    params: Readonly<Ref<readonly any[]>> = ref([]),
    options: CallOptions<HasDefined<T> extends true ? T : unknown> = {},
): Ref<HasDefined<T> extends true ? T : unknown> {
    const {isApiReady} = useApiState().value;
    const api = useApi();
    const fn = isApiReady ? getFn(api.value!) : null;
    const mounted = useIsMountedRef();
    const tracker = ref<Tracker>({isActive: false, count: 0, serialized: null, subscriber: null});
    const data = ref<T>(options.defaultValue);
    // initial effect, we need an unsubscription
    onBeforeUnmount(() => {
        unsubscribe(tracker);
    });
    // on changes, re-subscribe
    watchEffect(() => {
        if (mounted.value && fn) {
            const [serialized, mappedParams] = extractParams(fn, params.value, options.paramMap || transformIdentity);

            if (mappedParams && serialized !== tracker.value.serialized) {
                tracker.value.serialized = serialized;

                subscribe(mounted, tracker, fn, mappedParams, data, options);
            }
        }
    });
    return data;
}

