export interface EnvironType {
    // Env
    env: 'dev' | 'prod'
    isDev: boolean
    isProd: boolean

    // Watermark
    version: string
    revision: string
    buildTime: string
    versionName: string
    watermark: string
}

const env = (import.meta.env.VITE_ENV as any) ?? 'dev'
const version = import.meta.env.VITE_VERSION ?? '?'
const revision = import.meta.env.VITE_REVISION ?? '?'
const buildTime = import.meta.env.VITE_BUILD_TIME ?? '?'

export const Environ: EnvironType = {
    env,
    isDev: env === 'dev',
    isProd: env === 'prod',
    version,
    revision,
    buildTime,
    versionName: `${version}.${revision}`,
    watermark: `${version}.${revision} - ${buildTime}`,
}
