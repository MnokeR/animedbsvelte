<script lang="ts">
	import { page } from '$app/stores';
	import * as Select from '$lib/components/ui/select/index.js';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import type { Options } from './select-options';
	type SelectProps = {
		options: Options;
		multiple?: boolean;
		setParams: (param: string, value: string | string[]) => void;
	};

	type HandleSelect =
		| {
				label: string;
				value: string;
		  }
		| { label: string; value: string }[]
		| undefined;

	let { options, multiple, setParams }: SelectProps = $props();
	let searchParams = $page.url.searchParams;
	let param = options.param ? options.param : options.title.toLowerCase();
	let paramValue = $state(searchParams.get(param));

	let value = $state<string[]>(paramValue ? [paramValue] : []);
	let isActive = $derived(value.length > 0);
	let selected = $derived.by(() => {
		if (multiple) {
			const match = options.items.filter((item) => value.includes(item.value));
			return match
				? match.map((items) => ({ value: items.value, label: items.label }))
				: { value: undefined, label: undefined };
		} else {
			const selectedItems = options.items.find((item) => value.includes(item.value));
			return selectedItems
				? { value: selectedItems.value, label: selectedItems.label }
				: { value: undefined, label: undefined };
		}
	});

	const handleSelect = (select: HandleSelect) => {
		if (Array.isArray(select)) {
			value = select.map((selection) => selection.label);
		} else {
			select?.value ? (value = [select.value]) : [];
		}
		setParams(param, value);
	};
	const handleClear = () => {
		value = [];
		setParams(param, value);
	};
</script>

<Select.Root
	{multiple}
	{selected}
	portal={null}
	onSelectedChange={(s) => handleSelect(s as HandleSelect)}
>
	<Select.Trigger class="w-[180px]" {isActive} {handleClear}>
		<Select.Value placeholder={options.title} />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea>
			<div class="max-h-[400px]">
				<Select.Group>
					{#each options.items as item}
						<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
					{/each}
				</Select.Group>
			</div>
		</ScrollArea>
	</Select.Content>
	<Select.Input name={options.title.toLowerCase()} />
</Select.Root>
