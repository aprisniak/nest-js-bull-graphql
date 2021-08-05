import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export async function fetch<T>(uri: RequestInfo, options: RequestInit): Promise<T | null> {
    const response = await nodeFetch(uri, options);

    if (response.status === 204) {
        return null;
    }

    if (response.status === 401) {
        throw new UnauthorizedException(`ошибка авторизации при запросе на ${uri}`);
    }

    if (!response.ok) {
        throw new BadRequestException(`ошибка запроса ${uri}`);
    }

    const data = await response.json();

    return data;
}
