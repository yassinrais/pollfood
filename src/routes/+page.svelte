<script lang="ts">
	import type { Item, Level } from '$lib/types';
	import ItemCell from '../components/ItemCell.svelte';
	import LevelItem from '../components/LevelItem.svelte';

	let { data } = $props();

	const lvls = [
		{ name: 'E', style: 'bg-green-200/90' },
		{ name: 'D', style: 'bg-yellow-200/90' },
		{ name: 'C', style: 'bg-yellow-500/90' },
		{ name: 'B', style: 'bg-orange-400/90' },
		{ name: 'A', style: 'bg-orange-500/90' },
		{ name: 'S', style: 'bg-red-500/90' }
	];

	let items: Item[] = data.data || [];

	let minScore = $derived(Math.min(...items.map((d) => d.score)));
	let maxScore = $derived(Math.max(...items.map((d) => d.score)));
	let lvlAvg = $derived((maxScore - minScore) / lvls.length + 1);

	let levels: Level[] = $derived(
		lvls
			.map((item, i) => {
				const min = i * lvlAvg + minScore;
				const max = (i + 1) * lvlAvg + minScore;

				return {
					...item,
					min,
					max,
					items: items
						.filter((i) => i.score >= min && i.score < max)
						.sort((a, b) => b.score - a.score)
				};
			})
			.sort((a, b) => b.max - a.max)
	);

	let ws: WebSocket;
	const createSocket = async ({
		csrfToken,
		id,
		sessionToken,
		cookie,
		staticToken
	}: Record<string, string>) => {
		const params = new URLSearchParams({
			_csrf_token: csrfToken,
			vsn: '2.0.0',
			target: 'wss://foodpoll.devs.ma/live/websocket',
			cookie: cookie,
			_mounts: '0',
			static: staticToken,
			session: sessionToken,
			id
		});

		ws = new WebSocket(`ws://localhost:4444?${params}`);

		ws.onmessage = ({ items }) => {
			console.log('message:', items);
			if (items == 'open') {
				ws.send(
					JSON.stringify([
						'4',
						'4',
						'lv:' + id,
						'phx_join',
						{
							url: 'https://foodpoll.devs.ma/',
							session: sessionToken
						}
					])
				);
				ws.send(JSON.stringify([null, '10', 'phoenix', 'heartbeat', {}]));
			}

			try {
				const parsed = JSON.parse(items);
				if (parsed?.[3] === 'diff') {
					update();

					ws.send(
						JSON.stringify([
							'4',
							'14',
							'lv:' + id,
							'event',
							{ type: 'click', event: 'poll', value: { value: '' } }
						])
					);
				}

				if (items === '[null,"10","phoenix","phx_reply",{"status":"ok","response":{}}]') {
					setTimeout(() => {
						ws.send(JSON.stringify([null, '10', 'phoenix', 'heartbeat', {}]));
					}, 10000);
				}
			} catch (error) {}
		};
		ws.onclose = (closed) => {
			console.log('closed : ', closed);
		};
		ws.onopen = () => {
			console.log('socket open');
		};

		ws.onerror = (error) => {
			console.log('error : ', error);
		};
	};

	const update = async () => {
		return fetch('./api')
			.then((res) => res.json())
			.then((res) => {
				items = res.data;
				return res;
			});
	};
	$effect(() => console.log(levels));

	// $effect(() => {
	// 	update().then((res) => {
	// 		// createSocket(res);
	// 	});
	// });
</script>

<div class="flex flex-col h-screen overflow-hidden w-full">
	{#each levels as level}
		{#key level.name}
			<LevelItem {level}>
				{#each level.items as item}
					<ItemCell {item} />
				{/each}
			</LevelItem>
		{/key}
	{/each}
</div>
