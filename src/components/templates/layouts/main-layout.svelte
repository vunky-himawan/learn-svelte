<script>
	import { Sidebar, SidebarItem } from 'flowbite-svelte';
</script>

<div class="overflow-hidden lg:flex">
	<Sidebar>
		<SidebarItem href="/" label="Home" />
	</Sidebar>
	<div class="relative h-full w-full overflow-y-auto pt-[70px] lg:ml-64">
		<slot />
	</div>
</div>
