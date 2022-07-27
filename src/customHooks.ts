import axios from "axios";
import React, { useEffect, useState } from "react";
import { DependencyList } from 'react';

export function useEffectAsync<TResult>(func: () => Promise<TResult>, deps?: DependencyList | undefined) {
    useEffect(() => {
        func();
    }, deps);
}

export enum FetchState {
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}

export function usePromise<TResult>(promise: Promise<TResult> | null, deps?: React.DependencyList | undefined, runQuery?: boolean) {

    const [data, setData] = useState<TResult | null>(null);
    const [status, setStatus] = useState(FetchState.Loading);

    useEffectAsync(async () => {
        if (runQuery === false)
            return;

        setStatus(FetchState.Loading);

        try {
            const resp = await promise;
            setData(resp);
            setStatus(FetchState.Success);
        } catch (error) {
            setData(null);
            setStatus(FetchState.Error);
        }

    }, deps ?? []);

    return { data, status };
}

export function useAxiosGetPromise<TResult>(url: string, deps?: React.DependencyList | undefined, runQuery?: boolean) {
    return usePromise(runQuery === false ? null : axios.get<TResult>(url), deps, runQuery);
}


export function useInput() {
    const [value, setValue] = useState('');

    return {
        value,
        onChange(e: React.FormEvent<HTMLInputElement>) {
            setValue((e.target as HTMLInputElement).value);
        },
        setValue
    }
}