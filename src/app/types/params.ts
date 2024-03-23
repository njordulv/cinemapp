import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export type ParamsWithId = Params & { id: string }
