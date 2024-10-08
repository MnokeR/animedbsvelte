// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				BASE_URL: string;
				API_CACHE: KVNamespace;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};
