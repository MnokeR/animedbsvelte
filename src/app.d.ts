// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				PUBLIC_BASE_URL: string;
				PUBLIC_WORKER_URL: string;
				API_CACHE: KVNamespace;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
